
/*
* This contains the diffrent categories of rules
*/

enum ruleCategory {
    VALIDATION = "VALIDATION",
    FORMAT = "FORMAT",
    GROUP = "GROUP",
    SUM = "SUM"
}

export type RuleCategory = ruleCategory;

export function getRuleCategory(value: string): ruleCategory {
    if (Object.values(ruleCategory).includes(value as ruleCategory)) {
        return value as ruleCategory;
      } else {
        throw new Error("Invalid rule category provided.");
      }
}
