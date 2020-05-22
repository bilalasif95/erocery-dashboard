import Button from "@material-ui/core/Button";
import { Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import Timer from 'react-compound-timer';

import Form from "@saleor/components/Form";
import FormSpacer from "@saleor/components/FormSpacer";

const useStyles = makeStyles(
  (theme: Theme) => (
  {
    buttons: {
      display: "flex",
    },
    panel: {
      "& span": {
        color: theme.palette.error.contrastText
      },
      background: theme.palette.error.main,
      borderRadius: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 1.5
    },
    passwordsubmit: {
      marginRight: "1rem",
      width: "100%",
    },
    submit: {
      width: "100%",
    }
  }),
  {
    name: "NewPasswordPage"
  }
);

export interface NewPasswordPageFormData {
  password: string;
  confirmPassword: string;
  smsCode: string;
}
export interface NewPasswordPageProps {
  disabled: boolean;
  error: string;
  onSubmit: (data: NewPasswordPageFormData) => void;
  Submit: () => void;
  timer: number;
  setTimer: (value: number) => void;
}

const initialForm: NewPasswordPageFormData = {
  confirmPassword: "",
  password: "",
  smsCode: "",
};

const NewPasswordPage: React.FC<NewPasswordPageProps> = props => {
  const { disabled,error, onSubmit, Submit, timer, setTimer } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  return (
        <Form initial={initialForm} onSubmit={onSubmit}>
          {({ change: handleChange, data, submit: handleSubmit }) => {
            const passwordError =
              data.password !== data.confirmPassword && data.password.length > 0;

            return (
              <>
                {!!error && (
                <div className={classes.panel}>
                  <Typography variant="caption">{error}</Typography>
                </div>
                )}
                <Typography>
                  <FormattedMessage defaultMessage="Please set up a new password." />
                </Typography>
                <FormSpacer />
                <TextField
                  autoFocus
                  fullWidth
                  autoComplete="none"
                  disabled={disabled}
                  label={intl.formatMessage({
                    defaultMessage: "SMS Code"
                  })}
                  name="smsCode"
                  onChange={handleChange}
                  type="tel"
                  value={data.smsCode}
                  inputProps={{
                    "data-tc": "smsCode"
                  }}
                />
                <FormSpacer />
                <TextField
                  fullWidth
                  autoComplete="none"
                  disabled={disabled}
                  label={intl.formatMessage({
                    defaultMessage: "New Password"
                  })}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={data.password}
                  inputProps={{
                    "data-tc": "password"
                  }}
                />
                <FormSpacer />
                <TextField
                  fullWidth
                  error={passwordError}
                  autoComplete="none"
                  disabled={disabled}
                  label={intl.formatMessage({
                    defaultMessage: "Confirm Password"
                  })}
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  value={data.confirmPassword}
                  helperText={
                    passwordError &&
                    intl.formatMessage({
                      defaultMessage: "Passwords do not match"
                    })
                  }
                  inputProps={{
                    "data-tc": "confirm-password"
                  }}
                />
                <FormSpacer />
                <div className={classes.buttons}>
                <Button
                  className={classes.passwordsubmit}
                  color="primary"
                  disabled={(passwordError && data.password.length > 0) || disabled}
                  variant="contained"
                  onClick={handleSubmit}
                  type="submit"
                >
                  <FormattedMessage
                    defaultMessage="Set new password"
                    description="button"
                  />
                </Button>
                <Form onSubmit={Submit}>
                {({ submit: handleResetSubmit }) => {
                  return (
                    <Button
                      className={classes.submit}
                      color="primary"
                      disabled={timer > 0}
                      variant="contained"
                      onClick={handleResetSubmit}
                      type="submit"
                    >
                      {timer > 0 ?
                      <Timer
                        initialTime={179000}
                        direction="backward"
                        checkpoints={[
                          {
                            callback: () => setTimer(0),
                            time: 0,
                          },
                        ]}
                      >
                        Send Again(<Timer.Minutes />:
                        <Timer.Seconds />)
                      </Timer>
                      : "Send Code"}
                    </Button>
                    );
                  }}
                  </Form>
                  </div>
              </>
            );
          }}
        </Form>
  );
};

NewPasswordPage.displayName = "NewPasswordPage";
export default NewPasswordPage;
