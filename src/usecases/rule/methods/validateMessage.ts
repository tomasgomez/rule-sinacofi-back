import {
    IRequest
} from "../../../entities/calls/pagination/interface";
import {
    ErrorCode,
    InternalError,
    isInternalError
} from "../../../entities/internalError";
import {
    Message
} from "../../../entities/message/interface";
import {
    MessageActions
} from "../../../entities/message/messageActions";
import {
    MessageCodes
} from "../../../entities/message/messageCodes";
import {
    MessageStatus
} from "../../../entities/message/messageStatus";
import {
    MessageParameter
} from "../../../entities/paremeters/interface";
import {
    Rule
} from "../../../entities/rule/interface";
import {
    OptionalSchema
} from "../../../entities/schema/interface";
import {
    IRuleUsecase
} from "../usecase";
import {
    User
} from "../../../entities/user/interface";


const validateMessage = async (context: IRuleUsecase, message: Message, user: User): Promise < Message | InternalError > => {

    try {
        // get shcema type
        const request: IRequest < OptionalSchema, any > = {
            data: {
                messageCode: message.messageCode
            },
            count: 1,
            offset: 0
        }
        const schema = await context.schemaUsecase.findSchema(request);
        if (isInternalError(schema)) {
            console.log("Error getting schemaType")
            return schema;
        }

        const messageErrors: any[] = [];

        message = addMessageActions(message, user);

        // validate parameters of the message
        message?.parameters?.forEach((parameter: MessageParameter) => {

            const schemaParameter = schema.parameters.find((schemaParameter) => schemaParameter.name === parameter.name);
            if (!schemaParameter || schemaParameter === undefined) {
                console.log(`Parameter ${parameter.name} not found in schema`);
                return {
                    message: `Parameter ${parameter.name} not found in schema`,
                    code: ErrorCode.BAD_REQUEST,
                    data: null,
                    status: 400
                };
            }

            parameter.displayValue = parameter.value;
            parameter.label = schemaParameter.label;

            if (schemaParameter.optionValues !== undefined && schemaParameter.optionValues.length > 0) {
                let optionValue = schemaParameter.optionValues.find((option: any) => option.value === parameter.value);
                if (optionValue === undefined) {
                    return parameter;
                }

                parameter.displayValue = optionValue.label;
            }

            // get rules
            const rules = schemaParameter.rules;
            // check the rules
            rules?.forEach((rule: Rule) => {
                const ruleValidation = context.validateRule(rule, parameter.value);
                if (isInternalError(ruleValidation)) {
                    messageErrors.push(ruleValidation);
                }
            });

            parameter.messageCode = message.messageCode;


            return parameter
        });

        // check if there are any errors
        if (messageErrors.length > 0) {
            console.log("Error validating message")
            return {
                message: "Error validating message",
                code: ErrorCode.VALIDATION_ERROR,
                data: messageErrors,
                statusCode: 400
            };
        }
        return message;

    } catch (error) {
        console.log("Error message validation")
        throw {
            message: "Error message validaiton",
            code: ErrorCode.INTERNAL_SERVER_ERROR,
            data: null,
            statusCode: 500
        };
    }
};

export {
    validateMessage
};

function checkUserMessageRole(message: Message, user: User): [boolean, boolean] {

    // Check if the message is a sender or receiver
    let isSender = false;
    let isReceiver = false;
    let filterOrigin = user.institutionCode;

    isSender = message.origin == filterOrigin ? true : false;
    isReceiver = !isSender && message.destination == filterOrigin ? true : false;

    if (!isSender && !isReceiver) {
        let bank = message.parameters?.find((param) => param.name == 'bank');
        if (bank) {
            isSender = bank?.value == filterOrigin ? true : false;
            isReceiver = !isSender ? true : false;
        } else {
            let beneficiaryBank = message.parameters?.find((param) => param.name == 'beneficiaryBank');
            if (beneficiaryBank) {
                isSender = beneficiaryBank?.value != filterOrigin ? true : false;
                isReceiver = !isSender ? true : false;
            }
        }

    }
    return [isSender, isReceiver];
}

function addMessageActions(message: Message, user: User): Message {
    console.log("addMessageActions: ", message, user);
    let actions: MessageActions[] = [];
    
    let status = message.statusCode ? message.statusCode : MessageStatus.BANDEJA_DE_ENTRADA;

    if (!message || !message.messageCode || !status) {
        console.log("Message, messageCode or status is missing");
        return message;
    }

    let [isSender, isReceiver] = checkUserMessageRole(message, user);

    if (!isSender && !isReceiver) {
        console.log("User is not sender or receiver");
        console.log("isSender", isSender, "isReceiver", isReceiver);
        return message;
    }

    console.log("isSender", isSender, "isReceiver", isReceiver);
    console.log("status", status);
    console.log("messageCode", message.messageCode);
    console.log("previousMessageCode", message.previousMessageCode);
    console.log("actions", message.actions);

    console.log("1");
    switch (message.messageCode) {
        case MessageCodes.ALZAMIENTO_HIPOTECARIO:
            console.log("2");
            if(status == MessageStatus.PREPARADO){
                console.log("3");

                if (isSender) {
                    console.log("4");
                    actions.push(MessageActions.SIGN);
                    actions.push(MessageActions.EDIT);
                    actions.push(MessageActions.DELETE);
                }
            } else if (status == MessageStatus.BANDEJA_DE_ENTRADA || status == MessageStatus.ENVIADO) {
                console.log("5");
                if (isReceiver && message?.previousMessageCode == MessageCodes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO) {
                    console.log("6");
                    actions.push(MessageActions.SHOW_DETAIL);
                    actions.push(MessageActions.DUPLICATE);
                } else if (isReceiver && message?.previousMessageCode == MessageCodes.RECHAZO_DE_PAGO_AH) {
                    console.log("6.1");
                    actions.push(MessageActions.SHOW_DETAIL);
                    actions.push(MessageActions.DUPLICATE);
                } else if (isSender) {
                    console.log("7");
                    actions.push(MessageActions.SHOW_DETAIL);
                    // actions.push(MessageActions.DUPLICATE);
                    // actions.push(MessageActions.DELETE);
                } else if (isReceiver) {
                    console.log("8");
                    actions.push(MessageActions.SHOW_DETAIL);
                }
            }
            break;
        case MessageCodes.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO:
            console.log("9");
            if (status == MessageStatus.PREPARADO) {
                console.log("10");
                actions.push(MessageActions.SIGN);
            } else if (status == MessageStatus.BANDEJA_DE_ENTRADA || status == MessageStatus.ENVIADO) {
                console.log("11");
                actions.push(MessageActions.SHOW_DETAIL);
            }
            break;
        case MessageCodes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO:
            console.log("12");
            if (status == MessageStatus.PREPARADO) {
                console.log("13");
                actions.push(MessageActions.SIGN);
            } else if (status == MessageStatus.BANDEJA_DE_ENTRADA || status == MessageStatus.ENVIADO) {
                console.log("14");
                actions.push(MessageActions.SHOW_DETAIL);
            }
            break;
        case MessageCodes.AVISO_DE_CLIENTE_EN_NORMALIZACION:
            console.log("15");
            if (status == MessageStatus.PREPARADO) {
                console.log("16");
                actions.push(MessageActions.SIGN);
            } else if (status == MessageStatus.BANDEJA_DE_ENTRADA || status == MessageStatus.ENVIADO) {
                console.log("17");
                actions.push(MessageActions.SHOW_DETAIL);
            }
            break;
        case MessageCodes.SOLICITUD_DE_ALZAMIENTO_HIPOTECARIO:
            console.log("18");
            if (status == MessageStatus.PREPARADO) {
                console.log("19");
                actions.push(MessageActions.SIGN);
            } else if (status == MessageStatus.BANDEJA_DE_ENTRADA || status == MessageStatus.ENVIADO) {
                console.log("20");
                actions.push(MessageActions.SHOW_DETAIL);
            }
            break;
        case MessageCodes.LIQUIDACION_DE_PREPAGO_DE_ALZAMIENTO_HIPOTECARIO:
            console.log("22");
            if (status == MessageStatus.PREPARADO) {
                console.log("23");
                actions.push(MessageActions.SIGN);
            } else if (status == MessageStatus.BANDEJA_DE_ENTRADA || status == MessageStatus.ENVIADO) {
                console.log("24");
                actions.push(MessageActions.SHOW_DETAIL);
            }
            break;
        case MessageCodes.DATOS_PARA_EL_PAGO_AH:
            console.log("25");
            if (status == MessageStatus.PREPARADO) {
                console.log("26");
                actions.push(MessageActions.SIGN);
            } else if (status == MessageStatus.BANDEJA_DE_ENTRADA || status == MessageStatus.ENVIADO) {
                if (isSender) {
                    console.log("27");
                    actions.push(MessageActions.SHOW_DETAIL);
                } else if (isReceiver) {
                    console.log("28");
                    actions.push(MessageActions.PRINT);
                }
            }
            break;
        case MessageCodes.AVISO_DE_PAGO_AH:
            console.log("29");
            if (status == MessageStatus.PREPARADO) {
                console.log("30");
                actions.push(MessageActions.SIGN);
            } else if (status == MessageStatus.BANDEJA_DE_ENTRADA || status == MessageStatus.ENVIADO) {
                console.log("31");
                actions.push(MessageActions.SHOW_DETAIL);
            }
            break;
        case MessageCodes.RECHAZO_DE_PAGO_AH:
            console.log("se me fue el internet");
            if (status == MessageStatus.PREPARADO) {
                console.log("32");
                actions.push(MessageActions.SIGN);
                actions.push(MessageActions.CHECK_OPTIONS);
            } else if (status == MessageStatus.BANDEJA_DE_ENTRADA || status == MessageStatus.ENVIADO) {
                console.log("33");
                actions.push(MessageActions.SHOW_DETAIL);
            }
            break;
        case MessageCodes.CONFIRMACION_DE_PAGO_AH:
            console.log("34");
            if (status == MessageStatus.PREPARADO) {
                console.log("35");
                actions.push(MessageActions.SIGN);
                actions.push(MessageActions.CHECK_OPTIONS);
            } else if (status == MessageStatus.BANDEJA_DE_ENTRADA || status == MessageStatus.ENVIADO) {
                console.log("36");
                actions.push(MessageActions.SHOW_DETAIL);
            }
            break;
    }

    console.log("ACTIONS RESPONSE", actions.join(','));

    return {
        ...message,
        actions: actions.join(',')
    };
}