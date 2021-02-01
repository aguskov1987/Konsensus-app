import React from "react";
import {Modal} from "react-bootstrap";
import HiveYard from "./HiveYard";
import {AppState} from "../../AppState/AppState";
import {connect} from "react-redux";
import {closeHiveYardAction} from "../../AppState/Actions";
import {AppFeature} from "../../AppState/AppFeature";

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
            <Modal show={this.props.show} onHide={this.onHide} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            <span style={{float: 'left'}}>
                                <img src="Images/yard_button.svg" style={{height: 45, width: 45}} alt=""/>
                            </span>
                            <span>The Yard</span>
                        </div>
                    </Modal.Title>
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
        show: state.currentActiveFeature.feature === AppFeature.Yard
    }
}

export default connect(mapStateToProps, {closeHiveYardAction})(HiveYardModal)