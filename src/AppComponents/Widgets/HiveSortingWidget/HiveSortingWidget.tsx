import React from "react";
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import {YardState} from "../../../AppState/YardState";
import {HiveSorting} from "../../../AppState/HiveSorting";

class HiveSortingWidget extends React.Component<any, any> {
    private sortingOptions = [
        {name: 'Activity', value: HiveSorting.ByActivity},
        {name: 'Point Count', value: HiveSorting.ByPointCount},
        {name: 'Date', value: HiveSorting.ByDate},
    ];

    constructor(props: any) {
        super(props);

        this.updateSorting = this.updateSorting.bind(this);
        this.state = {sortBy: HiveSorting.ByActivity}
    }

    updateSorting(value) {
        this.setState({
            sortBy: value
        });
        YardState.hiveSorting.updateOption(value);
    }

    render() {
        return (
            <React.Fragment>
                <span style={{marginRight: 10}}>Sort by:</span>
                <ButtonGroup toggle size='sm'>
                    {
                        this.sortingOptions.map((sort, idx) => {
                            return (
                                <ToggleButton key={idx} type="radio" variant="outline-secondary"
                                              name="radio" value={sort.value}
                                              checked={this.state.sortBy === sort.value}
                                              onChange={(e) => this.updateSorting(e.currentTarget.value)}>
                                    {sort.name}
                                </ToggleButton>
                            )
                        })
                    }
                </ButtonGroup>
            </React.Fragment>
        );
    }
}

export default HiveSortingWidget;