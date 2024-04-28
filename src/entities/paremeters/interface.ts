/*
    Parameter entity interface
*/

import { IRule } from "../rule/interface";

export interface IParameter {
    id: string; // Unique identifier for the schema
    name: string; // Unique name of the schema
    schemaName: string; // Name of the schema
    label: string; // Label for the schema
    type: string; // Type of the schema
    placeholder: string; // Placeholder for the schema
    description: string; // Description of the schema
    row?: number; // Row number for the schema (optional)
    column?: number; // Column number for the schema (optional)
    defaultValue?: string; // Default value for the schema (optional)
    priority: number; // Priority of the schema
    createdAt: Date; // Date and time when the schema was created
    updatedAt: Date; // Date and time when the schema was last updated
    rules?: IRule[]; // Array of related Rule objects
    optionValues?: IOptionValue[]; // Array of related ParameterOption objects
}

export interface IOptionValue {
    id: string; // Unique identifier for the option value
    name: string; // Name of the option value
    type: string; // Type of the option value
    description: string; // Description of the option value
    value: string; // Value of the option value
    label: string; // Label for the option value
    createdAt: Date; // Date and time when the option value was created
    updatedAt: Date; // Date and time when the option value was last updated
}