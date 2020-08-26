/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageDetails
// ====================================================

export interface CategoryDetails_category_backgroundImage {
  __typename: "Image";
  alt: string | null;
  url: string;
}

export interface PageDetails_page {
  __typename: "Page";
  id: string;
  title: string;
  image: CategoryDetails_category_backgroundImage | null;
  slug: string;
  backgroundImageAlt: string;
  isPublished: boolean;
  contentJson: any;
  authorName: string;
  description: string;
  seoTitle: string | null;
  seoDescription: string | null;
  publicationDate: any | null;
}

export interface PageDetails {
  blog: PageDetails_page | null;
}

export interface PageDetailsVariables {
  id: string;
}
