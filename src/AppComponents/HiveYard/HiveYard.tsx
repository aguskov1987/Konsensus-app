import React from "react";
import {Button, Card, FormControl, InputGroup} from "react-bootstrap";
import {AppState} from "../../AppState/AppState";
import {connect} from "react-redux";
import {loadYardStart, searchYard} from "../../AppState/Intercom/YardIntercom";
import {Utility} from "../../Utility";
import {HiveManifest} from "../../ViewModels/HiveManifest";
import HiveCardRow from "../HiveCard/HiveCardRow";
import {openCreateNewHiveAction} from "../../AppState/Actions";

let dispatchers = {loadYardStart, searchYard, openCreateNewHiveAction};
type PropDispatchers = typeof dispatchers;

const mapStateToProps = (state: AppState) => {
    return {
        foundHives: state.foundYardHives
    }
}
type PropValues = ReturnType<typeof mapStateToProps>;

class HiveYard extends React.Component<PropDispatchers & PropValues, any> {
    constructor(props: any) {
        super(props);
        this.searchHives = this.searchHives.bind(this);
        this.updateSearchPhrase = this.updateSearchPhrase.bind(this);
        this.goToCreateNewHive = this.goToCreateNewHive.bind(this);
        this.state = {
            searchPhrase: ''
        }
    }

    componentDidMount() {
        this.props.loadYardStart();
    }

    updateSearchPhrase(event: any) {
        this.setState({
            searchPhrase: event.target.value
        })
    }

    searchHives() {
        this.props.searchYard(this.state.searchPhrase);
    }

    goToCreateNewHive() {
        this.props.openCreateNewHiveAction();
    }

    render() {
        let hiveRows: HiveManifest[][] = Utility.splitArrayIntoGroups<HiveManifest>(this.props.foundHives, 2);
        return (
            <div>
                <InputGroup className="mb-3" size="sm">
                    <FormControl onChange={this.updateSearchPhrase}
                                 placeholder="Search hives"
                                 aria-label="Search hives"
                                 aria-describedby="search hives"
                    />
                    <InputGroup.Append>
                        <Button onClick={this.searchHives} variant="secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Card border="dark" bg="light">
                    <Card.Body style={{height: 600, overflowY: 'scroll'}}>
                        <div>
                            {hiveRows.map((row, idx) => {
                                return (
                                    <HiveCardRow key={idx} items={row}/>
                                )
                            })}
                        </div>
                    </Card.Body>
                </Card>
                <Button variant="secondary" onClick={this.goToCreateNewHive} style={{marginTop: 10}}>
                    Start a new hive
                </Button>
            </div>
        )
    }
}

export default connect(mapStateToProps, dispatchers)(HiveYard);
