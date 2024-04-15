import { IProperty } from "../property/interface";
import { IValidation } from "../validation/interface";

export interface IParameter {
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
}