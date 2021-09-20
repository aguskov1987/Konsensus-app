import React, {Component} from "react";
import {Button, FormControl, Image, InputGroup} from "react-bootstrap";
import './CreatePointStyle.scss';
import {Subscription} from "rxjs";
import {ActiveHiveState} from "../../AppState/ActiveHiveState";

interface AddPointProps {
    fromId: string;
    toId: string;
    question: boolean;
    show: boolean;
    closeCallback: () => void;
}

class AddPointComponent extends Component<AddPointProps, any> {
    private newPointSub: Subscription = new Subscription();
    private inputRef: any;
    private doNotFocus: boolean = false;

    constructor(props: AddPointProps) {
        super(props);

        this.submit = this.submit.bind(this);
        this.updatePoint = this.updatePoint.bind(this);
        this.updateLinks = this.updateLinks.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            point: "",
            links: ""
        }
    }

    submit(event: any) {
        ActiveHiveState.createNewPoint(this.state.point, [], this.props.fromId, this.props.toId, this.props.question);
        event.preventDefault();
        this.handleClose();
    }

    updatePoint(event: any) {
        this.setState({
            point: event.target.value
        });
    }

    updateLinks(event: any) {
        this.setState({
            links: event.target.value
        });
        this.doNotFocus = true;
    }

    componentWillUnmount() {
        this.newPointSub.unsubscribe();
    }

    render() {
        let icon;
        if (this.props.fromId !== '' && this.props.toId === '') {
            icon = <Image src="Images/Operations/FromPointIcon.svg" width='20'/>;
        } else if (this.props.fromId === '' && this.props.toId !== ''){
            icon = <Image src="Images/Operations/ToPointIcon.svg" width='20'/>;
        } else {
            icon = <Image src="Images/Operations/NewPointIcon.svg" width='20'/>;
        }
        if (this.props.question) {
            icon = <Image src="Images/Operations/QuestionIcon.svg" width='20'/>;
        }

        if (this.inputRef != null && !this.doNotFocus) {
            setTimeout(() => {
                this.inputRef.focus();
            }, 100)
        }

        return (
            <div className='add-point-container' style={{visibility: this.props.show ? 'visible' : 'hidden'}}>
                <div className='new-point-row'>
                    <div className='icon'>{icon}</div>
                    <InputGroup className="mb-3" size='sm'>
                        <FormControl
                            onChange={this.updatePoint} ref={c => (this.inputRef = c)}
                            placeholder="New Point"
                            aria-label='point'
                            aria-describedby="add your point"
                        />
                        <Button variant="success" size='sm'>Submit</Button>
                    </InputGroup>
                </div>
                <div className='support-links'>
                    <div className='icon'>
                        <Image src="Images/Operations/LinksIcon.svg" width='20'/>
                    </div>
                    <InputGroup className="mb-3" size='sm'>
                        <FormControl
                            onChange={this.updateLinks}
                            placeholder="Supporting Links"
                            aria-label="supporting links"
                            aria-describedby="add supporting links"
                        />
                        <Button variant="danger" size='sm' onClick={this.handleClose}>Cancel</Button>
                    </InputGroup>
                </div>
            </div>
        )
    }

    private handleClose() {
        this.props.closeCallback();
        this.doNotFocus = false;
    }
}

export default AddPointComponent
