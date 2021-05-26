import React from "react";
import {Button, ButtonGroup, Card, CardDeck} from "react-bootstrap";
import {HiveManifest} from "../../AppState/HiveManifest";
import {History} from "history";
import {withRouter} from "react-router-dom";
import HiveManifestCard from "../HiveCard/HiveManifestCard";

// TODO: REFACTOR!
class MyHives extends React.Component<any, any> {
    private history: History;

    constructor(props: any) {
        super(props);

        this.history = props.history;
        this.state = {
            hives: []
        }

        this.goToYard = this.goToYard.bind(this);
        this.goToCreateNewHive = this.goToCreateNewHive.bind(this);
    }

    componentDidMount() {
        // this.props.loadUserSavedHives();
    }

    goToYard() {
        this.history.push('/yard');
    }

    goToCreateNewHive() {
        this.history.push('/new-hive');
    }

    render() {
        return (
            <div style={{padding: 20, height: '100%', position: 'relative'}}>
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
                <ButtonGroup  style={{bottom: 10, position: 'absolute'}}>
                    <Button variant="secondary" onClick={this.goToCreateNewHive}>
                        Start New Hive
                    </Button>
                    <Button variant="secondary" onClick={this.goToYard}>
                        Go to Yard
                    </Button>
                </ButtonGroup >
            </div>
        )
    }
}


export default withRouter(MyHives);