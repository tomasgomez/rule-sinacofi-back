import { Prisma } from "@prisma/client";

/*
  Schema interface for the Prisma ORM
  where T is the type of the params to be selected
*/

// type for the schemaSelect
type ISchemaSelect = Partial<Prisma.SchemaSelect>;
type SchemaSelect<T extends ReadonlyArray<unknown>> = T[number];

// type for the schemaArgs
type ISchemaArgs<TArgs = Prisma.SchemaDefaultArgs> = Omit<TArgs, 'select'> & { select: ISchemaSelect };
// type for the schemaResponse
type ISchemaResponse<TArgs = Prisma.SchemaDefaultArgs> = Prisma.SchemaGetPayload<ISchemaArgs<TArgs>>;

export { ISchemaSelect, ISchemaArgs, ISchemaResponse, SchemaSelect };

