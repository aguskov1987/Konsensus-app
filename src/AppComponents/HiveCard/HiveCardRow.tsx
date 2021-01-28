import React from "react";
import {HiveManifest} from "../../ViewModels/HiveManifest";
import {CardDeck} from "react-bootstrap";
import HiveManifestCard from "./HiveManifestCard";

class HiveCardRow extends React.Component<{items: HiveManifest[]}, any> {
    render() {
        return (
            <CardDeck>
                {this.props.items.map((hive) => {
                    return <HiveManifestCard manifest={hive}/>
                })}
            </CardDeck>
        )
    }
}

export default HiveCardRow