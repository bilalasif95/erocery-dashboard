import gql from "graphql-tag";

import { TypedQuery } from "../queries";
import { PageDetails, PageDetailsVariables } from "./types/PageDetails";
import { PageList, PageListVariables } from "./types/PageList";

export const pageFragment = gql`
  fragment PageFragment on Blog {
    id
    title
    image{
      url
      alt
    }
    slug
    isPublished
    authorName
    description
  }
`;

export const pageDetailsFragment = gql`
  ${pageFragment}
  fragment PageDetailsFragment on Blog {
    ...PageFragment
    contentJson
    seoTitle
    seoDescription
    publicationDate
  }
`;

const pageList = gql`
  ${pageFragment}
  query PageList($first: Int, $after: String, $last: Int, $before: String) {
    blogs(before: $before, after: $after, first: $first, last: $last) {
      edges {
        node {
          ...PageFragment
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
export const TypedPageListQuery = TypedQuery<PageList, PageListVariables>(
  pageList
);

const pageDetails = gql`
  ${pageDetailsFragment}
  query PageDetails($id: ID!) {
    blog(id: $id) {
      ...PageDetailsFragment
    }
  }
`;
export const TypedPageDetailsQuery = TypedQuery<
  PageDetails,
  PageDetailsVariables
>(pageDetails);
