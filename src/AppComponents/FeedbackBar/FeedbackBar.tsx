import React from "react";
import {AppState} from "../../AppState/AppState";
import {connect} from "react-redux";
import {Keyframes} from "react-spring/renderprops";

export enum FeedbackSource {
    Login,
    SavedHives,
    SavedStatements,
    HiveYard,
    CreateNewHive,
    HiveStatements
}

export enum FeedbackState {
    Loading,
    Loaded,
    Error
}

const Blinker: any = Keyframes.Spring({
    blinkSuccess: [
        {backgroundColor: '#006622'},
        {backgroundColor: '#66ac20'},
        {backgroundColor: '#006622'},
        {backgroundColor: '#66ac20'},
        {backgroundColor: '#006622'}
    ],
    blinkError: [
        {backgroundColor: '#661400'},
        {backgroundColor: '#c85050'},
        {backgroundColor: '#661400'},
        {backgroundColor: '#c85050'},
        {backgroundColor: '#661400'},
        {backgroundColor: '#c85050'},
        {backgroundColor: '#661400'}
    ],
    blinkLoading: [
        {backgroundColor: '#9b5d00'},
        {backgroundColor: '#ffc363'},
        {backgroundColor: '#9b5d00'},
    ]
});

class FeedbackBar extends React.Component<
    {source: FeedbackSource},
    {previousState: FeedbackState, currentState: FeedbackState}> {
    constructor(props: any) {
        super(props);
        this.state = {
            previousState: FeedbackState.Loading,
            currentState: FeedbackState.Loading
        }
    }

    static getDerivedStateFromProps(props: any, state: any) {
        console.log(props);
        if (props.savedHivesLoading) {
            return {
                previousState: FeedbackState.Loading,
                currentState: FeedbackState.Loading
            };
        } else if (props.savedHivesLoaded) {
            return {
                previousState: FeedbackState.Loading,
                currentState: FeedbackState.Loaded
            };
        } else if (props.savedHivesLoadingError) {
            return {
                previousState: FeedbackState.Loading,
                currentState: FeedbackState.Error
            }
        }
        return null;
    }

    render() {
        let state: string = '';
        if (this.state.currentState === FeedbackState.Loading) {
            state = 'blinkLoading'
        } else if (this.state.currentState === FeedbackState.Loaded) {
            state = 'blinkSuccess'
        } else if (this.state.currentState === FeedbackState.Error) {
            state = 'blinkError'
        }

        return (
            <Blinker state={state} config={{duration: 150}}>
                {(props: any) => (
                    <div style={{
                        width: '100%',
                        height: 10,
                        backgroundColor: props.backgroundColor
                    }}>.</div>
                )}
            </Blinker>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        savedHivesLoading: state.savedHivesLoading,
        savedHivesLoaded: state.savedHivesLoaded,
        savedHivesLoadingError: state.savedHivesLoadingError
    }
}

export default connect(mapStateToProps, {})(FeedbackBar);