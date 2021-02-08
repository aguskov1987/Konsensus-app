import React from 'react';
import CytoscapeComponent from "react-cytoscapejs";
import {Core, Layouts} from "cytoscape";
import FeedbackBar from "../FeedbackBar/FeedbackBar";
import {AppState} from "../../AppState/AppState";
import {connect} from "react-redux";
import * as chroma from 'chroma.ts';

const mapStateToProps = (state: AppState) => {
    return {
        graph: state.lastLoadedSubGraph
    }
}

type PropValues = ReturnType<typeof mapStateToProps>;

let cyRef: Core;

class GraphCanvas extends React.Component<PropValues, any> {
    constructor(props: PropValues) {
        super(props);
        this.state = {
            selectedStatement: undefined,
            selectedEffect: undefined
        };
    }

    componentDidMount() {
        cyRef.on('tap', (event) => {
            if (event.target === cyRef) {
                // ignore
            } else  if (event.target.isNode()) {
                this.setState({
                    selectedEffect: undefined,
                    selectedStatement: event.target.data()
                })
            } else if (event.target.isEdge()) {
                this.setState({
                    selectedEffect: event.target.data(),
                    selectedStatement: undefined
                })
            }
        })
    }

    static getDerivedStateFromProps(props: PropValues, state: any) {
        if (cyRef != null) {
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

            // let layout: Layouts = cyRef.layout({name: "cose"});
            // layout.run();
        }
        return null;
    }

    render() {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <FeedbackBar/>
                <div style={{backgroundColor: '#2b2b2b', color: 'white', padding: 7, minHeight: 40}}>
                    {this.state.selectedStatement?.label}
                </div>
                <CytoscapeComponent
                    cy={(cy) => cyRef = cy}
                    elements={[]}
                    style={{width: '100%', height: 'calc(100% - 5px)'}}
                    stylesheet={[
                        {
                            selector: 'node',
                            style: {
                                'width': 120,
                                'height': 70,
                                'shape': 'rectangle',
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
                                'curve-style': 'bezier',
                                'target-arrow-shape': 'triangle',
                                'line-color': 'data(c)',
                                'target-arrow-color': 'data(c)'
                            }
                        },
                        {
                            selector: 'edge:selected',
                            style: {
                                width: 5,
                                'curve-style': 'bezier',
                                'target-arrow-shape': 'triangle',
                                'line-color': 'white',
                                'target-arrow-color': 'white'
                            }
                        }
                    ]}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, {})(GraphCanvas);
