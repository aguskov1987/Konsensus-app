import React from "react";
import {Card} from "react-bootstrap";
import {HiveManifest} from "../../ViewModels/HiveManifest";
import {Spring} from "react-spring/renderprops-universal";
import {connect} from "react-redux";
import {loadHive} from "../../AppState/Intercom/YardIntercom";
import Dial, {DialType} from "../Widgets/Dial";

// TODO: added stats into the footer
class HiveManifestCard extends React.Component<{manifest: HiveManifest, loadHive: Function}, any> {
    constructor(props: any) {
        super(props);
        this.goToHive = this.goToHive.bind(this);
    }
    render() {
        return (
            <Spring from={{opacity: 0}} to={{opacity: 1}}>
                {(props) => {
                    return (
                        <Card bg="dark" style={{color: "white", opacity: props.opacity}}>
                            <Card.Header>
                                <a onClick={this.goToHive} style={{color: "white"}} href="empty">{this.props.manifest.title}</a>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {this.props.manifest.description}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <div style={{width: 80, height: 80, float: 'left', marginRight: 20}}>
                                    <Dial type={DialType.TotalUsers} value={1}/>
                                </div>
                                <div style={{width: 80, height: 80, float: 'left', marginRight: 20}}>
                                    <Dial type={DialType.TotalStatements} value={1}/>
                                </div>
                            </Card.Footer>
                        </Card>
                    )
                }}
            </Spring>
        )
    }

    private goToHive(event: any) {
        this.props.loadHive(this.props.manifest.id);
        event.preventDefault();
    }
}

export default connect(null, {loadHive})(HiveManifestCard);