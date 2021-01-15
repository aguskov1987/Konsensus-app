import React from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {AppState} from "../../AppState/AppState";

class MyHivesModal extends React.Component<any, any> {
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>My Hives</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    My Hives
                </Modal.Body>
            </Modal>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        show: state.myHivesOpen
    }
}

export default connect(mapStateToProps, {})(MyHivesModal)