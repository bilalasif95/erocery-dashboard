import React from "react";
import { useIntl } from "react-intl";
import urlJoin from "url-join";

import { APP_MOUNT_URI } from "@saleor/config";
import useNavigator from "@saleor/hooks/useNavigator";
import { commonMessages } from "@saleor/intl";
import ResetPasswordPage, {
  ResetPasswordPageFormData
} from "../components/ResetPasswordPage";
import { RequestPasswordResetMutation } from "../mutations";
import { RequestPasswordReset } from "../types/RequestPasswordReset";
import { newPasswordPath , newPasswordUrl } from "../urls";

const ResetPasswordView: React.FC = () => {
  const [error, setError] = React.useState<string>();
  const navigate = useNavigator();
  const intl = useIntl();

  const handleRequestPasswordReset = (data: RequestPasswordReset) => {
    if (data.accountForgotPassword.errors.length === 0) {
      navigate(newPasswordPath);
      window.localStorage.setItem("resetPhoneNumber",data.accountForgotPassword.user.phone);
    } else {
      if (data.accountForgotPassword.errors.find(err => err.field === "phone")) {
        setError(
          intl.formatMessage({
            defaultMessage:
              "Provided phone number does not exist in our database."
          })
        );
      } else {
        setError(intl.formatMessage(commonMessages.somethingWentWrong));
      }
    }
  };

  return (
    <RequestPasswordResetMutation onCompleted={handleRequestPasswordReset}>
      {(accountForgotPassword, requestPasswordResetOpts) => {
        const handleSubmit = (data: ResetPasswordPageFormData) =>
        accountForgotPassword({
            variables: {
              phone: data.phone,
              redirectUrl: urlJoin(
                window.location.origin,
                APP_MOUNT_URI === "/" ? "" : APP_MOUNT_URI,
                newPasswordUrl().replace(/\?/, "")
              )
            }
          });

        return (
          <ResetPasswordPage
            disabled={requestPasswordResetOpts.loading}
            error={error}
            onSubmit={handleSubmit}
          />
        );
      }}
    </RequestPasswordResetMutation>
  );
};
ResetPasswordView.displayName = "ResetPasswordView";
export default ResetPasswordView;
