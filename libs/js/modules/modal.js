export class Modal {
    #el;
    #options = {};

    #inputForm;

    constructor(selector, options = {}) {
        this.#el = document.querySelector(selector);
        this.#options = options;
        this.#setup();
    }

    #setup() {
        this.#inputForm = this.#el.querySelector("input");
        this.#bindEventListeners();
    }

    #bindEventListeners() {
        this.clickHandler = this.clickHandler.bind(this);
        document.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", this.clickHandler));
    }

    clickHandler(event){
        console.log(event.currentTarget);
        const {action} = event.currentTarget.dataset;

        if (action === "open"){
            this.open(event.currentTarget.dataset.deleteId);
        } else if (action === "close") {
            this.close();
        }
    }
    #unbindEventListeners() {

    }

    open(id) {
        this.#inputForm.setAttribute("value", id);
        this.#el.classList.add("_open");
    }

    close() {
        this.#inputForm.removeAttribute("value");
        this.#el.classList.remove("_open");
    }
}