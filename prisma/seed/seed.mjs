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
import { schema674, seed674 } from "./674/index.mjs";
import { schema675, seed675 } from "./675/index.mjs";



const prisma = new PrismaClient();

async function main() {

    // // load schemas
    const schemas = [schema670, schema671,schema672, schema673, schema674, schema675];

    // // seed schemas

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
    await seedOptionValues(prisma, rejectionReason);

    await seedSchema(prisma, [schema675]);
    
    const options = { channel, commune, condition, format, institution, operationType: optType, notary, priority, region, rejectionReason }
    console.log("finished adding option values");
    

    // await seed670(prisma, rules, options);
    // await seed671(prisma, rules, options);
    // await seed672(prisma, rules, options);
    // await seed675(prisma, rules, options);
    // await seed674(prisma, rules, options);
    // console.log("seed674")
    // seed675(prisma, rules, options);
    console.log("seed675")
    console.log("finished adding schemas");
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
