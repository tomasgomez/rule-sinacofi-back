export enum actionCategory {
    FILL = "FILL"
}

export type ActionCategory = actionCategory; 

export function getActionCategory(value: string): actionCategory {
    if (Object.values(actionCategory).includes(value as actionCategory)) {
        return value as actionCategory;
      } else {
        throw new Error("Invalid action category provided.");
      }
}

  