import { PrismaClient } from "@prisma/client";
import { seedRules, rules } from "./rules/seedRules.mjs";
import { seedOptionValues } from "./optionValues/seedOptions.mjs";
import { channel, commune, condition, format, institution, optType, notary, priority, region } from "./optionValues/options/index.mjs";
import { seedSchema } from "./seedSchema.mjs";
import { schema670 } from "./670/index.mjs";
import { schema199 } from "./199/index.mjs";
import { schema136 } from "./136/index.mjs";
import { seed670 } from "./670/seed.mjs";



const prisma = new PrismaClient();

async function main() {

    // load schemas
    const schemas = [schema670, schema199, schema136];

    // seed schemas
    await seedSchema(prisma, schemas);

    // seed rules
    await seedRules(prisma, rules);

    // seed option values
    await seedOptionValues(prisma, channel);
    await seedOptionValues(prisma, commune);
    await seedOptionValues(prisma, condition);
    await seedOptionValues(prisma, format);
    await seedOptionValues(prisma, institution);
    await seedOptionValues(prisma, optType);
    await seedOptionValues(prisma, notary);
    await seedOptionValues(prisma, priority);
    await seedOptionValues(prisma, region);
    const options = { channel, commune, condition, format, institution, operationType: optType, notary, priority, region }

    seed670(prisma, rules, options);

}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
