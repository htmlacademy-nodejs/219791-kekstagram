'use strict';

const assert = require(`assert`);
const generateEntity = require(`../generateEntity.js`);

describe(`generateEntity`, () => {
  const entitiy = generateEntity();
  console.log(`entitiy`, entitiy);

  it(`Has valid url`, () => {
    assert(entitiy.hasOwnProperty(`url`));
    assert.equal(entitiy.url, `https://picsum.photos/600/?random`);
  });

  it(`Has valid scale`, () => {
    assert(entitiy.hasOwnProperty(`scale`));
    assert((typeof entitiy.scale) === `number` && entitiy.scale >= 0 && entitiy.scale <= 100);
  });

  it(`Has valid effect type`, () => {
    assert(entitiy.hasOwnProperty(`effect`));
    assert([`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`].includes(entitiy.effect));
  });

  it(`Has valid hashtags`, () => {
    assert(entitiy.hasOwnProperty(`hashtags`));
    assert(Array.isArray(entitiy.hashtags));
    assert(entitiy.hashtags.length > 0 && entitiy.hashtags.length <= 5);
    assert(entitiy.hashtags.every((tag) => (typeof tag) === `string` && tag[0] === `#` && tag.length <= 20 && !tag.includes(` `)));
    const tags = entitiy.hashtags.reduce((accum, tag) => {
      if (accum.indexOf(tag.slice(1).toLowerCase()) === -1) {
        accum.push(tag.slice(1).toLowerCase());
      }
      return accum;
    }, []);
    assert(tags.length === entitiy.hashtags.length);
  });

  it(`Has valid description`, () => {
    assert(entitiy.hasOwnProperty(`description`));
    assert((typeof entitiy.description) === `string` && entitiy.description.length <= 140);
  });

  it(`Has valid likes`, () => {
    assert(entitiy.hasOwnProperty(`likes`));
    assert((typeof entitiy.likes) === `number` && entitiy.likes >= 0 && entitiy.likes <= 1000);
  });

  it(`Has valid comments`, () => {
    assert(entitiy.hasOwnProperty(`comments`));
    assert(Array.isArray(entitiy.comments));
    assert(entitiy.comments.every((comment) => (typeof comment) === `string` && comment.length <= 140));
  });

  it(`Has valid date`, () => {
    assert(entitiy.hasOwnProperty(`date`));
    const now = Date.now();
    const week = 7 * 24 * 60 * 60 * 1000;
    assert(entitiy.date >= now - week && entitiy.date <= now);
  });
});
