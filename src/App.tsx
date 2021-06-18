import React from 'react';
import './App.scss';
import SidebarButtonsComponent from './AppComponents/SideBarControls/SidebarButtonsComponent';
import SavedPointsComponent from "./AppComponents/SavedPoints/SavedPointsComponent";
import {configureAxios} from "./Services/CommonService";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HiveGraphComponent from "./AppComponents/HiveGraph/HiveGraphComponent";
import LoginComponent from "./AppComponents/Login/LoginComponent";
import HiveYardComponent from "./AppComponents/HiveYard/HiveYardComponent";
import MyHivesComponent from "./AppComponents/MyHives/MyHivesComponent";
import NewHiveComponent from "./AppComponents/NewHive/NewHiveComponent";
import CreatePointComponent from "./AppComponents/CreatePoint/CreatePointComponent";
import FeedbackBarComponent from "./AppComponents/FeedbackBar/FeedbackBarComponent";

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        configureAxios();
    }

    render() {
        return (
            <div id='root'>
                <BrowserRouter>
                    <div className='controls-container'>
                        <SidebarButtonsComponent/>
                    </div>
                    <div className='main-container'>
                        <div className='feedback-bar-container'>
                            <FeedbackBarComponent/>
                        </div>
                        <div className='working-area-container'>
                            <Switch>
                                <Route exact path="/">
                                    <HiveGraphComponent/>
                                </Route>
                                <Route path="/enter">
                                    <LoginComponent/>
                                </Route>
                                <Route path="/yard">
                                    <HiveYardComponent/>
                                </Route>
                                <Route path="/saved-hives">
                                    <MyHivesComponent/>
                                </Route>
                                <Route path="/new-hive">
                                    <NewHiveComponent/>
                                </Route>
                                <Route path="/new-point">
                                    <CreatePointComponent/>
                                </Route>
                                <Route path="/saved-point">
                                    <SavedPointsComponent/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
