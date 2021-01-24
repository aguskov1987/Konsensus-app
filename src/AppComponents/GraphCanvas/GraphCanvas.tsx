import React from 'react';
import CytoscapeComponent from "react-cytoscapejs";

class GraphCanvas extends React.Component<any, any> {
    render() {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <CytoscapeComponent elements={this.props.elements} style={{width: '100%', height: '100%'}}/>
            </div>
        );
    }
}

export default GraphCanvas;
