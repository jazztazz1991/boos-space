import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("boo2026", 10);

  await prisma.user.upsert({
    where: { username: "boo" },
    update: {},
    create: {
      username: "boo",
      password: hashedPassword,
    },
  });

  console.log("Seeded user: boo");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
