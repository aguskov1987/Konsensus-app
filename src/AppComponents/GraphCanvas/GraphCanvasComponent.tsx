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
import {OperationsSubcomp} from "./OperationsSubcomp";
import {Subscription} from "rxjs";

let cyRef: Core;

class GraphCanvasComponent extends React.Component<any, any> {
    private history: History;

    private integration: IntegrationSubcomp | null = null;
    private visualization: VisualizationSubcomp | null = null;
    private operations: OperationsSubcomp | null = null;

    private s1: Subscription = new Subscription();
    private s2: Subscription = new Subscription();
    private s3: Subscription = new Subscription();

    constructor(props: any) {
        super(props);
        this.state = {
            selectedLabel: undefined,
        };

        this.history = this.props.history;
    }

    componentDidMount() {
        cytoscape.use(cola);
        if ((cyRef as any).cxtmenu == null) {
            cytoscape.use(cx);
        }
        if ((cyRef as any).layers == null) {
            cytoscape.use(Layers as any);
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
    }

    componentWillUnmount() {
        this.visualization?.clearSubscriptions();
        this.operations?.clearSubscriptions();
        this.integration?.clearSubscriptions();

        this.s1.unsubscribe();
        this.s2.unsubscribe();
        this.s3.unsubscribe();
    }

    render() {
        return (
            <div className='graph-container'>
                <div className='point-label-container'>{this.state.selectedLabel}</div>
                <CytoscapeComponent cy={(cy) => cyRef = cy} elements={[]}
                                    style={{width: '100%', height: 'calc(100% - 91px)'}}/>
                <GraphControlsComponent/>
            </div>
        );
    }
}

export default withRouter(GraphCanvasComponent);
