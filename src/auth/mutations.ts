import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  RequestPasswordReset,
  RequestPasswordResetVariables
} from "./types/RequestPasswordReset";
import { ResendSMSCode, ResendSMSCodeVariables } from "./types/ResetPassword";
import { SetPassword, SetPasswordVariables } from "./types/SetPassword";
import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";
import { VerifyToken, VerifyTokenVariables } from "./types/VerifyToken";

export const fragmentUser = gql`
  fragment User on User {
    id
    email
    phone
    firstName
    lastName
    permissions {
      code
      name
    }
    avatar {
      url
    }
  }
`;

export const tokenAuthMutation = gql`
  ${fragmentUser}
  mutation TokenAuth($phone: String!, $password: String!) {
    tokenCreate(phone: $phone, password: $password) {
      token
      errors {
        field
        message
      }
      user {
        ...User
        subshop {
          id
        }
      }
    }
  }
`;

export const TypedTokenAuthMutation = TypedMutation<
  TokenAuth,
  TokenAuthVariables
>(tokenAuthMutation);

export const tokenVerifyMutation = gql`
  ${fragmentUser}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      payload
      user {
        ...User
      }
    }
  }
`;

export const TypedVerifyTokenMutation = TypedMutation<
  VerifyToken,
  VerifyTokenVariables
>(tokenVerifyMutation);

export const requestPasswordReset = gql`
  ${fragmentUser}
  mutation RequestPasswordReset($phone: String!) {
    accountForgotPassword(input: {phone: $phone}) {
      errors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
`;
export const RequestPasswordResetMutation = TypedMutation<
  RequestPasswordReset,
  RequestPasswordResetVariables
>(requestPasswordReset);

export const setPassword = gql`
  mutation SetPassword($smsCode:String!,$phone:String!,$newPassword:String!) {
    accountForgotVerify(input:{smsCode:$smsCode,phone:$phone,newPassword:$newPassword}) {
      errors {
        field
        message
      }
    }
  }
`;
export const SetPasswordMutation = TypedMutation<
  SetPassword,
  SetPasswordVariables
>(setPassword);

export const AccountResendSms = gql`
  mutation AccountResendSms($phone:String!) {
    accountResendSms(phone:$phone){
      errors {
        field
        message
      }
    }
  }
`;
export const SetAccountResendSMS = TypedMutation<
  ResendSMSCode,
  ResendSMSCodeVariables
>(AccountResendSms);