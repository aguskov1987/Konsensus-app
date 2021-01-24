import React from "react";
import {connect} from "react-redux";
import {loadUserSavedHives} from "../../AppState/Intercom/YardIntercom";
import {AppState} from "../../AppState/AppState";
import {Button, Card, CardDeck, Spinner} from "react-bootstrap";
import {openCreateNewHiveAction, openHiveYardAction} from "../../AppState/Actions";
import {HiveManifest} from "../../ViewModels/HiveManifest";

// TODO: REFACTOR!
class MyHives extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.goToYard = this.goToYard.bind(this);
        this.goToCreateNewHive = this.goToCreateNewHive.bind(this);
    }

    componentDidMount() {
        this.props.loadUserSavedHives();
    }

    goToYard() {
        this.props.openHiveYardAction();
    }

    goToCreateNewHive() {
        this.props.openCreateNewHiveAction();
    }

    render() {
        let inner;
        if (this.props.loading) {
            inner = (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>)
        } else {
            if (this.props.savedHives.length < 1) {
                inner = (
                    <Card style={{width: '100%'}}>
                        <Card.Img variant="top" src="Images/empty_saved_hives.svg"/>
                        <Card.Body>
                            <Card.Title>Nothing here.</Card.Title>
                            <Card.Text>
                                Looks like you do not have any saved hives.
                            </Card.Text>
                            <Button variant="secondary" onClick={this.goToCreateNewHive} style={{marginRight: 5}}>
                                Start a new hive
                            </Button>
                            <Button variant="secondary" onClick={this.goToYard}>Go to the yard</Button>
                        </Card.Body>
                    </Card>)
            } else if (this.props.savedHives.length > 0) {
                const reducer = (r: any, v: any, i: any, a: any) => {
                    if (i % 2 === 0)
                        r.push(a.slice(i, i + 2));
                    return r;
                }
                let result = (this.props.savedHives as HiveManifest[]).reduce(reducer, []);
                inner = (
                    <div style={{width: '100%'}}>
                        {result.map((pair: [HiveManifest, HiveManifest], idx: any) => {
                            if (pair.length === 2) {
                                return (
                                    <CardDeck key={idx}>
                                        <Card bg="light">
                                            <Card.Header>{pair[0].title}</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    {pair[0].description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <Card bg="light">
                                            <Card.Header>{pair[1].title}</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    {pair[1].description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </CardDeck>
                                )
                            } else {
                                return (
                                    <CardDeck key={idx}>
                                        <Card bg="light">
                                            <Card.Header>{pair[0].title}</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    {pair[0].description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </CardDeck>
                                )
                            }
                        })}
                        <Button variant="secondary" onClick={this.goToCreateNewHive} style={{marginTop: 10}}>
                            Start a new hive
                        </Button>
                    </div>)
            }
        }
        return (
            <div>{inner}</div>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        savedHives: state.savedHives,
        loading: state.savedHivesLoading
    }
}

export default connect(mapStateToProps,
    {loadUserSavedHives, openHiveYardAction, openCreateNewHiveAction})(MyHives);