import React from "react";

interface HiveImageProps {
    pointCount: number
}

class HiveImageWidget extends React.Component<HiveImageProps, any> {
    render() {
        return (
            <svg width="100%" height="100%">
                <circle cx="50%" cy="50%" r="50" stroke="#00ff57" strokeWidth="10" fillOpacity="0"/>
            </svg>
        )
    }
}

export default HiveImageWidget;