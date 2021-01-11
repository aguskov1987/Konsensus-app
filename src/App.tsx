import React from 'react';
import './App.css';
import SidebarButtons from './AppComponents/SideBarControls/SidebarButtons';
import GraphControls from "./AppComponents/GraphControls/GraphControls";
import GraphCanvas from './AppComponents/GraphCanvas/GraphCanvas';
import {AppState} from "./AppState";

class App extends React.Component<any, AppState> {
    render() {
        return (
            <div id='root'>
                <div className='controls-container'>
                    <SidebarButtons/>
                </div>
                <div className='right-side'>
                    <div className='new-node-container'>
                    </div>
                    <div className='graph-control-container'>
                        <GraphControls/>
                    </div>
                    <div className='canvas-container'>
                        <GraphCanvas/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
