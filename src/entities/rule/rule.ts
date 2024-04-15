import { InternalError } from "../internalError/error";
import { IEvent } from "../event/interface";
import { IRule } from "./interface";
import { RuleTypes } from "./ruleTypes";
import { InputValue, validate } from "./ruleValidation";

/**
 * Rule class is responsible for handling the rule entity. 
 */
class Rule implements IRule {

    // constructor
    constructor(
        public id: number, 
        public name: string, 
        public description: string, 
        public fieldName: string, 
        public condition: RuleTypes, 
        public value: string, 
        public schemaId: number, 
        public priority: number,
        public event?: IEvent | null,
        public eventId?: number
    ) {}

    // setEvent
    setEvent = (event: IEvent) => this.event = event;
    // validate the rule based on the condition
    executeRule = (inputValue: InputValue): boolean | InternalError => validate(this.condition, inputValue, this.value)
    

}

export { Rule };