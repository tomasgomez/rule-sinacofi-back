import { Prisma } from "@prisma/client";
import exp from "constants";

/*
  OptionValue interface for the Prisma ORM
  where T is the type of the params to be selected
*/

// type for the optionValueSelect
type IOptionValueSelect = Partial<Prisma.OptionValueSelect>;
type OptionValueSelect<T extends ReadonlyArray<unknown>> = T[number];

// type for the optionValueArgs
type IOptionValueArgs<TArgs = Prisma.OptionValueDefaultArgs> = Omit<TArgs, 'select'> & { 
  select: IOptionValueSelect 
};
// type for the optionValueResponse
type IOptionValueResponse<TArgs> = Prisma.OptionValueGetPayload<IOptionValueArgs<TArgs>>;


export { IOptionValueSelect, OptionValueSelect, IOptionValueArgs, IOptionValueResponse };

