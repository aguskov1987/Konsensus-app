import React from "react";
import {Button, Card, FormControl, InputGroup} from "react-bootstrap";
import HiveCardComponent from "../HiveCard/HiveCardComponent";
import {History} from "history";
import {withRouter} from "react-router-dom";
import TitleBarComponent from "../TitleBar/TitleBarComponent";

class HiveYardComponent extends React.Component<any, any> {
    private history: History;
    constructor(props: any) {
        super(props);

        this.history = this.props.history;

        this.searchHives = this.searchHives.bind(this);
        this.updateSearchPhrase = this.updateSearchPhrase.bind(this);

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
        });
    }

    searchHives() {
        // this.props.searchYard(this.state.searchPhrase);
    }

    render() {
        return (
            <div style={{padding: 20, height: '100%', position: 'relative'}}>
                <TitleBarComponent title='Yard' icon='Images/Navigation/YardIcon.svg'/>
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
                <Card border="primary" bg="light" style={{height: '86%'}}>
                    <Card.Body>
                        <div>
                            {this.state.hives.map((hive, idx) => {
                                return (
                                    <HiveCardComponent key={idx} manifest={hive}/>
                                )
                            })}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default withRouter(HiveYardComponent);
