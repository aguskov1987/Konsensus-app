import React from "react";
import './HiveCardStyle.scss'
import HiveImageWidget from "../Widgets/HiveImageWidget/HiveImageWidget";
import HiveActivityWidget from "../Widgets/HiveActivityWidget/HiveActivityWidget";

// TODO: added stats into the footer
class HiveCardComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.goToHive = this.goToHive.bind(this);
    }
    render() {
        return (
            <div className='hive-card-container'>
                <div className='hive-card-picture'>
                    <HiveImageWidget pointCount={10}/>
                </div>
                <div className='hive-card-name'>Title</div>
                <div className='hive-card-description'>Description</div>
                <div className='hive-card-activity'>
                    <HiveActivityWidget dataPoints={[[34, 45, 65, 1, 56, 14, 89], [34, 45, 65, 1, 56, 14, 89].reverse()]}/>
                </div>
            </div>
        )
    }

    private goToHive(event: any) {
        // this.props.loadHive(this.props.manifest.id);
        event.preventDefault();
    }
}

export default HiveCardComponent;