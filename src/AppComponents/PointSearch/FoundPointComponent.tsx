import chroma, {Color} from "chroma-js";
import {Component} from "react";
import {FoundPoint} from "../../AppState/FoundPoint";
import {PointType} from "../../AppState/PointType";
import './FoundPointStyle.scss'

interface FoundPointProps {
    point: FoundPoint;
}

class FoundPointComponent extends Component<FoundPointProps, any> {
    private color = chroma.scale([
        '#c64141',
        '#f46d43',
        '#fdae61',
        '#fee08b',
        '#ffffbf',
        '#d9ef8b',
        '#a6d96a',
        '#66bd63',
        '#1a9850'
    ]).domain([-1, 1]);
    private questionColor = '#47147e';

    render() {
        let color;
        if (this.props.point.type === PointType.Statement) {
            let c: any = this.color(this.props.point.commonResponse);
            color = (c as Color).hex();
        } else {
            color = this.questionColor;
        }


        return (
            <div className='found-point-container'>
                <div style={{backgroundColor: color}} className='response-badge'/>
                <div>{this.props.point.label}</div>
            </div>
        );
    }
}

export default FoundPointComponent
