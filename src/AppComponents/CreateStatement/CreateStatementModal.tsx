import React from "react";
import {Modal} from "react-bootstrap";
import CreateStatement from "./CreateStatement"


class CreateStatementModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onHide = this.onHide.bind(this);
    }

    onHide() {
        this.props.closeCreateNewStatementAction();
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={this.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>New Statement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateStatement/>
                </Modal.Body>
            </Modal>
        )
    }
}

export default CreateStatementModal