/* Filters out non characters and normalizes to lowercase letters */
const cleanWords = (word) =>
  [...word]
    .filter((char) => /[a-zA-Z]/.test(char))
    .join("")
    .toLowerCase();

/* Compares two words and finds the first set of letters which are different, if any */
const findFirstSetOfDifferentLetters = (word, nextWord) => {
  let wordPointer = 0,
    letter1,
    letter2,
    done = false;

  while (
    nextWord &&
    wordPointer < word.length &&
    wordPointer < nextWord.length &&
    nextWord.length &&
    !done
  ) {
    letter1 = word[wordPointer];
    letter2 = nextWord[wordPointer];

    if (letter1 !== letter2 && !!letter1 && letter2) {
      done = true;
    }

    wordPointer++;
  }

  return done ? { predecessor: letter1, successor: letter2 } : null;
};

/* Object that performs functions on a doubly linked list
 * insert - mutates the map being passed through by either inserting n1 after or before n2
 * does(n1).occurAfter(n2) - checks to see if nodes are in order
 * order - determines and returns the order of the linked list */
const fromLinkedListMap = (map) => ({
  // Inserts a node either before or after another
  insert: (n1) => ({
    after: (n2) => {
      const sNode = map[n2];

      if (sNode.next) {
        map[sNode.next].prev = n1;
      }
      map[n1].prev = n2;
      map[n1].next = map[n2].next;
      map[n2].next = n1;
      return map;
    },
    before: (n2) => {
      const pNode = map[n1];
      const sNode = map[n2];

      // This removes pNode from its spot
      if (pNode.next) {
        map[pNode.next].prev = map[pNode.prev].val;
      }
      if (pNode.prev) {
        map[pNode.prev].next = map[pNode.next].val;
      }

      if (sNode.prev) {
        map[sNode.prev].next = n1;
      }

      map[n1].next = n2;
      map[n1].prev = map[n2].prev;
      map[n2].prev = n1;
    },
  }),

  // Determines if the predecessor is out of order
  // This method returns true if the predecessor comes after the successor
  does: (l1) => ({
    occurAfter: (l2) => {
      let isOutOfOrder = false;

      let node = map[l1];
      while (node) {
        if (node.val === l2) {
          isOutOfOrder = true;
        }
        node = map[node.prev];
      }

      return isOutOfOrder;
    },
  }),

  // Starts from head and determines order down the linked list and returns it in the form of char[]
  order: () => ({
    startingFrom: (head) => {
      const order = [];

      let node = head;

      while (node) {
        order.push(node.val);

        node = map[node.next];
      }

      return order;
    },
  }),
});

/* This method is responsible for determining if a given mapping of letters
 * need to be inserted or re-arranged in the linked list.
 * It returns the current head after each iteration */
const alphaInsert = (alphaPair) => ({
  startingFrom: (firstLetter) => ({
    into: (alphaOrder) => {
      const { predecessor, successor } = alphaPair;

      const pIsNew = !alphaOrder[predecessor];
      const sIsNew = !alphaOrder[successor];

      /* Initialize objects in our map if they do not exist */
      if (pIsNew) {
        alphaOrder[predecessor] = {
          val: predecessor,
          next: null,
          prev: null,
        };
      }
      if (sIsNew) {
        alphaOrder[successor] = { val: successor, next: null, prev: null };
      }

      const predecessorNotLinked = (pIsNew && !sIsNew) || (pIsNew && sIsNew);
      const successorNotLinked = !pIsNew && sIsNew;
      const bothAreLinked = !pIsNew && !sIsNew;

      /* First checks if n1 is not linked, then links
       * Then checks if n2 is not linked, then links
       * Finally if both are linked, validate order and re-sort if necessary*/
      if (predecessorNotLinked) {
        fromLinkedListMap(alphaOrder).insert(predecessor).before(successor);
      } else if (successorNotLinked) {
        fromLinkedListMap(alphaOrder).insert(successor).after(predecessor);
      } else if (bothAreLinked) {
        const _ = fromLinkedListMap(alphaOrder);
        // Re-arrange if out of order
        _.does(predecessor).occurAfter(successor) &&
          _.insert(predecessor).before(successor);
      }

      /* Re-assign the head if the predecessor is now the head, or initialize if null */
      const isNewFirstLetter = !alphaOrder[predecessor].prev;
      if (isNewFirstLetter || firstLetter === null) {
        firstLetter = alphaOrder[predecessor];
      }

      return { firstLetter: () => firstLetter };
    },
  }),
});

module.exports = {
  cleanWords,
  alphaInsert,
  findFirstSetOfDifferentLetters,
  fromLinkedListMap,
};
