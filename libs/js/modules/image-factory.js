export class ImageURLFactory {
    #url = null;

    createURL(file) {
        if (this.#url) {
            this.removeURL();
        }
        this.#url = window.URL.createObjectURL(file);
        return this.#url;
    }

    removeURL() {
        if (this.#url) {
            window.URL.revokeObjectURL(this.#url);
            this.#url = null;
        }
    }
}

export class ImageFactory {
    #image = null;
    #imageURLFactory
    #previewImage = null;

    constructor(imageURLFactory, previewImage = null) {
        this.#imageURLFactory = imageURLFactory;
        this.#previewImage = previewImage;
    }

    createImage(file) {
        if (!this.#image) {
            this.#image = document.createElement("img");
            this.#image.alt = "Image preview";
            this.#image.className = "preview-input-file__image";
        }
        this.#image.src = this.#imageURLFactory.createURL(file);
        return this.#image;
    }

    removeImage() {
        this.#image.remove();
        this.#imageURLFactory.removeURL();
    }
}