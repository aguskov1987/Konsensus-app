import {Core, Position} from "cytoscape";
import {BehaviorSubject, Subscription} from "rxjs";
import {ActiveHiveState} from "../../AppState/ActiveHiveState";
import {ButtonCommand} from "../../AppState/ButtonCommand";
import {HiveLayout} from "../../AppState/HiveLayout";
import {HiveManifest} from "../../AppState/HiveManifest";
import {HiveOperationsState} from "../../AppState/HiveOperationsState";
import {ResponseView} from "../../AppState/ResponseView";
import {Subcomp} from "./Subcomp";
import {VisualizationSubcomp} from "./VisualizationSubcomp";

export class NewPointEventData {
    fromId: string = '';
    toId: string = '';
    label: string = '';
    question: boolean = false;
}

export class OperationsSubcomp implements Subcomp {
    public userRespondedEvent: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public userClickedEvent: BehaviorSubject<Position | null> = new BehaviorSubject<Position | null>(null);
    public userSelectedPointEvent: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public newPointEvent: BehaviorSubject<NewPointEventData | null>
        = new BehaviorSubject<NewPointEventData | null>(null);

    private readonly cyRef: Core;
    private readonly viz: VisualizationSubcomp;
    private currentHiveId: string = '';

    private readonly panInterval: number = 30;
    private readonly zoomInterval: number = 0.5;

    private commandsSub: Subscription = new Subscription();
    private hiveSub: Subscription = new Subscription();
    private responseViewSub: Subscription = new Subscription();
    private layoutSub: Subscription = new Subscription();

    private newPointMenu: any = null;

    private fromId: string = '';
    private toId: string = '';
    private visiblePointIds: { id: string, position: Position }[] = [];
    private visibleSynapseIds: { id: string, position: Position }[] = [];

    constructor(cy: Core, viz: VisualizationSubcomp) {
        this.cyRef = cy;
        this.viz = viz;

        this.hiveSub = ActiveHiveState.activeHiveManifest.valueUpdatedEvent.subscribe((hive: HiveManifest) => {
            if (hive == null) {
                return;
            }
            if (this.currentHiveId !== hive.id) {
                this.currentHiveId = hive.id;
                this.cyRef.remove('edge');
                this.cyRef.remove('node');
            }
            this.setupNewPointMenu(hive.allowDanglingPoints, false, false);
        });

        this.layoutSub = HiveOperationsState.layout.optionUpdatedEvent.subscribe((option: HiveLayout) => {
            if (option != null) {
                this.applyLayout(option);
            }
        });

        this.registerCanvasEvents();
        this.registerCommands();
        this.setupPointMenu();
    }

    public clearSubscriptions(): void {
        this.commandsSub.unsubscribe();
        this.hiveSub.unsubscribe();
        this.responseViewSub.unsubscribe();
        this.layoutSub.unsubscribe();
    }

    public discardFromTo() {
        this.toId = '';
        this.fromId = '';
        this.viz.clearMarkings();
        this.setupNewPointMenu(ActiveHiveState.activeHiveManifest.getValue().allowDanglingPoints,
            false, false);
    }

    private registerCommands() {
        this.commandsSub = HiveOperationsState.lastButtonCommand.subscribe((command: ButtonCommand) => {
            let selected = this.cyRef.elements(':selected');
            switch (command) {
                case ButtonCommand.ZoomIn:
                    this.cyRef.zoom({
                        level: this.cyRef.zoom() + this.zoomInterval,
                        renderedPosition: {x: this.cyRef.width() / 2, y: this.cyRef.height() / 2}
                    });
                    break;
                case ButtonCommand.ZoomOut:
                    this.cyRef.zoom({
                        level: this.cyRef.zoom() - this.zoomInterval,
                        renderedPosition: {x: this.cyRef.width() / 2, y: this.cyRef.height() / 2}
                    });
                    break;
                case ButtonCommand.PanLeft:
                    this.cyRef.panBy({x: -this.panInterval, y: 0});
                    break;
                case ButtonCommand.PanUp:
                    this.cyRef.panBy({x: 0, y: -this.panInterval});
                    break;
                case ButtonCommand.PanRight:
                    this.cyRef.panBy({x: this.panInterval, y: 0});
                    break;
                case ButtonCommand.PanDown:
                    this.cyRef.panBy({x: 0, y: this.panInterval});
                    break;
                case ButtonCommand.SelectNextPoint:
                    break;
                case ButtonCommand.SelectPreviousPoint:
                    break;
                case ButtonCommand.SelectNextSynapse:
                    break;
                case ButtonCommand.SelectPreviousSynapse:
                    break;
                case ButtonCommand.Agree:
                    if (selected.length && selected.length === 1) {
                        this.respond(selected[0].id(), true);
                    }
                    break;
                case ButtonCommand.Disagree:
                    if (selected.length && selected.length === 1) {
                        this.respond(selected[0].id(), true);
                    }
                    break;
                case ButtonCommand.MarkAsFrom:
                    if (selected.length && selected.length === 1 && selected[0].isNode()) {
                        this.markFrom(selected[0].id());
                    }
                    break;
                case ButtonCommand.MarkAsTo:
                    if (selected.length && selected.length === 1 && selected[0].isNode()) {
                        this.markTo(selected[0].id());
                    }
                    break;
                case ButtonCommand.Discard:
                    this.discardFromTo();
                    break;
            }
        });

        this.responseViewSub = HiveOperationsState.responseView.optionUpdatedEvent.subscribe((view: ResponseView) => {
            if (!view) {
                return;
            }
            // do not re-calculate point sizes as non new elements are added
            if (this.viz != null) {
                this.viz.colorizeAndResize(view, false);
            }
        });
    }

    private registerCanvasEvents() {
        // Setup click events. When the user clicks on a point, a new sub-graph is loaded and integrated into the
        // current one.
        this.cyRef.on('tap', (event) => {
            if (event.target === this.cyRef) {
                // ignore
            } else if (event.target.isNode()) {
                setTimeout(() => {
                    this.cyRef.elements().unselect();
                    event.target.select();
                }, 300);

                ActiveHiveState.loadSubgraph(event.target.data().id);
                this.userSelectedPointEvent.next(event.target.data().label);

            } else if (event.target.isEdge()) {
                setTimeout(() => {
                    this.cyRef.elements().unselect();
                    event.target.select();
                }, 300);

                let s = event.target.source();
                let t = event.target.target();
                this.userSelectedPointEvent.next(
                    s.data().label
                    + '<span style="margin-left: 10px; margin-right: 10px;">'
                    + '<img src="Images/Operations/FromPointIcon.svg" width="20em" alt="Therefore"/></span>'
                    + t.data().label
                );
            }
        });

        this.cyRef.on('cxttapstart taphold', (event) => {
            this.userClickedEvent.next(event.renderedPosition);
        })

        this.cyRef.on("viewport", () => {
            this.cashVisibleElements();
        });
    }

    private setupPointMenu() {
        let markFromCommand = {
            content: "<span><Image width='40' src=\"Images/Operations/FromPointIcon.svg\"></Image></span>",
            select: (el) => {
                this.markFrom(el.data().id);
            }
        };
        let positiveResponseCommand = {
            content: "<span><Image width='40' src=\"Images/Operations/PlusIcon.svg\"></Image></span>",
            select: (el) => {
                this.respond(el.data().id, true);
            }
        };
        let negativeResponseCommand = {
            content: "<span><Image width='40' src=\"Images/Operations/MinusIcon.svg\"></Image></span>",
            select: (el) => {
                this.respond(el.data().id, false);
            }
        };
        let markToCommand = {
            content: "<span><Image width='40' src=\"Images/Operations/ToPointIcon.svg\"></Image></span>",
            select: (el) => {
                this.markTo(el.data().id);
            }
        };
        let askQuestionCommand = {
            content: "<span><Image width='40' src=\"Images/Operations/QuestionIcon.svg\"></Image></span>",
            select: (el) => {
                this.markFrom(el.data().id);
                this.goToNewPoint(this.fromId, '', true);
            }
        };
        let answerQuestionCommand = {
            content: "A",
            select: (el) => {
                this.markFrom(el.data().id);
                this.goToNewPoint(this.fromId, '');
            }
        };

        (this.cyRef as any).cxtmenu({
            selector: ".statement",
            menuRadius: () => {
                return 60
            },
            activeFillColor: 'rgba(184,111,25,0.75)',
            commands: [markFromCommand, positiveResponseCommand, negativeResponseCommand, askQuestionCommand, markToCommand]
        });
        (this.cyRef as any).cxtmenu({
            selector: ".question",
            menuRadius: () => {
                return 60
            },
            activeFillColor: 'rgba(184,111,25,0.75)',
            commands: [answerQuestionCommand]
        });
        (this.cyRef as any).cxtmenu({
            selector: "edge",
            menuRadius: () => {
                return 80
            },
            activeFillColor: 'rgba(184,111,25,0.75)',
            commands: [
                {
                    content: "<span><Image src=\"Images/Operations/PlusIcon.svg\"></Image></span>",
                    select: (el) => {
                        this.respond(el.data().id, true);
                    }
                },
                {
                    content: "<span><Image src=\"Images/Operations/MinusIcon.svg\"></Image></span>",
                    select: (el) => {
                        this.respond(el.data().id, false);
                    }
                },]
        });
    }

    private setupNewPointMenu(allowDangling: boolean, allowTo: boolean, allowFrom: boolean) {
        if (this.newPointMenu != null) {
            this.newPointMenu.destroy();
        }

        let discardCommand = {
            content: "<span><Image src=\"Images/Operations/DiscardIcon.svg\"></Image></span>",
            select: () => {
                this.discardFromTo();
            }
        }
        let danglingPointCommand = {
            content: "<span><Image src=\"Images/Operations/NewPointIcon.svg\"></Image></span>",
            select: () => {
                this.goToNewPoint();
            }
        }
        let toCommand = {
            content: "<span><Image src=\"Images/Operations/ToPointIcon.svg\"></Image></span>",
            select: () => {
                if (this.fromId) {
                    this.goToNewPoint(this.fromId, '');
                }
            }
        }
        let fromCommand = {
            content: "<span><Image src=\"Images/Operations/FromPointIcon.svg\"></Image></span>",
            select: () => {
                if (this.toId) {
                    this.goToNewPoint('', this.toId);
                }
            }
        }
        let commands: any[] = [];
        commands.push(discardCommand);
        if (allowDangling && !allowFrom && !allowTo) {
            commands.push(danglingPointCommand);
        }
        if (allowTo) {
            commands.push(toCommand);
        }
        if (allowFrom) {
            commands.push(fromCommand);
        }

        this.newPointMenu = (this.cyRef as any).cxtmenu({
            selector: "core",
            menuRadius: () => {
                return 80
            },
            activeFillColor: 'rgba(184,111,25,0.75)',
            commands: commands
        });
    }

    private respond(id: string, agree: boolean) {
        ActiveHiveState.respond(id, agree);
        this.userRespondedEvent.next(id);
    }

    private markFrom(id: string) {
        if (this.toId !== '' && this.toId !== id) {
            ActiveHiveState.createNewSynapse(id, this.toId);
            this.discardFromTo();
        } else {
            this.discardFromTo();
            this.fromId = id;
            this.viz.markPoint('from', id);
            this.setupNewPointMenu(ActiveHiveState.activeHiveManifest.getValue().allowDanglingPoints,
                true, false);
        }
    }

    private markTo(id: string) {
        if (this.fromId !== '' && this.fromId !== id) {
            ActiveHiveState.createNewSynapse(this.fromId, id);
            this.discardFromTo();
        } else {
            this.discardFromTo();
            this.toId = id;
            this.viz.markPoint('to', id);
            this.setupNewPointMenu(ActiveHiveState.activeHiveManifest.getValue().allowDanglingPoints,
                false, true);
        }
    }

    private cashVisibleElements() {
        // Every time the viewport changes, go through the elements and get the visible ones.
        // They are required in case the user steps through nodes using the keyboard
    }

    private goToNewPoint(fromId: string = '', toId: string = '', question: boolean = false) {
        let element = this.cyRef.getElementById(fromId !== '' ? fromId : toId)[0];
        setTimeout(() => {
            this.newPointEvent.next({fromId, toId, label: element?.data('label'), question});
        }, 300)
    }

    private applyLayout(option: HiveLayout) {
        switch (option) {
            case HiveLayout.Cola:
                const colaLayout = this.cyRef.makeLayout({
                    name: 'cola',
                    handleDisconnected: true,
                    animate: true,
                    avoidOverlap: true,
                    infinite: false,
                    unconstrIter: 1,
                    userConstIter: 0,
                    allConstIter: 1,
                    fit: false
                } as any)
                colaLayout.run();
                break;
            case HiveLayout.Cose:
                const coseLayout = this.cyRef.makeLayout({
                    name: 'cose',
                    animate: true,
                    fit: false
                } as any)
                coseLayout.run();
                break;
            case HiveLayout.Grid:
                const gridLayout = this.cyRef.makeLayout({
                    name: 'grid',
                    animate: true,
                    fit: false
                } as any)
                gridLayout.run();
                break;
            case HiveLayout.Concentric:
                const concentricLayout = this.cyRef.makeLayout({
                    name: 'concentric',
                    animate: true,
                    fit: false
                } as any)
                concentricLayout.run();
                break;
            case HiveLayout.Klay:
                const klayLayout = this.cyRef.makeLayout({
                    name: 'klay',
                    animate: true,
                    fit: false
                } as any)
                klayLayout.run();
                break;
        }
    }
}
