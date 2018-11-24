var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    ;
    return Point;
}());
export { Point };
var Base = /** @class */ (function () {
    function Base(pos) {
        this.pos = pos;
    }
    ;
    return Base;
}());
export { Base };
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(pos, side) {
        var _this = _super.call(this, pos) || this;
        _this.pos = pos;
        _this.side = side;
        return _this;
    }
    ;
    Object.defineProperty(Square.prototype, "center", {
        get: function () {
            var res = new Point();
            res.x = this.pos.x + this.side / 2;
            res.y = this.pos.y + this.side / 2;
            return res;
        },
        enumerable: true,
        configurable: true
    });
    return Square;
}(Base));
export { Square };
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(center, radius) {
        var _this = _super.call(this, center) || this;
        _this.center = center;
        _this.radius = radius;
        return _this;
    }
    ;
    Circle.prototype.point = function (angle) {
        var jsAngle = 90 - angle;
        var angle = angle === 0 ? 0 : angle * Math.PI / 180;
        var dX = this.radius * Math.cos(jsAngle);
        var dY = this.radius * Math.sin(jsAngle);
        return new Point(this.center.x + dX, this.center.y - dY);
    };
    return Circle;
}(Base));
export { Circle };
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line(begin, end) {
        var _this = _super.call(this, begin) || this;
        _this.begin = begin;
        _this.end = end;
        return _this;
    }
    ;
    return Line;
}(Base));
export { Line };
var Donut = /** @class */ (function (_super) {
    __extends(Donut, _super);
    function Donut(center, radiusInner, radiusOuter) {
        var _this = _super.call(this, center) || this;
        _this.center = center;
        _this.radiusInner = radiusInner;
        _this.radiusOuter = radiusOuter;
        _this.inner = new Circle(center, radiusInner);
        _this.outer = new Circle(center, radiusOuter);
        return _this;
    }
    Donut.prototype.getInnerOuterSection = function (angle) {
        var begin = this.inner.point(angle);
        var end = this.outer.point(angle);
        return new Line(begin, end);
    };
    return Donut;
}(Base));
export { Donut };
//# sourceMappingURL=Primitives.js.map