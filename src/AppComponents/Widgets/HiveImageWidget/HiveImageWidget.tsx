import React from "react";
import {Image} from "react-bootstrap";

interface HiveImageProps {
    pointCount: number
}

// point count breaks: 0 -> 100, 101 -> 200, 201 -> 300, 301 -> 500, 501 -> 1000, 1001 -> max

class HiveImageWidget extends React.Component<HiveImageProps, any> {
    render() {
        return (
            this.getImage()
        )
    }

    private getImage() {
        let count = this.props.pointCount;
        if (count <=100) {
            return this.getOption1();
        } else if (count > 100 && count <= 200) {
            return this.getOption2();
        } else if (count >200 && count <= 300) {
            return this.getOption3();
        } else if (count > 300 && count <= 500) {
            return this.getOption4();
        } else if (count > 500 && count <= 1000) {
            return this.getOption5();
        } else if (count > 1000) {
            return this.getOption6();
        }
    }

    private getOption1() {
        return (<Image src="Images/Information/Under100PointsIcon.svg" width={'70%'}/>)
    }

    private getOption2() {
        return (<Image src="Images/Information/Under200PointsIcon.svg" width={'70%'}/>)
    }

    private getOption3() {
        return (<Image src="Images/Information/Under300PointsIcon.svg" width={'70%'}/>)
    }

    private getOption4() {
        return (<Image src="Images/Information/Under500PointsIcon.svg" width={'70%'}/>)
    }

    private getOption5() {
        return (<Image src="Images/Information/Under1000PointsIcon.svg" width={'70%'}/>)
    }

    private getOption6() {
        return (<Image src="Images/Information/Over1000PointsIcon.svg" width={'70%'}/>)
    }
}

export default HiveImageWidget;