const messageDescriptionList = {
  670: "SOLICITUD DE ALZAMIENTO HIPOTECARIO",
  671: "ALZAMIENTO HIPOTECARIO ACEPTACIÓN",
  672: "ALZAMIENTO HIPOTECARIO RECHAZADA",
  673: "AVISO DE CLIENTE NORMALIZACIÓN",
  674: "SOLICITUD LIQUIDACIÓN DE PREPAGO AH",
  675: "LIQUIDACIÓN DE PREPAGO AH",
  676: "DATOS PARA EL PAGO AH",
  677: "AVISO DE PAGO AH",
  678: "RECHAZO DE PAGO AH",
  679: "CONFIRMACIÓN DE PAGO AH"
};

// common fields

const getMessageCodeField = ({ messageCode, ...rest }) => ({
  "name": "messageCode",
  "type": "messageCode",
  "fieldtype": "textField",
  "label": "MSG",
  "placeholder": "Nombre del mensaje",
  "description": "Código del tipo de mensaje",
  "column": 3,
  "row": 1,
  "defaultValue": messageCode,
  "priority": 1,
  "messageCode": messageCode,
  "rules": "disabled",
  "parameterOptions": "",
  "actions": "msgCode670",
  ...rest
});

const getMessageDescriptionField = ({ messageCode, ...rest }) => ({
  "name": "messageDescription",
  "type": "messageDescription",
  "fieldtype": "textField",
  "label": "Descripción",
  "placeholder": "Descripción",
  "description": "Descripción del tipo de mensaje",
  "column": 9,
  "row": 1,
  "defaultValue": messageDescriptionList[messageCode],
  "priority": 2,
  "messageCode": messageCode,
  "rules": "disabled, maxLength45",
  "parameterOptions": "",
  "actions": "msgCode670",
  ...rest
});

export const getBeneficiaryBankField = ({
  messageCode, 
  label = "Institución de destino",
  column = 5,
}) => ({
  "name": "beneficiaryBank",
  "type": "beneficiaryBank",
  "fieldtype": "select",
  "label": label,
  "placeholder": "Selecciona la institución de destino",
  "description": "Todas las instituciones posibles para seleccionar la institución de destino",
  "column": column,
  "row": 1,
  "defaultValue": "receiverId",
  "priority": 3,
  messageCode,
  "rules": "required,distinctIssuedBank",
  "parameterOptions": "institution",
  "actions": "msgCode670"
});

const getPriorityField = ({ messageCode, ...rest }) => ({
  "name": "priority",
  "type": "priority",
  "fieldtype": "select",
  "label": "Prioridad",
  "placeholder": "Selecciona la prioridad del mensaje",
  "description": "Todas las prioridades posibles para seleccionar la prioridad del mensaje",
  "column": 5,
  "row": 1,
  "defaultValue": "priorityNormal",
  "priority": 4,
  "messageCode": messageCode,
  "rules": "required",
  "parameterOptions": "priority",
  "actions": "msgCode670",
  ...rest
});

const getAuthenticationField = ({ messageCode, ...rest }) => ({
  "name": "auth",
  "type": "auth",
  "fieldtype": "select",
  "label": "Autenticación",
  "placeholder": "Selecciona si require autenticación",
  "description": "Requiere autenticación, selecciona si require autenticación",
  "column": 2,
  "row": 1,
  "defaultValue": "NO",
  "priority": 5,
  "messageCode": messageCode,
  "rules": "",
  "parameterOptions": "condition",
  "actions": "msgCode670",
  ...rest
});

// fields of the current schema

export const formHeaderSchema = (messageCode) => [
  getMessageCodeField({ messageCode }),
  getMessageDescriptionField({ messageCode }),
  getBeneficiaryBankField({ messageCode }),
  getPriorityField({ messageCode }),
  getAuthenticationField({ messageCode }),
];


export const getAccordion = ({ label, name, messageCode, actions = "", priority }) => ({
  "name": name,
  "type": name,
  "fieldtype": "accordion",
  "label": label,
  "placeholder": "",
  "description": `Título de ${label}`,
  "column": 12,
  "row": 1,
  "defaultValue": "",
  "priority": priority,
  "messageCode": messageCode,
  "rules": "",
  "parameterOptions": "",
  "actions": actions
});

export const getLinebreak = ({ label, messageCode, actions = "", ...rest }) => ({
  "name": "linebreak",
  "type": "linebreak",
  "fieldtype": "linebreak",
  "label": label,
  "placeholder": "",
  "description": `Salto de línea: ${label}`,
  "column": 12,
  "row": 1,
  "defaultValue": "",
  "messageCode": messageCode,
  "rules": "",
  "parameterOptions": "",
  "actions": actions,
  ...rest
});

export const getBlankSpace = ({ messageCode, column, row = 1, actions = "" }) => ({
  "name": "blankSpace",
  "type": "blankSpace",
  "fieldtype": "blankSpace",
  "label": "",
  "placeholder": "",
  "description": `Blank space, used to separate fields`,
  "defaultValue": "",
  "rules": "",
  "parameterOptions": "",
  row,
  messageCode,
  column,
  actions
});

export const getLabel = ({ label, messageCode, actions = "", ...rest }) => ({
  "name": "label",
  "type": "label",
  "fieldtype": "label",
  "label": label,
  "placeholder": "",
  "description": `Label with salto de línea: ${label}`,
  "column": 12,
  "row": 1,
  "defaultValue": "",
  "messageCode": messageCode,
  "rules": "",
  "parameterOptions": "",
  "actions": actions,
  ...rest
});

export const getObservationsField = ({
  messageCode,
  name = "observations",
  ...rest
}) => ( {
  "name": name,
  "type": name,
  "fieldtype": "textArea",
  "label": "79: Observaciones",
  "placeholder": "",
  "description": "",
  "column": 12,
  "row": 4,
  "defaultValue": "",
  "priority": 43,
  "rules": "maxLength420",
  "parameterOptions": "",
  "actions": "",
  messageCode,
  ...rest
});