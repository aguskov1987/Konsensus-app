import React from "react";
import TitleBarComponent from "../TitleBar/TitleBarComponent";
import {withRouter} from "react-router-dom";

class SavedPointsComponent extends React.Component<any, any> {

    render() {
        return (
            <div style={{padding: 20, height: '100%'}}>
                <TitleBarComponent title='Saved Points' icon='Images/my_saved_statements.svg'/>
                Saved Points
            </div>
        )
    }
}

export default withRouter(SavedPointsComponent);