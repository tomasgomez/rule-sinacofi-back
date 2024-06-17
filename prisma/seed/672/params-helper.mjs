import { mortgageRaisingDataSchema } from "../670/params-helper.mjs";
import { addPriorityValue, disableFields } from "../commons/helpers.mjs";
import { formHeaderSchema, getObservationsField } from "../commons/params.mjs";

const getRejectionDateField = (messageCode) => ({
  "name": "mlRejectionDate",
  "type": "mlRejectionDate",
  "fieldtype": "texfield",
  "label": "SGX: Fecha de rechazo AH",
  "placeholder": "",
  "description": "SGX: Fecha Rechazo de alzamiento hipotecario",
  "column": 3,
  "row": 1,
  "defaultValue": "currentDate",
  "rules": "disabled",
  "parameterOptions": "",
  "actions":"currentDate",
  messageCode
});

const getRejectionNSEField = (messageCode) => ({
  "name": "mlRejectionNSE",
  "type": "mlRejectionNSE",
  "fieldtype": "texfield",
  "label": "SGX: NSE Rechazo AH",
  "placeholder": "",
  "description": "SGX: NSE Rechazo AH",
  "column": 3,
  "row": 1,
  "defaultValue": "currentDate",
  "rules": "disabled",
  "parameterOptions": "",
  "actions":"currentDate",
  messageCode
});

const getRejectionOSNField = (messageCode) => ({
  "name": "mlRejectionOSN",
  "type": "mlRejectionOSN",
  "fieldtype": "texfield",
  "label": "SGX: OSN Rechazo AL",
  "placeholder": "",
  "description": "SGX: OSN Rechazo AL",
  "column": 3,
  "row": 1,
  "defaultValue": "currentDate",
  "rules": "disabled",
  "parameterOptions": "",
  "actions":"currentDate",
  messageCode
});

const getRejectionReasonField = (messageCode) => ({
  "name": "rejectionReason",
  "type": "rejectionReason",
  "fieldtype": "checkbox",
  "label": "SH: Motivos",
  "placeholder": "",
  "description": "",
  "column": 12,
  "row": 1,
  "defaultValue": "",
  "priority": 44,
  "rules": "required",
  "parameterOptions": "rejectionReason",
  "actions":"",
  messageCode
});

const getReceiverNameField = (messageCode) => ({
  "name": "senderName",
  "type": "senderName",
  "fieldtype": "textField",
  "label": "SGU: Apoderado Rut",
  "placeholder": "",
  "description": "",
  "column": 3,
  "row": 1,
  "defaultValue": "",
  "priority": 42,
  "rules": "disabled",
  "parameterOptions": "",
  "actions":"",
  messageCode
});

const getReceiverDNIField = (messageCode) => ({
  "name": "senderDni",
  "type": "senderDni",
  "fieldtype": "textField",
  "label": "SGU: Apoderado Rut",
  "placeholder": "",
  "description": "",
  "column": 3,
  "row": 1,
  "defaultValue": "",
  "priority": 42,
  "rules": "disabled",
  "parameterOptions": "",
  "actions":"",
  messageCode
});

const getReceiverSignField = (messageCode) => ({
  "name": "senderSign",
  "type": "senderSign",
  "fieldtype": "password",
  "label": "SGT: Firma Electrónica, Enviador",
  "placeholder": "",
  "description": "",
  "column": 3,
  "row": 1,
  "defaultValue": "",
  "priority": 43,
  "rules": "required",
  "parameterOptions": "",
  messageCode
});

const messageCode = "672";

console.log("RUNNING:", { messageCode })

const message672Schema = [
  ...formHeaderSchema(messageCode),
  ...disableFields(mortgageRaisingDataSchema(messageCode, true, true)),
  getRejectionDateField(messageCode),
  getRejectionNSEField(messageCode),
  getRejectionOSNField(messageCode),
  getRejectionReasonField(messageCode),
  getReceiverNameField(messageCode),
  getReceiverDNIField(messageCode),
  getReceiverSignField(messageCode),
  getObservationsField({ messageCode, name: "mlRejectionObservation" })
];


console.log({ message672Schema });

export default addPriorityValue(message672Schema);