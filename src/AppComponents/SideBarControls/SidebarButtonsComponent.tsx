import React from "react";
import {Button, Image} from "react-bootstrap";
import {History} from "history";
import {withRouter} from "react-router-dom";
import {ActiveHiveState, UserState} from "../../AppState/State";
import {User} from "../../AppState/User";
import {Subscription} from "rxjs";

class SidebarButtonsComponent extends React.Component<any, any> {
    private history: History;
    private sub: Subscription = new Subscription();

    constructor(props: any) {
        super(props);
        this.history = props.history;

        this.state = {
            navigationDisabled: true
        }

        this.openSavedPoints = this.openSavedPoints.bind(this);
        this.leaveApp = this.leaveApp.bind(this);
        this.openSavedHives = this.openSavedHives.bind(this);
        this.openYard = this.openYard.bind(this);
        this.openNewHive = this.openNewHive.bind(this);
    }

    componentDidMount() {
        this.sub = UserState.user.valueUpdatedEvent.subscribe((user: User) => {
            if (!user) {
                return;
            }

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

    openSavedPoints() {
        this.checkIfLeavingGraphArea();
        this.history.push('/saved-point');
    }

    leaveApp() {
        console.log("exiting...")
    }

    openYard() {
        this.checkIfLeavingGraphArea();
        this.history.push('/yard');
    }

    openNewHive() {
        this.checkIfLeavingGraphArea();
        this.history.push('/new-hive');
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
                        <Image src="Images/Navigation/YardIcon.svg"/>
                    </Button>{' '}
                </div>
                <div style={{margin: 6}}>
                    <Button block variant="primary" size={'lg'} onClick={this.openSavedHives} disabled={this.state.navigationDisabled}>
                        <Image src="Images/Navigation/MyHivesIcon.svg"/>
                    </Button>{' '}
                </div>
                <div style={{margin: 6}}>
                    <Button block variant="primary" size={'lg'} onClick={this.openSavedPoints} disabled={this.state.navigationDisabled}>
                        <Image src="Images/Navigation/MyPointsIcon.svg"/>
                    </Button>{' '}
                </div>
                <div style={{margin: 6}}>
                    <Button block variant="primary" size={'lg'} onClick={this.openNewHive} disabled={this.state.navigationDisabled}>
                        <Image src="Images/Navigation/NewHiveIcon.svg"/>
                    </Button>{' '}
                </div>
                <div style={{margin: 6}}>
                    <Button block variant="danger" size={'lg'} onClick={this.leaveApp} disabled={this.state.navigationDisabled}>
                        <Image src="Images/Navigation/ExitIcon.svg"/>
                    </Button>{' '}
                </div>
                <div style={{margin: 6}}>
                    <Button block variant="outline-info" size={'lg'} disabled={this.state.navigationDisabled}>
                        <Image src="Images/Navigation/HelpIcon.svg"/>
                    </Button>{' '}
                </div>
            </div>
        )
    }
}

export default withRouter(SidebarButtonsComponent);
