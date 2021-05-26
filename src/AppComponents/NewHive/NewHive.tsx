import React from "react";
import {Button, Form} from "react-bootstrap";

// TODO: add validation
class NewHive extends React.Component<any, { title: string, description: string }> {
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);

        this.state = {
            title: "",
            description: ""
        }
    }

    onSubmit(event: any) {
        this.props.initNCreateNewHiveAction();
        this.props.postNewHive(this.state.title, this.state.description);
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

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="titleInput">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" onChange={this.updateTitle}/>
                    </Form.Group>
                    <Form.Group controlId="descriptionInput">
                        <Form.Label>Description</Form.Label>
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

export default NewHive;