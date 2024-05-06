import { Prisma } from "@prisma/client";
import { IOptionValueSelect } from "./optionValue";
import { IRuleSelect } from "./rule";
import { IParameterOptionValueSelect, IParemterRuleSelect } from "./manyToMany";

/*
  Parameter interface for the Prisma ORM
  where T is the type of the params to be selected
*/

// type for the parametersSelect
type IParameterSelect = Partial<Prisma.ParameterSelect> & { 
  optionValues?: IParameterOptionValueSelect, 
  rules?: IParemterRuleSelect 
};
type ParameterSelect<T extends ReadonlyArray<unknown>> = T[number];
// type for the parametersArgs
type IParameterArgs<TArgs = Prisma.ParameterDefaultArgs> = Omit<TArgs, 'select'> & { 
  select: IParameterSelect 
};
// type for the parametersResponse
type IParameterResponse<TArgs = Prisma.ParameterDefaultArgs> = Prisma.ParameterGetPayload<IParameterArgs<TArgs>>;

export { IParameterSelect, IParameterArgs, ParameterSelect, IParameterResponse};