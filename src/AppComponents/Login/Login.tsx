import React from "react";
import {Button, Form} from "react-bootstrap";
import {UserService} from "../../Services/UserService";
import {withRouter} from "react-router-dom";
import {History} from "history";
import {AxiosError} from "axios";

type ComponentState = {username: string, password: string};

// TODO: implement validation for the field
// TODO: implement loading screen
class Login extends React.Component<any, ComponentState> {
    private history: History;

    constructor(props: any) {
        super(props);
        this.history = props.history;

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
            this.history.push('/');
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
        UserService.login(this.state.username, this.state.password).then((token) => {
            UserService.saveJwt(token.data);
            this.history.push('/');
        }).catch((error: AxiosError) => {
            console.log(error);
        });
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} style={{padding: 500, paddingTop: 100}}>
                <Form.Group controlId="formUser">
                    <Form.Label style={{color: 'white'}}>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={this.updateUserName}/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label style={{color: 'white'}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.updateUserPassword}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enter
                </Button>
            </Form>
        )
    }
}

export default withRouter(Login);