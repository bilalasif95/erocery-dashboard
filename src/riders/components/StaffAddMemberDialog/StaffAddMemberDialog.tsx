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
// import Typography from "@material-ui/core/Typography";
import React from "react";
import { FormattedMessage } from "react-intl";

import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@saleor/components/ConfirmButton";
// import { ControlledCheckbox } from "@saleor/components/ControlledCheckbox";
import Form from "@saleor/components/Form";
import FormSpacer from "@saleor/components/FormSpacer";
import { buttonMessages } from "@saleor/intl";
import { renderCollection } from "@saleor/misc";
import { UserError } from "../../../types";

import { StaffList_staffUsers_edges_node } from "../../types/StaffList";

export interface FormData {
  name: string;
  phone: string;
  city: string;
  password: string;
  cnic: string;
  shop_id: string;
}

const initialForm: FormData = {
  city: "",
  cnic: "",
  name: "",
  password: "",
  phone: "",
  shop_id: ""
};

const styles = (theme: Theme) =>
  createStyles({
    buttonsCenter: {
      justifyContent: "center"
    },
    formControl: {
      border: "1px solid #BDBDBD",
      borderRadius: "4px",
      margin: "-4px 0px 0px 0px !important",
      padding: "0px 0px 2px 0px !important"
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
  staffMembers: StaffList_staffUsers_edges_node[];
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
    staffMembers,
    open,
    onClose,
    onConfirm
  }: StaffAddMemberDialogProps) => {
    // const intl = useIntl();

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
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    label="Name"
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={change}
                  />
                  <TextField
                    error={!!formErrors.cnic}
                    helperText={formErrors.cnic}
                    label="CNIC"
                    name="cnic"
                    type="number"
                    value={data.cnic}
                    onChange={change}
                  />
                </div>
                <FormSpacer />
                <div className={classes.textFieldGrid}>
                  <TextField
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
                    label="Phone Number"
                    name="phone"
                    type="number"
                    value={data.phone}
                    onChange={change}
                  />
                  <TextField
                    error={!!formErrors.password}
                    fullWidth
                    helperText={formErrors.password}
                    label="Password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={change}
                  />
                </div>
                <FormSpacer />
                <div className={classes.textFieldGrid}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
                    <Select
                      native
                      value={data.city}
                      onChange={change}
                      inputProps={{
                        id: 'outlined-age-native-simple',
                        name: 'city'
                      }}
                      className={classes.formControl}
                    >
                      <option aria-label="None" value="" />
                      <option value="Sargodha">Sargodha</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Multan">Multan</option>
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">Shop</InputLabel>
                    <Select
                      native
                      value={data.shop_id}
                      onChange={change}
                      inputProps={{
                        id: 'outlined-age-native-simple',
                        name: 'shop_id'
                      }}
                      className={classes.formControl}
                    >
                      <option aria-label="None" value="" />
                    {renderCollection(staffMembers,val => (
                      <option value={val && val.id}>{val && val.name}</option>
                    ))}
                    </Select>
                  </FormControl>
                </div>
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
                  disabled={!data.name || !data.city || !data.password || !data.phone || !data.cnic || !data.shop_id}
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
