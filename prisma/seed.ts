import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

async function seed() {
  let noor = await prisma.user.create({
    data: {
      username: "noor",
      passwordHash:
        "$2b$10$EJ8XxqkOiHeaAUfDhAz/meqIYRzr5LJsxEKanlPC1nyLJ//EJjygK",
    },
  });
  await Promise.all(
    getJokes().map((joke) => {
      let data = { jokesterId: noor.id, ...joke };
      return prisma.joke.create({ data });
    })
  );

  console.log(`Database has been seeded. 🌱`);
}

seed();

function getJokes() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      name: "Road worker",
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      name: "Frisbee",
      content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
      name: "Trees",
      content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    }
  ];
}
