import React from "react";
import {Modal} from "react-bootstrap";

class SavedStatementsModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.closeSavedStatementsAction();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>My Statements</Modal.Title>
                </Modal.Header>
                <Modal.Body>Statements</Modal.Body>
            </Modal>
        )
    }
}

export default SavedStatementsModal;