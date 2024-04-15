import { IEvent } from "../event/interface";

/*
 * Interface representing a validation rule.
 */

export interface IRule {
    id: number;                 // Unique identifier for the rule
    name: string;               // Name of the validation rule
    description: string;        // Description of the validation rule
    fieldName: string;          // Name of the field to be validated
    condition: string;          // Type of validation condition (e.g., 'MAX_LENGTH', 'EMAIL_VALIDATION')
    value: string;              // Expected value for the validation
    schemaId: number;           // Associated schema Id
    priority: number;           // Priority of the rule
    event?: IEvent | null;      // Rule object
    eventId?: number;            // Event Id
  }