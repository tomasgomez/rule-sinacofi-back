import { IRule } from "../rule/interface";
import { IParameter, IOptionValue } from "./interface";

export class Parameter implements IParameter {
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
    rules: IRule[]; // Array of related Rule objects
    optionValues: IOptionValue[]; // Array of related ParameterOption objects

    constructor(
        id: string,
        name: string,
        schemaName: string,
        label: string,
        type: string,
        placeholder: string,
        description: string,
        priority: number,
        createdAt: Date,
        updatedAt: Date,
        rules: IRule[],
        optionValues: IOptionValue[],
        row?: number,
        column?: number,
        defaultValue?: string
    ) {
        this.id = id;
        this.name = name;
        this.schemaName = schemaName;
        this.label = label;
        this.type = type;
        this.placeholder = placeholder;
        this.description = description;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.rules = rules;
        this.optionValues = optionValues;
        this.row = row;
        this.column = column;
        this.defaultValue = defaultValue;
    }
}