import express from "express";
import { router } from "./routes";

const app = express();

app.use(router);

app.listen(7000, () => console.log("Server is running 🔥"));
