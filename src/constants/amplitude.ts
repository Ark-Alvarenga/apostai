export const EVENT_NAMES = {
  LOGIN_SUBMIT_ERROR: "Login Submit Error",
  LOGIN_SUBMIT_SUCCESS: "Login Submit Success",
  CONFIRM_USER: "Confirm User Success",
  CONFIRM_USER_ERROR: "Confirm User Error",
  CHECKOUT: {
    SELECTED_PLAN: "Checkout - User Selected Plan",
    PLAN_SESSION_CREATED: "Checkout - Stripe Session Created",
    SELECTED_PLAN_ERROR: "Checkout Error - User Selected Plan",
    PAYMENT_SUCCESS: "Checkout - Stripe Payment Done Successfully",
    PAYMENT_CANCELLED: "Checkout - Stripe Payment Cancelled",
    PAYMENT_ERRROR: "Checkout Error - Stripe Payment",
    PAYMENT_CANCELLED_ERRROR: "Checkout Cancelled Error - Stripe Payment",
    PAYMENT_DIFFERENT_STATUS: "Checkout Error - Different Payment Status",
    PAYMENT_RETRY: "Checkout - Retry Stripe Payment Button Clicked",
  },
};

export const EVENT_TYPES = {
  LOGIN_SUBMIT_ERROR: {
    INVALID_EMAIL_INPUT: "Invalid Email Input",
    API_ERROR: "API ERROR",
  },
};

export const BETSLAYER_EVENT_TYPES = {
  SUBSCRIPTION: {
    CANCELLED: "Subscription - Cancelled",
    REACTIVATED: "Subscription - Reactivated",
    ERROR: "Subscription update error",
  },
};
