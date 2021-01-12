import React from "react";
import { Modal } from "react-bootstrap";
import {connect} from "react-redux";
import {closeLogin} from "../../AppState/Actions";
import {AppState} from "../../AppState/AppState";

class LoginModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.closeLogin();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>Login</Modal.Body>
            </Modal>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        show: state.loginOpen
    }
}

export default connect(mapStateToProps, {closeLogin})(LoginModal)