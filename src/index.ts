import { Elysia, t } from "elysia";
import { Note } from "./note";

export const note = new Elysia()
  .decorate("note", new Note())
  .get("/note", ({ note }) => note.data)
  .put("/note", ({ note, body: { data } }) => note.add(data), {
    body: t.Object({
      data: t.String(),
    }),
  })
  .post("/note/random", ({ note }) => {
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
    return note.add(randomContent);
  })
  .get(
    "/note/:index",
    ({ note, params: { index }, error }) => {
      return note.data[index + 1] ?? error(404, "Not Found :(");
    },
    {
      params: t.Object({
        index: t.Number(),
      }),
    },
  )
  .delete(
    "/note/:index",
    ({ note, params: { index }, error }) => {
      if (index in note.data) return note.remove(index);

      return error(422);
    },
    {
      params: t.Object({
        index: t.Number(),
      }),
    },
  )
  .patch(
    "/note/:index",
    ({ note, params: { index }, body: { data }, error }) => {
      if (index in note.data) return note.update(index, data);

      return error(422);
    },
    {
      params: t.Object({
        index: t.Number(),
      }),
      body: t.Object({
        data: t.String(),
      }),
    },
  );
