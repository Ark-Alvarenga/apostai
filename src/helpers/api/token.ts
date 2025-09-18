import jwt from "jsonwebtoken";
import { User as UserType } from "@/types";

interface TokenVerificationResult {
  user?: UserType;
  error?: string;
}

export function verifyToken(token: string): TokenVerificationResult {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      user: UserType;
    };
    return { user: decoded.user };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { error: "Token is expired" };
    } else if (error instanceof jwt.JsonWebTokenError) {
      return { error: "Invalid token" };
    }
    return { error: "Token verification failed" };
  }
}
