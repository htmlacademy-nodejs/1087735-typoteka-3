"use strict";

import { writeFile } from "fs/promises";
import path from "path";

import chalk from "chalk";
import { utils } from "./utils.js";
import { ExitCode } from "../constants.js";

const DEFAULT_COUNT = 1;

const TITLES = [
  "Ёлки. История деревьев",
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  "Обзор новейшего смартфона",
  `Лучшие рок-музыканты 20-века`,
  "Как начать программировать",
  `Учим HTML и CSS`,
  "Что такое золотое сечение",
  "Как собрать камни бесконечности",
  "Борьба с прокрастинацией",
  "Рок — это протест",
  "Самый лучший музыкальный альбом этого года",
];

const SENTENCES = [
  "Ёлки — это не просто красивое дерево. Это прочная древесина.",
  `Первая большая ёлка была установлена только в 1938 году.`,
  "Вы можете достичь всего. Стоит только немного постараться и запастись книгами.",
  "Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
  "Золотое сечение — соотношение двух величин, гармоническая пропорция.",
  "Собрать камни бесконечности легко, если вы прирожденный герой.",
  "Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.",
  "Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.",
  "Программировать не настолько сложно, как об этом говорят.",
  "Простые ежедневные упражнения помогут достичь успеха.",
  "Это один из лучших рок-музыкантов.",
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  "Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.",
  "Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
  "Достичь успеха помогут ежедневные повторения.",
  "Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.",
  "Как начать действовать? Для начала просто соберитесь.",
  "Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.",
  "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.",
];

const CATEGORIES = [
  "Деревья",
  "За жизнь",
  "Без рамки",
  "Разное",
  `IT`,
  "Музыка",
  "Кино",
  "Программирование",
  "Железо",
];

const AnnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const CategoryRestrict = {
  MIN: 1,
  MAX: CATEGORIES.length,
};

const OfferSentencesRestrict = {
  MAX: SENTENCES.length,
};

const getOffer = (randomNumber) => {
  const { getRandomInt, shuffle } = utils;
  const { MIN: minCountAnnounce, MAX: maxCountAnnounce } = AnnounceRestrict;
  const { MAX: maxOfferLength } = OfferSentencesRestrict;
  const { MAX: maxCategoriesLength } = CategoryRestrict;

  const titlesCount = TITLES.length;

  const title = TITLES[getRandomInt(0, titlesCount)];

  const announce = shuffle(SENTENCES).slice(
    0,
    getRandomInt(minCountAnnounce, maxCountAnnounce)
  );

  const fullText = shuffle(SENTENCES).slice(
    0,
    getRandomInt(announce.length, maxOfferLength)
  );

  const сategory = shuffle(CATEGORIES).slice(
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
    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await writeFile(path.resolve(process.cwd(), "mock.json"), content);
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
