import {checkFactory} from "./checkFactory";

export class checkOnMinLength extends checkFactory
{
    _name = "Check on min length";

    check(value){
        return value.length >= this._condition;
    }
}
