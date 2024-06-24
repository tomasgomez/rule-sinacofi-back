import { Prisma } from "@prisma/client";
import { IRuleArgs } from "./rule";
import { IOptionValueArgs } from "./optionValue";
import { IActionArgs } from "./actions";

type IParameterOptionValueSelect = Omit<Prisma.ParametersOptionsSelect, 'optionValue'> & { 
    optionValue?: IOptionValueArgs 
};
type IParemterRuleSelect = Omit<Prisma.RulesParametersSelect, 'rule'> & { 
    rule?: IRuleArgs 
};
type IParemterActionSelect = Omit<Prisma.ActionsParametersSelect, 'action'> & { 
    action?: IActionArgs 
};

type IActionSchemaSelect = Omit<Prisma.ActionsSchemasSelect, 'schema' & {
    action?: IActionArgs
}>
type IParameterOptionArgs<TArgs = Prisma.ParametersOptionsDefaultArgs> = Omit<TArgs, 'select'> & { 
    select: IParameterOptionValueSelect 
};
type IParemterRuleSelectArgs<TArgs = Prisma.RulesParametersDefaultArgs> = Omit<TArgs, 'select'> & { 
    select: IParemterRuleSelect 
};
type IParemterActionSelectArgs<TArgs = Prisma.ActionsParametersDefaultArgs> = Omit<TArgs, 'select'> & { 
    select: IParemterActionSelect 
};

type ISchemaAtionSelectArgs<TArgs = Prisma.ActionsParametersDefaultArgs> = Omit<TArgs, 'select'> & { 
    select: Prisma.ActionsSchemasSelect
};

// type for the parametersResponse
type IParameterOptionResponse<TArgs = Prisma.ParametersOptionsDefaultArgs> = Prisma.ParametersOptionsGetPayload<IParameterOptionArgs<TArgs>>;
type IParamterRuleResponse<TArgs = Prisma.RulesParametersDefaultArgs> = Prisma.RulesParametersGetPayload<IParemterRuleSelectArgs<TArgs>>;
type IParamterActionResponse<TArgs = Prisma.ActionsParametersDefaultArgs> = Prisma.ActionsParametersGetPayload<IParemterActionSelectArgs<TArgs>>;
type ISchemaActionResponse<TArgs = Prisma.ActionsSchemasDefaultArgs> = Prisma.ActionsParametersGetPayload<ISchemaAtionSelectArgs<TArgs>>;

export { IParameterOptionValueSelect, IParemterRuleSelect, IParameterOptionArgs, IParemterRuleSelectArgs, IParamterRuleResponse, IParameterOptionResponse ,IParamterActionResponse, IParemterActionSelectArgs, IParemterActionSelect, ISchemaActionResponse, ISchemaAtionSelectArgs, IActionSchemaSelect };