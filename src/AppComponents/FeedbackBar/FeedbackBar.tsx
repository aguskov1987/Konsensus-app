import React from "react";
import {Keyframes} from "react-spring/renderprops";

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
        let state = this.props.status;
        let action = 'blinkSuccess';

        return (
            <Blinker state={action} config={{duration: 150}}>
                {(props: any) => (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: props.backgroundColor,
                        filter: 'drop-shadow(0 0.5mm 0.5mm #006622)'
                    }}>.</div>
                )}
            </Blinker>
        )
    }
}

export default FeedbackBar;