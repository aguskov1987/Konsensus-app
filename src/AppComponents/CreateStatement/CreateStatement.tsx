import React from "react";
import {History} from "history";
import {withRouter} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {ActiveHiveState} from "../../AppState/State";
import {Subscription} from "rxjs";

class CreateStatement extends React.Component<any, any> {
    private history: History;
    private newStatementSub: Subscription = new Subscription();

    constructor(props: any) {
        super(props);

        this.history = this.props.history;

        this.onSubmit = this.onSubmit.bind(this);
        this.updateStatement = this.updateStatement.bind(this);
        this.updateLinks = this.updateLinks.bind(this);

        this.state = {
            statement: "",
            links: ""
        }
    }

    componentDidMount() {
        this.setState({
            statement: ActiveHiveState.newStatementText.take()
        });

        this.newStatementSub = ActiveHiveState.subgraph.notifier.subscribe((subgraph) => {
            this.history.push('/');
        })
    }

    onSubmit(event: any) {
        ActiveHiveState.createNewStatement(this.state.statement, []);
        event.preventDefault();
    }

    updateStatement(event: any) {
        this.setState({
            statement: event.target.value
        })
    }

    updateLinks(event: any) {
        this.setState({
            links: event.target.value
        })
    }

    componentWillUnmount() {
        this.newStatementSub.unsubscribe();
    }

    render() {
        return (
            <div style={{padding: 200}}>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="statementInput">
                        <Form.Label style={{color: 'white'}}>Statement</Form.Label>
                        <Form.Control value={this.state.statement? this.state.statement : ''} type="text" onChange={this.updateStatement}/>
                    </Form.Group>
                    <Form.Group controlId="linksInput">
                        <Form.Label style={{color: 'white'}}>Supporting Links</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={this.updateLinks}/>
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(CreateStatement);