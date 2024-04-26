class Layout {
    public GAME: any = {
        game: { width: 500, height: 335 },
    }
    
    public FONTS: any = {
        google: {
            families: ['Roboto:400,500,600,700,900']
        },
    }

    public SPECIAL_OFFER: any = {
        specialOffer: { x: 64, y: 64, scale: .5, texture: "UI_Widget_SpecialOffer" },
        specialOfferStatic: { x: 64, y: 64, scale: .5, texture: "UI_Widget_SpecialOffer_Static.png" },
    } 

     public TEXTFIELD: any = {
        textfield: { x: 64, y: 100, label: "00:00", align: 'center', font: { align: 'center', fontFamily: 'Roboto', fontSize: '14px', fontWeight: '600', fill: '#FFFFFF', stroke: '#FFFFFF', strokeThickness: 0, miterLimit: 2 }},
    }
}

export let layout: Layout = new Layout();