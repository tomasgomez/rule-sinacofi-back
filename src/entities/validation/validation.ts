import { IValidation } from "./interface";

class Validation implements IValidation {
    required: boolean;
    maxLength: number;
    minLength: number;
    
        constructor(required: boolean, maxLength: number, minLength: number) {
            this.required = required;
            this.maxLength = maxLength;
            this.minLength = minLength;
        }
}