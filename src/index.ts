import { Elysia, t } from "elysia";

class Note {
  constructor(public data: string[] = ["Moonhalo"]) {}
}

const app = new Elysia()
  .decorate("note", new Note())
  .get("/note", ({ note }) => note.data)
  .get(
    "/note/:index",
    ({ note, params: { index }, error }) => {
      return note.data[index] ?? error(404);
    },
    {
      params: t.Object({
        index: t.Number(),
      }),
    },
  )
  .listen(3000);
