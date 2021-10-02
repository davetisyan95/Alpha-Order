const {
  cleanWords,
  findFirstSetOfDifferentLetters,
  alphaInsert,
  fromLinkedListMap,
} = require("./helpers");

/* For each pair of words which are guaranteed to be in alphabetical order,
 * determine if there are a pair of letters that are different. If a pair is found,
 * insert it into a map containing nodes with values "next" and "prev". These can be used
 * to determine an ordered list within the map. The first node of the linked list is being
 * held in memory so that it can be used at the end to traverse down the linked list. */
const alphabetize = (words) => {
  /* Mapping of all nodes in the linked list. A map is used here so that lookup
   * time for the linked list is O(1). It is faster than traversing through a list. */
  const alphaMap = {};

  let firstLetter; // keeps track of the first letter in the alphabet

  words = words.map(cleanWords);
  words.forEach((word, iWord) => {
    const nextWord = words[iWord + 1];

    const alphaPair = findFirstSetOfDifferentLetters(word, nextWord);

    if (alphaPair) {
      firstLetter = alphaInsert(alphaPair)
        .startingFrom(firstLetter)
        .into(alphaMap)
        .firstLetter();
    }
  });

  return fromLinkedListMap(alphaMap).order().startingFrom(firstLetter);
};

module.exports = alphabetize;
