import { EVENT_NAMES } from "@/constants/amplitude";
import { CreateStripeSessionResponse } from "@/services";
import { SubscriptionPlan, User } from "@/types";
import * as amplitude from "@amplitude/analytics-browser";

const config = {
  autocapture: true,
};

export const initAmplitude = async () => {
  amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY || "", config);
};

export const setUserId = (userId: string) => {
  amplitude.setUserId(userId);
};

export const setUserEmail = (userEmail: string) => {
  const identify = new amplitude.Identify().set("email", userEmail);
  amplitude.identify(identify);
};

// Tipo genérico para os parâmetros do evento
export type EventParams<T = Record<string, unknown>> = T;

// Função trackEvent genérica
export const trackEvent = <T = Record<string, unknown>>(
  eventName: string,
  params?: EventParams<T>
) => {
  // @ts-expect-error TS2345: Argument of type 'T | undefined' is not assignable to parameter of type 'Record<string, any> | undefined'.
  amplitude.track(eventName, params);
};

// Interface para LoginSubmitErrorParams
interface LoginSubmitErrorParams {
  type: string;
  emailInputValue: string;
  error?: unknown; // Substituí "any" por "unknown" para melhor prática
}

export const trackLoginSubmitError = (params: LoginSubmitErrorParams) => {
  trackEvent<LoginSubmitErrorParams>(EVENT_NAMES.LOGIN_SUBMIT_ERROR, params);
};

// Interface para LoginSubmitParams
interface LoginSubmitParams {
  emailInputValue: string;
  isNewUser: boolean;
}

export const trackLoginSubmit = (params: LoginSubmitParams) => {
  trackEvent<LoginSubmitParams>(EVENT_NAMES.LOGIN_SUBMIT_SUCCESS, params);
};

// Interface para ConfirmUserErrorParams
interface ConfirmUserErrorParams {
  error?: unknown;
}

export const trackConfirmUserError = (params: ConfirmUserErrorParams) => {
  trackEvent<ConfirmUserErrorParams>(EVENT_NAMES.CONFIRM_USER_ERROR, params);
};

// Interface para ConfirmUserParams
interface ConfirmUserParams {
  user: User;
  hasAccessToProduct: boolean;
}

export const trackConfirmUser = (params: ConfirmUserParams) => {
  trackEvent<ConfirmUserParams>(EVENT_NAMES.CONFIRM_USER, params);
};

// Função trackFeatureEvent genérica para eventos não padronizados
export const trackFeatureEvent = <T = Record<string, unknown>>(
  eventName: string,
  params: EventParams<T>
) => {
  trackEvent<T>(eventName, params);
};

// Interface para SelectPlanParams
interface SelectPlanParams {
  subscriptionPlan: SubscriptionPlan;
}

export const trackSelectPlan = (params: SelectPlanParams) => {
  trackEvent<SelectPlanParams>(EVENT_NAMES.CHECKOUT.SELECTED_PLAN, params);
};

// Interface para SelectPlanErrorParams
interface SelectPlanErrorParams {
  subscriptionPlan: SubscriptionPlan;
  error: unknown;
}

export const trackSelectPlanError = (params: SelectPlanErrorParams) => {
  trackEvent<SelectPlanErrorParams>(
    EVENT_NAMES.CHECKOUT.SELECTED_PLAN_ERROR,
    params
  );
};

// Interface para PlanSessionCreatedParams
interface PlanSessionCreatedParams {
  stripeSessionObject: CreateStripeSessionResponse;
}

export const trackPlanSessionCreated = (params: PlanSessionCreatedParams) => {
  trackEvent<PlanSessionCreatedParams>(
    EVENT_NAMES.CHECKOUT.SELECTED_PLAN,
    params
  );
};

// Interface para PaymentSuccessParams
interface PaymentSuccessParams {
  sessionId: string;
}

export const trackPaymentSuccess = (params: PaymentSuccessParams) => {
  trackEvent<PaymentSuccessParams>(
    EVENT_NAMES.CHECKOUT.PAYMENT_SUCCESS,
    params
  );
};

// Interface para PaymentErrorParams
interface PaymentErrorParams {
  sessionId: string;
  error: unknown;
}

export const trackPaymentError = (params: PaymentErrorParams) => {
  trackEvent<PaymentErrorParams>(EVENT_NAMES.CHECKOUT.PAYMENT_ERRROR, params);
};

// Interface para PaymentErrorParams
interface CanceledPaymentErrorParams {
  sessionId: string;
  error: unknown;
}

export const trackCanceledPaymentError = (
  params: CanceledPaymentErrorParams
) => {
  trackEvent<PaymentErrorParams>(EVENT_NAMES.CHECKOUT.PAYMENT_ERRROR, params);
};

// Interface para PaymentDifferentStatusParams
interface PaymentDifferentStatusParams {
  sessionId: string;
  status: string;
}

export const trackPaymentDifferentStatus = (
  params: PaymentDifferentStatusParams
) => {
  trackEvent<PaymentDifferentStatusParams>(
    EVENT_NAMES.CHECKOUT.PAYMENT_SUCCESS,
    params
  );
};

// Interface para PaymentDifferentStatusParams
interface PaymentRetryParams {
  sessionId: string;
}

export const trackPaymentRetry = (params: PaymentRetryParams) => {
  trackEvent<PaymentRetryParams>(EVENT_NAMES.CHECKOUT.PAYMENT_RETRY, params);
};
