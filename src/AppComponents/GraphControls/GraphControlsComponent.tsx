import React from "react";
import {Button, ButtonGroup, Dropdown, DropdownButton, Image, ToggleButton} from "react-bootstrap";
import Hint, {HintType} from "./Hint";
import {ButtonCommand} from "../../AppState/ButtonCommand";
import {ResponseView} from "../../AppState/ResponseView";
import {HiveLayout} from "../../AppState/HiveLayout";
import {HiveOperationsState} from "../../AppState/HiveOperationsState";

class GraphControlsComponent extends React.Component<any, any> {
    private graphView: any = [
        {name: 'Mine', value: '1'},
        {name: 'All', value: '2'},
    ];

    constructor(props: any) {
        super(props);
        this.state = {
            view: '1',
            layout: '#Cola',
            hint: HintType
        }
    }

    setResponseView(value: string) {
        HiveOperationsState.responseView.updateOption(value === '1' ? ResponseView.Mine : ResponseView.Common);
        this.setState({
            view: value
        });
    }

    setLayout(value: string | null) {
        let layout: HiveLayout;
        switch (value) {
            case '#Cola':
                layout = HiveLayout.Cola;
                break;
            case '#COSE':
                layout = HiveLayout.Cose;
                break;
            case '#Grid':
                layout = HiveLayout.Grid;
                break;
            case '#Concentric':
                layout = HiveLayout.Concentric;
                break;
            case '#CircleSpring':
                layout = HiveLayout.CircularSpring;
                break;
            default:
                layout = HiveLayout.Cola;
                break;
        }
        HiveOperationsState.layout.updateOption(layout);
        this.setState({
            layout: value
        });
    }

    setHint(hint: HintType) {
        this.setState({
            hint: hint
        });
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
                    <Dropdown.Item href="#Cola">Cola</Dropdown.Item>
                    <Dropdown.Item href="#COSE">Cose</Dropdown.Item>
                    <Dropdown.Item href="#Grid">Grid</Dropdown.Item>
                    <Dropdown.Item href="#Concentric">Concentric</Dropdown.Item>
                    <Dropdown.Item href="#CircleSpring">Circle Spring</Dropdown.Item>
                </DropdownButton>
                <ButtonGroup toggle>
                    {this.graphView.map((radio: any, idx: any) => (
                        <ToggleButton size="sm" key={idx} type="radio" variant="secondary" name="graphView"
                                      value={radio.value}
                                      checked={this.state.view === radio.value}
                                      onChange={(e) => this.setResponseView(e.currentTarget.value)}>
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                <span style={{marginRight: 10}}/>
                <ButtonGroup aria-label="Zoom, pan, select and connect points and synapses">
                    <Button size="sm" variant="secondary" onFocus={() => this.setHint(HintType.Zoom)}
                            onKeyDown={(event) => {this.processZoom(event)}} onBlur={() => this.setHint(HintType.None)}>
                        <Image width={15} src="Images/zoom_icon.svg"/>
                    </Button>
                    <Button size="sm" variant="secondary" onFocus={() => this.setHint(HintType.Pan)}
                            onKeyDown={(event) => {this.processPan(event)}} onBlur={() => this.setHint(HintType.None)}>
                        <Image width={15} src="Images/pan_icon.svg"/>
                    </Button>
                    <Button size="sm" variant="secondary" onFocus={() => this.setHint(HintType.Selection)}
                            onKeyDown={(event) => {this.processSelection(event)}} onBlur={() => this.setHint(HintType.None)}>
                        <Image width={15} src="Images/select_icon.svg"/>
                    </Button>
                </ButtonGroup>
            </div>
        )
    }

    private processZoom(event: React.KeyboardEvent<HTMLElement>) {
        if (event.key === 'ArrowUp') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.ZoomIn);
        } else if (event.key === 'ArrowDown') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.ZoomOut);
        }
    }

    private processPan(event: React.KeyboardEvent<HTMLElement>) {
        if (event.key === 'ArrowUp') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.PanUp);
        } else if (event.key === 'ArrowDown') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.PanDown);
        } else if (event.key === 'ArrowLeft') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.PanLeft);
        } else if (event.key === 'ArrowRight') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.PanRight);
        }
    }

    private processSelection(event: React.KeyboardEvent<HTMLElement>) {
        if (event.key === 'a') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.Agree);
        } else if (event.key === 'd') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.Disagree);
        } else if (event.key === 'e') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.MarkAsTo);
        } else if (event.key === 'c') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.MarkAsFrom);
        }else if (event.key === 'q') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.Discard);
        } else if (event.key === 'ArrowUp') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.SelectNextPoint);
        } else if (event.key === 'ArrowDown') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.SelectPreviousPoint);
        } else if (event.key === 'ArrowLeft') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.SelectPreviousSynapse);
        } else if (event.key === 'ArrowRight') {
            HiveOperationsState.lastButtonCommand.next(ButtonCommand.SelectNextSynapse);
        }
    }
}

export default GraphControlsComponent;