import { Hono } from "hono";
import { RootLayout } from "@/layout";
import { tasks, type TaskType } from "@/db/schema";
import { closeDialog, Dialog, openDialog } from "@/components/ui/dialog";
import { db } from "@/db";
import { type SSEStreamingApi, streamSSE } from "hono/streaming";
import type { JSX } from "hono/jsx/jsx-runtime";
import { eq } from "drizzle-orm";

const TaskList = ({ tasks }: { tasks: TaskType[] }) => {
  return (
    <div id="tasks-list" class="flex flex-col gap-2 w-full">
      {tasks.map(({ id, title, description }) => (
        <div class="card w-full flex relative">
          <header>
            <h2>{title}</h2>
            <p>{description}</p>
            <button
              class="btn-destructive absolute right-4 top-4"
              data-on-click={`@delete('/tasks/${id}')`}
            >
              Delete
            </button>
          </header>
        </div>
      ))}
    </div>
  );
};

export const tasksRouter = new Hono()
  .get("/", async (c) => {
    const taskList = await db.select().from(tasks);

    return c.html(
      <RootLayout title="Tasks">
        <div class="flex flex-col gap-2 mt-8 items-start">
          <button
            type="button"
            onclick={openDialog("add-task")}
            class="btn-outline"
          >
            Add task
          </button>
          <Dialog id="add-task" title="Add task" description="Add a new task">
            <form class="form flex flex-col gap-4">
              <label for="title">Title</label>
              <input
                type="text"
                id="title"
                data-bind="title"
                placeholder="Task title"
              ></input>
              <label for="description">Description</label>
              <textarea
                id="description"
                data-bind="description"
                placeholder="Task description"
              ></textarea>
              <div class="btn" data-on-click={`@post('/tasks')`}>
                Add task
              </div>
            </form>
          </Dialog>
          <TaskList tasks={taskList} />
        </div>
      </RootLayout>,
    );
  })
  .post("/", async (c) => {
    const body = await c.req.json();

    await db.insert(tasks).values({
      title: body.title,
      description: body.description,
    });

    const taskList = await db.select().from(tasks);

    return streamSSE(c, async (stream) => {
      await patchElements(stream, <TaskList tasks={taskList} />);
      await patchSignals(stream, {
        title: "",
        description: "",
      });
    });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");

    await db.delete(tasks).where(eq(tasks.id, id));

    const taskList = await db.select().from(tasks);

    return streamSSE(c, async (stream) => {
      await patchElements(stream, <TaskList tasks={taskList} />);
    });
  });

export const patchSignals = (
  stream: SSEStreamingApi,
  signal: Record<any, any>,
) => {
  return stream.writeSSE({
    data: "signals " + JSON.stringify(signal),
    event: "datastar-patch-signals",
  });
};

export const patchElements = (
  stream: SSEStreamingApi,
  element: JSX.Element,
) => {
  return stream.writeSSE({
    data: "elements " + element.toString().replaceAll("\n", ""),
    event: "datastar-patch-elements",
  });
};
