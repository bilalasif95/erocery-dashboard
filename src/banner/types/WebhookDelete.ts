/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WebhookDelete
// ====================================================

export interface WebhookDelete_webhookDelete_errors1 {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface WebhookDelete_webhookDelete1 {
  __typename: "WebhookDelete";
  errors: WebhookDelete_webhookDelete_errors1[] | null;
}

export interface WebhookDelete1 {
  shopBannerCreate: WebhookDelete_webhookDelete1 | null;
}

export interface WebhookDeleteVariables1 {
  images: any;
  alt: string;
}





export interface WebhookDelete_WebhookDelete_Errors22 {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface WebhookDelete_WebhookDelete22 {
  __typename: "sendPormotion";
  errors: WebhookDelete_WebhookDelete_Errors22[] | null;
}

export interface Notification {
  sendPormotion: WebhookDelete_WebhookDelete22 | null;
}


export interface NotificationVariables {

  title: string,
  description: string

}