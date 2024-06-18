import { getChannelField, getMortgageDate, getNotaryField, getOperationCodeField, getOperationTypeField, getSellerNameField, getRepertoireDateField, getRepertoireNumberField, getSenderNameField, getSellerDniField, getBuyerNameField, getBuyerDNIField, getBorrowerNameField, getBorrowerDNIField, getLoanUFField, getSupplementaryLoanUFField, getBorrowerUfAmountField, getAmountHeldByTheBankField } from "../670/params-helper.mjs";
import { getNSEField, getOSNField, getReceiverDNIField, getReceiverNameField, getReceiverSignField } from "../671/params-helper.mjs";
import { getPrepaymentSettlementRequestDate } from "../674/params-helper.mjs";
import { getTotalPrepaidToPayCLPField, getTotalPrepaidToPayUFField } from "../675/params-helper.mjs";
import { addPriorityValue, disableFields, setOnlyWatch } from "../commons/helpers.mjs";
import { formHeaderSchema, getLinebreak, getObservationsField } from "../commons/params.mjs";

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

export const getPaymentDate = ({ messageCode, ...rest }) => createDateField({
  messageCode,
  "name": "paymentDate", // before issuedDateNorm
  "label": "# D00: Fecha de Pago",
  "actions": "currentDate",
  "column": 4,
  ...rest
});

export const getTotalAmountPaidField = ({ messageCode, ...rest }) => ({
  "name": "totalAmountPaid",
  "type": "totalAmountPaid",
  "fieldtype": "amount",
  "label": "* LS8: Monto Pagado Total",
  "placeholder": "",
  "description": "Total crédito pagado",
  "column": 6,
  "row": 1,
  "defaultValue": "0",
  "rules": "required,maxLength25",
  "parameterOptions": "",
  "actions":"msgCode677",
  messageCode,
  ...rest 
});

export const getPaymentMethodField = ({
  messageCode,
  ...rest
  }) => ({
  "label": "* CVV: Medio de Pago",
  "name": "paymentMethod",
  "type": "paymentMethod",
  "fieldtype": "textField",
  "placeholder": "",
  "description": "",
  "column": 6,
  "row": 1,
  "defaultValue": "",
  "rules": "required",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode,
  ...rest
});

// export const getRejectionReasonField = ({
//   "name": "paymentDay",
//   "type": "paymentDay",
//   "fieldtype": "amount",
//   "label": "# D00: Fecha de Pago",
//   "placeholder": "",
//   "description": "Fecha de Pago",
//   "column": 6,
//   "row": 1,
//   "defaultValue": "",
//   "priority": 27,
//   "messageCode": "678",
//   "rules": "",
//   "parameterOptions": "",
//   messageCode,
//   ...rest
// });
export const getRejectionReasonField = ({
  messageCode,
  ...rest
  }) => ({
  "name": "rejectionReason",
  "type": "rejectionReason",
  "fieldtype": "select",
  "label": "# CVM: Motivo de Rechazo del Pago",
  "placeholder": "",
  "description": "Motivo de Rechazo del Pago",
  "column": 6,
  "row": 1,
  "defaultValue": "",
  "priority": 28,
  "rules": "",
  "parameterOptions": "messageRejectionReason",
  messageCode,
  ...rest
});

const messageCode = "678";

console.log("RUNNING:", { messageCode })

const message678Schema = [
  ...disableFields(setOnlyWatch(formHeaderSchema(messageCode))),
  ...disableFields([
    getSenderNameField({ messageCode, label: "# 18: Nombre y Cargo Respons. Inform.", column: 12 }),
    getSellerNameField({ messageCode, label: "# CUY: Nombre del Vendedor" }),
    getSellerDniField({ messageCode, label: "# CUZ: RUT del Vendedor" }),
    getBuyerNameField({ messageCode, label: "# CW6: Nombre del Comprador"}),
    getBuyerDNIField({ messageCode, label: "# CW5: RUT del Comprador" }),
    getBorrowerNameField({ messageCode, label: "# CW4: Nombre del Deudor", column: 8  }),
    getBorrowerDNIField({ messageCode, label: "# CW3: RUT del Deudor" }),
    getChannelField({ messageCode, column: 6 }),
    getOperationTypeField({ messageCode, column: 6 }),
    getNotaryField({ messageCode }),
    getRepertoireDateField({ messageCode }),
    getRepertoireNumberField({ messageCode }),
    getOperationCodeField({ messageCode, column: 3 }),
    getMortgageDate({ messageCode, label: "# SH8: Fecha asociado a Alzamiento Hipotecario", column: 3 }),
    getNSEField({ messageCode, label: "# SH8: NSE Alzamiento Hipotecario", column: 3 }),
    getOSNField({ messageCode, label: "# CVJ: OSN Liquidación de Prepago", column: 3 }),
    getLinebreak({
      label: "* SH9: Montos Alzamiento Comercial",
      messageCode
    }),
    getLoanUFField({ messageCode, label: "# CVR: Monto del Mutuo (U.F.)", column: 6 }),
    getSupplementaryLoanUFField({ messageCode, label: "# CVS: Monto del Mutuo Complementario (U.F.)", column: 6 }),
    getBorrowerUfAmountField({ messageCode, label: "# CVT: Monto del Pago Efectivo (U.F.)", column: 4 }),
    getAmountHeldByTheBankField({ messageCode, label: "# CVU: Monto Adicional Voluntuario $", column: 4 }),
    getTotalAmountPaidField({ messageCode, label: "# CVL: Monto Liquidación de Prepago", column: 4 }),
  // getLinebreak({
    //   label: "* CVY: Monto Liquidación Prepago",
    //   messageCode
    // }),
    // getTotalPrepaidToPayUFField({ messageCode, label: "# CVZ: Monto U.F." }),
    // getTotalPrepaidToPayCLPField({ messageCode, label: "# CW1: Monto $" }),
  ]),
  // getLinebreak({
  //   label: "# CW2: Pago Efectuado",
  //   messageCode
  // }),
  getPaymentDate({ messageCode, column: 6 }),
  getRejectionReasonField({ messageCode}),
  getLinebreak({
    label: "* SGW: Receptor",
    messageCode,
  }),
  getReceiverNameField({ messageCode }),
  getReceiverDNIField({ messageCode }),
  getReceiverSignField({ messageCode }),
  getObservationsField({ messageCode, name: "noticeOfPaymentObservation", rules: "maxLength420,disabled" })
];


console.log({ message678Schema });

export default addPriorityValue(message678Schema);