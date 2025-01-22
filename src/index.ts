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
  .get(
    "/note/:index",
    ({ note, params: { index }, error }) => {
      return note.data[index] ?? error(404, "Not Found :(");
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
