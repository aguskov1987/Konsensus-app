import React from 'react';
import CytoscapeComponent from "react-cytoscapejs";
import {Core, Layouts} from "cytoscape";
import GraphControls from "../GraphControls/GraphControls";

let cyRef: Core;

// region Graph Styles
    let style: any = [
        {
            selector: 'node',
            style: {
                'width': 120,
                'height': 50,
                'shape': 'roundrectangle',
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
                'border-width': 4,
                'background-color': 'data(c)',
                'border-color': '#ffffff',
            }
        },
        {
            selector: 'edge',
            style: {
                width: 5,
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
        }
    ];
// endregion

class GraphCanvas extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedLabel: undefined
        };
        this.updateDatum = this.updateDatum.bind(this);
    }

    updateDatum(id: string) {
        // this.props.datumUpdatedAction(id);
    }

    componentDidMount() {
        cyRef.on('tap', (event) => {
            if (event.target === cyRef) {
                // ignore
            } else  if (event.target.isNode()) {
                this.updateDatum(event.target.data().id);
                this.setState({
                    selectedLabel: event.target.data().label
                })
            } else if (event.target.isEdge()) {
                let s = event.target.source();
                let t = event.target.target();
                this.setState({
                    selectedLabel: s.data().label + ' -> ' + t.data().label
                })
            }
        })
    }

    /*static getDerivedStateFromProps(props: any, state: any) {
        console.log(props);
        if (cyRef != null) {
            let firstLoad = cyRef.elements().length === 0;

            for (let s of props.graph.statements) {
                if (cyRef.getElementById(s.id).length > 0) {
                    continue;
                }
                cyRef.add({
                    data: {
                        id: s.id,
                        label: s.label,
                        c: 'green'
                    }
                })
            }

            for (let e of props.graph.effects) {
                if (cyRef.getElementById(e.id).length > 0) {
                    continue;
                }
                cyRef.add({
                    data: {
                        id: e.id,
                        source: e.source,
                        target: e.target,
                        c: 'green'
                    }
                })
            }

            if (firstLoad) {
                let layout: Layouts = cyRef.layout({name: "cose"});
                layout.on('layoutstop', () => {
                    let activeStatement: any = cyRef.getElementById(props.graph.datum.id)[0];
                    activeStatement.select();

                    cyRef.animate({
                        fit: {
                            eles: activeStatement,
                            padding: 300
                        }
                    }, {
                        duration: 300
                    });
                });
                layout.run();
            } else {
                cyRef.elements().unselect();
                let activeStatement: any = cyRef.getElementById(props.graph.datum.id)[0];
                activeStatement.select();

                cyRef.animate({
                    fit: {
                        eles: activeStatement,
                        padding: 300
                    }
                }, {
                    duration: 300
                });
            }
        }
        return null;
    }*/

    render() {
        return (
            <div style={{width: '100%', height: 'calc(100% - 50px)'}}>
                <div style={{backgroundColor: '#2b2b2b', color: 'white', padding: 7, minHeight: 40}}>
                    {this.state.selectedLabel}
                </div>
                <CytoscapeComponent
                    cy={(cy) => cyRef = cy}
                    elements={[]}
                    style={{width: '100%', height: 'calc(100% - 91px)'}}
                    stylesheet={style}/>
                <GraphControls/>
            </div>
        );
    }
}

export default GraphCanvas;
