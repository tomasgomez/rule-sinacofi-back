import { InternalError } from "../internalError/error";
import { IEvent } from "../event/interface";
import { IRule } from "./interface";
import { RuleTypes } from "./ruleTypes";
import { InputValue, validate } from "./ruleValidation";
import { Parameter } from "../paremeters/parameter";

/**
 * Rule class is responsible for handling the rule entity. 
 */
class Rule implements IRule {

    // constructor
    constructor(
        public id: string, 
        public name: string, 
        public description: string, 
        public fieldName: string, 
        public condition: RuleTypes, 
        public value: string, 
        public parameterId: string,
        public priority: number,
        public parameter?: Parameter,
        public event?: IEvent | null,
        public eventId?: string
    ) {}

    // setEvent
    setEvent = (event: IEvent) => this.event = event;
    // validate the rule based on the condition
    executeRule = (inputValue: InputValue): boolean | InternalError => validate(this.condition, inputValue, this.value)
    

}

export { Rule };