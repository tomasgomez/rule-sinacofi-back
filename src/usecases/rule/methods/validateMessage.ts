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
        message.parameters.forEach((parameter: MessageParameter) => {
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

            return {
                ...parameter,
                label: schemaParameter.label,
            }
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
        console.log("Error message validaiton")
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

    return [isSender, isReceiver];
}

function addMessageActions(message: Message, user: User): Message {
    let status = MessageStatus.BANDEJA_DE_ENTRADA;
    let actions: MessageActions[] = [];
    let sortedStatus = message.status?.sort((a, b) => b.id - a.id);

    if (sortedStatus && sortedStatus.length > 0) {
        status = sortedStatus[0]?.id;

        if (!message || !message.messageCode || !status) {
            return message;
        }

        let [isSender, isReceiver] = checkUserMessageRole(message, user);

        if (!isSender && !isReceiver) {
            return message;
        }

        switch (message.messageCode) {
            case MessageCodes.ALZAMIENTO_HIPOTECARIO:
                switch (status) {
                    case MessageStatus.PREPARADO:
                        if (isSender) {
                            actions.push(MessageActions.SIGN);
                            actions.push(MessageActions.EDIT);
                            actions.push(MessageActions.DELETE);
                        }
                        break;
                    case MessageStatus.BANDEJA_DE_ENTRADA:
                        if (isSender && message?.previousMessageCode == MessageCodes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO) {
                            actions.push(MessageActions.DUPLICATE);
                        } else if (isSender) {
                            actions.push(MessageActions.SHOW_DETAIL);
                            // actions.push(MessageActions.DUPLICATE);
                            // actions.push(MessageActions.DELETE);
                        } else if (isReceiver) {
                            actions.push(MessageActions.SHOW_DETAIL);
                        }
                        break;
                }
                break;
            case MessageCodes.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO:
                switch (status) {
                    case MessageStatus.PREPARADO:
                        actions.push(MessageActions.SEND);
                        break;
                    case MessageStatus.BANDEJA_DE_ENTRADA:
                        actions.push(MessageActions.SHOW_DETAIL);
                        break;
                }
                break;
            case MessageCodes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO:
                switch (status) {
                    case MessageStatus.PREPARADO:
                        actions.push(MessageActions.SEND);
                        break;
                    case MessageStatus.BANDEJA_DE_ENTRADA:
                        actions.push(MessageActions.SHOW_DETAIL);
                        break;
                }
                break;
            case MessageCodes.AVISO_DE_CLIENTE_EN_NORMALIZACION:
                switch (status) {
                    case MessageStatus.PREPARADO:
                        actions.push(MessageActions.SEND);
                        break;
                    case MessageStatus.BANDEJA_DE_ENTRADA:
                        actions.push(MessageActions.SHOW_DETAIL);
                        break;
                }
                break;
            case MessageCodes.SOLICITUD_DE_ALZAMIENTO_HIPOTECARIO:
                switch (status) {
                    case MessageStatus.PREPARADO:
                        actions.push(MessageActions.SEND);
                        break;
                    case MessageStatus.BANDEJA_DE_ENTRADA:
                        actions.push(MessageActions.SHOW_DETAIL);
                        break;
                }
                break;
            case MessageCodes.LIQUIDACION_DE_PREPAGO_DE_ALZAMIENTO_HIPOTECARIO:
                switch (status) {
                    case MessageStatus.PREPARADO:
                        actions.push(MessageActions.SEND);
                        break;
                    case MessageStatus.BANDEJA_DE_ENTRADA:
                        actions.push(MessageActions.SHOW_DETAIL);
                        break;
                }
                break;
            case MessageCodes.DATOS_PARA_EL_PAGO_AH:
                switch (status) {
                    case MessageStatus.PREPARADO:
                        actions.push(MessageActions.SEND);
                        break;
                    case MessageStatus.BANDEJA_DE_ENTRADA:
                        if (isSender) {
                            actions.push(MessageActions.SHOW_DETAIL);
                        } else if (isReceiver) {
                            actions.push(MessageActions.PRINT);
                        }
                        break;
                }
                break;
            case MessageCodes.AVISO_DE_PAGO_AH:
                switch (status) {
                    case MessageStatus.PREPARADO:
                        actions.push(MessageActions.SEND);
                        break;
                    case MessageStatus.BANDEJA_DE_ENTRADA:
                        actions.push(MessageActions.SHOW_DETAIL);
                        break;
                }
                break;
            case MessageCodes.RECHAZO_DE_PAGO_AH:
                switch (status) {
                    case MessageStatus.PREPARADO:
                        actions.push(MessageActions.SEND);
                        actions.push(MessageActions.CHECK_OPTIONS);
                        break;
                    case MessageStatus.BANDEJA_DE_ENTRADA:
                        actions.push(MessageActions.SHOW_DETAIL);
                        break;
                }
                break;
            case MessageCodes.CONFIRMACION_DE_PAGO_AH:
                switch (status) {
                    case MessageStatus.PREPARADO:
                        actions.push(MessageActions.SEND);
                        actions.push(MessageActions.CHECK_OPTIONS);
                        break;
                    case MessageStatus.ENVIADO:
                        actions.push(MessageActions.SHOW_DETAIL);
                        break;
                }
                break;
        }
    }

    return {
        ...message,
        actions
    };
}