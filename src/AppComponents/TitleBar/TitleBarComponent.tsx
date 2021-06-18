import React from "react";
import {Button, Image} from "react-bootstrap";
import {History} from "history";
import {withRouter} from "react-router-dom";

export interface TitleBarProps {
    title: string;
    icon: string;
}

class TitleBarComponent extends React.Component<any, any>{
    private history: History;
    constructor(props: any) {
        super(props);

        this.history = this.props.history;
        this.goToHive = this.goToHive.bind(this);
    }

    render() {
        return (
            <div style={{width: '100%', height: 30, marginBottom: 20, position: 'relative'}}>
                <Image style={{width: 30, height: 30, marginRight: 10}} src={this.props.icon}/>
                <span style={{display: 'inline-block', color: 'white'}}>
                    <h3>{this.props.title}</h3>
                </span>
                <span/>
                <Button variant='link' size='sm' style={{position: 'absolute', right: 0}} onClick={this.goToHive}>
                    <Image style={{width: 30, height: 30}} src='Images/Navigation/CloseIcon.svg'/>
                </Button>
            </div>
        )
    }

    private goToHive() {
        this.history.push('/');
    }
}

export default withRouter(TitleBarComponent);