import Card from "@material-ui/core/Card";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import React from "react";
import { FormattedMessage } from "react-intl";

import RequirePermissions from "@saleor/components/RequirePermissions";
import Skeleton from "@saleor/components/Skeleton";
import { UserPermissionProps } from "@saleor/types";
import { PermissionEnum } from "@saleor/types/globalTypes";

const styles = (theme: Theme) =>
  createStyles({
    arrowIcon: {
      textAlign: "right",
      width: theme.spacing.unit * 4
    },
    tableRow: {
      cursor: "pointer"
    }
  });

interface HomeNotificationTableProps extends UserPermissionProps {
  ordersToCapture: number;
  ordersToFulfill: number;
  productsOutOfStock: number;
  onOrdersToFulfillClick: () => void;
  onOrdersToCaptureClick: () => void;
  onProductsOutOfStockClick: () => void;
}

const HomeNotificationTable = withStyles(styles, {
  name: "HomeNotificationTable"
})(
  ({
    classes,
    onOrdersToCaptureClick,
    onOrdersToFulfillClick,
    onProductsOutOfStockClick,
    ordersToCapture,
    ordersToFulfill,
    productsOutOfStock,
    userPermissions
  }: HomeNotificationTableProps & WithStyles<typeof styles>) => (
    <Card>
      <Table>
        <TableBody className={classes.tableRow}>
          <RequirePermissions
            userPermissions={userPermissions}
            requiredPermissions={[PermissionEnum.MANAGE_ORDERS]}
          >
            <TableRow hover={true} onClick={onOrdersToFulfillClick}>
              <TableCell>
                {ordersToFulfill === undefined ? (
                  <Skeleton />
                ) : ordersToFulfill === 0 ? (
                  <Typography>
                    <FormattedMessage
                      defaultMessage="No orders ready to fulfill"
                      id="homeNotificationTableNoOrders"
                    />
                  </Typography>
                ) : (
                  <Typography>
                    <FormattedMessage
                      defaultMessage="{amount, plural,
                  one {One order}
                  other {{amount} Orders}
                } are ready to fulfill"
                      id="homeNotificationTableOrders"
                      values={{
                        amount: <strong>{ordersToFulfill}</strong>
                      }}
                    />
                  </Typography>
                )}
              </TableCell>
              <TableCell className={classes.arrowIcon}>
                <KeyboardArrowRight />
              </TableCell>
            </TableRow>
            <TableRow hover={true} onClick={onOrdersToCaptureClick}>
              <TableCell>
                {ordersToCapture === undefined ? (
                  <Skeleton />
                ) : ordersToCapture === 0 ? (
                  <Typography>
                    <FormattedMessage
                      defaultMessage="No payments waiting for capture"
                      id="homeNotificationsNoPayments"
                    />
                  </Typography>
                ) : (
                  <Typography>
                    <FormattedMessage
                      defaultMessage="{amount, plural,
                  one {One payment}
                  other {{amount} Payments}
                } to capture"
                      id="homeNotificationTablePayments"
                      values={{
                        amount: <strong>{ordersToCapture}</strong>
                      }}
                    />
                  </Typography>
                )}
              </TableCell>
              <TableCell className={classes.arrowIcon}>
                <KeyboardArrowRight />
              </TableCell>
            </TableRow>
          </RequirePermissions>
          <RequirePermissions
            userPermissions={userPermissions}
            requiredPermissions={[PermissionEnum.MANAGE_PRODUCTS]}
          >
            <TableRow hover={true} onClick={onProductsOutOfStockClick}>
              <TableCell>
                {productsOutOfStock === undefined ? (
                  <Skeleton />
                ) : productsOutOfStock === 0 ? (
                  <Typography>
                    <FormattedMessage
                      defaultMessage="No products out of stock"
                      id="homeNotificationsTableNoProducts"
                    />
                  </Typography>
                ) : (
                  <Typography>
                    <FormattedMessage
                      defaultMessage="{amount, plural,
                  one {One product}
                  other {{amount} Products}
                } out of stock"
                      id="homeNotificationTableProducts"
                      values={{
                        amount: <strong>{productsOutOfStock}</strong>
                      }}
                    />
                  </Typography>
                )}
              </TableCell>
              <TableCell className={classes.arrowIcon}>
                <KeyboardArrowRight />
              </TableCell>
            </TableRow>
          </RequirePermissions>
        </TableBody>
      </Table>
    </Card>
  )
);
HomeNotificationTable.displayName = "HomeNotificationTable";
export default HomeNotificationTable;
