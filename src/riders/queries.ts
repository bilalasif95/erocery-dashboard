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

export const staffMemberDetails = gql`
  query Rider {
    riders {
      id
      name
      cnic
      phone
      city
      orders(first: 2) {
        edges {
          node {
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
