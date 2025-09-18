/**
 * Parses and formats a given time string or epoch timestamp according to the user's local settings.
 * @param {string | number} timeString - A time string in ISO 8601 format or an epoch timestamp.
 * @returns {string} - The formatted time string.
 */
export const parseAndFormatLocalTime = (
  timeString: string | number
): string => {
  if (!timeString) return "";

  let date: Date;

  // Check if timeString is a valid number (epoch timestamp)
  if (typeof timeString === "number" || /^\d+$/.test(timeString)) {
    // Convert epoch timestamp to milliseconds if necessary
    const timestamp =
      typeof timeString === "number" ? timeString : parseInt(timeString, 10);
    date = new Date(timestamp * 1000); // Epoch is in seconds, Date requires milliseconds
  } else {
    // Assume it's an ISO string or similar
    date = new Date(timeString);
  }

  // Use Intl.DateTimeFormat to format the date based on user's locale and timezone
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "short", // 'full', 'long', 'medium', 'short'
    timeStyle: "short", // 'full', 'long', 'medium', 'short'
  });

  return formatter.format(date);
};
