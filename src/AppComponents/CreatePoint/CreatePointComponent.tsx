import React from "react";
import {History} from "history";
import {withRouter} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {ActiveHiveState} from "../../AppState/State";
import {Subscription} from "rxjs";

class CreatePointComponent extends React.Component<any, any> {
    private history: History;
    private newPointSub: Subscription = new Subscription();

    constructor(props: any) {
        super(props);

        this.history = this.props.history;

        this.onSubmit = this.onSubmit.bind(this);
        this.updatePoint = this.updatePoint.bind(this);
        this.updateLinks = this.updateLinks.bind(this);

        this.state = {
            point: "",
            links: ""
        }
    }

    componentDidMount() {
        this.setState({
            point: ActiveHiveState.newPointText.take()
        });

        this.newPointSub = ActiveHiveState.subgraph.valueUpdatedEvent.subscribe((subgraph) => {
            this.history.push('/');
        })
    }

    onSubmit(event: any) {
        ActiveHiveState.createNewPoint(this.state.point, []);
        event.preventDefault();
    }

    updatePoint(event: any) {
        this.setState({
            point: event.target.value
        })
    }

    updateLinks(event: any) {
        this.setState({
            links: event.target.value
        })
    }

    componentWillUnmount() {
        this.newPointSub.unsubscribe();
    }

    render() {
        return (
            <div style={{padding: 200}}>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="pointInput">
                        <Form.Label style={{color: 'white'}}>Point</Form.Label>
                        <Form.Control value={this.state.point? this.state.point : ''} type="text" onChange={this.updatePoint}/>
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

export default withRouter(CreatePointComponent);