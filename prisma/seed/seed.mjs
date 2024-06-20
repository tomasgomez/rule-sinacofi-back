import { PrismaClient } from "@prisma/client";
import { rules, seedRules } from "./rules/seedRules.mjs";
import { actions, seedActions } from "./actions/seedActions.mjs";
import { seedSchema } from "./seedSchema.mjs";
import { seedOptionValues } from "./optionValues/seedOptions.mjs";
import { channel, commune, condition, format, institution, optType, notary, priority, region, rejectionReason, messageRejectionReason, typeOfCurrency, typeOfDebts, typeOfObligations } from "./optionValues/options/index.mjs";
import { schema199 } from "./199/index.mjs";
import { schema136 } from "./136/index.mjs";
import { schema670, seed670 } from "./670/index.mjs";
import { schema671, seed671 } from "./671/index.mjs";
import { schema672, seed672 } from "./672/index.mjs";
import { schema673, seed673 } from "./673/index.mjs";
import { schema674, seed674 } from "./674/index.mjs";
import { schema675, seed675 } from "./675/index.mjs";
import { schema676, seed676 } from "./676/index.mjs";
import { schema677, seed677 } from "./677/index.mjs";
import { schema678, seed678 } from "./678/index.mjs";
import { schema679, seed679 } from "./679/index.mjs";

const prisma = new PrismaClient();

async function main() {

    // // load schemas
    const schemas = [schema670, schema671,schema672, schema673, schema674,schema675,schema676,schema677,schema678, schema679];

    // // seed schemas (you can load all or only the ones you need)
    // await seedSchema(prisma, schemas);

    // // seed rules, if has new rules uncomment this, first delete all
    // await seedRules(prisma, rules);

    // // seed actions
    // await seedActions(prisma, actions)

    // // seed option values , add the one you need if is not loaded
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
    // await seedOptionValues(prisma, typeOfCurrency);
    // await seedOptionValues(prisma, typeOfDebts);
    // await seedOptionValues(prisma, typeOfObligations);
    const options = { channel, commune, condition, format, institution, operationType: optType, notary, priority, region, rejectionReason, messageRejectionReason, typeOfCurrency, typeOfDebts, typeOfObligations}

    // await seed670(prisma, rules, options, actions);
    // await seed671(prisma, rules, options, actions);
    // await seed672(prisma, rules, options, actions);
    // await seed673(prisma, rules, options, actions);
    // await seed674(prisma, rules, options, actions);
    await seed675(prisma, rules, options, actions);
    // await seed676(prisma, rules, options, actions);
    // await seed677(prisma, rules, options, actions);
    // await seed678(prisma, rules, options, actions);
    // await seed679(prisma, rules, options, actions);
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
