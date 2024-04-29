export default class Event {
    public CLICK: string = "CLICK";
    public TIMER_FINISHED: string = "TIMER_FINISHED";
    public TIMER_TICK: string = "TIMER_TICK";
    public ANIMATION_TICK: string = "ANIMATION_TICK";
    public RESIZE: string = "RESIZE";
}

export let event: Event = new Event();