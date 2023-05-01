export class Input
{
    #el;
    #value = "";
    #state = false;
    #checks = [];
    #options = {};
    
    constructor(selector, options) {
        this.#el = document.querySelector(selector);
        this.#options = options;

        this.#setup()
    }

    #setup(){
        const {checks} = this.#options;
        if (checks) this.#setChecks(checks);
    }

    #setChecks(checks){
        this.#checks = [...this.#checks, ...checks];
    }
    inputHandler(event){
        const target = event.currentTarget;
        const value = target.value.trim();
        this.setValue(value);
        this.validation();
    }
    validation(){
        for (const check in this.#checks) {
            if (!this.#checks[check].check(this.#value)) {
                this.setState(false);
                return;
            }
        }
        this.setState(true);
    }

    get getEl(){
        return this.#el;
    }

    get getValue(){
        return this.#value;
    }

    setValue(value){
        this.#value = value;
    }

    get getState(){
        return this.#state;
    }

    setState(state){
        this.#state = state;
    }
}
