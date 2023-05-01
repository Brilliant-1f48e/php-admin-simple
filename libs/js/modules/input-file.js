export class InputFile {
    #input;
    #imageFactory;
    #previewInputFile;
    #imagePreview;

    constructor(selector, imageFactory) {
        this.#input = document.querySelector(selector);
        this.#imageFactory = imageFactory;

        this.#setup();
    }

    #setup() {
        this.#previewInputFile = document.querySelector(".preview-input-file")
        this.#imagePreview = document.querySelector(".preview-input-file__image");
        this.#bindEventListeners();
    }

    #bindEventListeners() {
        this.changeHandler = this.changeHandler.bind(this);
        this.#input.addEventListener("change", this.changeHandler);

        this.clickHandler = this.clickHandler.bind(this);
        this.#previewInputFile.addEventListener("click", this.clickHandler);
    }

    #deletePreviewImage(){
        this.#imagePreview.remove();
        this.#imagePreview = null;
    }
    clickHandler(event) {
        if (this.#imagePreview) {
            this.#deletePreviewImage()
            return;
        }
        this.#imageFactory.removeImage();
    }

    changeHandler(event) {
        if (this.#imagePreview) {
            this.#deletePreviewImage()
        }
        const target = event.currentTarget;
        const file = target.files[0];
        if (file) {
            let image = this.#imageFactory.createImage(file);
            this.#previewInputFile.insertAdjacentElement("beforeend", image);
        }
    }
}
