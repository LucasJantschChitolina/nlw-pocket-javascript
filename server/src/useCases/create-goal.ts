import { db } from "../db";
import { goals } from "../db/schema";

interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const response = await db
    .insert(goals)
    .values({ title, desiredWeeklyFrequency })
    .returning();

  const goal = response[0];

  return {
    goal,
  };
}
