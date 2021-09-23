"use strict";

import chalk from "chalk";
import fs from "fs";
import path from "path";

const packageJsonPath = path.resolve(process.cwd(), "package.json");
const packageJsonFile = fs.readFileSync(`${packageJsonPath}`);
const getVersion = () => {
  try {
    const parsedJson = JSON.parse(packageJsonFile);
    return parsedJson.version;
  } catch (error) {
    chalk.red(console.error(error));
  }
};

export const version = {
  name: "--version",
  run() {
    console.info(chalk.blue(getVersion()));
  },
};
