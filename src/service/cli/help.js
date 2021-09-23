"use strict";

import chalk from "chalk";

const getMessage = () =>
  console.info(
    `${chalk.gray(`Программа запускает ${chalk.blue(
      "http"
    )}-сервер и формирует файл с данными для API.
  
          Гайд:
          service.js ${chalk.blue("<command>")}
          Команды:
          --version: выводит номер версии
          --help: печатает этот текст
          --generate <count> формирует файл mocks.json`)}`
  );

export const help = {
  name: "--help",
  run() {
    getMessage();
  },
};
