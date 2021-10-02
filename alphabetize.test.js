const alphabetizeTest = require("./alphabetize");

describe("Determine Order Of Alphabet", () => {
  test("sample data 1", () => {
    const testData = ["bca", "aaa", "acb"];

    const result = alphabetizeTest(testData);

    expect(result).toEqual(["b", "a", "c"]);
  });

  test("sample data 2", () => {
    const testData = ["acbc", "bcc", "bcb", "ba"];

    const result = alphabetizeTest(testData);

    expect(result).toEqual(["c", "a", "b"]);
  });

  test("sample data 3", () => {
    const testData = ["aba", "bac", "baa", "bbcb", "bbbc"];

    const result = alphabetizeTest(testData);

    expect(result).toEqual(["c", "a", "b"]);
  });
});
