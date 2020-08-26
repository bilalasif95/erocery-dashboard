import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import { pageDetailsFragment } from "./queries";
import {
  PageBulkPublish,
  PageBulkPublishVariables
} from "./types/PageBulkPublish";
import {
  PageBulkRemove,
  PageBulkRemoveVariables
} from "./types/PageBulkRemove";
import { PageCreate, PageCreateVariables } from "./types/PageCreate";
import { PageRemove, PageRemoveVariables } from "./types/PageRemove";
import { PageUpdate, PageUpdateVariables } from "./types/PageUpdate";

const pageCreate = gql`
  ${pageDetailsFragment}
  mutation PageCreate($input: BlogInput!) {
    blogCreate(input: $input) {
      errors {
        field
        message
      }
      blog {
        ...PageDetailsFragment
      }
    }
  }
`;
export const TypedPageCreate = TypedMutation<PageCreate, PageCreateVariables>(
  pageCreate
);

const pageUpdate = gql`
  ${pageDetailsFragment}
  mutation PageUpdate($id: ID!, $input: BlogInput!) {
    blogUpdate(id: $id, input: $input) {
      errors {
        field
        message
      }
      blog {
        ...PageDetailsFragment
      }
    }
  }
`;
export const TypedPageUpdate = TypedMutation<PageUpdate, PageUpdateVariables>(
  pageUpdate
);

const pageRemove = gql`
  mutation PageRemove($id: ID!) {
    blogDelete(id: $id) {
      errors {
        field
        message
      }
    }
  }
`;
export const TypedPageRemove = TypedMutation<PageRemove, PageRemoveVariables>(
  pageRemove
);

const pageBulkPublish = gql`
  mutation PageBulkPublish($ids: [ID]!, $isPublished: Boolean!) {
    blogBulkPublish(ids: $ids, isPublished: $isPublished) {
      errors {
        field
        message
      }
    }
  }
`;
export const TypedPageBulkPublish = TypedMutation<
  PageBulkPublish,
  PageBulkPublishVariables
>(pageBulkPublish);

const pageBulkRemove = gql`
  mutation PageBulkRemove($ids: [ID]!) {
    blogBulkDelete(ids: $ids) {
      errors {
        field
        message
      }
    }
  }
`;
export const TypedPageBulkRemove = TypedMutation<
  PageBulkRemove,
  PageBulkRemoveVariables
>(pageBulkRemove);
