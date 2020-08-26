import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import RichTextEditor from "@saleor/components/RichTextEditor";
import { commonMessages } from "@saleor/intl";
import { maybe } from "../../../misc";
import { FormErrors } from "../../../types";
import { PageDetails_page } from "../../types/PageDetails";
import { FormData } from "../PageDetailsPage";

export interface PageInfoProps {
  data: FormData;
  disabled: boolean;
  errors: FormErrors<"contentJson" | "title" | "authorName" | "description">;
  page: PageDetails_page;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const styles = createStyles({
  root: {
    overflow: "visible"
  }
});

const PageInfo = withStyles(styles, {
  name: "PageInfo"
})(
  ({
    classes,
    data,
    disabled,
    errors,
    page,
    onChange
  }: PageInfoProps & WithStyles<typeof styles>) => {
    const intl = useIntl();

    return (
      <Card className={classes.root}>
        <CardTitle
          title={intl.formatMessage(commonMessages.generalInformations)}
        />
        <CardContent>
          <TextField
            disabled={disabled}
            error={!!errors.title}
            fullWidth
            helperText={errors.title}
            label={intl.formatMessage({
              defaultMessage: "Title",
              description: "blog title"
            })}
            name={"title" as keyof FormData}
            value={data.title}
            onChange={onChange}
          />
          <FormSpacer />
          <TextField
            disabled={disabled}
            error={!!errors.authorName}
            fullWidth
            helperText={errors.authorName}
            label={intl.formatMessage({
              defaultMessage: "Author Name",
              description: "blog author name"
            })}
            name={"authorName" as keyof FormData}
            value={data.authorName}
            onChange={onChange}
          />
          <FormSpacer />
          <TextField
            disabled={disabled}
            error={!!errors.description}
            fullWidth
            multiline
            helperText={errors.description}
            label={intl.formatMessage({
              defaultMessage: "Description",
              description: "blog description"
            })}
            name={"description" as keyof FormData}
            value={data.description}
            onChange={onChange}
          />
          <FormSpacer />
          <RichTextEditor
            disabled={disabled}
            error={!!errors.contentJson}
            helperText={errors.contentJson}
            initial={maybe(() => JSON.parse(page.contentJson))}
            label={intl.formatMessage({
              defaultMessage: "Content",
              description: "blog content"
            })}
            name={"content" as keyof FormData}
            onChange={onChange}
          />
        </CardContent>
      </Card>
    );
  }
);
PageInfo.displayName = "PageInfo";
export default PageInfo;
