import { Hono } from "hono";
import { books } from "./api/api"

const app = new Hono();
app.route("/api/books", books);

app.fire();