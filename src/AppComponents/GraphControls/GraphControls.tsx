import React from "react";
import {Button, ButtonGroup, Dropdown, DropdownButton, Image, ToggleButton} from "react-bootstrap";
import Hint, {HintType} from "./Hint";

class GraphControls extends React.Component<any, any> {
    private graphView: any = [
        {name: 'All', value: '1'},
        {name: 'Mine', value: '2'},
    ];

    constructor(props: any) {
        super(props);
        this.state = {
            view: '1',
            layout: '#Random',
            hint: HintType
        }
    }

    setRadioValue(value: string) {
        this.setState({
            view: value
        });
    }

    setLayout(value: string | null) {
        this.setState({
            layout: value
        })

    }

    setHint(hint: HintType) {
        this.setState({
            hint: hint
        })
    }

    render() {
        return (
            <div style={{padding: 10, backgroundColor: '#414141', position: "relative"}}>
                <Hint type={this.state.hint}/>
                <span style={{marginRight: 10}}/>
                <DropdownButton id="layout-selection"
                                title={(this.state.layout as string).slice(1)}
                                size="sm"
                                style={{float: 'left'}}
                                onSelect={(s) => {
                                    this.setLayout(s)
                                }}>
                    <Dropdown.Item href="#Random">Random</Dropdown.Item>
                    <Dropdown.Item href="#COSE">COSE</Dropdown.Item>
                    <Dropdown.Item href="#Radial">Radial</Dropdown.Item>
                </DropdownButton>
                <ButtonGroup toggle>
                    {this.graphView.map((radio: any, idx: any) => (
                        <ToggleButton size="sm" key={idx} type="radio" variant="secondary" name="graphView"
                                      value={radio.value}
                                      checked={this.state.view === radio.value}
                                      onChange={(e) => this.setRadioValue(e.currentTarget.value)}>
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                <span style={{marginRight: 10}}/>
                <ButtonGroup aria-label="Zoom, pan, select and connect statements and effects">
                    <Button size="sm" variant="secondary" onFocus={() => this.setHint(HintType.Zoom)}
                            onBlur={() => this.setHint(HintType.None)}>
                        <Image width={15} src="Images/zoom_icon.svg"/>
                    </Button>
                    <Button size="sm" variant="secondary" onFocus={() => this.setHint(HintType.Pan)}
                            onBlur={() => this.setHint(HintType.None)}>
                        <Image width={15} src="Images/pan_icon.svg"/>
                    </Button>
                    <Button size="sm" variant="secondary" onFocus={() => this.setHint(HintType.Selection)}
                            onBlur={() => this.setHint(HintType.None)}>
                        <Image width={15} src="Images/select_icon.svg"/>
                    </Button>
                </ButtonGroup>
            </div>
        )
    }
}

export default GraphControls;