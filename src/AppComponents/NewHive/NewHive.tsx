import React from "react";
import {Button, Form} from "react-bootstrap";
import {LoadingStatus} from "../../AppState/LoadingStatus";
import {Subscription} from "rxjs";
import {NewHiveState} from "../../AppState/State";
import {History} from "history";
import {withRouter} from "react-router-dom";

// TODO: add validation
class NewHive extends React.Component<any, { title: string, description: string }> {
    private newHiveStatusSub: Subscription = new Subscription();
    private history: History;

    constructor(props: any) {
        super(props);

        this.history = this.props.history;

        this.onSubmit = this.onSubmit.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);

        this.state = {
            title: "",
            description: ""
        }
    }

    componentDidMount() {
        this.newHiveStatusSub = NewHiveState.newHive.status.subscribe((status: LoadingStatus) => {
            if (status === LoadingStatus.Loaded) {
                this.history.push('/');
            }
        })
    }

    onSubmit(event: any) {
        NewHiveState.createNewHive(this.state.title, this.state.description);
        event.preventDefault();
    }

    updateTitle(event: any) {
        this.setState({
            title: event.target.value
        })
    }

    updateDescription(event: any) {
        this.setState({
            description: event.target.value
        })
    }

    componentWillUnmount() {
        this.newHiveStatusSub.unsubscribe();
    }

    render() {
        return (
            <div style={{padding: 200}}>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="titleInput">
                        <Form.Label style={{color: 'white'}}>Title</Form.Label>
                        <Form.Control type="text" onChange={this.updateTitle}/>
                    </Form.Group>
                    <Form.Group controlId="descriptionInput">
                        <Form.Label style={{color: 'white'}}>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={this.updateDescription}/>
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(NewHive);