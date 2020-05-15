import gql from "graphql-tag";
import { TypedQuery } from "../queries";
import { StaffList, StaffListVariables } from "./types/StaffList";
import {
  StaffMemberDetails,
  StaffMemberDetailsVariables,
} from "./types/StaffMemberDetails";

export const staffMemberFragment = gql`
  fragment StaffMemberFragment on User {
    id
    email
    firstName
    isActive
    lastName
    avatar {
      url
    }
  }
`;
export const staffMemberDetailsFragment = gql`
  ${staffMemberFragment}
  fragment StaffMemberDetailsFragment on User {
    ...StaffMemberFragment
    permissions {
      code
      name
    }
  }
`;
const staffList = gql`
  query SubShops {
    subshops {
      id
      name
      city
      orders {
        totalCount
      }
    }
  }
`;
export const TypedStaffListQuery = TypedQuery<StaffList, StaffListVariables>(
  staffList
);

const staffListt = gql`
  query SubShopAssignedOrders{
    subshops{
      id
      name
      city
      orders(first:10,filter:{status:ASSIGNED}){
        edges{
          node{
            id
            number
            created
            userEmail
            status
            rider{
              name
              phone
            }
            subshop{
              name
            }
            total{
              net{
                amount
                currency
              }
            }
          }
        }
      }
    }
  }
`;
export const TypedStafffListQuery = TypedQuery<StaffList, StaffListVariables>(
  staffListt
);

const staffListtt = gql`
  query SubShop($id:ID!) {
    subshop(id: $id) {
      id
      name
      city
      orders(first:10,filter:{status:ASSIGNED}){
        edges{
          node{
            id
            number
            created
            userEmail
            status
            rider{
              name
              phone
            }
            subshop{
              name
            }
            total{
              net{
                amount
                currency
              }
            }
          }
        }
      }
      riders(first:10){
        edges{
          node{
            id
            name
            cnic
            phone
            city
          }
        }
      }
    }
  }
`;
export const TypedStaffffListQuery = TypedQuery<StaffList, StaffListVariables>(
  staffListtt
);

export const staffMemberDetails = gql`
  query Rider {
    riders {
      id
      name
      cnic
      phone
      city
      orders(first:2){
        edges{
          node{
            id
            created
            totalBalance {
              amount
              currency
            }
            userEmail
            status
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`;
export const TypedStaffMemberDetailsQuery = TypedQuery<
  StaffMemberDetails,
  StaffMemberDetailsVariables
>(staffMemberDetails);
