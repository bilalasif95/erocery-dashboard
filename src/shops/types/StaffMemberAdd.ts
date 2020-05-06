/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: StaffMemberAdd
// ====================================================

export interface StaffMemberAdd_staffCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface StaffMemberAdd_staffCreate_user_avatar {
  __typename: "Image";
  url: string;
}

export interface StaffMemberAdd_staffCreate_user_permissions {
  __typename: "PermissionDisplay";
  code: PermissionEnum;
  name: string;
}

export interface StaffMemberAdd_staffCreate_user {
  __typename: "SubShop";
  city: string;
  name: string
  // id: string;
  // email: string;
  // firstName: string;
  // isActive: boolean;
  // lastName: string;
  // avatar: StaffMemberAdd_staffCreate_user_avatar | null;
  // permissions: (StaffMemberAdd_staffCreate_user_permissions | null)[] | null;
}

export interface StaffMemberAdd_staffCreate {
  __typename: "SubShopCreate";
  errors: StaffMemberAdd_staffCreate_errors[] | null;
  subShop: StaffMemberAdd_staffCreate_user | null;
}

export interface StaffMemberAdd {
  subShopCreate: StaffMemberAdd_staffCreate | null;
}

export interface StaffMemberAddVariables {
  name: String;
  phone: String;
  password: String;
  city: String;
}
