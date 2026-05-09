const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const packages = await prisma.package.findMany({ take: 1 });
    console.log('Successfully connected to DB. Packages found:', packages.length);
  } catch (e) {
    console.error('Failed to connect to DB:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
