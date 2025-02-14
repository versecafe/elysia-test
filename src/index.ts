import { Hono } from "hono";
import { Note } from "./note";

const noteInstance = new Note();

const app = new Hono()
  .get("/note", (c) => c.json(noteInstance.data))
  .put("/note", async (c) => {
    const { data } = await c.req.json();
    return c.json(noteInstance.add(data));
  })
  .post("/note/random", (c) => {
    const content = [
      "Remember to smile today!",
      "Buy groceries",
      "Call mom",
      "Finish that project",
      "Take a walk outside",
      "Drink more water",
      "Read a book",
    ];
    const randomContent = content[Math.floor(Math.random() * content.length)];
    return c.json(noteInstance.add(randomContent));
  });

export default app;
