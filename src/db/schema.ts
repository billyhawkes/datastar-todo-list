import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import type z from "zod";

export const tasks = sqliteTable("task", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => Bun.randomUUIDv7()),
  title: text("title"),
  description: text("description"),
  completed: integer({
    mode: "boolean",
  }).default(false),
});

export const TaskSchema = createSelectSchema(tasks);
export type TaskType = z.infer<typeof TaskSchema>;
