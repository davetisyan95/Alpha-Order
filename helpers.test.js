const {
  findFirstSetOfDifferentLetters,
  fromLinkedListMap,
  alphaInsert,
} = require("./helpers");

describe("Helper Method Tests", () => {
  describe("findFirstSetOfDifferentLetters", () => {
    it("finds first difference", () => {
      let word1 = "abc";
      let word2 = "abz";

      let results = findFirstSetOfDifferentLetters(word1, word2);

      expect(results.predecessor).toBe("c");
      expect(results.successor).toBe("z");

      word1 = "aac";
      word2 = "abz";

      results = findFirstSetOfDifferentLetters(word1, word2);

      expect(results.predecessor).toBe("a");
      expect(results.successor).toBe("b");
    });

    it("handles different word sizes", () => {
      let word1 = "abc";
      let word2 = "abcas";

      let results = findFirstSetOfDifferentLetters(word1, word2);

      expect(results).toBe(null);

      word1 = "aasz";
      word2 = "aas";

      results = findFirstSetOfDifferentLetters(word1, word2);

      expect(results).toBe(null);

      word1 = "asds";
      word2 = "aasaz";

      results = findFirstSetOfDifferentLetters(word1, word2);

      expect(results.predecessor).toBe("s");
      expect(results.successor).toBe("a");
    });

    it("handles a null case", () => {
      let word1 = "abc";
      let word2 = null;

      const results = findFirstSetOfDifferentLetters(word1, word2);

      expect(results).toBe(null);
    });
  });

  describe("Alpha Map Insertions", () => {
    test("replaces head", () => {
      const head = {
        val: "b",
        prev: null,
        next: "c",
      };
      const testData = {
        b: head,
        c: {
          val: "c",
          prev: "b",
          next: "g",
        },
        g: {
          val: "g",
          prev: "c",
          next: null,
        },
      };

      const firstLetter = alphaInsert({ predecessor: "a", successor: "b" })
        .startingFrom(head)
        .into(testData)
        .firstLetter();

      const order = fromLinkedListMap(testData)
        .order()
        .startingFrom(firstLetter);

      expect(order).toEqual(["a", "b", "c", "g"]);
      expect(firstLetter.val).toEqual("a");
    });

    test("links when both are not present", () => {
      const head = {
        val: "b",
        prev: null,
        next: "c",
      };
      const testData = {
        b: head,
        c: {
          val: "c",
          prev: "b",
          next: "g",
        },
        g: {
          val: "g",
          prev: "c",
          next: null,
        },
      };

      alphaInsert({ predecessor: "x", successor: "z" })
        .startingFrom(head)
        .into(testData)
        .firstLetter();

      const order = fromLinkedListMap(testData).order().startingFrom(head);

      expect(order).toEqual(["b", "c", "g"]);
      expect(testData["x"]).not.toBeNull();
      expect(testData["z"]).not.toBeNull();
      expect(testData["x"].next).toBe("z");
      expect(testData["x"].prev).toBe(null);
      expect(testData["z"].prev).toBe("x");
      expect(testData["z"].next).toBe(null);
    });

    test("when predecessor does not exist", () => {
      const head = {
        val: "a",
        prev: null,
        next: "c",
      };
      const testData = {
        a: head,
        c: {
          val: "c",
          prev: "a",
          next: "g",
        },
        g: {
          val: "g",
          prev: "c",
          next: null,
        },
      };

      alphaInsert({ predecessor: "b", successor: "c" })
        .startingFrom(head)
        .into(testData);

      const order = fromLinkedListMap(testData).order().startingFrom(head);

      expect(order).toEqual(["a", "b", "c", "g"]);
    });

    test("when successor does not exist", () => {
      const head = {
        val: "a",
        prev: null,
        next: "c",
      };
      const testData = {
        a: head,
        c: {
          val: "c",
          prev: "a",
          next: "g",
        },
        g: {
          val: "g",
          prev: "c",
          next: null,
        },
      };

      alphaInsert({ predecessor: "c", successor: "d" })
        .startingFrom(head)
        .into(testData);

      const order = fromLinkedListMap(testData).order().startingFrom(head);

      expect(order).toEqual(["a", "c", "d", "g"]);
    });

    test("insert.after", () => {
      const head = {
        val: "a",
        prev: null,
        next: "c",
      };
      const letterToInsert = {
        val: "d",
        prev: null,
        next: null,
      };
      const testData = {
        a: head,
        d: letterToInsert,
        c: {
          val: "c",
          prev: "a",
          next: "g",
        },
        g: {
          val: "g",
          prev: "c",
          next: null,
        },
      };

      alphaInsert({ predecessor: "c", successor: "d" })
        .startingFrom(head)
        .into(testData);
      fromLinkedListMap(testData).insert(letterToInsert.val).after("c");

      const order = fromLinkedListMap(testData).order().startingFrom(head);

      expect(order).toEqual(["a", "c", "d", "g"]);
    });

    test("insert.before", () => {
      const head = {
        val: "a",
        prev: null,
        next: "c",
      };
      const testData = {
        a: head,
        c: {
          val: "c",
          prev: "a",
          next: "d",
        },
        d: {
          val: "d",
          prev: "c",
          next: "b",
        },
        b: {
          val: "b",
          prev: "d",
          next: "g",
        },
        g: {
          val: "g",
          prev: "b",
          next: null,
        },
      };

      alphaInsert({ predecessor: "b", successor: "c" })
        .startingFrom(head)
        .into(testData);

      const order = fromLinkedListMap(testData).order().startingFrom(head);

      // a->c
      // c->d
      // d->b
      // b->g
      // b->c
      // [a, c, d, b ,g] | b -> c
      expect(order).toEqual(["a", "b", "c", "d", "g"]);
    });
  });

  describe("Order Determination", () => {
    test("returns false when predecessor comes before successor", () => {
      const head = {
        val: "a",
        prev: null,
        next: "c",
      };
      const testData = {
        a: head,
        c: {
          val: "c",
          prev: "a",
          next: "d",
        },
        d: {
          val: "d",
          prev: "c",
          next: "b",
        },
        b: {
          val: "b",
          prev: "d",
          next: "g",
        },
        g: {
          val: "g",
          prev: "b",
          next: null,
        },
      };

      const result = fromLinkedListMap(testData).does("c").occurAfter("b");

      expect(result).toEqual(false);
    });

    test("returns true when predecessor comes after successor", () => {
      const head = {
        val: "a",
        prev: null,
        next: "c",
      };
      const testData = {
        a: head,
        c: {
          val: "c",
          prev: "a",
          next: "d",
        },
        d: {
          val: "d",
          prev: "c",
          next: "b",
        },
        b: {
          val: "b",
          prev: "d",
          next: "g",
        },
        g: {
          val: "g",
          prev: "b",
          next: null,
        },
      };

      const result = fromLinkedListMap(testData).does("b").occurAfter("b");

      expect(result).toEqual(true);
    });
  });

  describe("Linking List From Map", () => {
    it("Can link list from map", () => {
      const head = {
        val: "a",
        prev: null,
        next: "c",
      };
      const testData = {
        a: head,
        c: {
          val: "c",
          prev: "a",
          next: "g",
        },
        g: {
          val: "g",
          prev: "c",
          next: null,
        },
      };

      const orderedList = fromLinkedListMap(testData)
        .order()
        .startingFrom(head);

      expect(orderedList).toEqual(["a", "c", "g"]);
    });
  });
});
