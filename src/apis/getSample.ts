import { Hono } from "hono";
import { bookList } from "../souce"

const getBooks = new Hono();
getBooks.get("/", (c) => c.json(bookList));

export { getBooks };