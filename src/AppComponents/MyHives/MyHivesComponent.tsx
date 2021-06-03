import React from "react";
import {Button, ButtonGroup, Card} from "react-bootstrap";
import {History} from "history";
import {withRouter} from "react-router-dom";
import HiveCardComponent from "../HiveCard/HiveCardComponent";

class MyHivesComponent extends React.Component<any, any> {
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
                <Card border="primary" bg="light" style={{height: '93%'}}>
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
                <ButtonGroup  style={{bottom: 20, position: 'absolute'}}>
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

export default withRouter(MyHivesComponent);