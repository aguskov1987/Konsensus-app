import React from "react";
import {Modal} from "react-bootstrap";
import HiveYard from "./HiveYard";
import {AppState} from "../../AppState/AppState";
import {connect} from "react-redux";
import {closeHiveYardAction} from "../../AppState/Actions";

class HiveYardModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onHide = this.onHide.bind(this);
    }

    onHide() {
        this.props.closeHiveYardAction();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.onHide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Hive Yard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HiveYard/>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        show: state.hiveYardOpen
    }
}

export default connect(mapStateToProps, {closeHiveYardAction})(HiveYardModal)