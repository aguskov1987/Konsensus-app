import React from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {AppState} from "../../AppState/AppState";
import Login from "./Login";
import {AppFeature} from "../../AppState/AppFeature";

class LoginModal extends React.Component<any, any> {
    render() {
        return (
            <Modal show={this.props.show} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login/>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        show: state.currentActiveFeature.feature === AppFeature.Login
    }
}

export default connect(mapStateToProps, {})(LoginModal)