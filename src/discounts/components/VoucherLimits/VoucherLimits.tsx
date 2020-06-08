import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import { FormattedMessage,useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import { ControlledCheckbox } from "@saleor/components/ControlledCheckbox";
import { FormErrors } from "../../../types";
import { FormData } from "../VoucherDetailsPage";

interface VoucherLimitsProps {
  data: FormData;
  defaultCurrency: string;
  disabled: boolean;
  errors: FormErrors<"usageLimit">;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const useStyles = makeStyles(() => ({
  limit: {
    marginBottom: "0.5rem"
  },
}));

const VoucherLimits = ({
  data,
  disabled,
  errors,
  onChange
}: VoucherLimitsProps) => {
  const intl = useIntl();
  const classes = useStyles({});
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Usage Limit",
          description: "voucher usage limit, header"
        })}
      />
      <CardContent>
        <Typography variant="subtitle1" className={classes.limit}>
          <FormattedMessage defaultMessage="Limit number of times this discount can be used in total" />
        </Typography>
        {/* <ControlledCheckbox
          checked={data.hasUsageLimit}
          label={intl.formatMessage({
            defaultMessage:
              "Limit number of times this discount can be used in total"
          })}
          name={"hasUsageLimit" as keyof FormData}
          onChange={onChange}
        /> */}
        {data.hasUsageLimit && (
          <TextField
            disabled={disabled}
            error={!!errors.usageLimit}
            helperText={errors.usageLimit}
            label={intl.formatMessage({
              defaultMessage: "Limit of Uses",
              description: "voucher"
            })}
            name={"usageLimit" as keyof FormData}
            value={data.usageLimit}
            onChange={onChange}
            type="number"
            inputProps={{
              min: 0
            }}
            fullWidth
          />
        )}
        <ControlledCheckbox
          checked={data.applyOncePerCustomer}
          label={intl.formatMessage({
            defaultMessage: "Limit to one use per customer",
            description: "limit voucher"
          })}
          name={"applyOncePerCustomer" as keyof FormData}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
export default VoucherLimits;
