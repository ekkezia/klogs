const CONJUNCTION_WORDS = ['of']; // these words must always be lowercase

// make first character capitalized
const toCamelCase = (
  text: string,
  splitter: string | undefined,
  replaceWith: string | undefined,
) => {
  let textArray = text.split(splitter ?? ' '); // default: replaceWith  space
  textArray.forEach((word, idx) => {
    if (CONJUNCTION_WORDS.includes(word))
      textArray[idx] = word; // do not capitalize word if it is a conjunction
    else textArray[idx] = word.charAt(0).toUpperCase() + word.slice(1);
  });
  let camelCaseWord = textArray.join(replaceWith ?? ' '); // default: replaceWith  space

  return camelCaseWord;
};

export default toCamelCase;

export const replaceCharacterWith = (
  text: string,
  splitter: string,
  replaceWith: string,
) => {
  let replacedWord = text.split(splitter).join(replaceWith);
  return replacedWord;
};
