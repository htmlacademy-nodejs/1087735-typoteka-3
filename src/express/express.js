import express from "express";

import mainRoutes from "./routes/main/index.js";
import myRoutes from "./routes/my/index.js";
import articlesRouter from "./routes/articles/index.js";

const DEFAULT_PORT = 8080;

const server = express();

server.use(`/`, mainRoutes);
server.use(`/my`, myRoutes);
server.use(`/articles`, articlesRouter);

server.listen(DEFAULT_PORT, () => {
  `Сервер запущен на порте ${DEFAULT_PORT}`;
});
