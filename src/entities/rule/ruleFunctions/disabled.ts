import { Rule } from "../interface"
import { ruleCategory } from "../ruleCategory"
import { ruleType } from "../ruleTypes"

export const getDisabled = (value: string): Rule => {
    return {
        "id": "",
        "name": "disabled",
        "type": "parameter",
        "category": ruleCategory.VALIDATION,
        "description": "campo requerido",
        "condition": ruleType.disabled,
        "value": value,
        "priority": 0,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
}