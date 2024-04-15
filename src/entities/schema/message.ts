// schema.entity.ts
export interface Schema {
    id: number;                 // Unique identifier for the form
    messageCode: string;        // Message code associated with the form
    description: string;        // Description of the form schema
    name: string;               // Name of the form
    createdAt: Date;            // Date and time the form was created
    updatedAt: Date;            // Date and time the form was last updated
  }
  
  // parameters.entity.ts
  export interface Parameter {
    id: number;                           // Unique identifier for the form field
    schemaId: number;                       // ID of the schema this field belongs to
    description: string;                  // Description of the parameter
    row?: number;                         // Width of the field in pixels (optional)
    column?: number;                      // Height of the field in pixels (optional)
    defaultValue?: string;                // Default value for the field (optional)
    validationRule: Record<string, any>;  // Validation rule for the field (e.g., { required: true, minLength: 5 })
    priority: number;                     // Order of the field in the form
  }
  
  // fields.entity.ts
  export interface Field {
    id: number;                 // Unique identifier for the form field
    label: string;              // Label displayed for the field
    description: string;        // Description of the field
    type: string;               // Type of the field (e.g., "text", "number", "select", "checkbox")
    placeholder: string;        // Placeholder displayed for the field
  }
  
  // parameter-options.entity.ts
  export interface ParameterOption {
    id: number;                 // Unique identifier for the field option
    parameterId: number;        // ID of the parameter this option belongs to
    description: string;        // Description of the field option
    value: string;              // Value of the option
    label: string;              // Label displayed for the option
  }
  
  export interface MessageParameterValue {
    parameterId: number;        // ID of the parameter this value belongs to
    messageId?: number;         // ID of the message this value belongs to
    value: string;              // Value submitted for the field
  }
  
  // statuses.entity.ts
  export interface Status {
    id: number;                 // Unique identifier for the status data entry
    messageId: number;          // ID of the message (message data) this status belongs to
    createdAt: Date;            // Date and time the status data was submitted
    updatedAt: Date;            // Date and time the status data was updated
    userId: string;             // User ID associated with the status
    value: string;              // Value of the status
  }

  /* EXAMPLE of a json combining all the interfaces with one message structure
{
  {
  "id": 1,
  "messageCode": "670",
  "description": "Alzamiento Hipotecario",
  "name": "670-AlzamientoHipotecario",
  "createdAt": "2021-01-01T12:00:00.000Z",
  "updatedAt": "2021-01-01T12:00:00.000Z"
},
"parameters": [
  {
    "id": 1,
    "schemaId": "670",
    "description": "messageCode",
    "row": 1,
    "column": 2,
    "defaultValue": "Código de mensaje",
    "validationRule": {
      "required": true,
      "minLength": 3
    },
    "priority": 1
  },
  {
    "id": 2,
    "schemaId": "670",
    "description": "Institución Destino",
    "row": 2,
    "column": 2,
    "defaultValue": "0012-BANCO ESTADO",
    "validationRule": {
      "required": true
    },
    "priority": 2
  },
  {
    "id": 3,
    "schemaId": "670",
    "description": "Prioridad",
    "row": 3,
    "column": 2,
    "defaultValue": "02-Normal Sin Aviso de Entrega",
    "validationRule": {
      "required": true
    },
    "priority": 3
  },
  {
    "id": 4,
    "schemaId": "670",
    "description": "Autenticación",
    "row": 4,
    "column": 2,
    "defaultValue": "No",
    "validationRule": {
      "required": true
    },
    "priority": 4
  },
  {
    "id": 5,
    "label": "SGA (Canal)",
    "description": "SGA",
    "row": 1,
    "column": 1,
    "defaultValue": "Personas",
    "validationRule": {
      "required": true
    },
    "priority": 1
  },
  {
    "id": 6,
    "label": "CW7",
    "description": "CW7",
    "row": 1,
    "column": 2,
    "defaultValue": "Mutuo con Compraventa",
    "validationRule": {
      "required": true
    },
    "priority": 2
  },
  {
    "id": 7,
    "label": "Fecha Alzamiento Hipotecario",
    "description": "Fecha Alzamiento Hipotecario",
    "row": 2,
    "column": 1,
    "defaultValue": "17/01/2024",
    "validationRule": {
      "required": true,
      "format": "DD/MM/YYYY"
    },
    "priority": 3
  },
  {
    "id": 8,
    "label": "SGC",
    "description": "SGC",
    "row": 2,
    "column": 2,
    "defaultValue": "15001-Conservador y Archivero de A...",
    "validationRule": {
      "required": true
    },
    "priority": 4
  },
  {
    "id": 9,
    "label": "SGD",
    "description": "SGD",
    "row": 3,
    "column": 1,
    "defaultValue": "03/01/2024",
    "validationRule": {
      "required": true,
      "format": "DD/MM/YYYY"
    },
    "priority": 5
  },
  {
  "id": 6,
  "schemaId": "670",
  "description": "SGE",
  "row": 3,
  "column": 2,
  "defaultValue": "123456-7",
  "validationRule": {
    "required": true
  },
  "priority": 6
},{
  "id": 7,
  "schemaId": "670",
  "description": "CS0",
  "row": 4,
  "column": 12,
  "defaultValue": "Seleccione un banco",
  "validationRule": {
    "required": true
  },
  "priority": 7
},
{
  "id": 8,
  "schemaId": "670",
  "description": "SGF: Don-Doña-La Sociedad",
  "row": 5,
  "column": 6,
  "defaultValue": "Nombre Cliente",
  "validationRule": {
    "required": true
  },
  "priority": 8
},
{
  "id": 9,
  "schemaId": "670",
  "description": "SGG: RUT del Vendedor",
  "row": 5,
  "column": 7,
  "defaultValue": "RUT Vendedor",
  "validationRule": {
    "required": true
  },
}


],
"fields": [
  {
    "id": 1,
    "label": "MSG",
    "description": "Código de mensaje",
    "type": "input",
    "placeholder": "Código de mensaje"
  },
  {
    "id": 2,
    "label": "Destino",
    "description": "Institución Destino",
    "type": "input",
    "placeholder": "Institución Destino"
  },
  {
    "id": 3,
    "label": "Prioridad",
    "description": "Prioridad",
    "type": "input",
    "placeholder": "Prioridad"
  },
  {
    "id": 4,
    "label": "Autenticación",
    "description": "Autenticación",
    "type": "input",
    "placeholder": "Autenticación"
  },
  {
    "id": 5,
    "label": "SGA (Canal)",
    "description": "SGA",
    "type": "input",
    "placeholder": "SGA"
  },
  {
    "id": 6,
    "label": "CW7",
    "description": "CW7",
    "type": "input",
    "placeholder": "CW7"
  },
  {
    "id": 7,
    "label": "Fecha Alzamiento Hipotecario",
    "description": "Fecha Alzamiento Hipotecario",
    "type": "input",
    "placeholder": "Fecha Alzamiento Hipotecario"
  },
  {
    "id": 8,
    "label": "SGC",
    "description": "SGC",
    "type": "input",
    "placeholder": "SGC"
  },
  {
    "id": 9,
    "label": "SGD",
    "description": "SGD",
    "type": "input",
    "placeholder": "SGD"
  },
  {
    "id": 10,
    "label": "SGE",
    "description": "SGE",
    "type": "input",
    "placeholder": "SGE"
  },
  {
    "id": 11,
    "label": "CS0",
    "description": "CS0",
    "type": "input",
    "placeholder": "CS0"
  },
  {
    "id": 12,
    "label": "SGF: Don-Doña-La Sociedad (Si corresponde)",
    "description": "SGF: Don-Doña-La Sociedad",
    "type": "input",
    "placeholder": "SGF: Don-Doña-La Sociedad"
  },
  {
    "id": 13,
    "label": "SGG: RUT del Vendedor (Si corresponde)",
    "description": "SGG: RUT del Vendedor",
    "type": "input",
    "placeholder": "SGG: RUT del Vendedor"
  }

],
"messageParameterValues": [
  {
    "parameterId": 1,
    "messageId": 1,
    "value": "670"
  },
  {
    "parameterId": 5,
    "messageId": 1,
    "value": "Personas"
  },
  {
    "parameterId": 7,
    "messageId": 1,
    "value": "17/01/2024"
  }
]
}



  */