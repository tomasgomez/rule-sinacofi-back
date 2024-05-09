import { PrismaClient } from "@prisma/client";
import { rules, seedRules } from "./rules/seedRules.mjs";
import { seedSchema } from "./seedSchema.mjs";
import { seedOptionValues } from "./optionValues/seedOptions.mjs";
import { channel, commune, condition, format, institution, optType, notary, priority, region, rejectionReason } from "./optionValues/options/index.mjs";
import { schema199 } from "./199/index.mjs";
import { schema136 } from "./136/index.mjs";
import { schema670, seed670 } from "./670/index.mjs";
import { schema671,seed671 } from "./671/index.mjs";
import { schema672, seed672 } from "./672/index.mjs";
import { schema673, seed673 } from "./673/index.mjs";



const prisma = new PrismaClient();

async function main() {

    // load schemas
    const schemas = [schema670, schema671,schema672, schema673, schema199, schema136];

    // // seed schemas
    await seedSchema(prisma, [schema673]);

    // // seed rules
    // await seedRules(prisma, rules);

    // // seed option values
    // await seedOptionValues(prisma, channel);
    // await seedOptionValues(prisma, commune);
    // await seedOptionValues(prisma, condition);
    // await seedOptionValues(prisma, format);
    // await seedOptionValues(prisma, institution);
    // await seedOptionValues(prisma, optType);
    // await seedOptionValues(prisma, notary);
    // await seedOptionValues(prisma, priority);
    // await seedOptionValues(prisma, region);
    // await seedOptionValues(prisma, rejectionReason);
    const options = { channel, commune, condition, format, institution, operationType: optType, notary, priority, region, rejectionReason }

    // seed670(prisma, rules, options);
    // seed671(prisma, rules, options);
    // seed672(prisma, rules, options);
    seed673(prisma, rules, options);

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
