import { Prisma } from "@prisma/client";
import { IOptionValueArgs, IOptionValueSelect, OptionValueSelect } from "../entities/optionValue";
import { setSelectValues } from "../entities/select";
import { RuleSelect, IRuleSelect, IRuleArgs } from "../entities/rule";
import { IParameterArgs, IParameterSelect, ParameterSelect } from "../entities/parameter";
import { ISchemaSelect, SchemaSelect } from "../entities/schema";
import { ActionSelect, IActionArgs, IActionSelect } from "../entities/actions";

/*
    Find schema Select (attributes to be selected)
    @param schemaSelectParams: readonly string[]
    @param parametersSelectParams: readonly string[]
    @param ruleSelectParams: readonly string[]
    @param optionValuesSelectParams: readonly string[]
    @returns ISchemaSelect
    where TSchemaValues: type of the schema params to be selected
    where TParameterValues: type of the parameter params to be selected
    where TRuleValues: type of the rule params to be selected
    where TOptionValues: type of the optionValue params to be selected
*/

const createFindSchemaSelect = <
TSchemaValues extends keyof Prisma.SchemaSelect,
TParameterValues extends keyof Prisma.ParameterSelect,
TRuleValues extends keyof Prisma.RuleSelect,
TOptionValues extends keyof Prisma.OptionValueSelect,
TActionValues extends keyof Prisma.ActionSelect,
>(schemaSelectParams: TSchemaValues[], parametersSelectParams: TParameterValues[], ruleSelectParams: TRuleValues[], optionValuesSelectParams: TOptionValues[], actionSelectParams: TActionValues[]): ISchemaSelect =>{
  
    const optionValues: IOptionValueSelect = setSelectValues<IOptionValueSelect, OptionValueSelect<typeof optionValuesSelectParams>>(optionValuesSelectParams);
    const optionValuesArgs: IOptionValueArgs = { select: optionValues };
    const rulesValues: IRuleSelect = setSelectValues<IRuleSelect, RuleSelect<typeof ruleSelectParams>>(ruleSelectParams);
    const rulesArgs: IRuleArgs = { select: rulesValues };
    const actionValues: IActionSelect = setSelectValues<IActionSelect, ActionSelect<typeof actionSelectParams>>(actionSelectParams);
    const actionArgs: IActionArgs = { select: actionValues };
    const parametersValues: IParameterSelect = setSelectValues<IParameterSelect, ParameterSelect<typeof parametersSelectParams>>(parametersSelectParams);
    const parametersArgs: IParameterArgs = { select: parametersValues };
    const findSchema: ISchemaSelect = setSelectValues<ISchemaSelect, SchemaSelect<typeof schemaSelectParams>>(schemaSelectParams);


    // OptionValues to parameter
    const parameterOptionValues: Prisma.OptionValue$parametersArgs = { select: { optionValue: optionValuesArgs } };
    const paramterRules: Prisma.Parameter$rulesArgs = { select: { rule: rulesArgs } };
    const schemaRules: Prisma.Schema$rulesArgs = { select: { rule: rulesArgs } };
    const parameterActions: Prisma.Parameter$actionsArgs = { select: { action: actionArgs } }
    // set the parameters
    parametersArgs.select.optionValues = parameterOptionValues;
    parametersArgs.select.rules = paramterRules;
    parametersArgs.select.actions = parameterActions;
    findSchema.rules = schemaRules;
    findSchema.parameters = parametersArgs;

    return findSchema;

}

function toSchemaSelectParams(params: string[]): (keyof Prisma.SchemaSelect)[] {
    return params as (keyof Prisma.SchemaSelect)[];
}

function toParametersSelectParams(params: string[]): (keyof Prisma.ParameterSelect)[] {
    return params as (keyof Prisma.ParameterSelect)[];
}

function toRuleSelectParams(params: string[]): (keyof Prisma.RuleSelect)[] {
    return params as (keyof Prisma.RuleSelect)[];
}

function toOptionValuesSelectParams(params: string[]): (keyof Prisma.OptionValueSelect)[] {
    return params as (keyof Prisma.OptionValueSelect)[];
}

function toActionSelectParams(params: string[]): (keyof Prisma.ActionSelect)[] {
    return params as (keyof Prisma.ActionSelect)[];
}

const selectValues = (schemaParams: string[], parameterParams: string[], ruleParams: string[], optionValueParams: string[], actionParams: string[]) => {
    const schema = toSchemaSelectParams(schemaParams);
    const parameter = toParametersSelectParams(parameterParams);
    const rule = toRuleSelectParams(ruleParams);
    const optionValue = toOptionValuesSelectParams(optionValueParams);
    const action = toActionSelectParams(actionParams);

    return createFindSchemaSelect(schema, parameter, rule, optionValue, action)
    
   
}


export { createFindSchemaSelect, selectValues };



