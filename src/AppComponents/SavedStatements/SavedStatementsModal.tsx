import React from "react";
import { Modal } from "react-bootstrap";
import {connect} from "react-redux";
import {closeSavedStatements} from "../../AppState/Actions";
import {AppState} from "../../AppState/AppState";

class SavedStatementsModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.closeSavedStatements();
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

const mapStateToProps = (state: AppState) => {
    return {
        show: state.favStatementsOpen
    }
}

export default connect(mapStateToProps, {closeSavedStatements})(SavedStatementsModal)