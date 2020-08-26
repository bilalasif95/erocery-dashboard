import { content } from "../storybook/stories/components/RichTextEditor";
import { PageDetails_page } from "./types/PageDetails";
import { PageList_pages_edges_node } from "./types/PageList";

export const pageList: PageList_pages_edges_node[] = [
  {
    __typename: "Page",
    id: "Jzx123sEt==",
    isPublished: true,
    slug: "about",
    title: "About"
  },
  {
    __typename: "Page",
    id: "Jzx123sEx==",
    isPublished: false,
    slug: "about",
    title: "About"
  },
  {
    __typename: "Page",
    id: "Jzx123sEu==",
    isPublished: true,
    slug: "about",
    title: "About"
  },
  {
    __typename: "Page",
    id: "Jzx123sEm==",
    isPublished: true,
    slug: "about",
    title: "About"
  }
];
export const page: PageDetails_page = {
  __typename: "Page",
  authorName: "",
  backgroundImageAlt: "",
  contentJson: JSON.stringify(content),
  description: "",
  id: "Kzx152sEm==",
  image: {
    __typename: "Image",
    alt: "",
    url: ""
  },
  isPublished: false,
  publicationDate: "",
  seoDescription: "About",
  seoTitle: "About",
  slug: "about",
  title: "About"
};
