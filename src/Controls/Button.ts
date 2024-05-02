import * as PIXI from 'pixi.js'

export default class Button extends PIXI.Container {
    protected graphics: PIXI.Graphics;

    constructor() {
        super();

        this.start();
    }

    start() {
        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0xFF0000, 0);
        this.graphics.drawRect(0, 0, 185, 185);
        this.graphics.endFill();
        this.addChild(this.graphics);

        let coords = [];
        coords.push(0, 0);
        coords.push(185, 0);
        coords.push(185, 185);
        coords.push(0, 185);

        this.hitArea = new PIXI.Polygon(coords);
    }
}