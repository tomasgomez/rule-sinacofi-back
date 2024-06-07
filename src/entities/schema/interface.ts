import { MessageParameter, Parameter } from "../paremeters/interface";
import { Rule } from "../rule/interface";

/*
    Schema entity interface
*/
type Schema = {
    id: string;                                  // Unique identifier for the form
    messageCode: string;                         // Message code associated with the form
    description: string;                         // Description of the form schema
    name: string;                                // Name of the form
    createdAt: Date;                             // Date and time the form was created
    updatedAt: Date;                             // Date and time the form was last updated
    parameters: Parameter[] | MessageParameter[]; // Array of related Parameter objects
    rules: Rule[];                               // Array of related Rule objects
}

// Define ISChemaFilter interface with nested filtering for parameters
type SchemaFilter = {
    [key in keyof Schema]?: boolean; // Base structure
};


// Define IOptionalSchema interface
type OptionalSchema = Partial<Schema>

export { Schema, SchemaFilter, OptionalSchema };
