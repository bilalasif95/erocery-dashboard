import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  RequestPasswordReset,
  RequestPasswordResetVariables
} from "./types/RequestPasswordReset";
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
  mutation RequestPasswordReset($phone: String!, $redirectUrl: String!) {
    requestPasswordReset(phone: $phone, redirectUrl: $redirectUrl) {
      errors {
        field
        message
      }
    }
  }
`;
export const RequestPasswordResetMutation = TypedMutation<
  RequestPasswordReset,
  RequestPasswordResetVariables
>(requestPasswordReset);

export const setPassword = gql`
  ${fragmentUser}
  mutation SetPassword($phone: String!, $password: String!, $token: String!) {
    setPassword(phone: $phone, password: $password, token: $token) {
      token
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
export const SetPasswordMutation = TypedMutation<
  SetPassword,
  SetPasswordVariables
>(setPassword);
