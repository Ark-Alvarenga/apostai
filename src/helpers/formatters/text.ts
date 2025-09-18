/**
 * Helper function for converting a string to a localized format.
 *
 * @param str - The string to format.
 * @returns The formatted string.
 */

export const decodeHtmlEntity = (str: string): string => {
  return str.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
  });
};
