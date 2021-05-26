import React from 'react';
import './App.css';
import SidebarButtons from './AppComponents/SideBarControls/SidebarButtons';
import SavedStatementsModal from "./AppComponents/SavedStatements/SavedStatementsModal";
import {configureAxios} from "./Services/CommonService";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HiveGraph from "./AppComponents/HiveGraph/HiveGraph";
import Login from "./AppComponents/Login/Login";
import HiveYard from "./AppComponents/HiveYard/HiveYard";
import MyHives from "./AppComponents/MyHives/MyHives";
import NewHive from "./AppComponents/NewHive/NewHive";
import CreateStatement from "./AppComponents/CreateStatement/CreateStatement";
import FeedbackBar from "./AppComponents/FeedbackBar/FeedbackBar";

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
                        <SidebarButtons/>
                    </div>
                    <div className='right-side'>
                        <div className='feedback-bar-container'>
                            <FeedbackBar/>
                        </div>
                        <div className='working-area'>
                            <Switch>
                                <Route exact path="/">
                                    <HiveGraph/>
                                </Route>
                                <Route path="/enter">
                                    <Login/>
                                </Route>
                                <Route path="/yard">
                                    <HiveYard/>
                                </Route>
                                <Route path="/saved-hives">
                                    <MyHives/>
                                </Route>
                                <Route path="/new-hive">
                                    <NewHive/>
                                </Route>
                                <Route path="/new-statement">
                                    <CreateStatement/>
                                </Route>
                                <Route path="/saved-statements">
                                    <SavedStatementsModal/>
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
