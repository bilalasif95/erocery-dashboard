/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StaffUserInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: StaffList
// ====================================================

export interface StaffList_staffUsers_edges_node_avatar {
  __typename: "Image";
  url: string;
}

export interface OrderCountableConnection {
  __typename: "OrderCountableConnection";
  totalCount: Number;
}

export interface StaffList_staffUsers_edges_node {
  __typename: "SubShop";
  id: string;
  city: string;
  name: string;
  orders: OrderCountableConnection;
  // email: string;
  // firstName: string;
  // isActive: boolean;
  // lastName: string;
  // avatar: StaffList_staffUsers_edges_node_avatar | null;
}

export interface StaffList_staffUsers_edges {
  __typename: "UserCountableEdge";
  cursor: string;
  node: StaffList_staffUsers_edges_node;
}

export interface StaffList_staffUsers_pageInfo {
  __typename: "PageInfo";
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface StaffList_staffUsers {
  __typename: "UserCountableConnection";
  edges: StaffList_staffUsers_edges[];
  pageInfo: StaffList_staffUsers_pageInfo;
}

export interface StaffList {
  subshops: [] | null;
  pageInfo: StaffList_staffUsers_pageInfo;
}

export interface StaffListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: StaffUserInput | null;
}
