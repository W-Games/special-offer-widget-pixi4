export default class Event {
    public ANIMATION_TICK: string = "ANIMATION_TICK";
    public CLICK: string = "CLICK";
    public RESIZE: string = "RESIZE";
    public TIMER_FINISHED: string = "TIMER_FINISHED";
    public TIMER_TICK: string = "TIMER_TICK";
}

export let event: Event = new Event();