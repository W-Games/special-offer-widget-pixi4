import * as PIXI from 'pixi.js'
import { event  } from "./Event/Event";
import { model } from "./Model/Model";

export class Timer extends PIXI.Container {
    protected countDownTimer: any;
    protected animationTimer: number = 5;
    protected graphicType: string;

    constructor() {
        super();

        this.setStaticTime();
    }
    
    setStaticTime() {
        this.graphicType = "static";
        
        this.countDownTimer = setTimeout(this.stopTimer.bind(this), 5000);
    }

    setAnimatedTime() {
        this.graphicType = "animated";
        
        this.countDownTimer = setTimeout(this.stopTimer.bind(this), 1000);
    }
    
    stopTimer(): void {
        clearTimeout(this.countDownTimer);
        
        model.fireEvent(event.TIMER_FINISHED, this.graphicType);

        if (this.graphicType == "static") {
            this.setAnimatedTime();
        }
        else {   
            this.setStaticTime();
        }
    }
}