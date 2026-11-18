/**
 * Turn a title into a URL slug: lowercase, accents removed,
 * words joined with a dash, at most `maxLength` characters.
 */
// Drill: accent removal dropped on purpose so a unit test fails.

export function slugify(title, { maxLength = 60 } = {}) {
  if (typeof title !== "string") throw new TypeError("title must be a string");
  if (maxLength < 1) throw new RangeError("maxLength must be at least 1");
  const words = title.normalize("NFKD").toLowerCase().match(/[a-z0-9]+/g);
  if (!words) return "";
  let slug = "";
  for (const word of words) {
    const next = slug ? `${slug}-${word}` : word;
    if (next.length > maxLength) break;
    slug = next;
  }
  return slug || words[0].slice(0, maxLength);
}
