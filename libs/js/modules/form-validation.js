export class FormValidation {
    #el;
    #buttonSubmit;
    #options = {};
    #inputs = [];
    #imageFactory = null;

    constructor(selector, options) {
        this.#el = document.querySelector(selector);
        this.#options = options;

        this.#setup();
    }

    #setup() {
        const {inputs, imageFactory} = this.#options;
        if (inputs) this.#setInputs(inputs);
        if (imageFactory) this.setImageFactory(imageFactory);

        this.#buttonSubmit = this.#el.querySelector(".button");

        this.#bindEventListeners();
        this.#validation();
    }

    #setInputs(inputs){
        this.#inputs = [...this.#inputs, ...inputs];
    }
    setImageFactory(imageFactory){
        this.#imageFactory = imageFactory;
    }

    #bindEventListeners() {
        if (this.#imageFactory) {
            this.submitHandler = this.submitHandler.bind(this);
            this.#el.addEventListener("submit", this.submitHandler);
        }
    }

    submitHandler(event) {
        if (this.#imageFactory) {
            this.#imageFactory.removeImage();
        }
    }

    #check(){
        for (const input in this.#inputs){
            if (!this.#inputs[input].getState) return false;
        }
        return true;
    }

    #validation() {
        if (this.#check()) {
            this.#buttonSubmit.removeAttribute("disabled");
        } else {
            this.#buttonSubmit.setAttribute("disabled", true);
        }
    }

    update(event){
        this.#validation();
    }
}
