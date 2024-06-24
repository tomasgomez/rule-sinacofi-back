/*
    Parameter entity interface
*/

import { Action } from "../actions/interface";
import { Rule } from "../rule/interface";

export interface Parameter {
    id: string; // Unique identifier for the schema
    name: string; // Unique name of the schema
    messageCode: string; // Name of the schema
    label: string; // Label for the schema
    type: string; // Type of the schema
    placeholder: string; // Placeholder for the schema
    description: string; // Description of the schema
    row?: number | null; // Row number for the schema (optional)
    column?: number | null; // Column number for the schema (optional)
    defaultValue?: string | null; // Default value for the schema (optional)
    priority: number; // Priority of the schema
    createdAt: Date; // Date and time when the schema was created
    updatedAt: Date; // Date and time when the schema was last updated
    rules?: Rule[]; // Array of related Rule objects
    optionValues?: OptionValue[]; // Array of related ParameterOption objects
    actions?: Action[] // array of actions
}

export interface OptionValue {
    name: string; // Name of the option value
    type: string; // Type of the option value
    description: string; // Description of the option value
    value: string; // Value of the option value
    label: string; // Label for the option value
    createdAt: Date; // Date and time when the option value was created
    updatedAt: Date; // Date and time when the option value was last updated
}

// Define OptionalParameter interface
export type OptionalParameter = Partial<Parameter>

// Parameter Interface 
export type MessageParameter = Pick<OptionalParameter, 'name' | 'messageCode' | 'priority'| 'rules' | 'type' | 'optionValues'> & {
    value: string // message parameter value
}