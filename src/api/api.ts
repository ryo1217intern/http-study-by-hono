import { Hono } from "hono";

let bookList = [
  { id: 1, title: "数学の教科書1", completed: false },
  { id: 2, title: "数学の教科書2", completed: false },
  { id: 3, title: "数学の教科書3", completed: false },
  { id: 4, title: "数学の教科書4", completed: false },
  { id: 5, title: "数学の教科書5", completed: false },
  { id: 6, title: "数学の教科書6", completed: false },
  { id: 7, title: "数学の教科書7", completed: false },
  { id: 8, title: "数学の教科書8", completed: false },
  { id: 9, title: "数学の教科書9", completed: false },
  { id: 10, title: "数学の教科書10", completed: false },
];

const books = new Hono();
books.get("/", (c) => c.json(bookList));

export { books };