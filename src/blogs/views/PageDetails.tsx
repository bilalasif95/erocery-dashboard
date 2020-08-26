import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ActionDialog from "@saleor/components/ActionDialog";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { getMutationState, maybe } from "../../misc";
import { BlogInput } from "../../types/globalTypes";
import PageUpdatePage, { FormData } from "../components/PageUpdatePage";
import { TypedPageRemove, TypedPageUpdate } from "../mutations";
import { TypedPageDetailsQuery } from "../queries";
import { PageRemove } from "../types/PageRemove";
import { blogListUrl, pageUrl, PageUrlQueryParams } from "../urls";

export interface PageDetailsProps {
  id: string;
  params: PageUrlQueryParams;
}

const createPageInput = (data: FormData,file: any): BlogInput => {
  return {
    authorName: data.authorName,
    contentJson: JSON.stringify(data.content),
    description: data.description,
    image: file,
    imageAlt: data.backgroundImageAlt,
    isPublished: data.isPublished,
    publicationDate: data.isPublished
      ? null
      : data.publicationDate === ""
        ? null
        : data.publicationDate,
    seo: {
      description: data.seoDescription,
      title: data.seoTitle
    },
    slug: data.slug === "" ? null : data.slug,
    title: data.title
  };
};

export const PageDetails: React.StatelessComponent<PageDetailsProps> = ({
  id,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const [file,setFile] = React.useState<any>();
  const handlePageRemove = (data: PageRemove) => {
    if (data.blogDelete.errors.length === 0) {
      notify({
        text: intl.formatMessage({
          defaultMessage: "Removed blog"
        })
      });
      navigate(blogListUrl());
    }
  };
  return (
    <TypedPageRemove variables={{ id }} onCompleted={handlePageRemove}>
      {(pageRemove, pageRemoveOpts) => (
        <TypedPageUpdate>
          {(pageUpdate, pageUpdateOpts) => (
            <TypedPageDetailsQuery variables={{ id }}>
              {pageDetails => {
                const formTransitionState = getMutationState(
                  pageUpdateOpts.called,
                  pageUpdateOpts.loading,
                  maybe(() => pageUpdateOpts.data.blogUpdate.errors)
                );
                const removeTransitionState = getMutationState(
                  pageRemoveOpts.called,
                  pageRemoveOpts.loading,
                  maybe(() => pageRemoveOpts.data.blogDelete.errors)
                );

                return (
                  <>
                    <WindowTitle
                      title={maybe(() => pageDetails.data.blog.title)}
                    />
                    <PageUpdatePage
                      disabled={pageDetails.loading}
                      errors={maybe(
                        () => pageUpdateOpts.data.blogUpdate.errors,
                        []
                      )}
                      saveButtonBarState={formTransitionState}
                      page={maybe(() => pageDetails.data.blog)}
                      onBack={() => navigate(blogListUrl())}
                      onRemove={() =>
                        navigate(
                          pageUrl(id, {
                            action: "remove"
                          })
                        )
                      }
                      onImageDelete={formData =>
                        pageUpdate({
                          variables: {
                            id,
                            input: {
                              authorName: formData.authorName,
                              contentJson: JSON.stringify(formData.content),
                              description: formData.description,
                              image: null,
                              imageAlt: "",
                              isPublished: formData.isPublished,
                              publicationDate: formData.isPublished
                                ? null
                                : formData.publicationDate === ""
                                  ? null
                                  : formData.publicationDate,
                              seo: {
                                description: formData.seoDescription,
                                title: formData.seoTitle
                              },
                              slug: formData.slug === "" ? null : formData.slug,
                              title: formData.title
                            }
                          }
                        })
                      }
                      onImageUpload={(formData,file) => {
                        setFile(file)
                        pageUpdate({
                          variables: {
                            id,
                            input: {
                              authorName: formData.authorName,
                              contentJson: JSON.stringify(formData.content),
                              description: formData.description,
                              image: file,
                              imageAlt: formData.backgroundImageAlt,
                              isPublished: formData.isPublished,
                              publicationDate: formData.isPublished
                                ? null
                                : formData.publicationDate === ""
                                  ? null
                                  : formData.publicationDate,
                              seo: {
                                description: formData.seoDescription,
                                title: formData.seoTitle
                              },
                              slug: formData.slug === "" ? null : formData.slug,
                              title: formData.title
                            }
                          }
                        })}
                      }
                      onSubmit={formData =>
                        pageUpdate({
                          variables: {
                            id,
                            input: createPageInput(formData,file)
                          }
                        })
                      }
                    />
                    <ActionDialog
                      open={params.action === "remove"}
                      confirmButtonState={removeTransitionState}
                      title={intl.formatMessage({
                        defaultMessage: "Delete Blog",
                        description: "dialog header"
                      })}
                      onClose={() => navigate(pageUrl(id))}
                      onConfirm={pageRemove}
                      variant="delete"
                    >
                      <DialogContentText>
                        <FormattedMessage
                          defaultMessage="Are you sure you want to delete {title}?"
                          description="delete blog"
                          values={{
                            title: (
                              <strong>
                                {maybe(
                                  () => pageDetails.data.blog.title,
                                  "..."
                                )}
                              </strong>
                            )
                          }}
                        />
                      </DialogContentText>
                    </ActionDialog>
                  </>
                );
              }}
            </TypedPageDetailsQuery>
          )}
        </TypedPageUpdate>
      )}
    </TypedPageRemove>
  );
};
PageDetails.displayName = "PageDetails";
export default PageDetails;
