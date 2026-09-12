import cors from "@elysia/cors";
import Elysia from "elysia";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(`Backend running at ${app.server?.hostname}:${app.server?.port}`)
