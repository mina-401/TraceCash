import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_CATEGORIES = [
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
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: { email: 'test@test.com', passwordHash: 'temp' },
  });

  await prisma.category.deleteMany({ where: { userId: user.id } });

  for (const cat of DEFAULT_CATEGORIES) {
    await prisma.category.create({
      data: { ...cat, userId: user.id },
    });
  }

  console.log(`Seed 완료: 카테고리 ${DEFAULT_CATEGORIES.length}개`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });