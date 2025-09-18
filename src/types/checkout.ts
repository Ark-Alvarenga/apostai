export type ProductData = {
  name: string; // Name of the product
  description?: string; // Optional description of the product
  images?: string[]; // Optional array of image URLs
  metadata?: Record<string, string>; // Optional metadata as a key-value map
  package_dimensions?: {
    height: number; // Height in mm
    length: number; // Length in mm
    width: number; // Width in mm
    weight: number; // Weight in grams
  };
  shippable?: boolean; // Indicates if the product is shippable
  url?: string; // URL associated with the product
};

export type PriceData = {
  currency: "usd" | "gbp" | "brl" | string; // ISO currency code
  product?: string; // ID of the product
  product_data?: ProductData; // Inline product data
  recurring?: {
    interval: "day" | "week" | "month" | "year";
    interval_count?: number;
  };
  tax_behavior?: "inclusive" | "exclusive" | "unspecified";
  unit_amount?: number; // Amount in cents
  unit_amount_decimal?: string; // Decimal amount in cents
};

export type LineItem = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  adjustable_quantity?: {
    // Define adjustable quantity related properties here
  };
  dynamic_tax_rates?: string[]; // Array of tax rate IDs
  price?: string; // ID of the Price or Plan object
  price_data?: PriceData;
  quantity?: number; // Quantity of the item
  tax_rates?: string[]; // Array of tax rate IDs
};

export type CheckoutSessionLineItems = {
  line_items: LineItem[];
};
