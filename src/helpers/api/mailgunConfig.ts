import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

// Substitua pelos seus valores do Mailgun
const API_KEY = process.env.MAILGUN_API as string;

export const mailgunClient = mailgun.client({ username: "api", key: API_KEY });
