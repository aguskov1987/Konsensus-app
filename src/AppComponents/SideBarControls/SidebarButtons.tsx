import React from "react";
import {Button, Image} from "react-bootstrap";
import {History} from "history";
import {withRouter} from "react-router-dom";
import {ActiveHiveState} from "../../AppState/State";

class SidebarButtons extends React.Component<any, any> {
    private history: History;

    constructor(props: any) {
        super(props);
        this.history = props.history;

        this.openSavedStatements = this.openSavedStatements.bind(this);
        this.leaveApp = this.leaveApp.bind(this);
        this.openSavedHives = this.openSavedHives.bind(this);
        this.openYard = this.openYard.bind(this);
    }

    openSavedHives() {
        this.checkIfLeavingGraphArea();
        this.history.push('/saved-hives');
    }

    openSavedStatements() {
        this.checkIfLeavingGraphArea();
        this.history.push('/saved-statements');
    }

    leaveApp() {
        console.log("exiting...")
    }

    openYard() {
        this.checkIfLeavingGraphArea();
        this.history.push('/yard');
    }

    private checkIfLeavingGraphArea() {
        if (this.history.location.pathname === '/') {
            ActiveHiveState.notifyOfLeavingGraphArea();
        }
    }

    render() {
        return (
            <div>
                <div style={{margin: 6}}>
                    <Button block variant="primary" size={'lg'} onClick={this.openYard}>
                        <Image src="Images/yard_button.svg"/>
                    </Button>{' '}
                </div>
                <div style={{margin: 6}}>
                    <Button block variant="primary" size={'lg'} onClick={this.openSavedHives}>
                        <Image src="Images/my_saved_hives.svg"/>
                    </Button>{' '}
                </div>
                <div style={{margin: 6}}>
                    <Button block variant="primary" size={'lg'} onClick={this.openSavedStatements}>
                        <Image src="Images/my_saved_statements.svg"/>
                    </Button>{' '}
                </div>
                <div style={{margin: 6}}>
                    <Button block variant="danger" size={'lg'} onClick={this.leaveApp}>
                        <Image src="Images/exit_button.svg"/>
                    </Button>{' '}
                </div>
            </div>
        )
    }
}

export default withRouter(SidebarButtons);
