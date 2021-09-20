import {Core, Layouts, Position} from "cytoscape";
import {Subscription} from "rxjs";
import {ActiveHiveState} from "../../AppState/ActiveHiveState";
import {HiveOperationsState} from "../../AppState/HiveOperationsState";
import {PointType} from "../../AppState/PointType";
import {StashedPoint, StashedSubGraph, StashedSynapse, SubGraph} from "../../AppState/SubGraph";
import {ItemDeletionStatus} from "../../Services/ItemDeletion";
import {Subcomp} from "./Subcomp";
import {VisualizationSubcomp} from "./VisualizationSubcomp";

export class IntegrationSubcomp implements Subcomp {
    public lastRespondedId: string = '';
    public lastClickPosition: Position = {x: 100, y: 100};
    public maxNumberOfPoints: number = 300;

    private cyRef: Core;
    private viz: VisualizationSubcomp;
    private undoItem: string = '';
    private stashSub: Subscription = new Subscription();
    private subgraphSub: Subscription = new Subscription();
    private undoSub: Subscription = new Subscription();

    constructor(cy: Core, viz: VisualizationSubcomp) {
        this.cyRef = cy;
        this.viz = viz;

        // First, check whether there is saved graph that needs restoring,
        // restore the graph, then add the new points from the State object
        let stashedGraph = ActiveHiveState.graphStash.take();
        if (stashedGraph != null) {
            this.restoreStashedSubgraph(stashedGraph);
            this.integrate(ActiveHiveState.subgraph.getValue());
        }

        this.subgraphSub = ActiveHiveState.subgraph.valueUpdatedEvent.subscribe((sg: SubGraph) => {
            this.integrate(sg);
        });
        this.stashSub = ActiveHiveState.graphStash.onStash.subscribe(() => {
            ActiveHiveState.graphStash.put(this.packAndStashSubGraph());
        });

        this.undoSub = ActiveHiveState.lastAddedItem.valueUpdatedEvent.subscribe((item) => {
            if (item == null) {
                return;
            }

            if (item.itemStamp !== '') {
                this.undoItem = item.itemStamp;
            }
            if (item.itemStatus === ItemDeletionStatus.Success && this.undoItem !== '') {
                this.clearDeletedItemFromGraph();
            }
        })
    }

    public integrate(sg: SubGraph) {
        if (sg == null) {
            return;
        }

        let firstLoad = this.cyRef.elements().length === 0;
        if (firstLoad) {
            this.populateInitialSubGraph(sg);
        } else {
            this.mergeIntoExistingSubGraph(sg);
        }

        this.prune();
    }

    public clearSubscriptions() {
        this.stashSub.unsubscribe();
        this.subgraphSub.unsubscribe();

        ActiveHiveState.lastAddedItem.restartListener();
        this.undoSub.unsubscribe();
    }

    private packAndStashSubGraph(): StashedSubGraph {
        let stash = new StashedSubGraph();
        let p = this.cyRef.pan();
        let z = this.cyRef.zoom();
        stash.pan = p;
        stash.zoom = z;

        let nodes = this.cyRef.nodes();
        nodes.forEach((el) => {
            let pos = el.position();
            let stashedElement = el.data() as StashedPoint;
            stashedElement.position = pos;
            stash.points.push(stashedElement);
        });

        let edges = this.cyRef.edges();
        edges.forEach((edge) => {
            let syn = edge.data() as StashedSynapse;
            syn.from = edge.data().source;
            syn.to = edge.data().target;
            stash.synapses.push(syn);
        });

        return stash;
    }

    private restoreStashedSubgraph(stashedGraph: StashedSubGraph) {
        if (stashedGraph.points.length && stashedGraph.points.length > 0) {
            this.populateInitialSubGraph(stashedGraph);
        }
    }

    private populateInitialSubGraph(sg: SubGraph | StashedSubGraph) {
        if (sg == null) {
            return;
        }

        let stash = sg instanceof StashedSubGraph

        for (let s of sg.points) {
            this.cyRef.add({
                data: {
                    id: s.id,
                    label: s.label,
                    userResponse: s.userResponse,
                    commonResponse: s.commonResponse,
                    penetration: s.penetration,
                    type: s.type,
                    timestamp: Date.now()
                },
                position: stash ? (s as StashedPoint).position : {x: 0, y: 0},
                classes: s.type === PointType.Statement? 'statement' : 'question'
            });
        }

        for (let e of sg.synapses) {
            this.cyRef.add({
                data: {
                    id: e.id,
                    source: e.from,
                    target: e.to,
                    userResponse: e.userResponse,
                    commonResponse: e.commonResponse,
                    penetration: e.penetration,
                }
            });
        }

        this.viz.colorizeAndResize(HiveOperationsState.responseView.getOption());

        if (!stash) {
            let layout: Layouts = this.cyRef.makeLayout({name: "cola"});
            layout.run();
        } else {
            this.cyRef.zoom((sg as StashedSubGraph).zoom);
            this.cyRef.pan((sg as StashedSubGraph).pan);
        }
    }

    private mergeIntoExistingSubGraph(sg: SubGraph) {
        if (sg == null) {
            return;
        }

        // if adding a new point
        if (sg.points && sg.points.length === 1
            && this.cyRef.getElementById(sg.points[0].id).length === 0
            && this.lastClickPosition) {

            let st = sg.points[0]
            this.cyRef.add({
                data: {
                    id: st.id,
                    label: st.label,
                    userResponse: st.userResponse,
                    commonResponse: st.commonResponse,
                    penetration: st.penetration,
                    type: st.type,
                    timestamp: Date.now()
                },
                renderedPosition: this.lastClickPosition,
                classes: st.type === PointType.Statement? 'statement' : 'question'
            });
        }

        this.cyRef.nodes().forEach((n) => {
            n.lock();
        });

        // add the new points and updated any responses
        for (let st of sg.points) {
            if (this.lastRespondedId && this.lastRespondedId === st.id) {
                let point = this.cyRef.getElementById(st.id);
                point.data({
                    userResponse: st.userResponse,
                    commonResponse: st.commonResponse,
                    penetration: st.penetration
                });
                this.lastRespondedId = '';
            }

            if (this.cyRef.getElementById(st.id).length === 0) {
                this.cyRef.add({
                    data: {
                        id: st.id,
                        label: st.label,
                        userResponse: st.userResponse,
                        commonResponse: st.commonResponse,
                        penetration: st.penetration,
                        type: st.type,
                        timestamp: Date.now()
                    },
                    classes: st.type === PointType.Statement? 'statement' : 'question'
                });
            }
        }

        // add the new synapses and updated any responses
        for (let ef of sg.synapses) {
            if (this.lastRespondedId && this.lastRespondedId === ef.id) {
                let point = this.cyRef.getElementById(ef.id);
                point.data({
                    userResponse: ef.userResponse,
                    commonResponse: ef.commonResponse,
                    penetration: ef.penetration
                });
                this.lastRespondedId = '';
            }

            if (this.cyRef.getElementById(ef.id).length === 0) {
                this.cyRef.add({
                    data: {
                        id: ef.id,
                        source: ef.from,
                        target: ef.to,
                        userResponse: ef.userResponse,
                        commonResponse: ef.commonResponse,
                        penetration: ef.penetration,
                    }
                });
            }
        }

        this.viz.colorizeAndResize(HiveOperationsState.responseView.getOption());

        // run the layout and unlock the graph
        const layout = this.cyRef.makeLayout({
            name: "cola",
            handleDisconnected: true,
            animate: true,
            avoidOverlap: true,
            infinite: false,
            unconstrIter: 1,
            userConstIter: 0,
            allConstIter: 1,
            fit: false
        } as any)
        layout.run();

        layout.on("layoutstop", () => {
            this.cyRef.nodes().forEach(node => {
                node.unlock();
            })
        })
    }

    // Once the graph becomes too large, it becomes neither performant nor useful.
    // To solve this, remove oldest elements and only keep a certain number of points in the graph
    private prune() {
        let points = this.cyRef.nodes();

        if (points.length > this.maxNumberOfPoints) {
            let ids: {id: string, timestamp: number}[] = points.map((st) => {
                return {id: st.id(), timestamp: st.data('timestamp')}
            });

            // sort in descending order
            ids.sort((first, second) => {
                return second.timestamp - first.timestamp;
            });

            // get rid of everything after the maximum number of points; they will be the oldest
            let toRemove = ids.slice(this.maxNumberOfPoints - 1);
            for (let element of toRemove) {
                let node = this.cyRef.getElementById(element.id);
                this.cyRef.remove(node);
            }
        }
    }

    private clearDeletedItemFromGraph() {
        let parts: string[] = this.undoItem.split('+');
        for (let part of parts) {
            let id: string = part.split(':')[1];
            let node = this.cyRef.getElementById(id);
            this.cyRef.remove(node);
        }
        this.undoItem = '';
    }
}
