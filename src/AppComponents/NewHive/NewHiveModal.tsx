import React from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {AppState} from "../../AppState/AppState";
import {closeCreateNewHiveAction} from "../../AppState/Actions";
import NewHive from "./NewHive";
import {AppFeature} from "../../AppState/AppFeature";

class NewHiveModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onHide = this.onHide.bind(this);
    }

    onHide() {
        this.props.closeCreateNewHiveAction();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.onHide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            <span style={{float: 'left'}}><img alt="New Hive" src="Images/new_hive.svg" style={{height: 45, width: 45}}/></span>
                            <span>New Hive</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewHive/>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        show: state.currentActiveFeature.feature === AppFeature.NewHive
    }
}

export default connect(mapStateToProps, {closeCreateNewHiveAction})(NewHiveModal)