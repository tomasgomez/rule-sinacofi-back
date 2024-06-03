
[{
    "name": "loanNumber_3",
    "type": "loanNumber_3",
    "fieldtype": "number",
    "label": "CV8: N° de Préstamo",
    "placeholder": "Número de Préstamo",
    "description": "Número de Préstamo, contiene alguna referencia al mensaje",
    "column": 4,
    "row": 1,
    "defaultValue": "",
    "priority": 63,
    "messageCode": "675",
    "rules": "required,number,maxLength25,accordionExtraCredits",
    "parameterOptions": ""
  },
  {
    "name": "typeOfObligation_3",
    "type": "typeOfObligation_3",
    "fieldtype": "select",
    "label": "CV8: Tipo de Obligación",
    "placeholder": "Selecciona el tipo de obligación",
    "description": "Todas las obligaciones posibles para seleccionar el tipo de obligacion",
    "column": 4,
    "row": 1,
    "defaultValue": "",
    "priority": 64,
    "messageCode": "675",
    "rules": "required,accordionExtraCredits",
    "parameterOptions": "typeOfObligations"
  },
  {
    "name": "typeOfDebt",
    "type": "typeOfDebt",
    "fieldtype": "select",
    "label": "CV8: Tipo de Deuda",
    "placeholder": "Selecciona el tipo de deuda",
    "description": "Todas las deudas posibles para seleccionar el tipo de deuda",
    "column": 4,
    "row": 1,
    "defaultValue": "",
    "priority": 65,
    "messageCode": "675",
    "rules": "required,accordionExtraCredits",
    "parameterOptions": "typeOfDebts"
  },
  {
    "name": "typeOfCurrency",
    "type": "typeOfCurrency",
    "fieldtype": "select",
    "label": "CV9: Moneda",
    "placeholder": "Selecciona el tipo de moneda",
    "description": "Todas las monedas posibles para seleccionar el tipo de monedas",
    "column": 3,
    "row": 1,
    "defaultValue": "",
    "priority": 66,
    "messageCode": "675",
    "rules": "required,accordionExtraCredits",
    "parameterOptions": "typeOfDebts"
  },
  {
    "name": "capital",
    "type": "capital",
    "fieldtype": "amount",
    "label": "CV9: Capital",
    "placeholder": "",
    "description": "Cantidad de capital de credito hipotecario",
    "column": 3,
    "row": 1,
    "defaultValue": "",
    "priority": 67,
    "messageCode": "675",
    "rules": "required,number,maxLength25,accordionExtraCredits",
    "parameterOptions": ""
  },
  {
    "name": "interest",
    "type": "interest",
    "fieldtype": "amount",
    "label": "CV9: Intereses",
    "placeholder": "",
    "description": "Intereses de credito hipotecario",
    "column": 3,
    "row": 1,
    "defaultValue": "",
    "priority": 68,
    "messageCode": "675",
    "rules": "required,number,maxLength25,accordionExtraCredits",
    "parameterOptions": ""
  },
  {
    "name": "mora",
    "type": "mora",
    "fieldtype": "amount",
    "label": "CV9: Mora",
    "placeholder": "",
    "description": "Mora de credito hipotecario",
    "column": 3,
    "row": 1,
    "defaultValue": "",
    "priority": 69,
    "messageCode": "675",
    "rules": "required,number,maxLength25,accordionExtraCredits",
    "parameterOptions": ""
  },
  {
    "name": "typeOfCurrency_2",
    "type": "typeOfCurrency_2",
    "fieldtype": "select",
    "label": "CV9: Moneda(s)",
    "placeholder": "Selecciona el tipo de moneda",
    "description": "Todas las monedas posibles para seleccionar el tipo de monedas",
    "column": 3,
    "row": 1,
    "defaultValue": "",
    "priority": 18,
    "messageCode": "675",
    "rules": "required,accordionExtraCredits",
    "parameterOptions": "typeOfDebts"
  },
  {
    "name": "collection",
    "type": "collection",
    "fieldtype": "amount",
    "label": "CVB: Cobranza",
    "placeholder": "",
    "description": "Cobranza de credito hipotecario",
    "column": 3,
    "row": 1,
    "defaultValue": "",
    "priority": 70,
    "messageCode": "675,accordionExtraCredits",
    "rules": "required,number,maxLength25",
    "parameterOptions": ""
  },
  {
    "name": "judicial2",
    "type": "judicial2",
    "fieldtype": "amount",
    "label": "CVB: G. Judiciales",
    "placeholder": "",
    "description": "G. Judiciales de credito hipotecario",
    "column": 3,
    "row": 1,
    "defaultValue": "",
    "priority": 71,
    "messageCode": "675",
    "rules": "required,number,maxLength25,accordionExtraCredits",
    "parameterOptions": ""
  },
  {
    "name": "loanSubtotal2",
    "type": "loanSubtotal2",
    "fieldtype": "amount",
    "label": "CVB: Subtotal Préstamo",
    "placeholder": "",
    "description": "Subtotal Préstamo de credito hipotecario",
    "column": 3,
    "row": 1,
    "defaultValue": "0",
    "priority": 72,
    "messageCode": "675",
    "rules": "required,disabled,maxLength25,accordionExtraCredits",
    "parameterOptions": ""
  },
]