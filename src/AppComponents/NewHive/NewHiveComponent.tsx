import React from "react";
import {Button, Form} from "react-bootstrap";
import {LoadingStatus} from "../../AppState/LoadingStatus";
import {Subscription} from "rxjs";
import {History} from "history";
import {withRouter} from "react-router-dom";
import TitleBarComponent from "../TitleBar/TitleBarComponent";
import {NewHiveState} from "../../AppState/NewHiveState";

// TODO: add validation
class NewHiveComponent extends React.Component<any, { title: string, description: string }> {
    private newHiveStatusSub: Subscription = new Subscription();
    private history: History;
    private inputRef: any;

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
        this.newHiveStatusSub = NewHiveState.newHive.statusUpdatedEvent.subscribe((status: LoadingStatus) => {
            if (status === LoadingStatus.Loaded) {
                this.history.push('/');
            }
        });
        this.inputRef.focus();
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
            <div style={{padding: 20}}>
                <TitleBarComponent title='New Hive' icon='Images/new_hive.svg'/>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="titleInput">
                        <Form.Label style={{color: 'white'}}>Title</Form.Label>
                        <Form.Control type="text" onChange={this.updateTitle} ref={c => (this.inputRef = c)}/>
                    </Form.Group>
                    <Form.Group controlId="descriptionInput">
                        <Form.Label style={{color: 'white'}}>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} onChange={this.updateDescription}/>
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(NewHiveComponent);