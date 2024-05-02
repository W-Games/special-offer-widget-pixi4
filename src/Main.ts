import 'pixi.js';

import Button from './Controls/Button';
import WebFont from "webfontloader"

import { DropShadowFilter } from '@pixi/filter-drop-shadow';
import { event } from "./Event/Event";
import { layout } from "./Layout/skin/Layout";
import { TweenMax } from "gsap";
import { Timer } from './Timer';

export class Main extends PIXI.Container {
    protected assets: any;
    protected config: any;

    protected renderer: any;
    protected stage: PIXI.Container;
    protected gameContainer: PIXI.Container;
    
    protected specialOffer: PIXI.extras.AnimatedSprite;
    protected specialOfferStatic: PIXI.Sprite;
    protected button: Button;
    protected textField: PIXI.Text;
    protected timer: Timer;
    protected ratio: number;
    protected dropShadow: DropShadowFilter;

    protected storedWidth: number = 0;
    protected storedHeight: number = 0;

    protected layout: any;
    
    constructor($config: any = null, $assets: any = null) {
        super();

        this.assets = $assets;
        this.config = $config;
        
        this.ratio = layout.GAME.game.width / layout.GAME.game.height;
        
        window.addEventListener("message", this.messageHandler.bind(this));
        
        addEventListener(event.TIMER_FINISHED, (event) => { this.setGraphicVisibility(event) });
        
        let view: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
        
        this.renderer = PIXI.autoDetectRenderer(layout.GAME.game.width, layout.GAME.game.height, { view: view, transparent: true });
        
        this.gameContainer = new PIXI.Container();
        this.gameContainer.addChild(this);
        
        this.stage = new PIXI.Container();
        this.stage.addChild(this.gameContainer);
        
        this.gameLoop();

        this.start();
    }

    gameLoop() {
        requestAnimationFrame(this.gameLoop.bind(this));
                                                                            
        this.renderer.render(this.stage);

        // this.resize();
    }

    start() {  
        this.loadFonts();
    }

    loadFonts() {
        if (layout.FONTS.google != null) {
            WebFont.load({
                google: {
                    families: layout.FONTS.google.families
                },
                active: this.onFontActive.bind(this),
            });
        }
    }

    onFontActive() {
        this.loadAssets();
    }

    loadAssets() {
        for (let i: number = 0; i < this.assets.url_textures.length; i++) {
            PIXI.loader.add(this.assets.url_textures[i]);
        }
        
        PIXI.loader
            .on('progress', this.onAssetsProgress.bind(this))
            .once('complete', this.onAssetsComplete.bind(this))
            .load(null)
    }
    
    onAssetsProgress(event: any) {
        let num: number = event.progress;
        
        // console.log("Assets loaded %: ", num);
    }
    
    onAssetsComplete() {
        this.layout = layout.SPECIAL_OFFER;

        this.specialOfferStatic = new PIXI.Sprite(PIXI.Texture.fromFrame(this.layout.specialOfferStatic.texture));
        this.specialOfferStatic.pivot.x = Math.floor(this.specialOfferStatic.width / 2);
        this.specialOfferStatic.pivot.y = Math.floor(this.specialOfferStatic.height / 2);
        this.specialOfferStatic.x = this.layout.specialOfferStatic.x;
        this.specialOfferStatic.y = this.layout.specialOfferStatic.y;
        this.addChild(this.specialOfferStatic);

        var frames = [];
        for (var i: number = 1; i <= 56; i++) {
            var val = i < 10 ? '0' + i : i;
            frames.push(PIXI.Texture.fromFrame(this.layout.specialOffer.texture + "" + val + ".png"));
        }

        this.specialOffer = new PIXI.extras.AnimatedSprite(frames);
        this.specialOffer.pivot.x = Math.floor(this.specialOffer.width / 2);
        this.specialOffer.pivot.y = Math.floor(this.specialOffer.height / 2);
        this.specialOffer.x = this.layout.specialOffer.x;
        this.specialOffer.y = this.layout.specialOffer.y;
        this.specialOffer.loop = false;
        this.specialOffer.visible = false;
        this.specialOffer.interactive = false;
        this.addChild(this.specialOffer);

        this.layout = layout.TEXTFIELD;

        this.dropShadow = new DropShadowFilter();
        this.dropShadow.blur = .3;
        this.dropShadow.alpha = 1;
        this.dropShadow.distance = 2;
        this.dropShadow.rotation = 90;
        this.dropShadow.color = 0x000000;

        this.textField = new PIXI.Text(this.layout.textfield.label, this.layout.textfield.font);
        this.textField.pivot.x = Math.floor(this.textField.width / 2);
        this.textField.pivot.y = Math.floor(this.textField.height / 2);
        this.textField.x = this.layout.textfield.x;
        this.textField.y = this.layout.textfield.y;
        this.textField.filters = [this.dropShadow];
        this.addChild(this.textField);
        
        this.layout = layout.SPECIAL_OFFER;
        
        this.button = new Button();
        this.button.pivot.x = Math.floor(this.button.width / 2);
        this.button.pivot.y = Math.floor(this.button.height / 2);
        this.button.x = this.layout.specialOffer.x;
        this.button.y = this.layout.specialOffer.y;
        this.button.alpha = 1;
        this.button.interactive = true;
        this.button.addListener("click", this.onClickDeal.bind(this));
        this.addChild(this.button);

        this.timer = new Timer();
        this.addChild(this.timer);
        
        this.scale.x = this.scale.y = layout.GAME.game.scale;
        
        // this.alpha = 0;
    }
    
    showWidget() {
        this.alpha = 0;
        TweenMax.to(this, .5, { alpha: 1 });
    }
    
    hideWidget() {
        TweenMax.to(this, .5, { alpha: 0 });
    }
   
    updateTimer(value: string) {
        this.textField.text = value;
        this.textField.pivot.x = Math.floor(this.textField.width / 2);
    }

    onClickDeal(event: Event): void {
        this.updateTimer("CLICKED");

        let jsonData = { 
			"_type": "HRD.DealClicked"
		}; 

        window.postMessage({
            message: JSON.stringify(jsonData),
        }, '*');
    }

    setGraphicVisibility(event: any): void {
        if (event.detail == "static") {
            // static image timer has finished so we show the animated png
            this.specialOffer.visible = true;
            this.specialOffer.gotoAndPlay(0);

            this.specialOfferStatic.visible = false;
            
        }
        else {
            this.specialOfferStatic.visible = true;

            this.specialOffer.visible = false;
            this.specialOffer.gotoAndStop(0);
        }
    }
    
    messageHandler(event: any) {
        if (event.data != null) {      
            let message = JSON.parse(event.data.message);
            
            switch(message._type) {
                case "HRD.HideDeal": {
                    this.hideWidget();
                    break;
                }
                case "HRD.ShowDeal": {
                    this.showWidget();
                    break;
                }
                case "HRD.UpdateTimer": {
                    this.updateTimer(message._time);
                    break;
                }
            }
        }
    }

    resize() {
        let clientWidth: number;
        let clientHeight: number;

        clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        let newClientWidth: number = clientWidth;
        let newClientHeight: number = clientHeight;

        if (this.storedWidth !== newClientWidth || this.storedHeight !== newClientHeight) {
            let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

            this.storedWidth = newClientWidth;
            this.storedHeight = newClientHeight;
            
            let width: number;
            let height: number;

            let ratio: number = canvas.width / canvas.height;

            if (newClientWidth / newClientHeight >= ratio) {
                width = (newClientHeight) * ratio;
                height = newClientHeight;
            }
            else {
                width = newClientWidth;
                height = (newClientWidth) / ratio;
            }

            this.renderer.view.style.width = `${width}px`;
            this.renderer.view.style.height = `calc(${height}px - env(safe-area-inset-bottom))`;

            this.renderer.resize(canvas.width, canvas.height);
        }

        window.scrollTo(0, -1)
    }
}