import React from "react";
import {Button, Image} from "react-bootstrap";
import {History} from "history";
import {withRouter} from "react-router-dom";
import {ActiveHiveState, UserState} from "../../AppState/State";
import {User} from "../../AppState/User";
import {Subscription} from "rxjs";

class SidebarButtons extends React.Component<any, any> {
    private history: History;
    private sub: Subscription = new Subscription();

    constructor(props: any) {
        super(props);
        this.history = props.history;

        this.state = {
            navigationDisabled: true
        }

        this.openSavedStatements = this.openSavedStatements.bind(this);
        this.leaveApp = this.leaveApp.bind(this);
        this.openSavedHives = this.openSavedHives.bind(this);
        this.openYard = this.openYard.bind(this);
    }

    componentDidMount() {
        this.sub = UserState.user.notifier.subscribe((user: User) => {
            if (user.id !== '') {
                this.setState({
                    navigationDisabled: false
                })
            }
        });
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
            console.log('leaving graph area...')
            ActiveHiveState.graphStash.stash();
        }
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }

    render() {
        return (
            <div>
                <div style={{margin: 6}}>
                    <Button block variant="primary" size={'lg'} onClick={this.openYard} disabled={this.state.navigationDisabled}>
                        <Image src="Images/yard_button.svg"/>
                    </Button>{' '}
                </div>
                <div style={{margin: 6}}>
                    <Button block variant="primary" size={'lg'} onClick={this.openSavedHives} disabled={this.state.navigationDisabled}>
                        <Image src="Images/my_saved_hives.svg"/>
                    </Button>{' '}
                </div>
                <div style={{margin: 6}}>
                    <Button block variant="primary" size={'lg'} onClick={this.openSavedStatements} disabled={this.state.navigationDisabled}>
                        <Image src="Images/my_saved_statements.svg"/>
                    </Button>{' '}
                </div>
                <div style={{margin: 6}}>
                    <Button block variant="danger" size={'lg'} onClick={this.leaveApp} disabled={this.state.navigationDisabled}>
                        <Image src="Images/exit_button.svg"/>
                    </Button>{' '}
                </div>
            </div>
        )
    }
}

export default withRouter(SidebarButtons);
