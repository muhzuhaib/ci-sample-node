#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { slugify } from "./index.js";

const args = process.argv.slice(2);
if (args.includes("--version")) {
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  console.log(pkg.version);
} else if (args.length === 0 || args.includes("--help")) {
  console.log("Usage: slugline <title words...>");
  process.exitCode = args.length === 0 ? 2 : 0;
} else {
  console.log(slugify(args.join(" ")));
}
