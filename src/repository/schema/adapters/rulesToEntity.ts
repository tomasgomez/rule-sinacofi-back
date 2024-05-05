import { ErrorCode, InternalError } from "../../../entities/internalError";
import { IRule } from "../../../entities/rule/interface";
import { Rule } from "../../../entities/rule/rule";
import { getRuleType, RuleTypes } from "../../../entities/rule/ruleTypes";
import { IParamterRuleResponse } from "../entities/manyToMany";
import { IRuleResponse } from "../entities/rule";


const rulesToEntity = (rules: IParamterRuleResponse[]): IRule[] => {
    try {
        const rulesAdapted = rules.map((r: IParamterRuleResponse) => {
            const ruleType: RuleTypes = getRuleType(r.rule.condition);
            return new Rule(r.rule.id, r.rule.name, r.rule.type, r.rule.description, ruleType, r.rule.value, r.rule.priority, r.rule.createdAt, r.rule.updatedAt);
        });
        return rulesAdapted;
    } catch (e) {
        console.error(e);
        throw new InternalError('Error adapting rules', ErrorCode.BAD_REQUEST, e);
    }
}

export { rulesToEntity };