import { mortgageRaisingDataSchema } from "../670/params-helper.mjs";
import { addPriorityValue, disableFields, setOnlyWatch } from "../commons/helpers.mjs";
import { getAccordion } from "../commons/params.mjs";
import { formHeaderSchema, getObservationsField } from "../commons/params.mjs";

export const getLoanNumberField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "loanNumber",
  "type": "loanNumber",
  "fieldtype": "number",
  "label": "CV8: N° de Préstamo",
  "placeholder": "Número de Préstamo",
  "description": "Número de Préstamo, contiene alguna referencia al mensaje",
  "column": 4,
  "row": 1,
  "defaultValue": "",
  "rules": `required,number,maxLength25,${accordion}`,
  "parameterOptions": "",
  "actions": "",
  messageCode,
  ...rest 
});

export const getTypeOfObligationField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "typeOfObligation",
  "type": "typeOfObligation",
  "fieldtype": "select",
  "label": "CV8: Tipo de Obligación",
  "placeholder": "Selecciona el tipo de obligación",
  "description": "Todas las obligaciones posibles para seleccionar el tipo de obligacion",
  "column": 4,
  "row": 1,
  "defaultValue": "addLoan",
  "rules": `required,${accordion}`,
  "parameterOptions": "typeOfObligations",
  "actions": "",
  messageCode,
  ...rest 
});

export const getTypeOfDebtField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "typeOfDebt",
  "type": "typeOfDebt",
  "fieldtype": "select",
  "label": "CV8: Tipo de Deuda",
  "placeholder": "Selecciona el tipo de deuda",
  "description": "Todas las deudas posibles para seleccionar el tipo de deuda",
  "column": 4,
  "row": 1,
  "defaultValue": "direct",
  "rules": `required,${accordion}`,
  "parameterOptions": "typeOfDebts",
  "actions": "",
  messageCode,
  ...rest 
});

export const getTypeOfCurrencyMortgageField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "mortgageCurrencyType",
  "type": "mortgageCurrencyType",
  "fieldtype": "select",
  "label": "CV9: Moneda",
  "placeholder": "Selecciona el tipo de moneda",
  "description": "Todas las monedas posibles para seleccionar el tipo de monedas",
  "column": 3,
  "row": 1,
  "defaultValue": "uf",
  "rules": `required,${accordion}`,
  "parameterOptions": "typeOfCurrency",
  "actions": "",
  messageCode,
  ...rest 
});

export const getCapitalField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "capital",
  "type": "capital",
  "fieldtype": "amount",
  "label": "CV9: Capital",
  "placeholder": "",
  "description": "Cantidad de capital de credito hipotecario",
  "column": 3,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,number,maxLength25,${accordion}`,
  "parameterOptions": "",
  "actions": "",
  messageCode,
  ...rest 
});

export const getInterestField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "interest",
  "type": "interest",
  "fieldtype": "amount",
  "label": "CV9: Intereses",
  "placeholder": "",
  "description": "Intereses de credito hipotecario",
  "column": 3,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,number,maxLength25,${accordion}`,
  "parameterOptions": "",
  "actions": "",
  messageCode,
  ...rest 
});

export const getMoraField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "mora",
  "type": "mora",
  "fieldtype": "amount",
  "label": "CV9: Mora",
  "placeholder": "",
  "description": "Mora de credito hipotecario",
  "column": 3,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,number,maxLength25,${accordion}`,
  "parameterOptions": "",
  messageCode,
  ...rest 
});

export const getAmortizationField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "amortization",
  "type": "amortization",
  "fieldtype": "amount",
  "label": "CVA: Amortización",
  "placeholder": "",
  "description": "Amortización de credito hipotecario",
  "column": 4,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,number,maxLength25,${accordion}`,
  "actions": "",
  messageCode,
  ...rest 
});

export const getPrepaidCostField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "prepaidCost",
  "type": "prepaidCost",
  "fieldtype": "amount",
  "label": "CVA: Costo Prepago",
  "placeholder": "",
  "description": "Costo Prepago de credito hipotecario",
  "column": 4,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,number,maxLength25,${accordion}`,
  "parameterOptions": "",
  "actions": "",
  messageCode,
  ...rest 
});

export const getMortgageExpensesField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "mortgageExpenses",
  "type": "mortgageExpenses",
  "fieldtype": "amount",
  "label": "CVA: Gastos de Alzamiento",
  "placeholder": "",
  "description": "Costo Prepago de credito hipotecario",
  "column": 4,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,number,maxLength25,${accordion}`,
  "parameterOptions": "",
  "actions": "",
  messageCode,
  ...rest 
});

export const getCollectionCurrencyTypeField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "collectionCurrencyType",
  "type": "collectionCurrencyType",
  "fieldtype": "select",
  "label": "CV9: Moneda(s)",
  "placeholder": "Selecciona el tipo de moneda",
  "description": "Todas las monedas posibles para seleccionar el tipo de monedas",
  "column": 3,
  "row": 1,
  "defaultValue": "pesos",
  "rules": `required,${accordion}`,
  "parameterOptions": "typeOfCurrency",
  "actions": "",
  messageCode,
  ...rest 
});

export const getCollectionField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "collection",
  "type": "collection",
  "fieldtype": "amount",
  "label": "CVB: Cobranza",
  "placeholder": "",
  "description": "Cobranza de credito hipotecario",
  "column": 3,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,number,maxLength25,${accordion}`,
  "parameterOptions": "",
  "actions": "",
  messageCode,
  ...rest 
});

export const getJudicialField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "judicial",
  "type": "judicial",
  "fieldtype": "amount",
  "label": "CVB: G. Judiciales",
  "placeholder": "",
  "description": "G. Judiciales de credito hipotecario",
  "column": 3,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,number,maxLength25,${accordion}`,
  "actions": "",
  messageCode,
  ...rest 
});

export const getLoanSubtotalField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "loanSubtotal",
  "type": "loanSubtotal",
  "fieldtype": "amount",
  "label": "CVB: Subtotal Préstamo",
  "placeholder": "",
  "description": "Subtotal Préstamo de credito hipotecario",
  "column": 3,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,disabled,maxLength25,${accordion}`,
  "parameterOptions": "",
  "actions": "",
  messageCode,
  ...rest 
});

export const getDividendAmountField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "dividendAmount",
  "type": "dividendAmount",
  "fieldtype": "number",
  "label": "CW8: Cantidad Dividendos",
  "placeholder": "",
  "description": "Cantidad Dividendos",
  "column": 4,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,number,maxLength25,${accordion}`,
  "parameterOptions": "",
  "actions": "",
  messageCode,
  ...rest 
});

export const getTotalCreditField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "totalCredit",
  "type": "totalCredit",
  "fieldtype": "number",
  "label": "CW8: Monto Total($)",
  "placeholder": "",
  "description": "Cantidad Dividendos",
  "column": 4,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,number,maxLength25,${accordion}`,
  "parameterOptions": "",
  "actions": "",
  messageCode,
  ...rest 
});

export const getCollectionExpensesField = ({ messageCode, accordion = "accordionMortageDetails", ...rest }) => ({
  "name": "collectionExpenses",
  "type": "collectionExpenses",
  "fieldtype": "amount",
  "label": "CW8: Gastos de Cobranza",
  "placeholder": "",
  "description": "Gastos de Cobranza de credito hipotecario",
  "column": 4,
  "row": 1,
  "defaultValue": "0",
  "rules": `required,number,maxLength25,${accordion}`,
  "parameterOptions": "",
  "actions": "",
  messageCode,
  ...rest 
});

// export const getInterestField = ({ messageCode, ...rest }) => ({
//   "name": "extraCredits",
//   "type": "extraCredits",
//   "fieldtype": "accordion",
//   "label": "Detalle Otros Créditos",
//   "placeholder": "",
//   "description": "Título del mensaje Detalle Otros Créditos",
//   "column": 12,
//   "row": 1, 
//   "defaultValue": "",
//   "rules": "",
//   "parameterOptions": "",
//   "actions": "",
//   messageCode,
//   ...rest 
// });

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
    label: "Detalle Credito Hipotecario",
    name: "mortageDetails",
    messageCode,
    actions: "",
  }),
  getLoanNumberField({ messageCode }),
  getTypeOfObligationField({ messageCode }),
  getTypeOfDebtField({ messageCode }),
  getTypeOfCurrencyMortgageField({ messageCode }),
  getCapitalField({ messageCode }),
  getInterestField({ messageCode }),
  getMoraField({ messageCode }),
  getAmortizationField({ messageCode }),
  getPrepaidCostField({ messageCode }),
  getMortgageExpensesField({ messageCode }),
  getCollectionCurrencyTypeField({ messageCode }),
  getCollectionField({ messageCode }),
  getJudicialField({ messageCode }),
  getLoanSubtotalField({ messageCode }),
  getDividendAmountField({ messageCode }),
  getTotalCreditField({ messageCode }),
  getCollectionExpensesField({ messageCode }),
  getAccordion({
    label: "Detalle Otros Créditos",
    name: "extraCredits",
    messageCode,
    defaultValue: "open,optional,add",
    actions: "",
  }),
  getLoanNumberField({ messageCode, name: "loanNumberOther", accordion: "accordionExtraCredits" }),
  getTypeOfObligationField({ messageCode, name: "typeOfObligationOther", accordion: "accordionExtraCredits" }),
  getTypeOfDebtField({ messageCode, name: "typeOfDebtOther", accordion: "accordionExtraCredits" }),
  getTypeOfCurrencyMortgageField({ messageCode, name: "mortgageCurrencyTypeOther", accordion: "accordionExtraCredits" }),
  getCapitalField({ messageCode, name: "capitalOther", accordion: "accordionExtraCredits" }),
  getInterestField({ messageCode, name: "interestOther", accordion: "accordionExtraCredits" }),
  getMoraField({ messageCode, name: "moraOther", accordion: "accordionExtraCredits" }),
  getCollectionCurrencyTypeField({ messageCode, name: "collectionCurrencyTypeOther", accordion: "accordionExtraCredits" }),
  getCollectionField({ messageCode, name: "collectionOther", accordion: "accordionExtraCredits" }),
  getJudicialField({ messageCode, name: "judicialOther", accordion: "accordionExtraCredits" }),
  getLoanSubtotalField({ messageCode, name: "loanSubtotalOther", accordion: "accordionExtraCredits" }),
  getAccordion({
    label: "Total a Pagar",
    name: "resumeTotalAmount",
    messageCode,
    actions: "",
  }),
  getTotalPrepaidToPayUFField({ messageCode }),
  getTotalPrepaidToPayCLPField({ messageCode }),
  getObservationsField({ messageCode, name: "mlApprovalObservation", rules: "maxLength420,accordionResumeTotalAmount" })
];


console.log({ message675Schema });

export default addPriorityValue(message675Schema);