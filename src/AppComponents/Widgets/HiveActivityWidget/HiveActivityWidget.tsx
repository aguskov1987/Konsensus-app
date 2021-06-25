import React from "react";

interface HiveActivityProps {
    dataPoints: (number[])[];
}

class ActivitySlice {
    public h: string = '';
    public dataPoints: string[] = [];
}

class HiveActivityWidget extends React.Component<HiveActivityProps, any> {
    render() {
        this.checkData(this.props.dataPoints);
        let normalized = this.normalizeDataPoints(this.props.dataPoints);

        let lineWidthInPercent = (100 / (normalized[0].length - 1));
        let middle: any[] = [];

        let verts: string[] = [];
        for (let i = 1; i < normalized[0].length - 1; i++) {
            let width = (lineWidthInPercent * i).toFixed(0) + '%';
            middle.push(<line x1={width} y1='0' x2={width} y2='100%' stroke="grey" key={i}/>);
            verts.push(width);
        }
        verts.push('100%');

        let prevPointBuffer: [x: string, y: string][] = [];


        return (
            <svg width="100%" height="100%">
                <line x1="0" y1="0" x2="0" y2="100%" stroke="grey" />
                {middle}
                <line x1="100%" y1="0" x2="100%" y2="100%" stroke="grey" />

                {normalized.map((slice, idx) => {
                    prevPointBuffer.push(['0%', ((1 - slice[0])*100).toFixed(0) + '%']);
                    return <circle r='5' fill='red' cx='0' cy={((1 - slice[0])*100).toFixed(0) + '%'} key={idx}/>
                })}

                {verts.map((vertical, idx) => {
                    return normalized.map((slice, index) => {
                        let key = idx.toString() + index.toString();
                        let cy = ((1 - slice[idx+1])*100).toFixed(0) + '%'
                        let x1 = prevPointBuffer[index][0].toString();
                        let y1 = prevPointBuffer[index][1].toString();
                        prevPointBuffer[index][0] = vertical;
                        prevPointBuffer[index][1] = cy;
                        return (
                            <React.Fragment>
                                <circle r='5' fill='red' cx={vertical} key={key} cy={cy}/>
                                <line x1={x1} y1={y1} x2={vertical} y2={cy} key={'l' +key} stroke="red" strokeWidth={2}/>
                            </React.Fragment>
                        )
                    })
                })}
            </svg>
        )
    }

    private checkData(data: (number[])[]) {
        let count = data[0].length;
        if (count < 2) {
            throw new Error('activity array should contain at least two values');
        }
        let notUniform = data.some(array => array.length !== count);
        if (notUniform) {
            throw new Error('activity arrays should must contain the same number of elements');
        }
    }

    private normalizeDataPoints(data: (number[])[]): (number[])[] {
        let result: (number[])[] = [];

        for(let array of data) {
            let newArray = array.map(p => (p / Math.max(...array)));
            result.push(newArray);
        }

        return result;
    }
}

export default HiveActivityWidget;