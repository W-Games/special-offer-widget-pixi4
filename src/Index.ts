import { Main } from './Main';

class Index extends Main {
    constructor($config: any = null) {
        
        const path = "/output";
        const assets = {
            url_textures: [
                path + "/games/special_offer/assets/textures/SpecialOffer-0.json",
                path + "/games/special_offer/assets/textures/SpecialOffer-1.json"
            ],
            font: {
                google: {
                    families: ["Roboto:400,500,600,700,900"]
                }
            }
        }
        
        super($config, assets);
    }
}

new Index();