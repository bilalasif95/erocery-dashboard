/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: User
// ====================================================

export interface User_permissions {
  __typename: "PermissionDisplay";
  code: PermissionEnum;
  name: string;
}

export interface User_avatar {
  __typename: "Image";
  url: string;
}

export interface User {
  __typename: "User";
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  permissions: (User_permissions | null)[] | null;
  avatar: User_avatar | null;
}
