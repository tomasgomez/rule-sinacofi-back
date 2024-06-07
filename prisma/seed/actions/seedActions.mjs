import actionsArray from './actions.json' assert { type: 'json' };

/**
 * // populate Actions table
 * @param {any} actions
 * @returns {[{name: string, description: string, type: string, value: object, priority: number}]}
 * 
 */

export const seedActions = async (prismaClient, actions) => {
    
    if (actions.length === 0) {
        throw new Error('actions is empty');
    }

    // create actions
    const actionsToBeCreated = actions.reduce((acc, action) => {
        const r = {
            name: action.name,
            description: action.description,
            type: action.type,
            category: action.category, 
            value: action.value,
            priority: action.priority,
            action: action.action
        };
        acc.push(r);
        return acc;
    }, []);

    // populate actions
    for (let i= 0; i < actionsToBeCreated.length; i++) {
        const action = actionsToBeCreated[i];
        await prismaClient.action.create({ data: action });
    }

    return actionsToBeCreated;

}


export const connectActionsToParameters = async (prismaClient, actionsParameters) => {
    if (actionsParameters.length === 0) {
        throw new Error('actions is empty');
    }

    for (let i= 0; i < actionsParameters.length; i++) {
        const action = actionsParameters[i];
    
        await prismaClient.action.update({
            where: { name_type: { name: action.name, type: action.type } },
            data: {
                parameters: {
                    connect: action.params?.map((parameter) => ({ name_messageCode_priority: {name: parameter.name, messageCode: parameter.messageCode, priority: parameter.priority }}) )
                }
            }
        });
        
    }
}

export const actions = actionsArray;


