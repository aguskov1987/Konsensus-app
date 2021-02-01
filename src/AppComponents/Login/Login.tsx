import React from "react";
import {Button, Form} from "react-bootstrap";
import {loadUserAndLoadHive, loginAndLoadUserAndLoadHive} from "../../AppState/Intercom/UserIntercom";
import {connect} from "react-redux";
import {UserService} from "../../Services/UserService";

// TODO: implement validation for the field
// TODO: implement loading screen
class Login extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.updateUserName = this.updateUserName.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);
    }

    componentDidMount() {
        if (UserService.isJwtValid()) {
            this.props.loadUserAndLoadHive();
        }
    }

    updateUserName(event: any) {
        this.setState({
            username: event.target.value
        })
    }

    updateUserPassword(event: any) {
        this.setState({
            password: event.target.value
        })
    }

    onSubmit(event: any) {
        // TODO: handle wrong credentials
        this.props.loginAndLoadUserAndLoadHive(this.state.username, this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={this.updateUserName}/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.updateUserPassword}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enter
                </Button>
            </Form>
        )
    }
}

export default connect(null, {loginAndLoadUserAndLoadHive, loadUserAndLoadHive})(Login);