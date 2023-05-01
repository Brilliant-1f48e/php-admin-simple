import {FormValidation} from "./modules/form-validation";
import {ImageFactory, ImageURLFactory} from "./modules/image-factory";
import {InputFile} from "./modules/input-file";
import {Modal} from "./modules/modal";
import {Input} from "./modules/input";
import {checkOnMinLength} from "./modules/checkOnMinLength";
import {checkOnMaxLength} from "./modules/checkOnMaxLength";
import {checkOnNull} from "./modules/checkOnNull";
import {Dispatcher} from "./modules/dispatcher";


if (document.querySelector(".modal")){
    const modal = new Modal(".modal");
}
if (document.querySelector(".form-auth")) {
    const inputLogin = new Input("[name='login']", {
        checks: [
            new checkOnMinLength(4),
            new checkOnMaxLength(15),
            new checkOnNull(true),
        ]
    });
    const inputPassword = new Input("[name='password']", {
        checks: [
            new checkOnMinLength(4),
            new checkOnMaxLength(20),
            new checkOnNull(true),
        ]
    });

    const formValidation = new FormValidation(".form-auth", {
        inputs: [inputLogin, inputPassword]
    });

    const dispatcher = new Dispatcher();
    dispatcher.addTrigger(inputLogin, "input");
    dispatcher.addTrigger(inputPassword, "input")
    dispatcher.addListener(formValidation)
}

if (document.querySelector(".table-form")) {
    const imageFactory = new ImageFactory(new ImageURLFactory());
    const inputFile = new InputFile(
        "input[type='file']",
        imageFactory
    );
    const inputTitle = new Input("[name='title']", {
        checks: [
            new checkOnMinLength(4),
            new checkOnMaxLength(20),
            new checkOnNull(true),
        ]
    });
    const inputPrice = new Input("[name='price']", {
        checks: [
            new checkOnMinLength(4),
            new checkOnMaxLength(20),
            new checkOnNull(true),
        ]
    });

    const formValidation = new FormValidation(".form", {
        inputs: [inputTitle, inputPrice],
        imageFactory: imageFactory
    });

    const dispatcher = new Dispatcher();
    dispatcher.addTrigger(inputTitle, "input");
    dispatcher.addTrigger(inputPrice, "input")
    dispatcher.addListener(formValidation)
}
