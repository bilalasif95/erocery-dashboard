// import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router";

import useNavigator from "@saleor/hooks/useNavigator";
import { commonMessages } from "@saleor/intl";
// import useUser from "@saleor/hooks/useUser";
import NewPasswordPage, {
  NewPasswordPageFormData
} from "../components/NewPasswordPage";
import { SetAccountResendSMS, SetPasswordMutation } from "../mutations";
import { ResendSMSCode } from "../types/ResetPassword";
import { SetPassword } from "../types/SetPassword";
// import { NewPasswordUrlQueryParams } from "../urls";

const NewPassword: React.FC<RouteComponentProps> = () => {
  const navigate = useNavigator();
  const [error, setError] = React.useState<string>();
  const intl = useIntl();
  const [timer, setTimer] = React.useState(179);
  // const { loginByToken } = useUser();

  // const params: NewPasswordUrlQueryParams = parseQs(location.search.substr(1));

  const handleSetPassword = async (data: SetPassword) => {
    if (data.accountForgotVerify.errors.length === 0) {
      // loginByToken(data.setPassword.token, data.setPassword.user);
      navigate("/", true);
    } else {
      if (data.accountForgotVerify.errors.find(err => err.field === "smsCode")) {
        setError(
          intl.formatMessage({
            defaultMessage:
              "Invalid SMS Code."
          })
        );
      } else {
        setError(intl.formatMessage(commonMessages.somethingWentWrong));
      }
    }
  };

  const handleResetPassword = async (data: ResendSMSCode) => {
    if (data.accountResendSms.errors.length === 0) {
      setTimer(179);
    }
  };

  return (
    <SetAccountResendSMS onCompleted={handleResetPassword}>
      {(AccountResendSms) => {
        const Submit = () =>
        AccountResendSms({
            variables: {
              phone: window.localStorage.getItem("resetPhoneNumber"),
            }
          });
          return (
          <SetPasswordMutation onCompleted={handleSetPassword}>
            {(setPassword, setPasswordOpts) => {
              const handleSubmit = (data: NewPasswordPageFormData) =>
                setPassword({
                  variables: {
                    newPassword: data.password,
                    phone: window.localStorage.getItem("resetPhoneNumber"),
                    smsCode: data.smsCode
                  }
                });

              return (
                <NewPasswordPage
                  disabled={setPasswordOpts.loading}
                  error={error}
                  onSubmit={handleSubmit}
                  Submit={Submit}
                  timer={timer}
                  setTimer={setTimer}
                />
              );
            }}
          </SetPasswordMutation>
          )
      }}
      </SetAccountResendSMS>
  );
};

NewPassword.displayName = "NewPassword";
export default NewPassword;
