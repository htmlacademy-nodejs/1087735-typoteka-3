import chalk from "chalk";
import http from "http";
import { readFile } from "fs/promises";

import { HttpCode } from "../constants.js";

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const sendResponse = (res, statusCode, message) => {
  const template = `
      <!Doctype html>
        <html lang="ru">
        <head>
          <title>Titles</title>
        </head>
        <body>${message}</body>
      </html>`.trim();

  res.writeHead(statusCode, {
    "Content-Type": `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientContent = async (req, res) => {
  const notFoundMessageText = "Not found";

  switch (req.url) {
    case "/":
      try {
        const content = await readFile(FILENAME);
        const mocks = JSON.parse(content);
        const message = mocks.map((item) => {
          return `<li>${item.title}</li>`;
        }).join(``);

        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (error) {
        console.log(error);
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }
      break;

    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
};

export const server = {
  name: "--server",
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http
      .createServer(onClientContent)
      .listen(port, () => {
        console.info(chalk.gray(`Ожидаю соединений на localhost:${port}...`));
      })
      .on(`error`, ({ message }) => {
        console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
      });
  },
};
