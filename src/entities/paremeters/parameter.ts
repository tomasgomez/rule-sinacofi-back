import { IProperty } from "../property/interface";
import { IValidation } from "../validation/interface";
import { IParameter } from "./interface";

export class Parameter implements IParameter {
    id: string;
    name: string;
    label: string;
    type: string;
    description: string;
    placeholder: string;
    value: string;
    defaultValue: string;
    validations: IValidation;
    properties: IProperty;

    constructor(id: string, name: string, label: string, type: string, description: string, defaultValue: string, placeholder: string, value: string, validations: IValidation, properties: IProperty) {
        this.id = id;
        this.name = name;
        this.label = label;
        this.type = type;
        this.description = description;
        this.placeholder = placeholder;
        this.defaultValue = defaultValue;
        this.value = value;
        this.validations = validations;
        this.properties = properties;
    }
}

