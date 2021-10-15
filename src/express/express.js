import express from "express";

import rootRouter from "./routes/index.js";
import myRouter from "./routes/my/index.js";
import loginRouter from "./routes/login/index.js";
import searchRouter from "./routes/search/index.js";
import registerRouter from "./routes/register/index.js";
import articlesRouter from "./routes/articles/index.js";
import categoriesRouter from "./routes/categories/index.js";

const DEFAULT_PORT = 8080;

const server = express();

server.use(`/`, rootRouter);
server.use(`/my`, myRouter);
server.use(`/login`, loginRouter);
server.use(`/search`, searchRouter);
server.use(`/articles`, articlesRouter);
server.use(`/register`, registerRouter);
server.use(`/categories`, categoriesRouter);

server.listen(DEFAULT_PORT, () => {
  `Сервер запущен на порте ${DEFAULT_PORT}`;
});
