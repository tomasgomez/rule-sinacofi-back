import { Prisma } from "@prisma/client";
import { IRuleArgs, IRuleSelect } from "./rule";
import { IOptionValueArgs, IOptionValueSelect } from "./optionValue";
import { IParameterSelect } from "./parameter";


type IParameterOptionValueSelect = Omit<Prisma.ParametersOptionsSelect, 'optionValue'> & { 
    optionValue?: IOptionValueArgs 
};
type IParemterRuleSelect = Omit<Prisma.RulesParametersSelect, 'rule'> & { 
    rule?: IRuleArgs 
};
type IParameterOptionArgs<TArgs = Prisma.ParametersOptionsDefaultArgs> = Omit<TArgs, 'select'> & { 
    select: IParameterOptionValueSelect 
};
type IParemterRuleSelectArgs<TArgs = Prisma.ParametersOptionsDefaultArgs> = Omit<TArgs, 'select'> & { 
    select: IParemterRuleSelect 
};
// type for the parametersResponse
type IParameterOptionResponse<TArgs = Prisma.ParametersOptionsDefaultArgs> = Prisma.ParametersOptionsGetPayload<IParameterOptionArgs<TArgs>>;
type IParamterRuleResponse<TArgs = Prisma.ParametersOptionsDefaultArgs> = Prisma.RulesParametersGetPayload<IParemterRuleSelectArgs<TArgs>>;

export { IParameterOptionValueSelect, IParemterRuleSelect, IParameterOptionArgs, IParemterRuleSelectArgs, IParamterRuleResponse, IParameterOptionResponse};