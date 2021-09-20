import React from "react";
import {Button, ButtonGroup, Dropdown, DropdownButton, Image, ToggleButton} from "react-bootstrap";
import {Subscription} from "rxjs";
import {ActiveHiveState} from "../../AppState/ActiveHiveState";
import {ButtonCommand} from "../../AppState/ButtonCommand";
import {HiveLayout} from "../../AppState/HiveLayout";
import {HiveOperationsState} from "../../AppState/HiveOperationsState";
import {ResponseView} from "../../AppState/ResponseView";
import Hint, {HintType} from "./Hint";

class GraphControlsComponent extends React.Component<any, any> {
    private graphView: any = [
        {name: 'Mine', value: '1'},
        {name: 'All', value: '2'},
    ];
    private lastItemSub: Subscription = new Subscription();

    constructor(props: any) {
        super(props);
        this.state = {
            view: '1',
            layout: HiveLayout.Cola,
            hint: HintType,
            canUndo: false
        }
    }

    componentDidMount() {
        ActiveHiveState.lastAddedItem.valueUpdatedEvent.subscribe((item) => {
            if (item == null) {
                return;
            }

            this.setState({
                canUndo: item.itemStamp !== ''
            });
        })
    }

    componentWillUnmount() {
        ActiveHiveState.lastAddedItem.restartListener();
        this.lastItemSub.unsubscribe();
    }

    setResponseView(value: string) {
        HiveOperationsState.responseView.updateOption(value === '1' ? ResponseView.Mine : ResponseView.Common);
        this.setState({
            view: value
        });
    }

    setLayout(value: string | null) {
        if (value != null) {
            let layout: HiveLayout = (HiveLayout as any)[value.slice(1)];
            HiveOperationsState.layout.updateOption(layout);
            this.setState({
                layout: value
            });
        }
    }

    setHint(hint: HintType) {
        this.setState({
            hint: hint
        });
    }

    render() {
        return (
            <div style={{padding: 10, backgroundColor: '#414141', position: "relative", borderTop: '1px solid white'}}>
                <Hint type={this.state.hint}/>
                <span style={{marginRight: 10}}/>
                <DropdownButton id="layout-selection" size="sm" style={{float: 'left'}}
                                title={(this.state.layout as string).includes('#') ? (this.state.layout as string).slice(1) : this.state.layout as string}
                                onSelect={(s) => {this.setLayout(s)}}>
                    <Dropdown.Item href="#Cola">Cola</Dropdown.Item>
                    <Dropdown.Item href="#Cose">Cose</Dropdown.Item>
                    <Dropdown.Item href="#Grid">Grid</Dropdown.Item>
                    <Dropdown.Item href="#Concentric">Concentric</Dropdown.Item>
                    <Dropdown.Item href="#Klay">Klay</Dropdown.Item>
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
                            onKeyDown={(event) => {
                                this.processZoom(event)
                            }} onBlur={() => this.setHint(HintType.None)}>
                        <Image width={15} src="Images/Operations/zoom_icon.svg"/>
                    </Button>
                    <Button size="sm" variant="secondary" onFocus={() => this.setHint(HintType.Pan)}
                            onKeyDown={(event) => {
                                this.processPan(event)
                            }} onBlur={() => this.setHint(HintType.None)}>
                        <Image width={15} src="Images/Operations/pan_icon.svg"/>
                    </Button>
                    <Button size="sm" variant="secondary" onFocus={() => this.setHint(HintType.Selection)}
                            onKeyDown={(event) => {
                                this.processSelection(event)
                            }} onBlur={() => this.setHint(HintType.None)}>
                        <Image width={15} src="Images/Operations/select_icon.svg"/>
                    </Button>
                </ButtonGroup>
                <span style={{marginRight: 10}}/>
                <Button size="sm" variant="secondary" disabled={!this.state.canUndo} onClick={() => ActiveHiveState.tryDeleteLastItem()}>
                    <Image width={15} src="Images/Operations/undoIcon.svg"/>
                </Button>
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
        } else if (event.key === 'q') {
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
