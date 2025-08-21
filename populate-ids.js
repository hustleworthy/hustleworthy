const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function populateIds() {
  try {
    // Get all websites without an id
    const websites = await prisma.websites.findMany({
      where: {
        id: null
      }
    });

    console.log(`Found ${websites.length} websites without IDs`);

    // Update each website with a new ID
    for (const website of websites) {
      await prisma.websites.update({
        where: { sNo: website.sNo },
        data: { id: undefined } // This will trigger the @default(cuid())
      });
    }

    console.log('Successfully populated all website IDs');
  } catch (error) {
    console.error('Error populating IDs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateIds();
