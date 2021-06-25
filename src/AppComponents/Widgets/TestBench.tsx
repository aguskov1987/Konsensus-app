import React from "react";
import HiveCardComponent from "../HiveCard/HiveCardComponent";

class TestBench extends  React.Component<any, any> {
    render() {
        return (
            <div style={{width: 600, height: 150, margin: 20}}>
                <HiveCardComponent/>
            </div>)
    }
}

export default TestBench