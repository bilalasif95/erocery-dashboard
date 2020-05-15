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
  edges: StaffList_staffUsers_edges[];
  totalCount: Number;
}

export interface StaffList_staffUsers_edges_node {
  __typename: "SubShop";
  id: any;
  city: string;
  name: string;
  cnic: string;
  phone: string;
  node: {
    id: any;
    city: string;
    name: string;
    cnic: string;
    phone: string;
    created: string;
    number: string;
    userEmail: string;
    status: string;
    rider: {
      phone: string;
      name: string;
    }
    total: {
      net: {
        amount: string;
        currency: string;
      }
    }
  }
  created: string;
  orders: OrderCountableConnection;
  number: string;
  userEmail: string;
  status: string;
  rider: {
    phone: string;
    name: string;
  }
  total: {
    net: {
      amount: string;
      currency: string;
    }
  }
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
  subshop: any | null;
  pageInfo: StaffList_staffUsers_pageInfo;
}

export interface StaffListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: StaffUserInput | null;
  id: string;
}
