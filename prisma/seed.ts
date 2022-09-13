/**
 * @see https://www.prisma.io/docs/guides/database/seed-database#example-seed-scripts
 * @see https://github.com/prisma/prisma-examples/blob/latest/typescript/graphql/prisma/seed.ts
 */

import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const salt = bcrypt.genSaltSync();

const developerCreateInputs: Prisma.DeveloperCreateInput[] = [
  {
    email: 'test@example.com',
    encryptedPassword: bcrypt.hashSync('password12345', salt),
    joinedProducts: {
      create: [
        {
          product: {
            create: {
              name: 'Product A',
            },
          },
        },
        {
          product: {
            create: {
              name: 'Product B',
            },
          },
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const developerCreateInput of developerCreateInputs) {
    const developer = await prisma.developer.create({
      data: developerCreateInput,
    });
    console.log(`Created developer with id: ${developer.id}`);
  }
  console.log(`Seeding finished.`);
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
