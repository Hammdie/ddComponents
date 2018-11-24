
export class Point {
    constructor(public x: number = 0, public y: number = 0){

    };
}

export class Base {
    constructor(public pos: Point){};
}

export class Rect extends Base {
    constructor(public pos: Point, public height: number=0, public width: number=0){
        super(pos);
    }

    public centreRect(rect: Rect): Rect {
        rect.pos.y = (this.height - rect.height) / 2;
        rect.pos.x = (this.width - rect.width) / 2;

        return rect;
    }

}

export class Square extends Rect {
    constructor(public pos: Point, public side: number){
        super(pos, side, side);
    };

    public get center(): Point {
        const res = new Point();
        res.x = this.pos.x + this.side / 2;
        res.y = this.pos.y + this.side / 2;
        return res;
    }

}

export class Circle extends Base{
    constructor(public center: Point, public radius: number){
        super(center);
    };

    public point(angle: number): Point {
        const jsAngle = 90 - angle;
        var jsAngleRadian = jsAngle === 0 ? 0 : jsAngle * Math.PI / 180;
        var dX = this.radius * Math.cos(jsAngleRadian);
        var dY = this.radius * Math.sin(jsAngleRadian);
        return new Point(this.center.x + dX, this.center.y - dY);
    }
}

export class Line extends Base{
    constructor(public begin: Point = new Point(), public end:Point = new Point()){
        super(begin);
    };
}

export class Donut extends Base {
    private inner:Circle;
    private outer:Circle;
    constructor(public center: Point, radiusInner: number, radiusOuter: number) {
        super(center);
        this.inner = new Circle(center, radiusInner);
        this.outer = new Circle(center, radiusOuter);
    }

    public set radiusOuter(val) {
        this.outer.radius = val;
    }

    public getInnerOuterSection(angle: number): Line{
        const begin = this.inner.point(angle);
        const end = this.outer.point(angle);
        return new Line(begin, end);
    }
}


