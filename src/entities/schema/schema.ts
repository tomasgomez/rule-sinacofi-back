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
type ISchemaFilter = {
    [Parameter in keyof ISchema]: boolean;
};

// Define IOptionalSchema interface
type IOptionalSchema = {
    [key in keyof ISchema]?: ISchema[key];
};

// Define Schema class
class Schema implements ISchema {
    constructor(
        public id: string,
        public messageCode: string,
        public description: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public parameters: IParameter[],
        public rules: IRule[]
    ) {}
    
}


export { ISchema, ISchemaFilter, Schema, IOptionalSchema };

