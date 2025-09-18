import type { NextApiRequest, NextApiResponse } from "next";
import mongoose, { Error } from "mongoose";
import { User } from "@/models";
import jwt from "jsonwebtoken";
import { sendLoginEmail, sendVerificationEmail } from "@/helpers";
import { productConfig } from "@/constants";

const text = {
  en: {
    emailRequired: "Email is required",
    newUser: "User registered, please check your email to verify.",
    oldUser: "Please check your email to login.",
  },
  br: {
    emailRequired: "Necessário enviar email",
    newUser:
      "Usuário foi cadastrado, por favor verifique seu email para confirmar.",
    oldUser: "Link para login foi enviado ao seu email, por favor verifique",
  },
};

const isBrTranslation = productConfig.language === "ptBR";
const translation = text[isBrTranslation ? "br" : "en"];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await mongoose.connect(process.env.MONGODB_URI!);

    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: translation.emailRequired });
      }

      const userExists = await User.findOne({ email });

      const isNewUser =
        userExists && userExists.status !== "pending" ? false : true;
      const user = userExists ?? (await new User({ email }).save());

      const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      const baseUrl = `${req.headers["x-forwarded-proto"] || "http"}://${
        req.headers.host
      }`;

      const senEmailFunc = isNewUser ? sendVerificationEmail : sendLoginEmail;
      await senEmailFunc(email, token, baseUrl);

      res.status(201).json({
        message: isNewUser ? translation.newUser : translation.oldUser,
        isNewUser,
      });
    } catch (error) {
      res.status(500).json({ message: (error as unknown as Error).message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
