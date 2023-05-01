export class Dispatcher
{
    #listeners = [];
    #triggers = {};

    addListener(listener){
        this.#listeners = [...this.#listeners, listener];
    }

    addTrigger(trigger, event){
        this.#triggers[trigger.getEl.name] = {trigger: trigger, event: event};

        this.eventHandler = this.eventHandler.bind(this);
        trigger.getEl.addEventListener(event, this.eventHandler);
    }

    eventHandler(event){
        switch (event.type){
            case "input":
                this.#triggers[event.currentTarget.name]["trigger"].inputHandler(event);
                break;
            case "change":
                this.#triggers[event.currentTarget.name]["trigger"].changeHandler(event);
                break;
        }
        this.#call(event);
    }

    #call(event){
        this.#listeners.forEach(listener => listener.update(event));
    }
}
