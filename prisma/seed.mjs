import {
    PrismaClient
} from '@prisma/client';

import {
    institutions
} from './seedInstitutions.mjs';

const prisma = new PrismaClient();

async function main() {

    /* Institution seed */
    for (let i = 0; i < institutions.length; i++) {
        const institution = institutions[i];
        await prisma.institution.upsert({
            where: {
                id: institution.id
            },
            update: {},
            create: {
                id: institution.id,
                fullName: institution.fullName,
                rut: institution.rut,
                name: institution.name,
                areaCode: institution.areaCode,
                isActive: institution.isActive,
                address: institution.address,
                serviceNumber: "5",
                maxUsers: 50,
                maxArea: 10,
                backups: "NINGUNO",
                migrationIndicator: "037",
                corrCreditCapVI: "XX",
                corrCreditCapXIX: "XX",
                corrDepositCapXIX: "XX",
                corrInvestment: "XX",
                corrCentralBankAccount: "XX",
                auxCentralBankCode: "XX",
                tidCentralBank: "XX",
                sepAlphaFields: "XX",
                sepBetaLines: "XX",
                sepGammaFieldEnd: "XX",
                secFolioATM: "XX",
                tandemCode: "XX",
                virtualTid: "XX",
                tandemConnectivityStatus: "XX"

            }
        });
    }
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
