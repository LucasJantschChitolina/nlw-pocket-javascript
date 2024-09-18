import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createGoalRoute } from "./routes/create-goal";
import { createGoalCompletionRoute } from "./routes/create-completion";
import { getWeekPendingGoalsRoute } from "./routes/get-pending-goals";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createGoalCompletionRoute);
app.register(getWeekPendingGoalsRoute);

const port = 3333;

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`Server running on port ${port}`);
  });
