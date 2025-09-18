/**
 * Validates an email address using a regular expression.
 *
 * @param email The email address to validate.
 * @returns true if the email is valid, false otherwise.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}
