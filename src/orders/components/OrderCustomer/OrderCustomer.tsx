import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment-timezone";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
// import { DateTime } from "@saleor/components/Date";
import ExternalLink from "@saleor/components/ExternalLink";
import Form from "@saleor/components/Form";
import Hr from "@saleor/components/Hr";
import Link from "@saleor/components/Link";
import Money from "@saleor/components/Money";
import RequirePermissions from "@saleor/components/RequirePermissions";
import SingleAutocompleteSelectField from "@saleor/components/SingleAutocompleteSelectField";
import Skeleton from "@saleor/components/Skeleton";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { buttonMessages } from "@saleor/intl";
import { FetchMoreProps, UserPermissionProps } from "@saleor/types";
import { PermissionEnum } from "@saleor/types/globalTypes";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import { SearchCustomers_search_edges_node } from "../../../containers/SearchCustomers/types/SearchCustomers";
import { customerUrl } from "../../../customers/urls";
import { createHref, maybe,renderCollection } from "../../../misc";
import { OrderDetails_order } from "../../types/OrderDetails";

import { StaffList_staffUsers_edges_node } from "../../../riders/types/StaffList";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      display: "block",
    },
    popover: {
      minWidth: "150px",
      right: "25px",
      zIndex: 1
    },
    root: {
      ...theme.typography.body2,
      lineHeight: 1.9,
      width: "100%"
    },
    sectionHeader: {
      alignItems: "center",
      display: "flex",
      marginBottom: theme.spacing.unit * 3
    },
    sectionHeaderTitle: {
      flex: 1,
      fontWeight: 600 as 600,
      lineHeight: 1,
      textTransform: "uppercase"
    },
    sectionHeaderToolbar: {
      marginRight: -theme.spacing.unit * 2
    },
    textRight: {
      textAlign: "right"
    },
    userEmail: {
      fontWeight: 600 as 600,
      marginBottom: theme.spacing.unit
    },
    userMenuItem: {
      textAlign: "right"
    },
  });

export interface OrderCustomerProps
  extends Partial<FetchMoreProps>,
    UserPermissionProps {
  order: OrderDetails_order;
  riders: StaffList_staffUsers_edges_node[];
  users?: SearchCustomers_search_edges_node[];
  loading?: boolean;
  canEditAddresses: boolean;
  canEditCustomer: boolean;
  fetchUsers?: (query: string) => void;
  onCustomerEdit?: (data: { user?: string; userEmail?: string }) => void;
  onProfileView: () => void;
  onBillingAddressEdit?: () => void;
  onShippingAddressEdit?: () => void;
  onSubmit(event: React.FormEvent<any>);
}

const OrderCustomer = withStyles(styles, { name: "OrderCustomer" })(
  ({
    classes,
    canEditAddresses,
    canEditCustomer,
    fetchUsers,
    hasMore: hasMoreUsers,
    loading,
    order,
    users,
    riders,
    userPermissions,
    onSubmit,
    onCustomerEdit,
    onBillingAddressEdit,
    onFetchMore: onFetchMoreUsers,
    onProfileView,
    onShippingAddressEdit
  }: OrderCustomerProps & WithStyles<typeof styles>) => {
    const intl = useIntl();
    const anchor = React.useRef<HTMLDivElement>();
    const user = maybe(() => order.user);
    const userEmail = maybe(()=>order.userEmail)

    const [userDisplayName, setUserDisplayName] = useStateFromProps(
      maybe(() => user.phone, "")
    );
    const [isInEditMode, setEditModeStatus] = React.useState(false);
    const [rider, setRider] = React.useState(order && order.rider === null || order === undefined ? "Not Assigned Yet" : order && order.rider.name);
    const [id, setRiderID] = React.useState();
    const toggleEditMode = () => setEditModeStatus(!isInEditMode);
    const [isMenuOpened, setMenuState] = React.useState(false);
    const billingAddress = maybe(() => order.billingAddress);
    const shippingAddress = maybe(() => order.shippingAddress);
    const submit = e => {
      // reset();
      onSubmit(e);
    };
    return (
      <>
      <Card>
        <CardTitle
          title={intl.formatMessage({
            defaultMessage: "Order Assigned To",
            description: "section header"
          })}
          toolbar={
            <>
            <IconButton onClick={() => setMenuState(!isMenuOpened)}>
            {order && order.rider === null ?
              <AddIcon color="primary" />
              : <EditIcon color="primary" /> }
            </IconButton>
            <Popper
            className={classes.popover}
            open={isMenuOpened}
            anchorEl={anchor.current}
            transition
            disablePortal
            placement="bottom-end"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom"
                      ? "right top"
                      : "right bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener
                    onClickAway={() =>
                      setMenuState(false)
                    }
                    mouseEvent="onClick"
                  >
                    <Menu className={classes.grid}>
                    {window.localStorage.getItem("subshop") === "null" ? 
                    renderCollection(
                      riders,
                      rid =>
                      <MenuItem
                        className={classes.userMenuItem}
                        onClick={()=> {
                          setRider(rid && rid.name)
                          setRiderID(rid && rid.id)
                          order.lines.push(rid && rid.id)
                          setMenuState(false)
                        }}
                      >
                        {rid && rid.name}
                      </MenuItem>
                    )
                    : renderCollection(
                      riders,
                      rid =>
                      <MenuItem
                        className={classes.userMenuItem}
                        onClick={()=> {
                          setRider(rid && rid.node.name)
                          setRiderID(rid && rid.node.id)
                          order.lines.push(rid && rid.node.id)
                          setMenuState(false)
                        }}
                      >
                        {rid && rid.node.name}
                      </MenuItem>
                    )}
                    </Menu>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          </>
          }
        />
        <CardContent>
          <table className={classes.root}>
            <tbody>
              <tr>
                <td>
                  <FormattedMessage
                    defaultMessage="Order #"
                    description="order subtotal price"
                  />
                </td>
                <td className={classes.textRight}>
                  {order && order.number}
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage
                    defaultMessage="Assigned To:"
                    description="order subtotal price"
                  />
                </td>
                <td className={classes.textRight}>
                  {rider}
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage
                    defaultMessage="Time:"
                    description="order subtotal price"
                  />
                </td>
                <td className={classes.textRight}>
                  {order && moment.utc(order.created,"YYYY-MM-DD hh:mm:ss A").local().format("YYYY-MM-DD hh:mm:ss A")}
                  {/* <DateTime date={order && order.created}/> */}
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage
                    defaultMessage="Amount:"
                    description="order subtotal price"
                  />
                </td>
                <td className={classes.textRight}>
                  {maybe(() => order.total.gross) === undefined ? (
                    <Skeleton />
                  ) : (
                    <Money money={order.total.gross} />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          {order && order.rider === null ?
          <Button
            color="primary"
            variant="contained"
            disabled={rider === "Not Assigned Yet"}
            onClick={e => submit(e)}
          >
            Assign Order
          </Button>
          :  
          <Button
            color="primary"
            variant="contained"
            disabled={order && order.lines[order.lines.length-1] !== id}
            onClick={e => submit(e)}
          >
            Update
          </Button>
          }
        </CardContent>
      </Card>
      <Card>
        <CardTitle
          title={intl.formatMessage({
            defaultMessage: "Customer",
            description: "section header"
          })}
          toolbar={
            !!canEditCustomer && (
              <RequirePermissions
                userPermissions={userPermissions}
                requiredPermissions={[PermissionEnum.MANAGE_USERS]}
              >
                <Button
                  color="primary"
                  variant="text"
                  disabled={!onCustomerEdit}
                  onClick={toggleEditMode}
                >
                  {intl.formatMessage(buttonMessages.edit)}
                </Button>
              </RequirePermissions>
            )
          }
        />
        <CardContent>
          {user === undefined ? (
            <Skeleton />
          ) : isInEditMode && canEditCustomer ? (
            <Form initial={{ query: "" }}>
              {({ change, data }) => {
                const handleChange = (event: React.ChangeEvent<any>) => {
                  change(event);
                  const value = event.target.value;

                  onCustomerEdit({
                    [value.includes("@") ? "userEmail" : "user"]: value
                  });
                  toggleEditMode();
                };
                const userChoices = maybe(() => users, []).map(user => ({
                  label: user.phone,
                  value: user.id
                }));
                const handleUserChange = createSingleAutocompleteSelectHandler(
                  handleChange,
                  setUserDisplayName,
                  userChoices
                );
                return (
                  <SingleAutocompleteSelectField
                    allowCustomValues={true}
                    choices={userChoices}
                    displayValue={userDisplayName}
                    fetchChoices={fetchUsers}
                    hasMore={hasMoreUsers}
                    loading={loading}
                    placeholder={intl.formatMessage({
                      defaultMessage: "Search Customers"
                    })}
                    onChange={handleUserChange}
                    onFetchMore={onFetchMoreUsers}
                    name="query"
                    value={data.query}
                  />
                );
              }}
            </Form>
          ) : user === null ? (
            userEmail === null ? (
              <Typography>
                <FormattedMessage defaultMessage="Anonymous user" />
              </Typography>
            ) : (
              <Typography className={classes.userEmail}>{userEmail}</Typography>
            )
          ) : (
            <>
              <Typography className={classes.userEmail}>
                {user.phone}
              </Typography>
              <RequirePermissions
                userPermissions={userPermissions}
                requiredPermissions={[PermissionEnum.MANAGE_USERS]}
              >
                <div>
                  <Link
                    underline={false}
                    href={createHref(customerUrl(user.id))}
                    onClick={onProfileView}
                  >
                    <FormattedMessage
                      defaultMessage="View Profile"
                      description="link"
                    />
                  </Link>
                </div>
              </RequirePermissions>
              {/* TODO: Uncomment it after adding ability to filter
                    orders by customer */}
              {/* <div>
                <Link underline={false} href={}>
                  <FormattedMessage defaultMessage="View Orders"
                    description="link"
                     />
                </Link>
              </div> */}
            </>
          )}
        </CardContent>
        {!!user && (
          <>
            <Hr />
            <CardContent>
              <div className={classes.sectionHeader}>
                <Typography className={classes.sectionHeaderTitle}>
                  <FormattedMessage
                    defaultMessage="Contact Information"
                    description="subheader"
                  />
                </Typography>
              </div>

              {maybe(() => order.userEmail) === undefined ? (
                <Skeleton />
              ) : order.userEmail === null ? (
                <Typography>
                  <FormattedMessage
                    defaultMessage="Not set"
                    description="customer is not set in draft order"
                    id="orderCustomerCustomerNotSet"
                  />
                </Typography>
              ) : (
                <ExternalLink
                  href={`mailto:${maybe(() => order.userEmail)}`}
                  typographyProps={{ color: "primary" }}
                >
                  {maybe(() => order.userEmail)}
                </ExternalLink>
              )}
            </CardContent>
          </>
        )}
        <Hr />
        <CardContent>
          <div className={classes.sectionHeader}>
            <Typography className={classes.sectionHeaderTitle}>
              <FormattedMessage defaultMessage="Shipping Address" />
            </Typography>
            {canEditAddresses && (
              <div className={classes.sectionHeaderToolbar}>
                <Button
                  color="primary"
                  variant="text"
                  onClick={onShippingAddressEdit}
                  disabled={!onShippingAddressEdit && user === undefined}
                >
                  <FormattedMessage {...buttonMessages.edit} />
                </Button>
              </div>
            )}
          </div>
          {shippingAddress === undefined ? (
            <Skeleton />
          ) : shippingAddress === null ? (
            <Typography>
              <FormattedMessage
                defaultMessage="Not set"
                description="shipping address is not set in draft order"
                id="orderCustomerShippingAddressNotSet"
              />
            </Typography>
          ) : (
            <>
              {shippingAddress.companyName && (
                <Typography>{shippingAddress.companyName}</Typography>
              )}
              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.streetAddress1}
                <br />
                {shippingAddress.streetAddress2}
              </Typography>
              <Typography>
                {shippingAddress.postalCode} {shippingAddress.city}
                {shippingAddress.cityArea
                  ? ", " + shippingAddress.cityArea
                  : ""}
              </Typography>
              <Typography>
                {shippingAddress.countryArea
                  ? shippingAddress.countryArea +
                    ", " +
                    shippingAddress.country.country
                  : shippingAddress.country.country}
              </Typography>
              <Typography>{shippingAddress.phone}</Typography>
            </>
          )}
        </CardContent>
        <Hr />
        <CardContent>
          <div className={classes.sectionHeader}>
            <Typography className={classes.sectionHeaderTitle}>
              <FormattedMessage defaultMessage="Billing Address" />
            </Typography>
            {canEditAddresses && (
              <div className={classes.sectionHeaderToolbar}>
                <Button
                  color="primary"
                  variant="text"
                  onClick={onBillingAddressEdit}
                  disabled={!onBillingAddressEdit && user === undefined}
                >
                  <FormattedMessage {...buttonMessages.edit} />
                </Button>
              </div>
            )}
          </div>
          {billingAddress === undefined ? (
            <Skeleton />
          ) : billingAddress === null ? (
            <Typography>
              <FormattedMessage
                defaultMessage="Not set"
                description="no address is set in draft order"
                id="orderCustomerBillingAddressNotSet"
              />
            </Typography>
          ) : maybe(() => shippingAddress.id) === billingAddress.id ? (
            <Typography>
              <FormattedMessage
                defaultMessage="Same as shipping address"
                description="billing address"
              />
            </Typography>
          ) : (
            <>
              {billingAddress.companyName && (
                <Typography>{billingAddress.companyName}</Typography>
              )}
              <Typography>
                {billingAddress.firstName} {billingAddress.lastName}
              </Typography>
              <Typography>
                {billingAddress.streetAddress1}
                <br />
                {billingAddress.streetAddress2}
              </Typography>
              <Typography>
                {billingAddress.postalCode} {billingAddress.city}
                {billingAddress.cityArea ? ", " + billingAddress.cityArea : ""}
              </Typography>
              <Typography>
                {billingAddress.countryArea
                  ? billingAddress.countryArea +
                    ", " +
                    billingAddress.country.country
                  : billingAddress.country.country}
              </Typography>
              <Typography>{billingAddress.phone}</Typography>
            </>
          )}
        </CardContent>
      </Card>
      </>
    );
  }
);
OrderCustomer.displayName = "OrderCustomer";
export default OrderCustomer;
