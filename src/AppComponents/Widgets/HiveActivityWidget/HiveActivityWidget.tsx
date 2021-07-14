import React from "react";
import chroma from "chroma-js";

interface HiveActivityProps {
    dataPoints: (number[])[];
}

class HiveActivityWidget extends React.Component<HiveActivityProps, any> {
    render() {
        this.checkData(this.props.dataPoints);
        let normalizeDataPoints = this.normalizeDataPoints(this.props.dataPoints);

        let colors = chroma.brewer.Set2;

        let sectionWidth = (100 / (normalizeDataPoints[0].length - 1));
        let middleLines: any[] = [];

        // exclude the first line at 0. It's drawn manually later on but it needs to be omitted
        // from the array sine it's used to draw lines between points.
        let xPositions: string[] = [];
        for (let i = 1; i < normalizeDataPoints[0].length - 1; i++) {
            let width = (sectionWidth * i).toFixed(0) + '%';
            middleLines.push(<line x1={width} y1='0' x2={width} y2='100%' stroke="grey" key={i}/>);
            xPositions.push(width);
        }
        xPositions.push('100%');

        let prevPointBuffer: [x: string, y: string][] = [];

        return (
            <svg width="100%" height="100%">
                {/*draw the labels*/}
                <text x='1%' y='20px' fontSize='small' fill='white'>{(middleLines.length + 2) + ' days ago'}</text>
                <text x='96%' y='20px' fontSize='small' fill='white'>Today</text>

                <text x='45%' y='20px' fontSize='small' fontWeight='bold' fill={colors[0]}>Activity</text>
                <text x='51%' y='20px' fontSize='small' fontWeight='bold' fill={colors[1]}>Points</text>

                {/*draw the vertical lines*/}
                <line x1="0" y1="0" x2="0" y2="100%" stroke="grey" />
                {middleLines}
                <line x1="100%" y1="0" x2="100%" y2="100%" stroke="grey" />

                {/*draw the first vertical line with the data points*/}
                {normalizeDataPoints.map((slice, idx) => {
                    let cy = ((1 - slice[0])*100).toFixed(0) + '%';
                    prevPointBuffer.push(['0%', cy]);
                    return <circle r='3' fill={colors[idx]} cx='0' cy={cy} key={idx}/>
                })}

                {/*draw the rest of the vertical lines with data points + connecting lines from the previous data point*/}
                {xPositions.map((vertical, idx) => {
                    return normalizeDataPoints.map((slice, index) => {
                        let key = idx.toString() + index.toString();
                        let cy = ((1 - slice[idx+1])*100).toFixed(0) + '%'
                        let x1 = prevPointBuffer[index][0].toString();
                        let y1 = prevPointBuffer[index][1].toString();
                        prevPointBuffer[index][0] = vertical;
                        prevPointBuffer[index][1] = cy;
                        return (
                            <React.Fragment>
                                <circle r='3' fill={colors[index]} cx={vertical} key={'c' + key} cy={cy}/>
                                <line x1={x1} y1={y1} x2={vertical} y2={cy} key={'l' + key} stroke={colors[index]} strokeWidth={1}/>
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