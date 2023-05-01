import {checkFactory} from "./checkFactory";

export class checkOnNull extends checkFactory
{
    _name = "Check on null";

    check(value){
        return Boolean(value) === this._condition;
    }
}
