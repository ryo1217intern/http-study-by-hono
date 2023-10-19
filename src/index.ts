import { Hono } from "hono";

const app = new Hono();

app.get("/", () => {
  return new Response("Hello! world! by hono", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
});

app.fire();