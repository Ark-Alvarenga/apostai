/**
 * Helper function for converting a number to a localized currency format.
 *
 * @param number - The number to format.
 * @param locale - The locale to use for formatting.
 * @param currency - The currency code (e.g., "USD", "EUR").
 * @returns The formatted currency string.
 */

interface FormatCurrencyParams {
  number: number;
  locale?: string;
  currency?: string;
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    currencyDisplay?: "symbol" | "narrowSymbol" | "code" | "name";
  };
}

export const formatCurrency = ({
  number,
  locale = "en-US",
  currency = "USD",
  options,
}: FormatCurrencyParams): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    ...options,
  });
  return formatter.format(number);
};
