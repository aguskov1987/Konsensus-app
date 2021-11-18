import {Core, Position} from "cytoscape";
import chroma, {Color} from "chroma-js";
import {Subcomp} from "./Subcomp";
import {ICanvasLayer} from "cytoscape-layers";
import {ResponseView} from "../../AppState/ResponseView";

type RelationType = 'from'|'to';

export class VisualizationSubcomp implements Subcomp {
    private cyRef: Core;
    private minPointSize = 50;
    private maxPointSize = 200;
    private style: any = [
        {
            selector: 'node',
            style: {
                'width': this.minPointSize,
                'height': this.minPointSize,
                'label': 'data(label)',
                'text-valign': 'center',
                'text-halign': 'center',
                'text-wrap': 'wrap',
                'text-max-width': '50px',
                'font-size': 4,
                'shape': 'circle'
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
                'target-arrow-shape': 'circle'
            }
        }
    ];
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
    private questionColor = '#24c1fa';

    private fromToLayer: ICanvasLayer|null = null;
    private pointMarked = false;
    private innerRadiusFactor = 1;
    private outerRadiusFactor = 3;

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
        let response = view === ResponseView.Mine ? 'userResponse' : 'commonResponse';

        this.cyRef.elements().forEach((element) => {
            let value = element.data(response);
            let c: any = this.color(value);
            let color = c as Color;
            let accent = color.darken(1);
            let border = color.brighten(1);
            if (element.isNode()) {
                if (element.hasClass('statement')) {
                    element.style('background-fill', 'radial-gradient');
                    element.style('background-gradient-stop-colors', `${color.hex()} ${accent.hex()} ${border.hex()}`);
                    element.style('background-gradient-stop-positions', '0 45% 55%');
                } else if (element.hasClass('question')) {
                    element.style('background-color', this.questionColor);
                }
            }
            if (element.isEdge()) {
                element.style('line-color', color.hex());
                element.style('target-arrow-color', color.hex());
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
        if (this.pointMarked) {
            return;
        }
        let point = this.cyRef.getElementById(id)[0];
        let pointRadius = point.renderedBoundingBox({}).h / 2;
        let position: Position = point.renderedPosition();

        let layers = (this.cyRef as any).layers();
        this.fromToLayer = layers.nodeLayer.insertAfter('canvas');

        let ctx:CanvasRenderingContext2D = (this.fromToLayer as any).ctx;
        let canvas = (this.fromToLayer as any).node;

        let xFactor = canvas.width / this.cyRef.width();
        let yFactor = canvas.height / this.cyRef.height();

        this.pointMarked = true;
        let initInnerRadius = pointRadius*this.innerRadiusFactor;
        let initOuterRadius = pointRadius*this.outerRadiusFactor;
        let currentRadius: number = as === 'from'? initInnerRadius : initOuterRadius;

        this.setupTargetLightGradient(ctx, canvas);
        setInterval(() => {
            this.setupTargetLightGradient(ctx, canvas);
        }, 300);

        let update: FrameRequestCallback|null = () => {
            pointRadius = point.renderedBoundingBox({}).h / 2;
            initInnerRadius = pointRadius*this.innerRadiusFactor;
            initOuterRadius = pointRadius*this.outerRadiusFactor;

            if (as === 'from') {
                currentRadius += currentRadius*0.03;
                if (currentRadius > initOuterRadius) {
                    currentRadius = initInnerRadius;
                }
            } else {
                currentRadius -= currentRadius*0.03;
                if (currentRadius < initInnerRadius) {
                    currentRadius = initOuterRadius;
                }
            }

            position = this.cyRef.getElementById(id)[0].renderedPosition();
            ctx.clearRect(0, 0, 3000, 3000);
            ctx.beginPath();
            ctx.arc(position.x*xFactor, position.y*yFactor, currentRadius, 0, 2*Math.PI);
            ctx.stroke();

            if (this.pointMarked) {
                requestAnimationFrame(update as FrameRequestCallback);
            }
        }
        requestAnimationFrame(update);
    }

    public clearMarkings() {
        this.fromToLayer?.remove();
        this.pointMarked = false;
    }

    private setupTargetLightGradient(ctx: CanvasRenderingContext2D, canvas: any) {
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0.0, "#DBBB04");
        gradient.addColorStop(0.1 ,"#00FF57");
        gradient.addColorStop(0.2, "#FF6000");
        gradient.addColorStop(0.3, "#DBBB04");
        gradient.addColorStop(0.4 ,"#00FF57");
        gradient.addColorStop(0.5, "#FF6000");
        gradient.addColorStop(0.6, "#DBBB04");
        gradient.addColorStop(0.7 ,"#00FF57");
        gradient.addColorStop(0.8, "#FF6000");
        gradient.addColorStop(1.0, "#DBBB04");
        ctx.lineWidth = 5;
        ctx.strokeStyle = gradient;
    }
}
