import React, {Component} from 'react';

export enum HintType {
    None, Zoom, Pan, Selection
}

class Hint extends Component<{type: HintType}, any> {
    render() {
        let hint: any;
        switch (this.props.type) {
            case HintType.Zoom:
                hint = (
                    <div>Use up/down arrow keys to zoom in or out</div>
                )
                break;
            case HintType.Pan:
                hint = (
                    <div>Use arrow keys to navigate</div>
                )
                break;
            case HintType.Selection:
                hint = (
                    <div>
                        <div>Use up/down keys to select a statement</div>
                        <div>Use left/right keys to select an effect</div>
                        <div>Press A to agree with  a statement/effect</div>
                        <div>Press D to disagree with  a statement/effect</div>
                        <div>Press C to mark a statement as a cause</div>
                        <div>Press E to mark a statement as an effect</div>
                    </div>
                )
                break;
        }
        return (
            <div style={{position: "absolute", color: "slategray", bottom: 60, verticalAlign: "bottom"}}>
                {hint}
            </div>
        );
    }
}

export default Hint;
