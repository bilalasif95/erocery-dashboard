import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { FormattedMessage } from "react-intl";

import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@saleor/components/ConfirmButton";
import Form from "@saleor/components/Form";
import FormSpacer from "@saleor/components/FormSpacer";
import { buttonMessages } from "@saleor/intl";
import { UserError } from "../../types";

export interface FormData {
  email: string;
  firstName: string;
  fullAccess: boolean;
  lastName: string;
}

const initialForm: FormData = {
  email: "",
  firstName: "",
  fullAccess: false,
  lastName: ""
};

const styles = (theme: Theme) =>
  createStyles({
    buttonsCenter: {
      justifyContent: "center"
    },
    form: {
      width: "48.6%",
    },
    formControl: {
      border: "1px solid #BDBDBD",
      borderRadius: "4px",
      margin: "0px !important"
    },
    hr: {
      backgroundColor: "#eaeaea",
      border: "none",
      height: 1,
      marginBottom: 0
    },
    sectionTitle: {
      fontWeight: 600 as 600,
      marginBottom: theme.spacing.unit,
      marginTop: theme.spacing.unit * 2
    },
    textFieldGrid: {
      display: "grid",
      gridColumnGap: `${theme.spacing.unit * 2}px`,
      gridTemplateColumns: "1fr 1fr"
    }
  });

interface StaffAddMemberDialogProps extends WithStyles<typeof styles> {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: UserError[];
  open: boolean;
  onClose: () => void;
  onConfirm: (data: FormData) => void;
}

const StaffAddMemberDialog = withStyles(styles, {
  name: "StaffAddMemberDialog"
})(
  ({
    classes,
    confirmButtonState,
    errors,
    open,
    onClose,
    onConfirm
  }: StaffAddMemberDialogProps) => {

    return (
      <Dialog onClose={onClose} open={open}>
        <Form errors={errors} initial={initialForm} onSubmit={onConfirm}>
          {({ change, data, errors: formErrors }) => (
            <>
              <DialogTitle>
                <FormattedMessage
                  defaultMessage="Add Rider"
                  description="dialog header"
                />
              </DialogTitle>
              <DialogContent>
                <div className={classes.textFieldGrid}>
                  <TextField
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                    label="Name"
                    name="firstName"
                    type="text"
                    value={data.firstName}
                    onChange={change}
                  />
                  <TextField
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                    label="Rider ID"
                    name="lastName"
                    type="number"
                    value={data.lastName}
                    onChange={change}
                  />
                </div>
                <FormSpacer />
                <div className={classes.textFieldGrid}>
                  <TextField
                    error={!!formErrors.email}
                    fullWidth
                    helperText={formErrors.email}
                    label="Phone Number"
                    name="email"
                    type="number"
                    value={data.email}
                    onChange={change}
                  />
                  <TextField
                    error={!!formErrors.email}
                    fullWidth
                    helperText={formErrors.email}
                    label="CNIC"
                    name="email"
                    type="number"
                    value={data.email}
                    onChange={change}
                  />
                </div>
                <FormSpacer />
                <FormControl variant="outlined" className={classes.form}>
                  <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
                  <Select
                    native
                    value={data.email}
                    onChange={change}
                    inputProps={{
                      id: 'outlined-age-native-simple',
                      name: 'email'
                    }}
                    className={classes.formControl}
                  >
                    <option aria-label="None" value="" />
                    <option value={10}>Sargodha</option>
                    <option value={20}>Rawalpindi/Islamabad</option>
                    <option value={30}>Lahore</option>
                    <option value={30}>Karachi</option>
                    <option value={30}>Faisalabad</option>
                    <option value={30}>Peshawar</option>
                    <option value={30}>Multan</option>
                  </Select>
                </FormControl>
                <FormSpacer />
              </DialogContent>
              <hr className={classes.hr} />
              <DialogActions className={classes.buttonsCenter}>
                <Button onClick={onClose}>
                  <FormattedMessage {...buttonMessages.back} />
                </Button>
                <ConfirmButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  transitionState={confirmButtonState}
                >
                  <FormattedMessage
                    defaultMessage="Save"
                    description="button"
                  />
                </ConfirmButton>
              </DialogActions>
            </>
          )}
        </Form>
      </Dialog>
    );
  }
);
StaffAddMemberDialog.displayName = "StaffAddMemberDialog";
export default StaffAddMemberDialog;
