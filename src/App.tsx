import React from 'react';
import './App.css';
import SidebarButtons from './AppComponents/SideBarControls/SidebarButtons';
import GraphControls from "./AppComponents/GraphControls/GraphControls";
import GraphCanvas from './AppComponents/GraphCanvas/GraphCanvas';
import {AppState} from "./AppState/AppState";
import SavedStatementsModal from "./AppComponents/SavedStatements/SavedStatementsModal";
import LoginModal from "./AppComponents/Login/LoginModal";
import MyHivesModal from "./AppComponents/MyHives/MyHivesModal";
import {configureAxios} from "./Services/CommonService";
import HiveYardModal from "./AppComponents/HiveYard/HiveYardModal";
import NewHiveModal from "./AppComponents/NewHive/NewHiveModal";
import {connect} from "react-redux";

class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        configureAxios();
    }

    render() {
        return (
            <div id='root'>
                <div className='controls-container'>
                    <SidebarButtons/>
                </div>
                <div className='right-side'>
                    <div className='new-node-container'>
                        <div style={{width: '50%', float: 'left', color: 'white', marginTop: 10, marginLeft: 10}}>
                            {this.props.hiveTitle}
                        </div>
                        <div style={{width: 'calc(50% - 10px)', float: 'left'}}>
                            search
                        </div>
                    </div>
                    <div className='graph-control-container'>
                        <GraphControls/>
                    </div>
                    <div className='canvas-container'>
                        <GraphCanvas/>
                    </div>
                </div>
                <SavedStatementsModal/>
                <LoginModal/>
                <MyHivesModal/>
                <HiveYardModal/>
                <NewHiveModal/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        hiveTitle: state.currentActiveHive.title
    }
}

export default connect(mapStateToProps, {})(App);
