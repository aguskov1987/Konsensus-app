import React from "react";
import {Button, Card, FormControl, InputGroup} from "react-bootstrap";
import HiveManifestCard from "../HiveCard/HiveManifestCard";

class HiveYard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.searchHives = this.searchHives.bind(this);
        this.updateSearchPhrase = this.updateSearchPhrase.bind(this);
        this.goToCreateNewHive = this.goToCreateNewHive.bind(this);

        this.state = {
            searchPhrase: '',
            hives: []
        }
    }

    componentDidMount() {
        // this.props.loadYardStart();
    }

    updateSearchPhrase(event: any) {
        this.setState({
            searchPhrase: event.target.value
        })
    }

    searchHives() {
        // this.props.searchYard(this.state.searchPhrase);
    }

    goToCreateNewHive() {
        // this.props.openCreateNewHiveAction();
    }

    render() {
        return (
            <div style={{padding: 20, height: '100%', position: 'relative'}}>
                <InputGroup className="mb-3" size="sm">
                    <FormControl onChange={this.updateSearchPhrase}
                                 placeholder="Search hives"
                                 aria-label="Search hives"
                                 aria-describedby="search hives"
                    />
                    <InputGroup.Append>
                        <Button variant="secondary">Search</Button>
                        <Button variant="secondary">Home</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Card border="primary" bg="light" style={{height: '88%'}}>
                    <Card.Body>
                        <div>
                            {this.state.hives.map((hive, idx) => {
                                return (
                                    <HiveManifestCard key={idx} manifest={hive}/>
                                )
                            })}
                        </div>
                    </Card.Body>
                </Card>
                <Button variant="secondary" onClick={this.goToCreateNewHive} style={{bottom: 10, position: 'absolute'}}>
                    Start a new hive
                </Button>
            </div>
        )
    }
}

export default HiveYard;
