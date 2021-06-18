import React from "react";
import {Button, ButtonGroup, Card} from "react-bootstrap";
import {History} from "history";
import {withRouter} from "react-router-dom";
import HiveCardComponent from "../HiveCard/HiveCardComponent";
import TitleBarComponent from "../TitleBar/TitleBarComponent";

class MyHivesComponent extends React.Component<any, any> {
    private history: History;

    constructor(props: any) {
        super(props);

        this.history = props.history;
        this.state = {
            hives: []
        }
    }

    componentDidMount() {
        // this.props.loadUserSavedHives();
    }

    render() {
        return (
            <div style={{padding: 20, height: '100%', position: 'relative'}}>
                <TitleBarComponent title='My Hives' icon='Images/my_saved_hives.svg'/>
                <Card border="primary" bg="light" style={{height: '85%', marginBottom: '1%'}}>
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

export default withRouter(MyHivesComponent);