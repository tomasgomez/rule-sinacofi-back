import { getBorrowerDNIField, getBorrowerNameField, getBuyerDNIField, getBuyerNameField, getChannelField, getMortgageDate, getNotaryField, getOperationCodeField, getOperationTypeField, getRepertoireDateField, getRepertoireNumberField, getSellerDniField, getSellerNameField, getSenderNameField } from "../670/params-helper.mjs";
import { addPriorityValue, disableFields } from "../commons/helpers.mjs";
import { formHeaderSchema, getObservationsField } from "../commons/params.mjs";

const createDateField = ({
  name,
  label,
  messageCode,
  defaultValue = "Current Date",
  rules = "disabled",
  column = 4,
  actions = "currentDate",
  ...rest
}) => ({
  "name": name,
  "type": name,
  "fieldtype": "date",
  "placeholder": "",
  "description": `Fecha de ${label}`,
  "row": 1,
  "defaultValue": defaultValue,
  "parameterOptions": "",
  column,
  messageCode,
  rules,
  label,
  actions,
  ...rest
  // "actions":`msgCode${messageCode}`
});

export const getNormalizationDate = ({ messageCode }) => createDateField({
  messageCode,
  "name": "normalizationDate", // before issuedDateNorm
  "label": "CI3: Fecha Envio de Mensaje",
  "actions": "currentDate",
  "column": 3,
});

const messageCode = "673";

console.log("RUNNING:", { messageCode })

const message673Schema = [
  ...disableFields(formHeaderSchema(messageCode)),
  getSenderNameField({ messageCode, label: "18: Nombre y Cargo Respons. Inform." }),
  getNormalizationDate({ messageCode }),
  getOperationTypeField({ messageCode, column: 3 }),
  getChannelField({ messageCode, column: 3 }),
  getNotaryField({ messageCode }),
  getRepertoireDateField({ messageCode }),
  getRepertoireNumberField({ messageCode }),
  getOperationCodeField({ messageCode, column: 4 }),
  getMortgageDate({ messageCode }),
  getSellerNameField({
    messageCode,
    label: "# CUY: Nombre del Vendedor"
  }),
  getSellerDniField({ messageCode, label: "# CUZ: RUT del Vendedor" }),
  getBuyerNameField({ messageCode, label: "# CW6: Nombre del Comprador"}),
  getBuyerDNIField({ messageCode, label: "# CW5: RUT del Comprador" }),
  getBorrowerNameField({ messageCode, label: "# CW4: Nombre del Deudor", column: 8 }),
  getBorrowerDNIField({ messageCode, label: "# CW3: RUT del Deudor" }),
  getObservationsField({ messageCode, name: "mlNormalizationObservation" })
];


console.log({ message673Schema });

export default addPriorityValue(message673Schema);