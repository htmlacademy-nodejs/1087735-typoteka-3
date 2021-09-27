"use strict";

import { writeFile, readFile } from "fs/promises";
import path from "path";

import chalk from "chalk";
import { utils } from "./utils.js";
import { ExitCode } from "../constants.js";

const DEFAULT_COUNT = 1;

const AnnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const readTxtFile = async (fileDirectory) => {
  const titlesPath = path.resolve(process.cwd(), fileDirectory);

  try {
    const res = await readFile(titlesPath, "utf-8");
    return res;
  } catch (error) {
    console.log(chalk.red(`Ошибка чтения файла ${titlesPath}`));
  }
};

const getFileContent = async (filePath) => {
  const res = await readTxtFile(filePath);
  return res.split("\r\n").map((item) => item.trim());
};

const getOffer = async () => {
  const { getRandomInt, shuffle } = utils;
  const { MIN: minCountAnnounce, MAX: maxCountAnnounce } = AnnounceRestrict;

  const titles = await getFileContent("data/titles.txt");
  const categories = await getFileContent("data/categories.txt");
  const sentences = await getFileContent("data/sentences.txt");

  const titlesCount = titles.length;

  const title = titles[getRandomInt(0, titlesCount)];

  const announce = shuffle(sentences).slice(
    0,
    getRandomInt(minCountAnnounce, maxCountAnnounce)
  );

  const maxOfferLength = sentences.length;
  const maxCategoriesLength = categories.length;

  const fullText = shuffle(sentences).slice(
    0,
    getRandomInt(announce.length, maxOfferLength)
  );

  const сategory = shuffle(categories).slice(
    0,
    getRandomInt(1, maxCategoriesLength)
  );

  return {
    title,
    createdDate: "",
    announce,
    fullText,
    сategory,
  };
};

const generateOffers = (count) => {
  return Array(count)
    .fill({})
    .map(() => getOffer());
};

export const generate = {
  name: "--generate",
  async run(count) {
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const content = await Promise.allSettled(generateOffers(countOffer));

    const processedContent = JSON.stringify(
      content.map((contentItem) => {
        if (contentItem.status !== "rejected") {
          return contentItem.value;
        }
      })
    );

    try {
      await writeFile(
        path.resolve(process.cwd(), "mock.json"),
        processedContent
      );
      console.log(
        chalk.green("Данные успешно сгенерированы и записаны в файл mock.json")
      );
      process.exit(ExitCode.success);
    } catch (error) {
      console.log(
        chalk.red(
          "При генерации данных произошла ошибка, попробуйте повторить позже."
        )
      );
      process.exit(ExitCode.error);
    }
  },
};
