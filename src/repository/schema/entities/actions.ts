import { Prisma } from "@prisma/client";

/*
  Actions interface for the Prisma ORM
  where T is the type of the action to be selected
*/

// type for the actionSelect
type IActionSelect = Partial<Prisma.ActionSelect>;
type ActionSelect<T extends ReadonlyArray<unknown>> = T[number];
// type for the actionArgs
type IActionArgs<TArgs = Prisma.ActionDefaultArgs> = Omit<TArgs, 'select'> & { 
  select: IActionSelect 
};
// type for the actionResponse
type IActionResponse = Prisma.ActionGetPayload<IActionArgs>;

export { IActionArgs, IActionSelect, IActionResponse, ActionSelect };

