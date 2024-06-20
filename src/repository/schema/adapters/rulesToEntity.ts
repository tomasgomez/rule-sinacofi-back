import { ErrorCode } from "../../../entities/internalError";
import { Rule } from "../../../entities/rule/interface";
import { getRuleCategory, RuleCategory } from "../../../entities/rule/ruleCategory";

import { getRuleType, RuleTypes } from "../../../entities/rule/ruleTypes";
import { IParamterRuleResponse } from "../entities/manyToMany";


const rulesToEntity = (rules: IParamterRuleResponse[]): Rule[] => {
    try {
        const rulesAdapted = rules.map((r: IParamterRuleResponse) => {
            const ruleType: RuleTypes = getRuleType(r.rule.condition);
            const ruleCategory: RuleCategory = getRuleCategory(r.rule.category);
            return {
                id: 
                r.rule.id, 
                name: r.rule.name, 
                type: r.rule.type, 
                category: ruleCategory,
                description: r.rule.description, 
                condition: ruleType, 
                value: r.rule.value, 
                priority: r.rule.priority, 
                createdAt: r.rule.createdAt, 
                updatedAt: r.rule.updatedAt};
        });
        return rulesAdapted;
    } catch (e) {
        console.error(e);
        throw { message: "Error adapting rules", code: ErrorCode.INTERNAL_SERVER_ERROR, data: null, statusCode: 500}
    }
}

export { rulesToEntity };