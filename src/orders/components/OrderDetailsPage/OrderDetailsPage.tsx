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
import { CardSpacer } from "@saleor/components/CardSpacer";
import { Container } from "@saleor/components/Container";
// import { DateTime } from "@saleor/components/Date";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import Skeleton from "@saleor/components/Skeleton";
import { sectionNames } from "@saleor/intl";
import { UserPermissionProps } from "@saleor/types";
import { maybe, renderCollection } from "../../../misc";
import { OrderStatus } from "../../../types/globalTypes";
import { OrderDetails_order } from "../../types/OrderDetails";
import OrderCustomer from "../OrderCustomer";
import OrderCustomerNote from "../OrderCustomerNote";
import OrderFulfillment from "../OrderFulfillment";
import OrderHistory, { FormData as HistoryFormData } from "../OrderHistory";
import OrderPayment from "../OrderPayment/OrderPayment";
import OrderUnfulfilledItems from "../OrderUnfulfilledItems/OrderUnfulfilledItems";

import { TypedStaffffListQuery,TypedStaffMemberDetailsQuery } from "../../../riders/queries";

const styles = (theme: Theme) =>
  createStyles({
    date: {
      marginBottom: theme.spacing.unit * 3,
      marginTop: -theme.spacing.unit * 2
    },
    header: {
      marginBottom: 0
    }
  });

export interface OrderDetailsPageProps extends UserPermissionProps {
  order: OrderDetails_order;
  shippingMethods?: Array<{
    id: string;
    name: string;
  }>;
  countries?: Array<{
    code: string;
    label: string;
  }>;
  onBack();
  onBillingAddressEdit();
  onFulfillmentCancel(id: string);
  onFulfillmentTrackingNumberUpdate(id: string);
  onOrderFulfill();
  onProductClick?(id: string);
  onPaymentCapture();
  onPaymentPaid();
  onPaymentRefund();
  onPaymentVoid();
  onShippingAddressEdit();
  onOrderCancel();
  onNoteAdd(data: HistoryFormData);
  onAssignOrder(data: HistoryFormData);
  onProfileView();
}

const OrderDetailsPage = withStyles(styles, { name: "OrderDetailsPage" })(
  ({
    classes,
    order,
    userPermissions,
    onBack,
    onBillingAddressEdit,
    onFulfillmentCancel,
    onFulfillmentTrackingNumberUpdate,
    onNoteAdd,
    onAssignOrder,
    onOrderCancel,
    onOrderFulfill,
    onPaymentCapture,
    onPaymentPaid,
    onPaymentRefund,
    onPaymentVoid,
    onShippingAddressEdit,
    onProfileView
  }: OrderDetailsPageProps & WithStyles<typeof styles>) => {
    const intl = useIntl();

    const canCancel = maybe(() => order.status) !== OrderStatus.CANCELED;
    const canEditAddresses = maybe(() => order.status) !== OrderStatus.CANCELED;
    const canFulfill = maybe(() => order.status) !== OrderStatus.CANCELED;
    const unfulfilled = maybe(() => order.lines, []).filter(
      line => line.quantityFulfilled < line.quantity
    );
    const id = window.localStorage.getItem("subshop");
    return (
      <Container>
        <AppHeader onBack={onBack}>
          {intl.formatMessage(sectionNames.orders)}
        </AppHeader>
        <PageHeader
          className={classes.header}
          title={maybe(() => order.number) ? "#" + order.number : undefined}
        >
          {canCancel && (
            <CardMenu
              menuItems={[
                {
                  label: intl.formatMessage({
                    defaultMessage: "Cancel order",
                    description: "button"
                  }),
                  onSelect: onOrderCancel
                }
              ]}
            />
          )}
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
            {unfulfilled.length > 0 && (
              <OrderUnfulfilledItems
                canFulfill={canFulfill}
                lines={unfulfilled}
                onFulfill={onOrderFulfill}
                deliveryDate={order && order.deliveryDate}
              />
            )}
            {renderCollection(
              maybe(() => order.fulfillments),
              (fulfillment, fulfillmentIndex) => (
                <React.Fragment key={maybe(() => fulfillment.id, "loading")}>
                  {!(unfulfilled.length === 0 && fulfillmentIndex === 0) && (
                    <CardSpacer />
                  )}
                  <OrderFulfillment
                    fulfillment={fulfillment}
                    orderNumber={maybe(() => order.number)}
                    onOrderFulfillmentCancel={() =>
                      onFulfillmentCancel(fulfillment.id)
                    }
                    onTrackingCodeAdd={() =>
                      onFulfillmentTrackingNumberUpdate(fulfillment.id)
                    }
                    deliveryDate={order && order.deliveryDate}
                  />
                </React.Fragment>
              )
            )}
            <CardSpacer />
            <OrderPayment
              order={order}
              onCapture={onPaymentCapture}
              onMarkAsPaid={onPaymentPaid}
              onRefund={onPaymentRefund}
              onVoid={onPaymentVoid}
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
                <Form initial={{ message: order.id }} onSubmit={onAssignOrder} resetOnSubmit>
                  {({ submit }) => (
                    <OrderCustomer
                      canEditAddresses={canEditAddresses}
                      canEditCustomer={false}
                      order={order}
                      riders={maybe(() =>
                        data.riders.map(edge => edge)
                      )}
                      onSubmit={submit}
                      userPermissions={userPermissions}
                      onBillingAddressEdit={onBillingAddressEdit}
                      onShippingAddressEdit={onShippingAddressEdit}
                      onProfileView={onProfileView}
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
                <Form initial={{ message: order.id }} onSubmit={onAssignOrder} resetOnSubmit>
                  {({ submit }) => (
                    <OrderCustomer
                      canEditAddresses={canEditAddresses}
                      canEditCustomer={false}
                      order={order}
                      riders={maybe(() =>
                        data.subshop.riders.edges.map(edge => edge)
                      )}
                      onSubmit={submit}
                      userPermissions={userPermissions}
                      onBillingAddressEdit={onBillingAddressEdit}
                      onShippingAddressEdit={onShippingAddressEdit}
                      onProfileView={onProfileView}
                    />
                    )}
                </Form>
              );
              }}
            </TypedStaffffListQuery>
            }
            <CardSpacer />
            <OrderCustomerNote note={maybe(() => order.customerNote)} />
          </div>
        </Grid>
      </Container>
    );
  }
);
OrderDetailsPage.displayName = "OrderDetailsPage";
export default OrderDetailsPage;
