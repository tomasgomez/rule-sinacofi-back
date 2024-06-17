import { mortgageRaisingDataSchema } from "../670/params-helper.mjs";
import { addPriorityValue, disableFields, setOnlyWatch } from "../commons/helpers.mjs";
import { getBlankSpace } from "../commons/params.mjs";
import { getLinebreak } from "../commons/params.mjs";
import { formHeaderSchema, getObservationsField } from "../commons/params.mjs";

const getApprovalDateField = (messageCode) => ({
  "name": "mlApprovalDate",
  "type": "mlApprovalDate",
  "fieldtype": "texfield",
  "label": "SGV: Fecha de aceptación AH",
  "placeholder": "",
  "description": "SGV: Aceptación de alzamiento hipotecario de Fecha NSE/OSN",
  "column": 3,
  "row": 1,
  "defaultValue": "currentDate",
  "rules": "disabled",
  "parameterOptions": "",
  "actions":"currentDate",
  messageCode
});

export const getNSEField = ({ messageCode, label = "SGV: NSE Aceptación AH", column = 3 }) => ({
  "name": "NSE",
  "type": "NSE",
  "fieldtype": "texfield",
  "label": label,
  "placeholder": "",
  "description": "SGV: NSE Aceptación AH",
  "column": column,
  "row": 1,
  "defaultValue": "currentDate",
  "rules": "disabled",
  "parameterOptions": "",
  "actions":"currentDate",
  messageCode
});

export const getOSNField = ({ messageCode, label =  "SGV: OSN Aceptación AH", column = 3 }) => ({
  "name": "OSN",
  "type": "OSN",
  "fieldtype": "texfield",
  "label": label,
  "placeholder": "",
  "description": "SGV: OSN Aceptación A",
  "column": column,
  "row": 1,
  "defaultValue": "currentDate",
  "rules": "disabled",
  "parameterOptions": "",
  "actions":"currentDate",
  messageCode
});

const getRequiresPrepaidSettlementField = (messageCode) => ({
  "name": "requiresPrepaidSettlement",
  "type": "requiresPrepaidSettlement",
  "fieldtype": "select",
  "label": "CUM: Requiere liquidación de Prepago Si/No",
  "placeholder": "",
  "description": "",
  "column": 3,
  "row": 1,
  "defaultValue": "NO",
  "priority": 44,
  "rules": "required",
  "parameterOptions": "condition",
  "actions": "",
  messageCode
});

const getReceiverNameField = (messageCode) => ({
  "name": "receiverName",
  "type": "receiverName",
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
  "actions": "fillUserName",
  messageCode
});

const getReceiverDNIField = (messageCode) => ({
  "name": "receiverDni",
  "type": "receiverDni",
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
  "actions": "fillUserDni",
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

const messageCode = "671";

console.log("RUNNING:", { messageCode })

const message671Schema = [
  ...formHeaderSchema(messageCode),
  ...disableFields(setOnlyWatch(mortgageRaisingDataSchema(messageCode, true, true))),
  getBlankSpace({ messageCode, column: 6 }),
  getApprovalDateField(messageCode),
  getNSEField({ messageCode }),
  getOSNField({ messageCode }),
  getRequiresPrepaidSettlementField(messageCode),
  getLinebreak({
    label: "* SGW: Receptor",
    messageCode,
  }),
  getReceiverNameField(messageCode),
  getReceiverDNIField(messageCode),
  getReceiverSignField(messageCode),
  getObservationsField({ messageCode, name: "mlApprovalObservation" })
];


console.log({ message671Schema });

export default addPriorityValue(message671Schema);