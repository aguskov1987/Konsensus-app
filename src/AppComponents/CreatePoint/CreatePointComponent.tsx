import React from "react";
import {History} from "history";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {Button, Form, Modal} from "react-bootstrap";
import {Subscription} from "rxjs";
import {ActiveHiveState} from "../../AppState/ActiveHiveState";

interface CretePointProps {
    showDialog: boolean;
    fromId: string;
    toId: string;
    fromToLabel: string;
    closeCallback: () => void;
}

class CreatePointComponent extends React.Component<CretePointProps & RouteComponentProps, any> {
    private history: History;
    private newPointSub: Subscription = new Subscription();
    private inputRef: any;

    constructor(props: CretePointProps & RouteComponentProps) {
        super(props);

        this.history = this.props.history;

        this.submit = this.submit.bind(this);
        this.updatePoint = this.updatePoint.bind(this);
        this.updateLinks = this.updateLinks.bind(this);

        this.state = {
            point: "",
            links: ""
        }
    }

    componentDidMount() {
        if (this.inputRef != null) {
            this.inputRef.focus();
        }
    }

    submit(event: any) {
        ActiveHiveState.createNewPoint(this.state.point, [], this.props.fromId, this.props.toId);
        this.props.closeCallback();
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
        let pointLabel = 'New Point';
        if (this.props.fromId) {
            pointLabel = `From: ${this.props.fromToLabel}`;
        } else if (this.props.toId) {
            pointLabel = `To: ${this.props.fromToLabel}`;
        }

        return (
            <Modal show={this.props.showDialog} onHide={this.props.closeCallback} backdrop="static" size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{pointLabel}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="pointInput">
                        <Form.Label>Point</Form.Label>
                        <Form.Control type="text" onChange={this.updatePoint} ref={c => (this.inputRef = c)}/>
                    </Form.Group>
                    <Form.Group controlId="linksInput">
                        <Form.Label>Supporting Links</Form.Label>
                        <Form.Control as="textarea" rows={2} onChange={this.updateLinks}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeCallback}>Cancel</Button>
                    <Button variant="primary" onClick={this.submit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default withRouter(CreatePointComponent);