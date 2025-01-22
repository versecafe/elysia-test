import { notes as deafaultNotes } from "./constants";

export class Note {
  data = deafaultNotes;

  add(note: string) {
    this.data.push(note);

    return this.data;
  }

  remove(index: number) {
    return this.data.splice(index, 1);
  }

  update(index: number, note: string) {
    this.data[index] = note;
    return this.data[index];
  }
}
