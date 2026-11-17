// Five smoke tests, run against the packed .tgz installed in a clean folder.
// Run from that folder: node --test smoke.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const win = process.platform === "win32";
const bin = join("node_modules", ".bin", win ? "slugline.cmd" : "slugline");
const opts = { encoding: "utf8", shell: win };

test("package resolves from node_modules", () => {
  assert.ok(require.resolve("slugline/package.json").includes("node_modules"));
});

test("library import works", async () => {
  const { slugify } = await import("slugline");
  assert.equal(slugify("Smoke Test"), "smoke-test");
});

test("cli prints the package version", () => {
  const pkg = require("slugline/package.json");
  assert.equal(execFileSync(bin, ["--version"], opts).trim(), pkg.version);
});

test("cli turns a title into a slug", () => {
  assert.equal(execFileSync(bin, ["Release", "Day!"], opts).trim(), "release-day");
});

test("cli with no title exits with code 2", () => {
  assert.equal(spawnSync(bin, [], opts).status, 2);
});
