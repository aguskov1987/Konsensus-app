import React from "react";
import {ButtonGroup, ToggleButton} from "react-bootstrap";

class GraphControls extends React.Component<any, any> {
    private graphView: any = [
        {name: 'All', value: '1'},
        {name: 'Mine', value: '2'},
    ];

    constructor(props: any) {
        super(props);
        this.state = {
            selectedValue: '1'
        }
    }

    setRadioValue(value: string) {
        this.setState({
            selectedValue: value
        });
    }

    render() {
        return (
            <div style={{padding: 3}}>
                <div style={{float: 'left', marginRight: 20, color: "white"}}>View Responses:</div>
                <ButtonGroup toggle>
                    {this.graphView.map((radio: any, idx: any) => (
                        <ToggleButton size="sm" key={idx} type="radio" variant="secondary" name="graphView"
                                      value={radio.value}
                                      checked={this.state.selectedValue === radio.value}
                                      onChange={(e) => this.setRadioValue(e.currentTarget.value)}>
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </div>
        )
    }
}

export default GraphControls;