"use server";
import { promises as fs } from "fs";
import * as handlebars from "handlebars";
import path from "path";
import { EmailSenderList, productConfig, URL_PARAMS_KEYS } from "@/constants";
import { mailgunClient } from "./mailgunConfig";
import { env } from "node:process";

const loadTemplate = async (fileName: string) => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "templates",
    "emails",
    fileName
  );
  try {
    const source = await fs.readFile(filePath, "utf8");
    return source;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

interface EmailOptions {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html: string;
}

const isBrTranslation = productConfig.language === "ptBR";

async function sendVerificationEmail(
  email: string,
  token: string,
  baseUrl: string
): Promise<void> {
  const source = await loadTemplate(
    `${productConfig.language}/verifyEmail.hbs`
  );
  const template = handlebars.compile(source);
  const verificationUrl = `${baseUrl}/confirmUser?${URL_PARAMS_KEYS.LOGIN_EMAIL_TOKEN}=${token}`;
  const htmlToSend = template({
    verificationUrl,
    emailDate: new Date(),
  });
  await sendEmail({
    from:
      env.NODE_ENV === "production"
        ? EmailSenderList.LOGIN
        : EmailSenderList.LOGIN_STAGE,
    to: email,
    subject: isBrTranslation ? "Verifique seu email" : "Verify your email",
    html: htmlToSend,
  });
}

async function sendLoginEmail(
  email: string,
  token: string,
  baseUrl: string
): Promise<void> {
  const source = await loadTemplate(`${productConfig.language}/loginEmail.hbs`);
  const template = handlebars.compile(source);
  const verificationUrl = `${baseUrl}/confirmUser?${URL_PARAMS_KEYS.LOGIN_EMAIL_TOKEN}=${token}`;
  const htmlToSend = template({
    verificationUrl,
    emailDate: new Date(),
  });

  await sendEmail({
    from:
      env.NODE_ENV === "production"
        ? EmailSenderList.LOGIN
        : EmailSenderList.LOGIN_STAGE,
    to: email,
    subject: isBrTranslation ? "Login Mágico ApostAí" : "Betslayer Magic Login",
    html: htmlToSend,
  });
}

async function sendUserContactEmail({
  userName,
  userEmail,
  userMessage,
  otherInfo,
}: {
  userName: string;
  userEmail: string;
  userMessage: string;
  otherInfo?: string;
}): Promise<void> {
  const source = await loadTemplate(
    `${productConfig.language}/userContact.hbs`
  );
  const template = handlebars.compile(source);
  const htmlToSend = template({
    userName,
    userEmail,
    userMessage,
    otherInfo: otherInfo || "",
  });
  await sendEmail({
    from: EmailSenderList.USER_CONTACT,
    to: "guiga.benitez@gmail.com, pablotellles@gmail.com, lureghini2@hotmail.com",
    subject: "Contato de usuário",
    html: htmlToSend,
  });
}

async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    const data = {
      from: options.from ?? process.env.EMAIL_USERNAME,
      to: options.to,
      subject: options.subject,
      text: options.text || "",
      html: options.html || "",
    };

    await mailgunClient.messages.create(
      process.env.MAILGUN_DOMAIN as string,
      data
    );
  } catch (error) {
    console.error("Email error:", error);
  }
}

export {
  sendVerificationEmail,
  sendEmail,
  sendLoginEmail,
  sendUserContactEmail,
};
