import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment-timezone";
import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import CardMenu from "@saleor/components/CardMenu";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import { Container } from "@saleor/components/Container";
// import { DateTime } from "@saleor/components/Date";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import Skeleton from "@saleor/components/Skeleton";
import { sectionNames } from "@saleor/intl";
import { FetchMoreProps, UserPermissionProps } from "@saleor/types";
import { SearchCustomers_search_edges_node } from "../../../containers/SearchCustomers/types/SearchCustomers";
import { maybe } from "../../../misc";
import { DraftOrderInput } from "../../../types/globalTypes";
import { OrderDetails_order } from "../../types/OrderDetails";
import OrderCustomer from "../OrderCustomer";
import OrderDraftDetails from "../OrderDraftDetails/OrderDraftDetails";
import { FormData as OrderDraftDetailsProductsFormData } from "../OrderDraftDetailsProducts";
import OrderHistory, { FormData as HistoryFormData } from "../OrderHistory";

import { TypedStaffffListQuery,TypedStaffMemberDetailsQuery } from "../../../riders/queries";

const styles = (theme: Theme) =>
  createStyles({
    date: {
      marginBottom: theme.spacing.unit * 3,
      // marginLeft: theme.spacing.unit * 7
    },
    header: {
      marginBottom: 0
    }
  });

export interface OrderDraftPageProps
  extends FetchMoreProps,
    UserPermissionProps {
  disabled: boolean;
  order: OrderDetails_order;
  users: SearchCustomers_search_edges_node[];
  usersLoading: boolean;
  countries: Array<{
    code: string;
    label: string;
  }>;
  saveButtonBarState: ConfirmButtonTransitionState;
  fetchUsers: (query: string) => void;
  onBack: () => void;
  onBillingAddressEdit: () => void;
  onCustomerEdit: (data: DraftOrderInput) => void;
  onDraftFinalize: () => void;
  onDraftRemove: () => void;
  onNoteAdd: (data: HistoryFormData) => void;
  onAssignOrder: (data: HistoryFormData) => void;
  onOrderLineAdd: () => void;
  onOrderLineChange: (
    id: string,
    data: OrderDraftDetailsProductsFormData
  ) => void;
  onOrderLineRemove: (id: string) => void;
  onProductClick: (id: string) => void;
  onShippingAddressEdit: () => void;
  onShippingMethodEdit: () => void;
  onProfileView: () => void;
}

const OrderDraftPage = withStyles(styles, { name: "OrderDraftPage" })(
  ({
    classes,
    disabled,
    fetchUsers,
    hasMore,
    saveButtonBarState,
    onBack,
    onBillingAddressEdit,
    onCustomerEdit,
    onDraftFinalize,
    onDraftRemove,
    onFetchMore,
    onNoteAdd,
    onAssignOrder,
    onOrderLineAdd,
    onOrderLineChange,
    onOrderLineRemove,
    onShippingAddressEdit,
    onShippingMethodEdit,
    onProfileView,
    order,
    users,
    usersLoading,
    userPermissions
  }: OrderDraftPageProps & WithStyles<typeof styles>) => {
    const intl = useIntl();
    const id = window.localStorage.getItem("subshop");
    return (
      <Container>
        <AppHeader onBack={onBack}>
          {intl.formatMessage(sectionNames.draftOrders)}
        </AppHeader>
        <PageHeader
          className={classes.header}
          title={maybe(() => order.number) ? "#" + order.number : undefined}
        >
          <CardMenu
            menuItems={[
              {
                label: intl.formatMessage({
                  defaultMessage: "Cancel order",
                  description: "button"
                }),
                onSelect: onDraftRemove
              }
            ]}
          />
        </PageHeader>
        <div className={classes.date}>
          {order && order.created ? (
            <Typography variant="caption">
              {moment.utc(order.created,"YYYY-MM-DD hh:mm:ss A").local().format("YYYY-MM-DD hh:mm:ss A")}
              {/* <DateTime date={order.created} /> */}
            </Typography>
          ) : (
            <Skeleton style={{ width: "10em" }} />
          )}
        </div>
        <Grid>
          <div>
            <OrderDraftDetails
              order={order}
              onOrderLineAdd={onOrderLineAdd}
              onOrderLineChange={onOrderLineChange}
              onOrderLineRemove={onOrderLineRemove}
              onShippingMethodEdit={onShippingMethodEdit}
            />
            <OrderHistory
              history={maybe(() => order.events)}
              onNoteAdd={onNoteAdd}
            />
          </div>
          <div>
          {window.localStorage.getItem("subshop") === "null" ? 
          <TypedStaffMemberDetailsQuery>
            {({ data }) => {
                return (
                <Form initial={{ message: order && order.id }} onSubmit={onAssignOrder} resetOnSubmit>
                  {({ submit }) => (
                    <OrderCustomer
                      canEditAddresses={true}
                      canEditCustomer={true}
                      fetchUsers={fetchUsers}
                      hasMore={hasMore}
                      loading={usersLoading}
                      order={order}
                      users={users}
                      riders={maybe(() =>
                        data.riders.map(edge => edge)
                      )}
                      onSubmit={submit}
                      userPermissions={userPermissions}
                      onBillingAddressEdit={onBillingAddressEdit}
                      onCustomerEdit={onCustomerEdit}
                      onFetchMore={onFetchMore}
                      onProfileView={onProfileView}
                      onShippingAddressEdit={onShippingAddressEdit}
                    />
                    )}
                </Form>
              );
            }}
          </TypedStaffMemberDetailsQuery>
          :
            <TypedStaffffListQuery variables={{ id }}>
              {({ data }) => {
              return (
                <Form initial={{ message: order && order.id }} onSubmit={onAssignOrder} resetOnSubmit>
                  {({ submit }) => (
                    <OrderCustomer
                      canEditAddresses={true}
                      canEditCustomer={true}
                      fetchUsers={fetchUsers}
                      hasMore={hasMore}
                      loading={usersLoading}
                      order={order}
                      users={users}
                      riders={maybe(() =>
                        data.subshop.riders.edges.map(edge => edge)
                      )}
                      onSubmit={submit}
                      userPermissions={userPermissions}
                      onBillingAddressEdit={onBillingAddressEdit}
                      onCustomerEdit={onCustomerEdit}
                      onFetchMore={onFetchMore}
                      onProfileView={onProfileView}
                      onShippingAddressEdit={onShippingAddressEdit}
                    />
                    )}
                </Form>
              );
              }}
            </TypedStaffffListQuery>
            }
          </div>
        </Grid>
        <SaveButtonBar
          state={saveButtonBarState}
          disabled={disabled || !maybe(() => order.canFinalize)}
          onCancel={onBack}
          onSave={onDraftFinalize}
          labels={{
            save: intl.formatMessage({
              defaultMessage: "Finalize",
              description: "button"
            })
          }}
        />
      </Container>
    );
  }
);
OrderDraftPage.displayName = "OrderDraftPage";
export default OrderDraftPage;
