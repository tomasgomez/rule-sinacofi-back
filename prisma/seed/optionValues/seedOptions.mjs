
import { PrismaClient } from '@prisma/client';

/**
 * // populate OptionValue table
 * @param {any} optionValue
 * @returns {[{name: string, description: string, type: string, value: string, label: string}]}
 * 
 */

export const seedOptionValues = async (prismaClient, optionValueArray) => {

    if (optionValueArray.length === 0) {
        throw new Error('optionValue is empty');
    }

    const isUnique = (obj, index, self) => index === self.findIndex(o => o.name === obj.name && o.type === obj.type);
    // Create optionValues
    const optionValue = optionValueArray.filter((obj, index, self) => isUnique(obj, index, self));

    // create option values
    const optionsValuesToBeCreated = optionValue.reduce((acc, optionValue) => {
        const opt = {
            name: optionValue.name,
            description: optionValue.description,
            type: optionValue.type,
            value: optionValue.value,
            label: optionValue.label,
        };
        acc.push(opt);
        return acc;
    }, []);

    // populate OptionValue table
    for (let i= 0; i < optionsValuesToBeCreated.length; i++) {
        const option = optionsValuesToBeCreated[i];
        await prismaClient.optionValue.create({ data: option });
    }

    return optionsValuesToBeCreated;

}

export const connectOptionValuesToParameter = async (prismaClient, optionValuesParameter) => {

    if (optionValuesParameter.length === 0) {
        throw new Error('optionValuesParameter is empty');
    }

    // connect option values to parameters
    for (let i= 0; i < optionValuesParameter.length; i++) {
        const optionValue = optionValuesParameter[i];
        await prismaClient.optionValue.update({
            where: { name_type: {name: optionValue.name, type: optionValue.type }},
            data: {
                parameters: {
                    connect: optionValue.parameters.map((parameter) => ({ name_messageCode: { name: parameter.name, messageCode: parameter.messageCode } }) )
                }
            }
        });
    }

}