import gql from "graphql-tag";

import { TypedMutation } from "../mutations";

import {Notification,NotificationVariables, WebhookDelete1, WebhookDeleteVariables1 } from "./types/WebhookDelete";

import { ImagesDelete, ImagesDeleteVariables } from "./types/deleteImages";
// new banner imagess



const ImagesUpload = gql`
  mutation($images:[Upload]){
  shopBannerCreate(input:{images:$images}){
    message
    errors{
      field
      message
    }
  }
}
`;
export const TypeImagesUpload = TypedMutation<
  WebhookDelete1,
  WebhookDeleteVariables1
>(ImagesUpload);



// Delete images...

const ImagesDeleted = gql`
 mutation ShopBannerDelete($ids:Int!){
  shopBannerDelete(input:{ids:[$ids]}){
    message
    shopErrors{
      field
      message
    }
  }
}
`;
export const TypeImagesDelete = TypedMutation<
  ImagesDelete,
  ImagesDeleteVariables
>(ImagesDeleted);



// notification push
const PushNotification = gql`
  mutation sendPormotion($description:String!,$title:String!){
  sendPormotion(input:{description:$description,title:$title}){
    message
    errors{
      field
      message
    }
  }
}
`;
export const TypeNotificationPush = TypedMutation<
  Notification,
  NotificationVariables
>(PushNotification);