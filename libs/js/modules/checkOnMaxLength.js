import {checkFactory} from "./checkFactory";

export class checkOnMaxLength extends checkFactory
{
    _name = "Check on max length";

    check(value){
        return value.length <= this._condition;
    }
}
