import { UserStatus } from "./auth";
import { AvailableProducts } from "./product";

export type Affiliate = {
  _id: string;
  affiliateCode: string;
  name: string;
  cpf: string;
  email: string;
  pix: string;
  products: AvailableProducts[];
  status: UserStatus;
  affiliateSales: string[];
  affiliatePayments: string[];
  relatedSubscriptions: string[];
  balance: number;
  ratesPercentage: {
    regular: number;
    initial: number;
    promo: number;
  };
  createdAt: string;
  updatedAt: string;
};
