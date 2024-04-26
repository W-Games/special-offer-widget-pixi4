import { event } from "../Event/Event";

export class Model {
    public assetPath: string;
    public audioPath: string;
    public animations: any;

    fireEvent(event: string, obj: any = null) {

        let myEvent = new CustomEvent(event, {
            detail: obj,
            bubbles: true,
            cancelable: true,
            composed: false,
        });

        dispatchEvent(myEvent);
    }
}

export let model: Model = new Model();