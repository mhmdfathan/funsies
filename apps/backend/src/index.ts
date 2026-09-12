import cors from "@elysia/cors";
import Elysia from "elysia";
import { checkDatabaseConnection } from "./infrastructure/database/client";

await checkDatabaseConnection()
const app = new Elysia()
  .use(cors())
  .listen(3000);

console.log(`Backend running at ${app.server?.hostname}:${app.server?.port}`)
