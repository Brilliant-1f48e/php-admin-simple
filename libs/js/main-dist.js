/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormValidation": function() { return /* binding */ FormValidation; }
/* harmony export */ });
class FormValidation {
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


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageFactory": function() { return /* binding */ ImageFactory; },
/* harmony export */   "ImageURLFactory": function() { return /* binding */ ImageURLFactory; }
/* harmony export */ });
class ImageURLFactory {
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

class ImageFactory {
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

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputFile": function() { return /* binding */ InputFile; }
/* harmony export */ });
class InputFile {
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


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Modal": function() { return /* binding */ Modal; }
/* harmony export */ });
class Modal {
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

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Input": function() { return /* binding */ Input; }
/* harmony export */ });
class Input
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


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkOnMinLength": function() { return /* binding */ checkOnMinLength; }
/* harmony export */ });
/* harmony import */ var _checkFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


class checkOnMinLength extends _checkFactory__WEBPACK_IMPORTED_MODULE_0__.checkFactory
{
    _name = "Check on min length";

    check(value){
        return value.length >= this._condition;
    }
}


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkFactory": function() { return /* binding */ checkFactory; }
/* harmony export */ });
class checkFactory
{
    _condition;
    _name;

    constructor(condition) {
        this._condition = condition;
    }

    check(value){}

    get name(){
        return this._name;
    }

}


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkOnMaxLength": function() { return /* binding */ checkOnMaxLength; }
/* harmony export */ });
/* harmony import */ var _checkFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


class checkOnMaxLength extends _checkFactory__WEBPACK_IMPORTED_MODULE_0__.checkFactory
{
    _name = "Check on max length";

    check(value){
        return value.length <= this._condition;
    }
}


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkOnNull": function() { return /* binding */ checkOnNull; }
/* harmony export */ });
/* harmony import */ var _checkFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


class checkOnNull extends _checkFactory__WEBPACK_IMPORTED_MODULE_0__.checkFactory
{
    _name = "Check on null";

    check(value){
        return Boolean(value) === this._condition;
    }
}


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dispatcher": function() { return /* binding */ Dispatcher; }
/* harmony export */ });
class Dispatcher
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


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_form_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_image_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _modules_input_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _modules_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _modules_checkOnMinLength__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _modules_checkOnMaxLength__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _modules_checkOnNull__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _modules_dispatcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);











if (document.querySelector(".modal")){
    const modal = new _modules_modal__WEBPACK_IMPORTED_MODULE_3__.Modal(".modal");
}
if (document.querySelector(".form-auth")) {
    const inputLogin = new _modules_input__WEBPACK_IMPORTED_MODULE_4__.Input("[name='login']", {
        checks: [
            new _modules_checkOnMinLength__WEBPACK_IMPORTED_MODULE_5__.checkOnMinLength(4),
            new _modules_checkOnMaxLength__WEBPACK_IMPORTED_MODULE_6__.checkOnMaxLength(15),
            new _modules_checkOnNull__WEBPACK_IMPORTED_MODULE_7__.checkOnNull(true),
        ]
    });
    const inputPassword = new _modules_input__WEBPACK_IMPORTED_MODULE_4__.Input("[name='password']", {
        checks: [
            new _modules_checkOnMinLength__WEBPACK_IMPORTED_MODULE_5__.checkOnMinLength(4),
            new _modules_checkOnMaxLength__WEBPACK_IMPORTED_MODULE_6__.checkOnMaxLength(20),
            new _modules_checkOnNull__WEBPACK_IMPORTED_MODULE_7__.checkOnNull(true),
        ]
    });

    const formValidation = new _modules_form_validation__WEBPACK_IMPORTED_MODULE_0__.FormValidation(".form-auth", {
        inputs: [inputLogin, inputPassword]
    });

    const dispatcher = new _modules_dispatcher__WEBPACK_IMPORTED_MODULE_8__.Dispatcher();
    dispatcher.addTrigger(inputLogin, "input");
    dispatcher.addTrigger(inputPassword, "input")
    dispatcher.addListener(formValidation)
}

if (document.querySelector(".table-form")) {
    const imageFactory = new _modules_image_factory__WEBPACK_IMPORTED_MODULE_1__.ImageFactory(new _modules_image_factory__WEBPACK_IMPORTED_MODULE_1__.ImageURLFactory());
    const inputFile = new _modules_input_file__WEBPACK_IMPORTED_MODULE_2__.InputFile(
        "input[type='file']",
        imageFactory
    );
    const inputTitle = new _modules_input__WEBPACK_IMPORTED_MODULE_4__.Input("[name='title']", {
        checks: [
            new _modules_checkOnMinLength__WEBPACK_IMPORTED_MODULE_5__.checkOnMinLength(4),
            new _modules_checkOnMaxLength__WEBPACK_IMPORTED_MODULE_6__.checkOnMaxLength(20),
            new _modules_checkOnNull__WEBPACK_IMPORTED_MODULE_7__.checkOnNull(true),
        ]
    });
    const inputPrice = new _modules_input__WEBPACK_IMPORTED_MODULE_4__.Input("[name='price']", {
        checks: [
            new _modules_checkOnMinLength__WEBPACK_IMPORTED_MODULE_5__.checkOnMinLength(4),
            new _modules_checkOnMaxLength__WEBPACK_IMPORTED_MODULE_6__.checkOnMaxLength(20),
            new _modules_checkOnNull__WEBPACK_IMPORTED_MODULE_7__.checkOnNull(true),
        ]
    });

    const formValidation = new _modules_form_validation__WEBPACK_IMPORTED_MODULE_0__.FormValidation(".form", {
        inputs: [inputTitle, inputPrice],
        imageFactory: imageFactory
    });

    const dispatcher = new _modules_dispatcher__WEBPACK_IMPORTED_MODULE_8__.Dispatcher();
    dispatcher.addTrigger(inputTitle, "input");
    dispatcher.addTrigger(inputPrice, "input")
    dispatcher.addListener(formValidation)
}

}();
/******/ })()
;