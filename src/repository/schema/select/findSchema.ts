import { Prisma } from "@prisma/client";
import { IOptionValueArgs, IOptionValueSelect, OptionValueSelect } from "../entities/optionValue";
import { setSelectValues } from "../entities/select";
import { RuleSelect, IRuleSelect, IRuleArgs } from "../entities/rule";
import { IParameterArgs, IParameterSelect, ParameterSelect } from "../entities/parameter";
import { ISchemaSelect, SchemaSelect } from "../entities/schema";

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
TOptionValues extends keyof Prisma.OptionValueSelect
>(schemaSelectParams: TSchemaValues[], parametersSelectParams: TParameterValues[], ruleSelectParams: TRuleValues[], optionValuesSelectParams: TOptionValues[]): ISchemaSelect =>{
  
    const optionValues: IOptionValueSelect = setSelectValues<IOptionValueSelect, OptionValueSelect<typeof optionValuesSelectParams>>(optionValuesSelectParams);
    const optionValuesArgs: IOptionValueArgs = { select: optionValues };
    const rulesValues: IRuleSelect = setSelectValues<IRuleSelect, RuleSelect<typeof ruleSelectParams>>(ruleSelectParams);
    const rulesArgs: IRuleArgs = { select: rulesValues };
    const parametersValues: IParameterSelect = setSelectValues<IParameterSelect, ParameterSelect<typeof parametersSelectParams>>(parametersSelectParams);
    const parametersArgs: IParameterArgs = { select: parametersValues };
    const findSchema: ISchemaSelect = setSelectValues<ISchemaSelect, SchemaSelect<typeof schemaSelectParams>>(schemaSelectParams);


    // OptionValues to parameter
    const parameterOptionValues: Prisma.OptionValue$parametersArgs = { select: { optionValue: optionValuesArgs } };
    const paramterRules: Prisma.Parameter$rulesArgs = { select: { rule: rulesArgs } };
    const schemaRules: Prisma.Schema$rulesArgs = { select: { rule: rulesArgs } };
    // set the parameters
    parametersArgs.select.optionValues = parameterOptionValues;
    parametersArgs.select.rules = paramterRules;
    findSchema.rules = schemaRules;
    findSchema.parameters = parametersArgs;

    return findSchema;

}


export { createFindSchemaSelect };



