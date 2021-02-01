import React from "react";
import {AppState} from "../../AppState/AppState";
import {connect} from "react-redux";
import {Keyframes} from "react-spring/renderprops";
import {AsyncOperation} from "../../AppState/AsyncOperation";

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

class FeedbackBar extends React.Component<any, any> {
    render() {
        let state: AsyncOperation = this.props.status;
        let action = '';
        if (state === AsyncOperation.InProgress) {
            action = 'blinkLoading'
        } else if (state === AsyncOperation.Done) {
            action = 'blinkSuccess'
        } else if (state === AsyncOperation.Error) {
            action = 'blinkError'
        }

        return (
            <Blinker state={action} config={{duration: 150}}>
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
        status: state.currentActiveFeature.asyncStatus,
    }
}

export default connect(mapStateToProps, {})(FeedbackBar);