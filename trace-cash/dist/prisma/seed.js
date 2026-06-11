"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const commonCategories = [
    { name: '주거', domain: 'housing', isEssential: true },
    { name: '통신', domain: 'telecom', isEssential: true },
    { name: '금융·보험', domain: 'finance', isEssential: true },
    { name: '구독 서비스', domain: 'subscription', isEssential: false },
    { name: '건강', domain: 'health', isEssential: false },
    { name: '정기배송', domain: 'delivery', isEssential: false },
    { name: '멤버십', domain: 'membership', isEssential: false },
    { name: '교육·자기계발', domain: 'education', isEssential: false },
];
async function main() {
    await prisma.category.deleteMany({ where: { userId: null } });
    await prisma.category.createMany({ data: commonCategories });
    console.log(`Seed 완료: 공용 카테고리 ${commonCategories.length}개`);
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map