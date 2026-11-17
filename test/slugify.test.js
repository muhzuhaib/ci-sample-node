import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "../src/index.js";

test("lowercases and joins words with dashes", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("removes accents and punctuation", () => {
  assert.equal(slugify("Café, crème & brûlée!"), "cafe-creme-brulee");
});

test("keeps whole words inside the length limit", () => {
  assert.equal(slugify("one two three", { maxLength: 8 }), "one-two");
});

test("cuts a single long word to the limit", () => {
  assert.equal(slugify("abcdefghij", { maxLength: 4 }), "abcd");
});

test("returns an empty slug when there are no letters or digits", () => {
  assert.equal(slugify("!!!"), "");
});

test("rejects input that is not a string", () => {
  assert.throws(() => slugify(42), TypeError);
});
