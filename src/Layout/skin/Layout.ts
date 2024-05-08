class Layout {
    public GAME: any = {
        game: { width: 256, height: 256, scale: 1},
    }
    
    public FONTS: any = {
        google: {
            families: ['Roboto:500,600,800,700,900']
        },
    }

    public SPECIAL_OFFER: any = {
        specialOffer: { x: 128, y: 128, texture: "UI_Widget_SpecialOffer" },
        specialOfferStatic: { x: 128, y: 128, texture: "UI_Widget_SpecialOffer_Static.png" },
    } 

    public TEXTFIELD: any = {
        textfield: { x: 128, y: 199, label: "", align: 'center', font: { align: 'center', fontFamily: 'Roboto', fontSize: '25px', fontWeight: '700', fill: '#FFFFFF', stroke: '#FFFFFF', strokeThickness: 0, miterLimit: 2 }},
    }
}

export let layout: Layout = new Layout();