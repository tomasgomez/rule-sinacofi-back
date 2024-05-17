import { Prisma } from "@prisma/client";

/*
  Rule interface for the Prisma ORM
  where T is the type of the params to be selected
*/

// type for the ruleSelect
type IRuleSelect = Partial<Prisma.RuleSelect>;
type RuleSelect<T extends ReadonlyArray<unknown>> = T[number];
// type for the ruleArgs
type IRuleArgs<TArgs = Prisma.RuleDefaultArgs> = Omit<TArgs, 'select'> & { 
  select: IRuleSelect 
};
// type for the ruleResponse
type IRuleResponse = Prisma.RuleGetPayload<IRuleArgs>;

export { IRuleSelect, IRuleArgs, IRuleResponse, RuleSelect };

