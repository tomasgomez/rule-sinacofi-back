import { PrismaClient } from "@prisma/client";
import { rules, seedRules } from "./rules/seedRules.mjs";
import { seedSchema } from "./seedSchema.mjs";
import { seedOptionValues } from "./optionValues/seedOptions.mjs";
import { channel, commune, condition, format, institution, optType, notary, priority, region, rejectionReason, messageRejectionReason } from "./optionValues/options/index.mjs";
import { schema199 } from "./199/index.mjs";
import { schema136 } from "./136/index.mjs";
import { schema670, seed670 } from "./670/index.mjs";
import { schema671,seed671 } from "./671/index.mjs";
import { schema672, seed672 } from "./672/index.mjs";
import { schema673, seed673 } from "./673/index.mjs";
import { schema674, seed674 } from "./674/index.mjs";
import { schema676, seed676 } from "./676/index.mjs";
import { schema677, seed677 } from "./677/index.mjs";
import { schema678, seed678 } from "./678/index.mjs";
import { schema679, seed679 } from "./679/index.mjs";

const prisma = new PrismaClient();

async function main() {

    // load schemas
    const schemas = [schema670, schema671,schema672, schema673, schema674,schema674,schema674,schema674,schema674, schema199, schema136];

    // seed schemas (you can load all or only the ones you need)
    // await seedSchema(prisma, [schema676,schema677,schema678,schema679]);

    // seed rules, if has new rules uncomment this, first delete all
    // await seedRules(prisma, rules);

    // seed option values , add the one you need if is not loaded
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
    // await seedOptionValues(prisma, messageRejectionReason);
    const options = { channel, commune, condition, format, institution, operationType: optType, notary, priority, region, rejectionReason, messageRejectionReason}

    // seed670(prisma, rules, options);
    // seed671(prisma, rules, options);
    // seed672(prisma, rules, options);
    // seed673(prisma, rules, options);
    seed676(prisma, rules, options);
    // seed677(prisma, rules, options);
    // seed678(prisma, rules, options);
    // seed679(prisma, rules, options);
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
