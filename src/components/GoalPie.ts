import * as d3 from 'd3';
const d3Transform = require('d3-transform').transform;
import * as helpers from '../base/helpers';
import {Circle, Donut, Line, Point, Square} from "../base/Primitives";

const size: number = 500;
const R: number = 120;
const goalScala = {begin: 15, length: 10}

export class GoalPie {
    private _goal: number = 0;
    private _value: number = 0;


    private _viewBox: Square;


    //svg elements
    public svgContainer:any;
    private _elValue: any;
    private _elPercent: any;
    private _elTitleText: any;
    private _elCircleValueFrom: any;
    private _elCircleValueTo: any;
    private _elValuePath: any;
    private _elGoalPointer: any;
    private _elGoalValue: any;
    private _elGoalTitle: any;
    private _arrGoalScala = [];


    //values
    private _valueCircle: Circle;
    private _goalCircle: Circle;

    constructor(

        public selector: string,
        public title: string,
        public colorTitle = '#A6CAD8',
        public colorValueTitle = '#FFFFFF',
        public colorGoal = '#FFFFFF',
        public colorCircle = '#007A93',
        public colorValue = '#AAC891'){

        this._createContainerElements(selector);
        this._createGoalElements();
        this._createTitleTextElements();
        this._createValueElements();

    };

    private _createContainerElements(selector: string) {
        this._viewBox = new Square(new Point(), size);
        this.svgContainer = d3.select(selector).append("svg")
            .attr("viewBox", "0 0 " + size + ' ' + size);
    }

    private _createGoalElements() {
        this._goalCircle = new Circle(this._viewBox.center, R + goalScala.begin);

        this._elGoalPointer = this.svgContainer.append("path")
            .attr('stroke', this.colorCircle)
            .attr('stroke-width', '5');

        this._elGoalTitle = this.svgContainer.append("text")
            .attr('font-size', '20')
            .attr('font-family', 'Helvetica Neue,sans-serif')
            .attr('fill', this.colorCircle)
            .text('Goal');
        this._elGoalValue = this.svgContainer.append("text")
            .attr('font-size', '17')
            .attr('font-family', 'Helvetica Neue,sans-serif')
            .attr('fill', this.colorCircle)
            .text(this._goal + ' %');

    }

    private _createTitleTextElements() {
        this._elTitleText = this.svgContainer.append("text")
            .attr('font-size', '30px')
            .attr('font-family', 'Helvetica Neue,sans-serif')
            .attr('fill', this.colorTitle)
            .text(this.title);
        const textElRect = helpers.getRect(this._elTitleText);
        let centeredPos = this._viewBox.centreRect(textElRect);
        this._elTitleText.attr("transform", d3Transform().translate([centeredPos.pos.x, centeredPos.pos.y + 60]));
    }

    private _createValueElements() {
        this._valueCircle = new Circle(this._viewBox.center, R);
        this.svgContainer.append("circle")
            .attr('fill', 'transparent')
            .attr('stroke', this.colorCircle)
            .attr('stroke-width', '10')
            .attr('r', this._valueCircle.radius)
            .attr('cx', this._valueCircle.center.x)
            .attr('cy', this._valueCircle.center.y);


        this._elValue = this.svgContainer.append("text")
            .attr('font-size', '70')
            .attr('font-family', 'Helvetica Neue,sans-serif')
            .attr('fill', this.colorValueTitle)
            .text(this.title);

        this._elPercent = this.svgContainer.append("text")
            .attr('font-size', '30')
            .attr('font-family', 'Helvetica Neue,sans-serif')
            .attr('fill', this.colorValueTitle)
            .text('%');

        const pointCentre = this._getCentre();
        this._elCircleValueFrom = this.svgContainer.append("circle")
            .attr('fill', this.colorValue)
            .attr('r', 10)
            .attr('cx', pointCentre.x)
            .attr('cy', pointCentre.y);



        this._elCircleValueTo = this.svgContainer.append("circle")
            .attr('fill', this.colorValue)
            .attr('r', 10);

        this._elValuePath = this.svgContainer.append("path")
            .attr('fill', 'transparent')
            .attr('stroke', this.colorValue)
            .attr('stroke-width', '20');


    }

    public set value(value: number) {
        this._value = value;
        this._elValue.text(this._value);
        const rect = helpers.getRect(this._elValue);
        const centeredPos =  this._viewBox.centreRect(rect);
        this._elValue.attr("transform", d3Transform().translate([centeredPos.pos.x - 20, centeredPos.pos.y + 30]));
        this._elPercent.attr("transform", d3Transform().translate([centeredPos.pos.x - 20 + rect.width + 10, centeredPos.pos.y + 30]));
        this._drawValue();
    }

    private _getCentre() {
        return {x: size / 2, y: (size - R * 2) / 2};
    }

    private _drawValue() {

        const to = this._valueCircle.point(360 / 100 * this._value);
        const pointCentre = this._getCentre();
        this._elCircleValueTo
            .attr('cx', to.x)
            .attr('cy', to.y);


        var calcValue = ()  => {
            return this._value > 50 ? '1' : '0'
        }

        this._elValuePath
            .attr('d', 'M' + pointCentre.x + ' ' + pointCentre.y + ' A' + R + ' ' + R + ' 0, ' + calcValue() + ' 1,' + to.x + ' ' + to.y);
    }


    public set goal(value: number) {
        this._goal = value;
        this._drawGoal();
    }

    private _calcGoalXPos(pos: Point, width:number):number {
        return this._goal > 50 ? pos.x - 10 - width : pos.x + 10;
    }

    private _calcGoalYPos(y:number):number {
        if (this._goal > 95 || this._goal < 5) {
            return y - 20;
        } else if(this._goal > 85) {
            return y - 30;
        }
        return  y;
    }

    private _drawGoal() {
        const scaleDonut = new Donut(this._viewBox.center, R + goalScala.begin, R + goalScala.begin + goalScala.length);
        let line = new Line();

        for(let el of this._arrGoalScala) {
            el.remove();
        }
        this._arrGoalScala = [];


        for (let i = 0; i <= this._goal; i++) {
            scaleDonut.radiusOuter = R + goalScala.begin + i / this._goal * 10 + 3;
            let opacity =  i / this._goal + 0.3;
            line = scaleDonut.getInnerOuterSection(360 / 100 * i);

            let el = this.svgContainer.append("path")
                .attr('d', 'M' + line.begin.x + ' ' + line.begin.y + ' L' + line.end.x + ' ' + line.end.y)
                .attr('stroke', this.colorCircle)
                .attr('stroke-opacity', opacity)
                .attr('stroke-width', '3');

            this._arrGoalScala.push(el);
        }

        scaleDonut.radiusOuter = R + goalScala.begin + 18;
        line = scaleDonut.getInnerOuterSection(360 / 100 * this._goal);
        this._elGoalPointer
            .attr('d', 'M' + line.begin.x + ' ' + line.begin.y + ' L' + line.end.x + ' ' + line.end.y);

        this._elGoalValue.text(this._goal + ' %');
        const goalRect = helpers.getRect(this._elGoalTitle);
        this._elGoalTitle.attr("transform", d3Transform().translate([this._calcGoalXPos(line.end ,goalRect.width), this._calcGoalYPos(line.end.y) + 10]));
        this._elGoalValue.attr("transform", d3Transform().translate([this._calcGoalXPos(line.end ,goalRect.width), this._calcGoalYPos(line.end.y) + 3 + goalRect.height]));

    }
}



