import {Core, Position} from "cytoscape";
import chroma from "chroma-js";
import {ResponseView} from "../../AppState/State";
import {Subcomp} from "./Subcomp";
import {ICanvasLayer} from "cytoscape-layers";

type RelationType = 'from'|'to';

export class VisualizationSubcomp implements Subcomp {
    private minPointSize = 50;
    private maxPointSize = 200;
    private style: any = [
        {
            selector: 'node',
            style: {
                'width': this.minPointSize,
                'height': this.minPointSize,
                'label': 'data(label)',
                'background-color': 'white',
                'text-valign': 'center',
                'text-halign': 'center',
                'text-wrap': 'wrap',
                'text-max-width': '50px',
                'font-size': 4,
                'shape': 'polygon',
                'shape-polygon-points': [ // hexagon
                    -0.06, -0.96,
                    0.06, -0.96,

                    0.82, -0.53,
                    0.87, -0.44,

                    0.87, 0.44,
                    0.82, 0.53,

                    0.06, 0.96,
                    -0.06, 0.96,

                    -0.82, 0.53,
                    -0.87, 0.44,

                    -0.87, -0.44,
                    -0.82, -0.53
                ]
            }
        },
        {
            selector: '.cause',
            style: {
                'shape': 'rectangle'
            }
        },
        {
            selector: '.effect',
            style: {
                'shape': 'rhomboid'
            }
        },
        {
            selector: ':selected',
            style: {
                'border-width': 4,
                'border-color': '#000000',
            }
        },
        {
            selector: 'edge',
            style: {
                width: 2,
                'curve-style': 'bezier',
                'control-point-distances': '20',
                'control-point-weights': '0.2',
                'target-arrow-shape': 'circle',
                'line-color': '#ffffbf',
                'target-arrow-color': '#ffffbf'
            }
        },
        {
            selector: 'edge:selected',
            style: {
                width: 4,
                'curve-style': 'bezier',
                'control-point-distances': '20',
                'control-point-weights': '0.2',
                'target-arrow-shape': 'circle',
                'line-color': '#1f1f1f',
                'target-arrow-color': '#1f1f1f'
            }
        }
    ];
    private color = chroma.scale([
        '#d53e4f',
        '#f46d43',
        '#fdae61',
        '#fee08b',
        '#ffffbf',
        '#d9ef8b',
        '#a6d96a',
        '#66bd63',
        '#1a9850'
    ]).domain([-1, 1]);
    private cyRef: Core;
    private fromToLayer: ICanvasLayer|null = null;
    private pointMarked = false;

    constructor(cy: Core) {
        this.cyRef = cy;
        this.cyRef.style(this.style);
    }

    public colorizeAndResize(view: ResponseView = ResponseView.Mine, recalcSize: boolean = true) {
        /***
         * Colors and node sizes can be used to display the point/synapse related data such as
         * response and penetration. Response is visualized with color. It correlates with
         * a certain hue (specified in the --color-- property which is a chroma interpolated
         * scale).
         * Using node size to represent penetration requires setting up a min node size (corresponding
         * to the penetration of 0) as well as the max node size (penetration = 1). We then adjust the
         * size of the nodes accordingly.
         */

            // colorize
        let r = view === ResponseView.Mine ? 'userResponse' : 'commonResponse';

        this.cyRef.elements().forEach((element) => {
            let value = element.data(r);
            let c: any = this.color(value);
            if (element.isNode()) {
                element.style('background-color', c.hex());
            }
            if (element.isEdge()) {
                element.style('line-color', c.hex());
                element.style('target-arrow-color', c.hex());
            }
        });

        // re-size
        if (recalcSize) {
            this.cyRef.nodes().forEach((p) => {
                let penetration: number = p.data('penetration');
                let newSize = this.minPointSize + Math.floor((this.maxPointSize - this.minPointSize) * penetration);
                p.style('width', newSize);
                p.style('height', newSize);
            });
        }
    }

    public clearSubscriptions(): void {}

    public markPoint(as: RelationType, id: string) {
        let position: Position = this.cyRef.getElementById(id)[0].renderedPosition();
        let layers = (this.cyRef as any).layers();
        this.fromToLayer = layers.nodeLayer.insertAfter('canvas');
        let ctx:CanvasRenderingContext2D = (this.fromToLayer as any).ctx;
        let canvas = (this.fromToLayer as any).node;
        let xFactor = canvas.width / this.cyRef.width();
        let yFactor = canvas.height / this.cyRef.height();

        this.pointMarked = true;
        let update: FrameRequestCallback|null = (time: number) => {
            position = this.cyRef.getElementById(id)[0].renderedPosition();
            ctx.clearRect(0, 0, 2000, 2000);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(position.x * xFactor, position.y * yFactor);
            ctx.stroke();

            if (this.pointMarked) {
                requestAnimationFrame(update as FrameRequestCallback);
            }
        }
        requestAnimationFrame(update);
    }

    public clearMarkings() {
        // this.fromToLayer?.remove();
        this.pointMarked = false;
    }
}