'use strict';

const WEEK = 7 * 24 * 60 * 60 * 1000;

const tagsLims = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  MAX_NUMBER: 5
};

const MAX_TEXT_LENGTH = 140;

const wordLims = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 20
};

const MAX_COMMENTS_NUMBER = 10;

module.exports = () => {
  const possibleEffects = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];
  const getRandom = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));
  const getRandomChar = () => String.fromCharCode(getRandom(97, 122));
  const getRandomWord = (min, max) => {
    let word = ``;
    for (let i = min; i <= getRandom(min, max); i++) {
      word += getRandomChar();
    }
    return word;
  };

  const getRandomTags = () => {
    let tags = [];
    for (let i = 0; i < tagsLims.MAX_NUMBER; i++) {
      tags.push(`#` + getRandomWord(tagsLims.MIN_LENGTH, tagsLims.MAX_LENGTH - 1));
    }
    return tags.join(` `);
  };

  const getRandomDescription = () => {
    const maxLength = getRandom(0, MAX_TEXT_LENGTH);
    let description = ``;
    let word = ` `;
    while ((description.length + word.length) <= maxLength) {
      description += word;
      word = ` ` + getRandomWord(wordLims.MIN_LENGTH, wordLims.MAX_LENGTH);
    }
    return description;
  };

  const getRandomComments = () => {
    const comments = [];
    for (let i = 0; i < getRandom(0, MAX_COMMENTS_NUMBER); i++) {
      comments.push(getRandomDescription());
    }
    return comments;
  };

  return {
    url: `https://picsum.photos/600/?random`,
    scale: getRandom(0, 100),
    effect: possibleEffects[getRandom(0, possibleEffects.length - 1)],
    hashtags: getRandomTags(),
    description: getRandomDescription(),
    likes: getRandom(0, 1000),
    comments: getRandomComments(),
    date: Date.now() - getRandom(0, WEEK)
  };
};
