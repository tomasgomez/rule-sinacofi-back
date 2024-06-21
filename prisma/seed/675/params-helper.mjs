import { mortgageRaisingDataSchema } from "../670/params-helper.mjs";
import { addPriorityValue, disableFields, setOnlyWatch } from "../commons/helpers.mjs";
import { getAccordion } from "../commons/params.mjs";
import { formHeaderSchema, getObservationsField } from "../commons/params.mjs";

export const getTotalPrepaidToPayUFField = ({ messageCode, ...rest }) => ({
  "name": "totalPrepaidToPayCLP",
  "type": "totalPrepaidToPayCLP",
  "fieldtype": "amount",
  "label": "# CVH: Total a Pagar en UF",
  "placeholder": "",
  "description": "Subtotal Préstamo de credito hipotecario en UF",
  "column": 6,
  "row": 1,
  "defaultValue": "0",
  "rules": "required,disabled,maxLength25,accordionResumeTotalAmount",
  "parameterOptions": "",
  "actions":"",
  messageCode,
  ...rest 
});

export const getTotalPrepaidToPayCLPField = ({ messageCode, ...rest }) => ({
    "name": "totalPrepaidToPayCLP",
    "type": "totalPrepaidToPayCLP",
    "fieldtype": "amount",
    "label": "# CVH: Total a Pagar en $",
    "placeholder": "",
    "description": "Subtotal Préstamo de credito hipotecario en CLP",
    "column": 6,
    "row": 1,
    "defaultValue": "0",
    "rules": "required,disabled,maxLength25,accordionResumeTotalAmount",
    "parameterOptions": "",
    "actions": "",
    messageCode,
    ...rest
});

const messageCode = "675";

console.log("RUNNING:", { messageCode })

const message675Schema = [
  ...disableFields(formHeaderSchema(messageCode)),
  ...disableFields(mortgageRaisingDataSchema(messageCode, true)),
  getAccordion({
    label: "Total a Pagar",
    name: "resumeTotalAmount",
    messageCode,
    actions: "msgCode670",
  }),
  getTotalPrepaidToPayUFField({ messageCode }),
  getTotalPrepaidToPayCLPField({ messageCode }),
  getObservationsField({ messageCode, name: "mlApprovalObservation", rules: "maxLength420,accordionResumeTotalAmount" })
];


console.log({ message675Schema });

export default addPriorityValue(message675Schema);