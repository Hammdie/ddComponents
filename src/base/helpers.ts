import * as d3 from 'd3';
import {Circle, Point, Rect} from "./Primitives";

const d3Transform = require('d3-transform').transform;


export function getRect(el): Rect {
    const res = el.node().getBBox();
    return new Rect(new Point(res.x, res.y), res.height, res.width);
}

export function getWidth(el) {
    return el.node().getBBox().width;
}

export function getHeight(el) {
    return el.node().getBBox().height;
}

export function center(rectEl, el) {
    var y = (getHeight(rectEl) - getHeight(el)) / 2;
    var x = (getWidth(rectEl) - getWidth(el)) / 2;

    el.attr("transform", d3Transform().translate([x, y + 50]));
}

export function getCentre(size: number, R: number) {
    return {x: size / 2, y: (size - R * 2) / 2};
}


export function valueInPercentsToPoint(valueInPercents: number, circle: Circle): Point {
    const angle = 360 / 100 * valueInPercents;
    return circle.point(angle);
}

