/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: TokenAuth
// ====================================================

export interface TokenAuth_tokenCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface TokenAuth_tokenCreate_user_permissions {
  __typename: "PermissionDisplay";
  code: PermissionEnum;
  name: string;
}

export interface TokenAuth_tokenCreate_user_avatar {
  __typename: "Image";
  url: string;
}

export interface TokenAuth_tokenCreate_user {
  __typename: "User";
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  permissions: (TokenAuth_tokenCreate_user_permissions | null)[] | null;
  avatar: TokenAuth_tokenCreate_user_avatar | null;
  subshop: {
    id: string
  }
}

export interface TokenAuth_tokenCreate {
  __typename: "CreateToken";
  token: string | null;
  errors: (TokenAuth_tokenCreate_errors | null)[];
  user: TokenAuth_tokenCreate_user | null;
}

export interface TokenAuth {
  tokenCreate: TokenAuth_tokenCreate | null;
}

export interface TokenAuthVariables {
  phone: string;
  password: string;
}
