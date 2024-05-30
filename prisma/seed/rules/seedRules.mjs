import { PrismaClient } from '@prisma/client';
import rulesArray from './rules.json' assert { type: 'json' };
import { condition } from '../optionValues/options/index.mjs';

/**
 * // populate Rule table
 * @param {any} rules
 * @returns {[{name: string, description: string, type: string, value: string, priority: number}]}
 * 
 */

export const seedRules = async (prismaClient, rules) => {
    
    if (rules.length === 0) {
        throw new Error('rules is empty');
    }

    // create rules
    const rulesToBeCreated = rules.reduce((acc, rule) => {
        const r = {
            name: rule.name,
            description: rule.description,
            type: rule.type,
            value: rule.value,
            priority: rule.priority,
            condition: rule.condition,
        };
        acc.push(r);
        return acc;
    }, []);

    // populate rules
    for (let i= 0; i < rulesToBeCreated.length; i++) {
        const rule = rulesToBeCreated[i];
        await prismaClient.rule.create({ data: rule });
    }

    return rulesToBeCreated;

}

/**
 * // connect rules to schema
 * @param {any} prismaClient
 * @param {{[{name: string, description: string, type: string, value: string, priority: number, schemas: [{messageCode: string}]}]}} rulesSchema
 * @returns {[{name: string, description: string, type: string, value: string, priority: number, schemas: [{messageCode: string}]}]}
 * 
 */

export const connectRulesToSchema = async (prismaClient, rulesSchema) => {
    
    if (rulesSchema.length === 0) {
        throw new Error('rules is empty');
    }

    for (let i= 0; i < rulesSchema.length; i++) {
        const rule = rulesSchema[i];
        await prismaClient.rule.update({
            where: { name_type: { name: rule.name, type: rule.type } },
            data: {
                schema: {
                    connect: rule.schemas.map((schema) => ({ messageCode: schema.messageCode }) )
                }
            }
        });
        
    }

    return rulesSchema;
}

export const connectRulesToParameters = async (prismaClient, rulesParameters) => {
    if (rulesParameters.length === 0) {
        throw new Error('rules is empty');
    }

    for (let i= 0; i < rulesParameters.length; i++) {
        const rule = rulesParameters[i];
    
        await prismaClient.rule.update({
            where: { name_type: { name: rule.name, type: rule.type } },
            data: {
                parameters: {
                    connect: rule.params?.map((parameter) => ({ name_messageCode_priority: {name: parameter.name, messageCode: parameter.messageCode, priority: parameter.priority }}) )
                }
            }
        });
        
    }
}

export const rules = rulesArray;


