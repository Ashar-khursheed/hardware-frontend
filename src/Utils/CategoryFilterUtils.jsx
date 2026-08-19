/**
 * Serialize category filter state for URL / API.
 * { connector: ['rj45', 'usb-c'], length: ['30cm'] }
 * → "connector:rj45,usb-c|length:30cm"
 *
 * NOTE: Use "|" not ";" — semicolons are treated as query separators by some parsers.
 */
export const serializeCategoryFilters = (filters) => {
  if (!filters || typeof filters !== "object") return "";
  return Object.entries(filters)
    .filter(([, values]) => Array.isArray(values) && values.length > 0)
    .map(([slug, values]) => `${slug}:${values.join(",")}`)
    .join("|");
};

/**
 * Parse category_filters query string into object.
 * Accepts "|" (preferred) or ";" (legacy) as group separators.
 */
export const parseCategoryFilters = (raw) => {
  if (!raw || typeof raw !== "string") return {};
  const result = {};
  raw.split(/[|;]/).forEach((group) => {
    if (!group.includes(":")) return;
    const [slug, valuesStr] = group.split(":");
    if (!slug || !valuesStr) return;
    const values = valuesStr.split(",").filter(Boolean);
    if (values.length) result[slug.trim()] = values;
  });
  return result;
};
