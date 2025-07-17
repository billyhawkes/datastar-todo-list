import { Hono } from "hono";
import { tasksRouter } from "@/routers/tasks";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use(
  "*",
  serveStatic({
    root: "public",
  }),
);

app.route("/tasks", tasksRouter);

export default app;
