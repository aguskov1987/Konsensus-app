import React from "react";
import {Button, Image} from "react-bootstrap";
import {connect} from "react-redux";
import {openMyHivesAction, openSavedStatementsAction} from "../../AppState/Actions";

class SidebarButtons extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.openSavedStatements = this.openSavedStatements.bind(this);
        this.leaveApp = this.leaveApp.bind(this);
        this.openSavedHives = this.openSavedHives.bind(this);
    }

    openSavedHives() {
        this.props.openMyHivesAction();
    }

    openSavedStatements() {
        this.props.openSavedStatementsAction();
    }

    leaveApp() {
        console.log("exiting...")
    }

    openYard() {
        console.log("open yard");
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

export default connect(null, {openSavedStatementsAction, openMyHivesAction})(SidebarButtons);
