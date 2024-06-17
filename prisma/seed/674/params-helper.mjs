import { getChannelField, getMortgageDate, getNotaryField, getOperationCodeField, getOperationTypeField, getSellerNameField, getRepertoireDateField, getRepertoireNumberField, getSenderNameField, getSellerDniField, getBuyerNameField, getBuyerDNIField, getBorrowerNameField, getBorrowerDNIField, getLoanUFField, getSupplementaryLoanUFField, getBorrowerUfAmountField, getAmountHeldByTheBankField } from "../670/params-helper.mjs";
import { getNSEField, getOSNField } from "../671/params-helper.mjs";
import { addPriorityValue, disableFields, setOnlyWatch } from "../commons/helpers.mjs";
import { formHeaderSchema, getBeneficiaryBankField, getLabel, getObservationsField } from "../commons/params.mjs";

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

export const getPrepaymentSettlementRequestDate = ({ messageCode, ...rest }) => createDateField({
  messageCode,
  "name": "prepaymentSettlementRequestDate", // before issuedDateNorm
  "label": "CV4: Fecha de Solicitud",
  "actions": "currentDate",
  "column": 3,
  ...rest
});

const messageCode = "674";

console.log("RUNNING:", { messageCode })

const message674Schema = [
  ...disableFields(setOnlyWatch(formHeaderSchema(messageCode))),
  ...disableFields([
    getSenderNameField({ messageCode, label: "# 18: Nombre y Cargo Respons. Inform." }),
    getPrepaymentSettlementRequestDate({ messageCode }),
    getOperationTypeField({ messageCode, column: 3 }),
    getChannelField({ messageCode, column: 3 }),
    getNotaryField(messageCode),
    getRepertoireDateField(messageCode),
    getRepertoireNumberField(messageCode),
    getOperationCodeField({ messageCode, column: 6 }),
    getBeneficiaryBankField(messageCode, "# CSO: Señores Institución", 6),
    getLabel({
      label: "CSP: Solicitamos a usted liquidación de pre-pago consolidada de",
      messageCode
    }),
    getSellerNameField({
      messageCode,
      label: "# CUY: Nombre del Vendedor"
    }),
    getSellerDniField({ messageCode, label: "# CUZ: RUT del Vendedor" }),
    getBuyerNameField({ messageCode, label: "# CW6: Nombre del Comprador"}),
    getBuyerDNIField({ messageCode, label: "# CW5: RUT del Comprador" }),
    getBorrowerNameField({ messageCode, label: "# CW4: Nombre del Deudor", column: 8  }),
    getBorrowerDNIField({ messageCode, label: "# CW3: RUT del Deudor" }),
    getOSNField({ messageCode, label: "# SH7: Número Recepción de Alzamiento (OSN)", column: 4 }),
    getMortgageDate({ messageCode, label: "# SH8: Fecha asociado a Alzamiento Hipotecario", column: 4 }),
    getNSEField({ messageCode, label: "# SH8: NSE Alzamiento Hipotecario", column: 4 }),
    getLoanUFField({ messageCode, label: "# CVR: Monto del Mutuo (U.F.)", column: 6 }),
    getSupplementaryLoanUFField({ messageCode, label: "# CVS: Monto del Mutuo Complementario (U.F.)", column: 6 }),
    getBorrowerUfAmountField({ messageCode, label: "# CVT: Monto del Pago Efectivo (U.F.)", column: 6 }),
    getAmountHeldByTheBankField({ messageCode, label: "# CVU: Monto Adicional Voluntuario $", column: 6 }),
  ]),
  getObservationsField({ messageCode, name: "prepaymentSettlementRequestObservation" })
];


console.log({ message674Schema });

export default addPriorityValue(message674Schema);