import React from 'react';
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape, {Core, Layouts, Position} from "cytoscape";
import * as cx from "cytoscape-cxtmenu";
import cola from 'cytoscape-cola';
import GraphControls from "../GraphControls/GraphControls";
import {ActiveHiveState, ButtonCommand, HiveOperationsState} from "../../AppState/State";
import {Subscription} from "rxjs";
import {StashedEffect, StashedStatement, StashedSubGraph, SubGraph} from "../../AppState/SubGraph";

let cyRef: Core;
let style: any = [
    {
        selector: 'node',
        style: {
            'width': 100,
            'height': 100,
            'label': 'data(label)',
            'background-color': 'data(c)',
            'text-valign': 'center',
            'text-halign': 'center',
            'text-wrap': 'wrap',
            'text-max-width': '100px',
            'font-size': 8
        }
    },
    {
        selector: ':selected',
        style: {
            'border-width': 6,
            'border-color': '#ffffff',
        }
    },
    {
        selector: 'edge',
        style: {
            width: 3,
            'curve-style': 'unbundled-bezier',
            'control-point-distances': '20',
            'control-point-weights': '0.2',
            'target-arrow-shape': 'triangle',
            'line-color': 'data(c)',
            'target-arrow-color': 'data(c)'
        }
    },
    {
        selector: 'edge:selected',
        style: {
            width: 5,
            'curve-style': 'unbundled-bezier',
            'control-point-distances': '20',
            'control-point-weights': '0.2',
            'target-arrow-shape': 'triangle',
            'line-color': 'white',
            'target-arrow-color': 'white'
        }
    },
    {
        selector: '.cause',
        style: {
            'shape': 'rectangle'
        }
    },
    {
        selector: '.effect',
        style: {
            'shape': 'rhomboid'
        }
    }
];

class GraphCanvas extends React.Component<any, any> {
    private maxNumberOfStatements: number = 1000;

    private stashSub: Subscription = new Subscription();
    private subgraphSub: Subscription = new Subscription();
    private opsSub: Subscription = new Subscription();

    private causingStatementId: string = '';
    private effectedStatementId: string = '';
    private visibleStatementIds: {id: string, position: Position}[] = [];
    private visibleEffectIds: {id: string, position: Position}[] = [];

    constructor(props: any) {
        super(props);
        this.state = {
            selectedLabel: undefined
        };

        this.respond = this.respond.bind(this);
        this.markAsCause = this.markAsCause.bind(this);
        this.markAsEffect = this.markAsEffect.bind(this);
        this.discardCauseEffect = this.discardCauseEffect.bind(this);
    }

    componentDidMount() {
        cytoscape.use(cola);
        cytoscape.use(cx);
        this.setupMenu();

        // First, check whether there is saved graph that needs restoring,
        // restore the graph, then add the new statements from the State object
        let stashedGraph = ActiveHiveState.graphStash.take();
        if (stashedGraph != null) {
            this.restoreStashedSubgraph(stashedGraph);
            this.integrate(ActiveHiveState.subgraph.value);
        }
        // Then subscribe to the subgraph changes and once a new subgraph comes in, integrate it into the existing one
        this.subgraphSub = ActiveHiveState.subgraph.notifier.subscribe((sg: SubGraph) => {
            this.integrate(sg);
        });
        this.stashSub = ActiveHiveState.graphStash.onStash.subscribe(() => {
            ActiveHiveState.graphStash.put(this.packAndStashSubGraph());
        });

        this.registerCanvasEvents();
        this.registerCommands();
    }

    componentWillUnmount() {
        this.stashSub.unsubscribe();
        this.subgraphSub.unsubscribe();
        this.opsSub.unsubscribe();
    }

    render() {
        return (
            <div style={{width: '100%', height: 'calc(100% - 50px)'}}>
                <div style={{backgroundColor: '#2b2b2b', color: 'white', padding: 7, minHeight: 40}}>
                    {this.state.selectedLabel}
                </div>
                <CytoscapeComponent cy={(cy) => cyRef = cy} elements={[]}
                                    style={{width: '100%', height: 'calc(100% - 91px)'}} stylesheet={style}/>
                <GraphControls/>
            </div>
        );
    }

    private registerCommands() {
        this.opsSub = HiveOperationsState.lastButtonCommand.subscribe((command: ButtonCommand) => {
            let selected = cyRef.elements(':selected');
            switch (command) {
                case ButtonCommand.ZoomIn:
                    cyRef.zoom({
                        level: cyRef.zoom() + 0.5,
                        renderedPosition: {x: cyRef.width() / 2, y: cyRef.height() / 2}
                    });
                    break;
                case ButtonCommand.ZoomOut:
                    cyRef.zoom({
                        level: cyRef.zoom() - 0.5,
                        renderedPosition: {x: cyRef.width() / 2, y: cyRef.height() / 2}
                    });
                    break;
                case ButtonCommand.PanLeft:
                    cyRef.panBy({x: -30, y: 0});
                    break;
                case ButtonCommand.PanUp:
                    cyRef.panBy({x: 0, y: -30});
                    break;
                case ButtonCommand.PanRight:
                    cyRef.panBy({x: 30, y: 0});
                    break;
                case ButtonCommand.PanDown:
                    cyRef.panBy({x: 0, y: 30});
                    break;
                case ButtonCommand.SelectNextStatement:
                    break;
                case ButtonCommand.SelectPreviousStatement:
                    break;
                case ButtonCommand.SelectNextEffect:
                    break;
                case ButtonCommand.SelectPreviousEffect:
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
                case ButtonCommand.MarkAsCause:
                    if (selected.length && selected.length === 1 && selected[0].isNode()) {
                        this.markAsCause(selected[0].id());
                    }
                    break;
                case ButtonCommand.MarkAsEffect:
                    if (selected.length && selected.length === 1 && selected[0].isNode()) {
                        this.markAsEffect(selected[0].id());
                    }
                    break;
                case ButtonCommand.Discard:
                    this.discardCauseEffect();
                    break;
            }
        });
    }

    private registerCanvasEvents() {
        // Setup click events. When the user clicks on a statement, a new sub-graph is loaded and integrated into the
        // current one.
        cyRef.on('tap', (event) => {
            if (event.target === cyRef) {
                // ignore
            } else if (event.target.isNode()) {
                setTimeout(() => {
                    cyRef.elements().unselect();
                    event.target.select();
                }, 300);

                ActiveHiveState.loadSubgraph(event.target.data().id);
                this.setState({
                    selectedLabel: event.target.data().label
                });
            } else if (event.target.isEdge()) {
                setTimeout(() => {
                    cyRef.elements().unselect();
                    event.target.select();
                }, 300);

                let s = event.target.source();
                let t = event.target.target();
                this.setState({
                    selectedLabel: s.data().label + ' -> ' + t.data().label
                })
            }
        });

        cyRef.on("viewport", (event) => {
            this.cashVisibleElements();
        });
    }

    private packAndStashSubGraph(): StashedSubGraph {
        let stash = new StashedSubGraph();
        let p = cyRef.pan();
        let z = cyRef.zoom();
        stash.pan = p;
        stash.zoom = z;

        let els = cyRef.elements();
        els.forEach((el) => {
            let pos = el.position();
            let stashedElement = el.data() as StashedStatement;
            stashedElement.position = pos;
            stash.statements.push(stashedElement);
        });

        let edges = cyRef.edges();
        edges.forEach((edge) => {
            let stashedEffect = edge.data() as StashedEffect;
            stash.effects.push(stashedEffect);
        });

        return stash;
    }

    private restoreStashedSubgraph(stashedGraph: StashedSubGraph) {
        console.log('restoring...');
        this.populateInitialSubGraph(stashedGraph);
    }

    private integrate(sg: SubGraph) {
        console.log('integrating...');

        let firstLoad = cyRef.elements().length === 0;
        if (firstLoad) {
            this.populateInitialSubGraph(sg);
        } else {
            this.mergeIntoExistingSubGraph(sg);
        }

        this.prune();
        this.colorizeAndResize();
    }

    private populateInitialSubGraph(sg: SubGraph | StashedSubGraph) {
        let stash = sg instanceof StashedSubGraph

        for (let s of sg.statements) {
            cyRef.add({
                data: {
                    id: s.id,
                    label: s.label,
                    userResponse: s.userResponse,
                    commonResponse: s.commonResponse,
                    penetration: s.penetration,
                    c: 'green',
                    timestamp: Date.now()
                },
                position: stash ? (s as StashedStatement).position : {x: 0, y: 0}
            });
        }

        for (let e of sg.effects) {
            cyRef.add({
                data: {
                    id: e.id,
                    source: e.source,
                    target: e.target,
                    userResponse: e.userResponse,
                    commonResponse: e.commonResponse,
                    penetration: e.penetration,
                    c: 'green'
                }
            });
        }

        if (!stash) {
            let layout: Layouts = cyRef.makeLayout({name: "cola"});
            layout.run();
        } else {
            cyRef.zoom((sg as StashedSubGraph).zoom);
            cyRef.pan((sg as StashedSubGraph).pan);
        }
    }

    private mergeIntoExistingSubGraph(sg: SubGraph) {
        for (let st of sg.statements) {
            console.log(st);
        }

        for (let ef of sg.effects) {
            console.log(ef);
        }
    }

    // Once the graph becomes too large, it becomes neither performant nor useful.
    // To solve this, remove oldest elements and only keep a certain number of statements in the graph
    private prune() {
        let statements = cyRef.nodes();

        if (statements.length > this.maxNumberOfStatements) {
            let ids: {id: string, timestamp: number}[] = statements.map((st) => {
                return {id: st.id(), timestamp: st.data('timestamp')}
            });

            // sort in descending order
            ids.sort((first, second) => {
                return second.timestamp - first.timestamp;
            });

            // get rid of everything after the maximum number of statements; they will be the oldest
            let toRemove = ids.slice(this.maxNumberOfStatements - 1);
            for (let element of toRemove) {
                let node = cyRef.getElementById(element.id);
                cyRef.remove(node);
            }
        }
    }

    private colorizeAndResize() {

    }

    // Cxt Menu setup
    private setupMenu() {
        (cyRef as any).cxtmenu({
            selector: "core",
            menuRadius: (ele) => {return 80},
            activeFillColor: 'rgba(184,111,25,0.75)',
            commands: [
                {
                    content: "New Statement",
                    select: () => {
                        console.log("new statement clicked");
                    }
                },
                {
                    content: "Discard",
                    select: () => {
                        this.discardCauseEffect();
                    }
                }]
        });
        (cyRef as any).cxtmenu({
            selector: "node, edge",
            menuRadius: (ele) => {return 80},
            activeFillColor: 'rgba(184,111,25,0.75)',
            commands: [
                {
                    content: "Agree",
                    select: (el) => {
                        this.respond(el.data().id, true);
                    }
                },
                {
                    content: "Mark as Cause",
                    select: (el) => {
                        this.markAsCause(el.data().id);
                    }
                },
                {
                    content: "Mark as Effect",
                    select: (el) => {
                        this.markAsEffect(el.data().id);
                    }
                },
                {
                    content: "Disagree",
                    select: (el) => {
                        this.respond(el.data().id, false);
                    }
                },]
        });
    }

    private respond(id: string, agree: boolean) {
        ActiveHiveState.respond(id, agree);
    }

    private markAsCause(id: string) {
        if (this.effectedStatementId !== '') {
            ActiveHiveState.createNewEffect(id, this.effectedStatementId);
            this.discardCauseEffect();
        } else {
            this.causingStatementId = id;
            cyRef.getElementById(id).addClass('cause');
        }
    }

    private markAsEffect(id: string) {
        if (this.causingStatementId !== '') {
            ActiveHiveState.createNewEffect(this.causingStatementId, id);
            this.discardCauseEffect();
        } else {
            this.effectedStatementId = id;
            cyRef.getElementById(id).addClass('effect');
        }
    }

    private discardCauseEffect() {
        this.effectedStatementId = '';
        this.causingStatementId = '';
        cyRef.elements().removeClass('cause');
        cyRef.elements().removeClass('effect');
    }

    // Every time the viewport changes, go through the elements and get the visible ones.
    // They are required in case the user steps through nodes using the keyboard
    private cashVisibleElements() {

    }
}

export default GraphCanvas;
