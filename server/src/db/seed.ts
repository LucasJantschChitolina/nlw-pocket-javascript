import { client, db } from ".";
import { goalCompletions, goals } from "./schema";
import dayjs from "dayjs";

async function seed() {
  await db.delete(goalCompletions);
  await db.delete(goals);

  const response = await db
    .insert(goals)
    .values([
      { title: "Wake up early", desiredWeeklyFrequency: 5 },
      { title: "Go to the gym", desiredWeeklyFrequency: 3 },
      { title: "Read a book", desiredWeeklyFrequency: 2 },
    ])
    .returning();

  const startOfWeek = dayjs().startOf("week");

  await db.insert(goalCompletions).values([
    { goalId: response[0].id, createdAt: new Date() },
    { goalId: response[1].id, createdAt: startOfWeek.add(1, "day").toDate() },
  ]);
}

seed().finally(() => client.end());
