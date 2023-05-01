export class checkFactory
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
