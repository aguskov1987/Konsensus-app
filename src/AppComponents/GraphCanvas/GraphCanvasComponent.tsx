import React from 'react';
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape, {Core} from "cytoscape";
import * as cx from "cytoscape-cxtmenu";
import cola from 'cytoscape-cola';
import GraphControlsComponent from "../GraphControls/GraphControlsComponent";
import {History} from "history";
import {withRouter} from "react-router-dom";
import './GraphCanvasStyle.scss';
import Layers from 'cytoscape-layers'
import {IntegrationSubcomp} from "./IntegrationSubcomp";
import {VisualizationSubcomp} from "./VisualizationSubcomp";
import {NewPointEventData, OperationsSubcomp} from "./OperationsSubcomp";
import {Subscription} from "rxjs";
import CreatePointComponent from "../CreatePoint/CreatePointComponent";

let cyRef: Core;

class GraphCanvasComponent extends React.Component<any, any> {
    private history: History;

    private integration: IntegrationSubcomp|null = null;
    private visualization: VisualizationSubcomp|null = null;
    private operations: OperationsSubcomp|null = null;

    private s1: Subscription = new Subscription();
    private s2: Subscription = new Subscription();
    private s3: Subscription = new Subscription();
    private s4: Subscription = new Subscription();

    constructor(props: any) {
        super(props);
        this.state = {
            selectedLabel: undefined,
            showNewPointDialog: false,
            newPointLabelTest: '',
            newPointFromId: '',
            newPointToId: '',
            fromOrToLabel: '',
            question: false
        };

        this.handleClose = this.handleClose.bind(this);

        this.history = this.props.history;
    }

    public componentDidMount() {
        cytoscape.use(cola);
        if ((cyRef as any).cxtmenu == null) {
            cytoscape.use(cx);
        }
        if ((cyRef as any).layers == null) {
            cytoscape.use(Layers as cytoscape.Ext);
        }

        this.visualization = new VisualizationSubcomp(cyRef);
        this.operations = new OperationsSubcomp(cyRef, this.visualization);
        this.integration = new IntegrationSubcomp(cyRef, this.visualization);

        this.s1 = this.operations.userRespondedEvent.subscribe((respondedId) => {
            if (this.integration != null) {
                this.integration.lastRespondedId = respondedId;
            }
        });
        this.s2 = this.operations.userClickedEvent.subscribe((position) => {
            if (this.integration != null && position != null) {
                this.integration.lastClickPosition = position;
            }
        });
        this.s3 = this.operations.userSelectedPointEvent.subscribe((label) => {
            this.setState({
                selectedLabel: label
            })
        });

        this.s4 = this.operations.newPointEvent.subscribe((data: NewPointEventData|null) => {
            if (data == null) {
                return;
            }

            if (data.fromId) {
                this.setState({
                    showNewPointDialog: true,
                    newPointFromId: data.fromId,
                    fromOrToLabel: data.label,
                    question: data.question
                });
            } else if (data.toId) {
                this.setState({
                    showNewPointDialog: true,
                    newPointToId: data.toId,
                    fromOrToLabel: data.label,
                    question: false
                });
            } else {
                this.setState({
                    showNewPointDialog: true,
                    question: false
                });
            }
        });
    }

    public componentWillUnmount() {
        this.visualization?.clearSubscriptions();
        this.operations?.clearSubscriptions();
        this.integration?.clearSubscriptions();

        this.s1.unsubscribe();
        this.s2.unsubscribe();
        this.s3.unsubscribe();
        this.s4.unsubscribe();
    }

    public render() {
        let label;
        if (this.state.selectedLabel != null && this.state.selectedLabel !== '') {
            label = <div dangerouslySetInnerHTML={{__html: this.state.selectedLabel}} className='point-label-container'/>;
        }
        return (
            <div className='graph-container'>
                <div className='divider'/>
                {label}
                <CytoscapeComponent cy={(cy) => cyRef = cy} elements={[]}
                                    style={{width: '100%', height: 'calc(100% - 57px)'}}/>
                <GraphControlsComponent/>
                <CreatePointComponent showDialog={this.state.showNewPointDialog}
                                      fromId={this.state.newPointFromId}
                                      toId={this.state.newPointToId}
                                      fromToLabel={this.state.fromOrToLabel}
                                      question={this.state.question}
                                      closeCallback={this.handleClose}/>
            </div>
        );
    }

    private handleClose() {
        this.setState({
            showNewPointDialog: false,
            newPointLabelTest: '',
            newPointFromId: '',
            newPointToId: '',
            fromOrToLabel: '',
            question: false
        });
        this.operations?.discardFromTo();
    }
}

export default withRouter(GraphCanvasComponent);
