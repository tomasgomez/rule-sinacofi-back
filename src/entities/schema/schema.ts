import { IParameter } from "../paremeters/interface";
import { IRule } from "../rule/interface";

/*
    Schema entity interface
*/
interface ISchema {
    id: string;                 // Unique identifier for the form
    messageCode: string;        // Message code associated with the form
    description: string;        // Description of the form schema
    name: string;               // Name of the form
    createdAt: Date;            // Date and time the form was created
    updatedAt: Date;            // Date and time the form was last updated
    parameters: IParameter[];  // Array of related Parameter objects
    rules: IRule[];             // Array of related Rule objects
}

// Define ISChemaFilter interface
// type ISchemaFilter = {
//     [Parameter in keyof ISchema]: boolean;
// }
// Define ISChemaFilter interface with nested filtering for parameters
type ISchemaFilter = {
    [key in keyof ISchema]?: boolean; // Base structure
};


// Define IOptionalSchema interface
type IOptionalSchema = {
    [key in keyof ISchema]?: ISchema[key];
};

// Define Schema class
class Schema implements ISchema {
    id: string;
    messageCode: string;
    description: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    parameters: IParameter[];
    rules: IRule[];

    constructor(id: string, messageCode: string, description: string, name: string, createdAt: Date, updatedAt: Date, parameters: IParameter[], rules: IRule[]) {
        this.id = id;
        this.messageCode = messageCode;
        this.description = description;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.parameters = parameters;
        this.rules = rules;
    }
    
}


export { ISchema, ISchemaFilter, Schema, IOptionalSchema };

