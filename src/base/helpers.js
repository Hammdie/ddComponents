var d3Transform = require('d3-transform').transform;
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
export function getCentre(size, R) {
    return { x: size / 2, y: (size - R * 2) / 2 };
}
export function valueInPercentsToPoint(valueInPercents, circle) {
    var angle = 360 / 100 * valueInPercents;
    return circle.point(angle);
}
//# sourceMappingURL=helpers.js.map