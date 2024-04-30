import * as PIXI from 'pixi.js'

export default class Button extends PIXI.Container {
    constructor() {
        super();

        this.start();
    }

    start() {
        let graphics = new PIXI.Graphics()
        graphics.beginFill(0xFF0000, 0);
        graphics.drawRect(0, 0, 108, 108);
        graphics.endFill();
        this.addChild(graphics);
        
        let coords = [];
        coords.push(0, 0);
        coords.push(108, 0);
        coords.push(108, 108);
        coords.push(0, 108);

        this.hitArea = new PIXI.Polygon(coords);
    }
}