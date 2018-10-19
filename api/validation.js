'use strict';

module.exports = {
  check(message) {
    const errors = [];

    if (!message.url || !this.correctFile(message.url)) {
      errors.push(`fileName`);
    }

    if (!message.scale || !this.correctScale(Number.parseInt(message.scale, 10))) {
      errors.push(`scale`);
    }

    if (!message.effect || !this.correctEffect(message.effect)) {
      errors.push(`effect`);
    }

    if (message.hashtags && !this.correctTags(message.hashtags)) {
      errors.push(`hashtags`);
    }

    if (message.description && !this.correctDescription(message.description)) {
      errors.push(`description`);
    }

    return errors;
  },
  correctFile() {
    return true;
  },
  correctScale(scale) {
    return Number.isInteger(scale) && scale >= 0 && scale <= 100;
  },
  correctEffect(effect) {
    return [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`].indexOf(effect) !== -1;
  },
  correctTags(hashtags) {
    return typeof hashtags === `string` && this.checkSingleTag(hashtags);
  },
  checkSingleTag(hashtags) {
    const tags = hashtags.split(` `);
    const isTagCorrect = tags.every((tag) => tag[0] === `#` && tag.length > 1 && tag.length <= 20);
    const isUniq = tags.length === tags.filter((tag, i) => tags.indexOf(tag) === i).length;

    return tags.length <= 5 && isTagCorrect && isUniq;
  },
  correctDescription(description) {
    return typeof description === `string` && description.length <= 140;
  }
};
