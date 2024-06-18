import { addPriorityValue } from "../commons/helpers.mjs";
import { formHeaderSchema, getAccordion, getBeneficiaryBankField, getLabel, getLinebreak, getObservationsField } from "../commons/params.mjs";

export const getMortgageDate = ({ messageCode, ...rest }) => ({
  "name": "dateOfApplication", // before issuedDate
  "type": "dateOfApplication",
  "fieldtype": "date",
  "label": "#34O: Fecha de Alzamiento Hipotecario",
  "placeholder": "",
  "description": "Fecha de alzamiento hipotecario",
  "column": 4,
  "row": 1,
  "defaultValue": "Current Date",
  "messageCode": messageCode,
  "rules": "disabled,currentDate,accordionMortageData",
  "parameterOptions": "",
  "actions": `accordionMortageData,msgCode670`,
  ...rest
});

export const getChannelField = ({ messageCode, ...rest }) => ({
  "name": "channel",
  "type": "channel",
  "fieldtype": "select",
  "label": "SGA: Canal",
  "placeholder": "Selecciona el canal",
  "description": "Canal, selecciona el canal de envío del mensaje",
  "column": 4,
  "row": 1,
  "defaultValue": "Personas",
  "rules": "checkUserChannel",
  "parameterOptions": "channel",
  "actions": "accordionMortageData,msgCode670",
  messageCode,
  ...rest
});

export const getOperationTypeField = ({ messageCode, ...rest }) => ({
  "name": "operationType",
  "type": "operationType",
  "fieldtype": "select",
  "label": "CW7: Tipo de Operación",
  "placeholder": "Selecciona tipo de operación",
  "description": "Tipo de operación, selecciona tipo de operación relacionada",
  "column": 4,
  "row": 1,
  "defaultValue": "mutuoConCompraVenta",
  "rules": "required,maxLength25",
  "parameterOptions": "operationType",
  "actions": "accordionMortageData,msgCode670",
  messageCode,
  ...rest
});

export const getNotaryField = ({ messageCode }) => ({
  "name": "notary",
  "type": "notary",
  "fieldtype": "select",
  "label": "SGC: Notaría Repertorio",
  "placeholder": "Notaría de repertorio",
  "description": "Notaría de repertorio, selecciona la notaría de repertorio",
  "column": 4,
  "row": 1,
  "defaultValue": "",
  "rules": "required",
  "parameterOptions": "notary",
  "actions": "accordionMortageData,msgCode670",
  messageCode,
});

export const getRepertoireDateField = ({ messageCode }) => ({
  "name": "repertoireDate",
  "type": "repertoireDate",
  "fieldtype": "date",
  "label": "SGC: Fecha Repertorio",
  "placeholder": "Fecha de repertorio",
  "description": "Fecha de repertorio, fecha de registro en la notaría",
  "column": 4,
  "row": 1,
  "defaultValue": "",
  "rules": "required, dateFormat",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode,
});

export const getRepertoireNumberField = ({ messageCode }) => ({
  "name": "repertoireNumber",
  "type": "repertoireNumber",
  "fieldtype": "number",
  "label": "SGE: Número Repertorio",
  "placeholder": "Número de repertorio",
  "description": "Número de repertorio, contiene alguna referencia al mensaje",
  "column": 4,
  "row": 1,
  "defaultValue": "",
  "rules": "required,number,maxLength25",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode,
});

export const getSellerNameField = ({
  messageCode,
  label = "SGF: Don-Doña-La Sociedad (Si corresponde)"
}) => ({
  "name": "sellerName",
  "type": "sellerName",
  "fieldtype": "textField",
  "label": label,
  "placeholder": "Cliente hipoteca",
  "description": "Propietario de la hipoteca, Don-Doña-La Sociedad (Si corresponde)",
  "column": 8,
  "row": 1,
  "defaultValue": "",
  "rules": "required,maxLength25",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode,
});

export const getSellerDniField = ({ messageCode, label = "SGG: RUT del Vendedor (Si corresponde)" }) => ({
  "name": "sellerDni",
  "type": "sellerDni",
  "fieldtype": "dni",
  "label": label,
  "placeholder": "ej: 10.203.411-2",
  "description": "RUT del propietario/vendedor (si corresponde)",
  "column": 4,
  "row": 1,
  "defaultValue": "",
  "rules": "required,dniFormat,checkDigitDni",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode,
});

export const getBuyerNameField = ({ messageCode, label = "SGH: Don-Doña-La Sociedad (Comprador o Mutuario)" }) => ({
  "name": "buyerName",
  "type": "buyerName",
  "fieldtype": "textField",
  "label": label,
  "placeholder": "Comprador o Mutuario",
  "description": "Comprador o mutuario, Don-Doña-La Sociedad (Comprador o Mutuario)",
  "column": 8,
  "row": 1,
  "defaultValue": "",
  "rules": "required,maxLength25",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode
});

export const getBuyerDNIField = ({ messageCode, label = "SGI: RUT del Comprador o Mutuario" }) => ({
  "name": "buyerDni",
  "type": "buyerDni",
  "fieldtype": "dni",
  "label": label,
  "placeholder": "",
  "description": "RUT del comprador o mutuario",
  "column": 4,
  "row": 1,
  "defaultValue": "",
  "rules": "required,dniFormat,checkDigitDni",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode
});

const getPropertyInfo = ({ messageCode }) => ({
  "name": "propertyInfo",
  "type": "propertyInfo",
  "fieldtype": "textArea",
  "label": "CS5: Inmueble Correspondiente a",
  "placeholder": "",
  "description": "Información del inmueble correspondiente",
  "column": 12,
  "row": 4,
  "defaultValue": "",
  "rules": "required,maxLength420",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode
});

const getLocationField = ({ messageCode }) => ({
  "name": "location",
  "type": "location",
  "fieldtype": "textField",
  "label": "CS6: Ubicado en",
  "placeholder": "",
  "description": "Ubicación del inmueble",
  "column": 4,
  "row": 1,
  "defaultValue": "",
  "rules": "required,maxLength45",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode
});

const getRegionField = ({ messageCode }) => ({
  "name": "region",
  "type": "region",
  "fieldtype": "select",
  "label": "CS8: Región de",
  "placeholder": "Selecciona la región",
  "description": "Región del inmueble, selecciona la región",
  "column": 4,
  "row": 1,
  "defaultValue": "",
  "rules": "required,maxLength25",
  "parameterOptions": "region",
  "actions": "accordionMortageData,msgCode670",
  messageCode
});

const getCommuneField = ({ messageCode }) => ({
  "name": "commune",
  "type": "commune",
  "fieldtype": "select",
  "label": "CS7: Comuna de",
  "placeholder": "Selecciona la comuna",
  "description": "Comuna del inmueble, selecciona la comuna",
  "column": 4,
  "row": 1,
  "defaultValue": "",
  "rules": "required,maxLength25",
  "parameterOptions": "commune",
  "actions": "accordionMortageData,msgCode670",
  messageCode
});

const getBankField = ({ messageCode, label = "SGK: El Banco", column = 12 }) => ({
  "name": "bank",
  "type": "bank",
  "fieldtype": "textField",
  "placeholder": "",
  "description": "Banco otorgante del mutuo",
  "row": 1,
  "defaultValue": "institution",
  "rules": "required,disabled",
  "parameterOptions": "",
  "actions":"accordionMortageData,user",
  label,
  column,
  messageCode
});

const getReceiverNameField = ({ messageCode }) => ({
  "name": "receiverName",
  "type": "receiverName",
  "fieldtype": "textField",
  "label": "CSC: Don-Doña-La Sociedad",
  "placeholder": "",
  "description": "Nombre de quien recibe el mutuo",
  "column": 3,
  "row": 1,
  "defaultValue": "",
  "rules": "required,maxLength25",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode
});

export const getLoanUFField = ({
  messageCode,
  label = "CSD: Un mutuo por U.F.",
  column = 3
}) => ({
  "name": "loanUF",
  "type": "loanUF",
  "fieldtype": "amount",
  "label": label,
  "placeholder": "",
  "description": "Monto del mutuo en UF",
  "column": column,
  "row": 1,
  "defaultValue": "",
  "rules": "required,ufFormat,number",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode
});

const getLoanTermField = ({ messageCode }) => ({
  "name": "loanTerm",
  "type": "loanTerm",
  "fieldtype": "amount",
  "label": "CSE: Pagadero en Plazo de (años)",
  "placeholder": "",
  "description": "Plazo del mutuo en años",
  "column": 3,
  "row": 1,
  "defaultValue": "",
  "rules": "required,maxLength3",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode
});

export const getSupplementaryLoanUFField = ({
  messageCode,
  label = "CSF: Un mutuo Complementario de (UF)",
  column = 3
}) => ({
  "name": "supplementaryLoanUF",
  "type": "supplementaryLoanUF",
  "fieldtype": "amount",
  "placeholder": "",
  "description": "Monto complementario del mutuo en UF",
  "row": 1,
  "defaultValue": "",
  "rules": "required,ufFormat,number",
  "parameterOptions": "",
  "actions": "accordionMortageData",
  label,
  column,
  messageCode,
});

export const getOperationCodeField = ({ messageCode, column = 12}) => ({
  "name": "CUK",
  "type": "CUK",
  "fieldtype": "textField",
  "label": "CUK: Código de Operación Interno",
  "placeholder": "",
  "description": "Código interno de operación",
  "row": 1,
  "defaultValue": "",
  "rules": "disabled,cuk",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode,
  column,
});

export const getBorrowerNameField = ({ messageCode, label = "SGL: Nombre del deudor", column = 4 }) => ({
  "name": "borrowerName",
  "type": "borrowerName",
  "fieldtype": "textField",
  "placeholder": "",
  "description": "SGL: Nombre del deudor",
  "row": 1,
  "defaultValue": "",
  "rules": "required,maxLength25",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  label,
  column,
  messageCode
});

export const getBorrowerDNIField = ({ messageCode, label = "CW3: RUT del Deudor" }) => ({
  "name": "borrowerDni",
  "type": "borrowerDni",
  "fieldtype": "dni",
  "label": label,
  "placeholder": "",
  "description": "RUT del deudor",
  "column": 4,
  "row": 1,
  "defaultValue": "",
  "rules": "",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode,
});

export const getBorrowerUfAmountField = ({
  messageCode,
  label = "SGM: Monto UF",
  column = 4
}) => ({
  "name": "borrowerUfAmount",
  "type": "borrowerUfAmount",
  "fieldtype": "amount",
  "placeholder": "",
  "description": "Monto retenido por el banco",
  "row": 1,
  "defaultValue": "",
  "rules": "required,ufFormat,number",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  label,
  column,
  messageCode
});

export const getAmountHeldByTheBankField = ({
  messageCode,
  label = "CSO: Mantiene en su poder hasta la cantidad de $", 
  column = 6
}) => ({
  "name": "amountHeldByTheBank",
  "type": "amountHeldByTheBank",
  "fieldtype": "amount",
  "placeholder": "",
  "description": "Observaciones adicionales",
  "row": 1,
  "defaultValue": "",
  "rules": "pesosFormat,number,required",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  label,
  column,
  messageCode
});

export const getSenderNameField = ({
  messageCode,
  label = "SGU: Apoderado Nombre",
  ...rest
}) => ({
  "name": "senderName",
  "type": "senderName",
  "fieldtype": "textField",
  "placeholder": "",
  "description": "",
  "column": 3,
  "row": 1,
  "defaultValue": "",
  "rules": "disabled",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  label,
  messageCode,
  ...rest
});

const getSenderDNIField = ({ messageCode }) => ({
  "name": "senderDni",
  "type": "senderDni",
  "fieldtype": "textField",
  "label": "SGU: Apoderado Rut",
  "placeholder": "",
  "description": "",
  "column": 3,
  "row": 1,
  "defaultValue": "",
  "rules": "disabled",
  "parameterOptions": "",
  "actions": "accordionMortageData,msgCode670",
  messageCode
});

const getSenderSignField = ({ messageCode }) => ({
  "name": "senderSign",
  "type": "senderSign",
  "fieldtype": "password",
  "label": "SGT: Firma Electrónica, Enviador",
  "placeholder": "",
  "description": "",
  "column": 3,
  "row": 1,
  "defaultValue": "",
  "rules": "disabled",
  "parameterOptions": "",
  actions: "accordionMortageData",
  messageCode
});

export const mortgageRaisingDataSchema = (messageCode, onlyWatch = false, noObservation = false) => [
  getAccordion({
    label: "Datos de Hipoteca",
    name: "mortgageData",
    messageCode,
    actions: "msgCode670",
  }),
  getMortgageDate({ messageCode }),
  getChannelField({ messageCode }),
  getOperationTypeField({ messageCode }),
  getNotaryField({ messageCode }),
  getRepertoireDateField({ messageCode }),
  getRepertoireNumberField({ messageCode }),
  getBeneficiaryBankField({ messageCode, label: "CSO: Señores Institución", column: 12 }),
  getSellerNameField({ messageCode }),
  getSellerDniField({ messageCode }),
  getLinebreak({ label: "Ha vendido a", messageCode }),
  getBuyerNameField({ messageCode }),
  getBuyerDNIField({ messageCode }),
  getPropertyInfo({ messageCode }),
  getLocationField({ messageCode }),
  getRegionField({ messageCode }),
  getCommuneField({ messageCode }),
  getLinebreak({ label: "SGJ: Para pagar parte del precio de la compraventa, si corresponde", messageCode }),
  getBankField({ messageCode }),
  getLinebreak({ label: "CSB: Ha otorgado a", messageCode }),
  getReceiverNameField({ messageCode }),
  getLoanUFField({ messageCode }),
  getLoanTermField({ messageCode }),
  getSupplementaryLoanUFField({ messageCode }),
  getOperationCodeField({ messageCode }),
  getLinebreak({ label: "SGL: Deudor", messageCode }),
  getBorrowerNameField({ messageCode }),
  getBorrowerDNIField({ messageCode }),
  getBorrowerUfAmountField({ messageCode }),
  getLabel({
    label: "* CSL: Con objeto de cubrir eventuales diferencias que se puedan producir en\\n* CSM: Las deudas que el(la) mencionado(a) Señor(A)",
    messageCode
  }),
  getBankField({
    messageCode,
    label: "SGN: Tiene con ustedes, les señalamos que el Banco",
    column: 6
  }),
  getAmountHeldByTheBankField({ messageCode }),
  getLabel({
    label: "CSL: Con objeto de cubrir eventuales diferencias que se puedan producir en\\nCSM: Las deudas que el(la) mencionado(a) Señor(A)\\nSGN: Tiene con ustedes, les señalamos que el Banco\\nCSO: Mantiene en su poder hasta la cantidad de $\\nCSP: Con el objeto de aplicarlo al pago de las obligaciones referidas, hasta\\nCSQ: El monto señalado. Este pago se realizará contra liquidaciones\\nCSR: Practicadas por Uds. Y confuntamente con la entrega del préstamo\\nCSS: indicado precedentemente en el plazo antedicho.\\nCST: Dicho compromiso lo cumpliremos dentro del plazo de 15 dias hábiles\\nCSU: bancarios, contados desde que se encuentren debidamente inscritos el\\nSGO: dominio a nombre de vendedor y comprador, si corresponde y las\\nSGP: hipotecas y prohibiciones a favor de nuestro banco y previo ALZAMIENTO\\nSGR: vuestro favor respecto del inmueble señalado en la escritura, para lo\\nSGS: cual solicitamos a ustedes comparecer en ella\\nSGT: Firma Electrónica, Enviador\\nSGU: Apoderado Nombre, RUT",
    messageCode
  }),
  getLinebreak({
    label: "SGT: Enviador",
    messageCode
  }),
  getSenderNameField({ messageCode }),
  getSenderDNIField({ messageCode }),
  ...(!onlyWatch ? [getSenderSignField({ messageCode })] : []),
  ...(!noObservation ? [getObservationsField({ messageCode, name: "mlObservation", actions: "accordionMortageData,msgCode670" })] : []),
];

const messageCode = "670";

const message670Schema = [
  ...formHeaderSchema(messageCode),
  ...mortgageRaisingDataSchema(messageCode),
];

export default addPriorityValue(message670Schema);