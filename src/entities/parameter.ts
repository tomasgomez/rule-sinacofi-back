class Parameter {
    id: string;
    name: string;
    label: string;
    type: string;
    description: string;
    placeholder: string;
    value: string;
    defaultValue: string;
    validations: Validation;
    properties: Property;

    constructor(id: string, name: string, label: string, type: string, description: string, defaultValue: string, placeholder: string, value: string, validations: Validation, properties: Property) {
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