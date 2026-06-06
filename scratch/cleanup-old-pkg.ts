import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
async function main() {
  try {
    await p.package.delete({ where: { slug: "horseback-riding-experience-in-gili-meno" } });
    console.log("Deleted old horseback package");
  } catch(e) {
    console.log("Old horseback package not found (already cleaned)");
  }
  await p["$disconnect"]();
}
main();
