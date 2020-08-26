import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  RawDraftContentState
} from "draft-js";
import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import SeoForm from "@saleor/components/SeoForm";
import VisibilityCard from "@saleor/components/VisibilityCard";
import useDateLocalize from "@saleor/hooks/useDateLocalize";
import { sectionNames } from "@saleor/intl";
import { maybe } from "../../../misc";
import { UserError } from "../../../types";
import { PageDetails_page } from "../../types/PageDetails";
import PageImage from "../PageImage";
import PageInfo from "../PageInfo";
import PageSlug from "../PageSlug";

export interface FormData {
  content: RawDraftContentState;
  isPublished: boolean;
  publicationDate: string;
  seoDescription: string;
  backgroundImageAlt: string;
  seoTitle: string;
  slug: string;
  title: string;
  authorName: string;
  description: string;
  image: any;
}

export interface PageDetailsPageProps {
  disabled: boolean;
  errors: UserError[];
  page: PageDetails_page;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onRemove: () => void;
  onImageDelete: (data: FormData) => void;
  onSubmit: (data: FormData) => void;
  onImageUpload(data: FormData,file: File);
}

const PageUpdatePage: React.StatelessComponent<PageDetailsPageProps> = ({
  disabled,
  errors,
  page,
  saveButtonBarState,
  onBack,
  onImageDelete,
  onImageUpload,
  onRemove,
  onSubmit
}) => {
  const intl = useIntl();
  const localizeDate = useDateLocalize();

  const initialForm: FormData = {
    authorName: maybe(() => page.authorName, ""),
    backgroundImageAlt: maybe(() => page.image.alt, ""),
    content: maybe(
      () => JSON.parse(page.contentJson),
      convertToRaw(ContentState.createFromText(""))
    ),
    description: maybe(() => page.description, ""),
    image: maybe(() => page.image, null),
    isPublished: maybe(() => page.isPublished, false),
    publicationDate: maybe(() => page.publicationDate, ""),
    seoDescription: maybe(() => page.seoDescription || "", ""),
    seoTitle: maybe(() => page.seoTitle || "", ""),
    slug: maybe(() => page.slug, ""),
    title: maybe(() => page.title, "")
  };

  return (
    <Form errors={errors} initial={initialForm} onSubmit={onSubmit}>
      {({ change, data, errors: formErrors, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.blogs)}
          </AppHeader>
          <PageHeader
            title={
              page === null
                ? intl.formatMessage({
                  defaultMessage: "Create Blog",
                  description: "blog header"
                })
                : maybe(() => page.title)
            }
          />
          <Grid>
            <div>
              <PageInfo
                data={data}
                disabled={disabled}
                errors={formErrors}
                page={page}
                onChange={change}
              />
              <CardSpacer />
              <PageImage
                data={data}
                onImageUpload={(file) => onImageUpload(data,file)}
                onImageDelete={()=>onImageDelete(data)}
                image={maybe(() => page.image)}
                onChange={change}
              />
              <CardSpacer />
              <SeoForm
                description={data.seoDescription}
                disabled={disabled}
                descriptionPlaceholder={maybe(() => {
                  return convertFromRaw(data.content)
                    .getPlainText()
                    .slice(0, 300);
                }, "")}
                onChange={change}
                title={data.seoTitle}
                titlePlaceholder={data.title}
                helperText={intl.formatMessage({
                  defaultMessage:
                    "Add search engine title and description to make this blog easier to find"
                })}
              />
            </div>
            <div>
              <PageSlug
                data={data}
                disabled={disabled}
                errors={formErrors}
                onChange={change}
              />
              <CardSpacer />
              <VisibilityCard
                data={data}
                errors={formErrors}
                disabled={disabled}
                hiddenMessage={intl.formatMessage(
                  {
                    defaultMessage: "will be visible from {date}",
                    description: "blog"
                  },
                  {
                    date: localizeDate(data.publicationDate)
                  }
                )}
                onChange={change}
                visibleMessage={intl.formatMessage(
                  {
                    defaultMessage: "since {date}",
                    description: "blog"
                  },
                  {
                    date: localizeDate(data.publicationDate)
                  }
                )}
              />
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onDelete={page === null ? undefined : onRemove}
            onSave={submit}
          />
        </Container>
      )}
    </Form>
  );
};
PageUpdatePage.displayName = "PageUpdatePage";
export default PageUpdatePage;
