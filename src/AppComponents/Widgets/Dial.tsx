import React from "react";

export enum DialType {
    TotalUsers,
    TotalStatements,
    TotalResponses
}

class Dial extends React.Component<{type: DialType, value: number}, any> {
    render() {
        let icon;
        if (this.props.type === DialType.TotalUsers) {
            icon = (
                <g>
                    <circle cx="80" cy="70" r="10" stroke="red" fill="none"/>
                    <path stroke="red" d="M65, 95 L95, 95 A15, 15, 0, 0, 0, 65, 95" fill="none"/>
                </g>
            )
        } else if (this.props.type === DialType.TotalStatements) {
            icon = (
                <polygon points="80,100 62,90 62,70 80,60 98,70 98,90" fill="none" stroke="red"/>
            )
        } else if(this.props.type === DialType.TotalResponses) {
            icon = (
                <polygon points="75,60 75,75 60,75 60,85 75,85 75,100 85,100 85,85 100,85 100,75 85,75 85,60" fill="none" stroke="red"/>
            )
        }
        return (
            <svg width="100%" height="100%" viewBox="0 0 160 160" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <path id="dialSection" d="M80, 80 L150, 80 A70, 70, 0, 0, 0, 128.5, 29.5 Z"/>
                </defs>

                <use href="#dialSection" fill="steelblue" transform="rotate(-180, 80, 80)"/>
                <use href="#dialSection" fill="teal" transform="rotate(-135, 80, 80)"/>
                <use href="#dialSection" fill="yellowgreen" transform="rotate(-90, 80, 80)"/>
                <use href="#dialSection" fill="orange" transform="rotate(-45, 80, 80)"/>
                <use href="#dialSection" fill="orangered"/>
                <use href="#dialSection" fill="darkred" transform="rotate(45, 80, 80)"/>

                <circle cx="80" cy="80" r="40" fill="#181818"/>

                {icon}

                <polygon points="80, 120 75, 100 85, 100" fill="red"/>
            </svg>
        )
    }
}

export default Dial