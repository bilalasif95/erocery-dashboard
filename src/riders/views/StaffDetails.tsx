import Card from "@material-ui/core/Card";
import React from "react";

import { Link } from "react-router-dom";

import { FormattedMessage,useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import { Container } from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";

import { sectionNames } from "@saleor/intl";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";

import { TypedStaffMemberDetailsQuery } from "../queries";
import { StaffMemberDetailsUrlQueryParams } from "../urls";

import { orderUrl } from "../../orders/urls";

import useNavigator from "@saleor/hooks/useNavigator";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      alignItems: "center",
      borderRadius: "100%",
      display: "grid",
      float: "left",
      height: 47,
      justifyContent: "center",
      marginRight: theme.spacing.unit * 1 + "px",
      overflow: "hidden",
      width: 47,
    },
    avatarDefault: {
      "& p": {
        color: "#fff",
        lineHeight: "47px",
      },
      background: theme.palette.primary.main,
      height: 47,
      textAlign: "center",
      width: 47,
    },
    avatarImage: {
      pointerEvents: "none",
      width: "100%",
    },
    btnPending: {
      backgroundColor: "#fff",
      border: "1px solid #fbbd2f",
      borderRadius: "25%",
      color: "#fbbd2f",
      padding: "0.5rem 0.7rem",
      textTransform: "capitalize",
    },
    card: {
      "&:hover": {
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15);",
      },
      cursor: "pointer",
      margin: "0 0.5rem 1rem 0.5rem",
      transition: theme.transitions.duration.standard + "ms",
      [theme.breakpoints.down("xs")]: {
        margin: "0 0 1rem",
        width: "100%",
      },
      width: "100%",
    },
    cardContent: {
      // Overrides Material-UI default theme
      "&:last-child": {
        paddingBottom: 16,
      },
      alignItems: "center",
      display: "flex",
      gridColumnGap: theme.spacing.unit * 4 + "px",
      gridTemplateColumns: "230px 1fr",
      [theme.breakpoints.down("xs")]: {
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
      },
      justifyContent: "space-between",
    },
    cityDesc: {
      padding: "0 0.5rem",
      [theme.breakpoints.down("xs")]: {
        margin: "0 0 1rem",
        width: "100%",
      },
      width: "80%",
    },
    colItem: {
      display: "flex",
    },
    configurationCategory: {
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
      borderTop: `solid 1px ${theme.palette.divider}`,
      // display: "flex",
      gridColumnGap: theme.spacing.unit * 4 + "px",
      gridTemplateColumns: "1fr 3fr",
      paddingTop: theme.spacing.unit * 3 + "px",
    },
    orderCount: {
      display: "flex",
      justifyContent: "flex-end",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
        width: "100%",
      },
      width: "20%",
    },
    orders: {
      background: theme.palette.primary.main,
      borderRadius: "50px",
      color: "white",
      fontFamily: "Inter,roboto, sans-serif",
      fontSize: 20,
      margin: "0",
      padding: "0.5rem",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 600 as 600,
    },
    statusText: {
      color: "#9E9D9D",
    },
    tableContainer: {
      display: "block",
      overflowX: "scroll",
      width: "100%",
    },
    tableRow: {
      cursor: "pointer",
    },
    tabsHeader: {
      background: "white",
      border: "1px solid #EAEAEA",
      borderRadius: "5px 5px 0 0",
      boxShadow: "none",
      color: "black",
    },
    wideColumn: {
      width: "80%",
    },
  });
  
interface OrderListProps extends WithStyles<typeof styles> {
  id: string;
  params: StaffMemberDetailsUrlQueryParams;
  riderInfo: any;
}

const StaffDetails = withStyles(styles, { name: "StaffList" })(
({
  classes,
  id,
  riderInfo
}: OrderListProps) => {
  const navigate = useNavigator();
  const intl = useIntl();
  const onBack = () => {
    navigate("/riderlist")
  }
  return (
    <Container>
      <AppHeader onBack={onBack}>
        <FormattedMessage {...sectionNames.rider} />
      </AppHeader>
      <PageHeader title={intl.formatMessage(sectionNames.ordersList)}></PageHeader>
      <TypedStaffMemberDetailsQuery displayLoader variables={{ id }}>
        {({ data }) => {
          // if (loading) {
          //   return <h1>Loading...</h1>;
          // }
          riderInfo = data.riders.filter((item: any) => {
            return item.id === id;
          });

          const orderInfo = riderInfo[0].orders.edges.map((info) => (
            <TableRow>
              {/* <TableCell></TableCell> */}
              <TableCell padding="dense">{riderInfo[0].name}</TableCell>
              <TableCell padding="dense">{riderInfo[0].id}</TableCell>
              <TableCell padding="dense">{info.node.id}</TableCell>
              <TableCell padding="dense">{info.node.totalBalance.currency}.{info.node.totalBalance.amount}</TableCell>
              <TableCell padding="dense">{info.node.created}</TableCell>
              <TableCell padding="dense">
                <button className={classes.btnPending}>{info.node.status}</button>
              </TableCell>
              <TableCell
                padding="dense"
                onClick={() => navigate(orderUrl(info.node.id))}
              >
                <Link to="">View Full Order</Link>
              </TableCell>
            </TableRow>
          ));
          return (
            <>
            <Card>
            <div className={classes.tableContainer}>
              <Table>
                <TableHead>
                  <TableCell padding="dense">Rider Name</TableCell>
                  <TableCell padding="dense">Rider ID</TableCell>
                  <TableCell padding="dense">Order #</TableCell>
                  <TableCell padding="dense">Order Total</TableCell>
                  <TableCell padding="dense">Date</TableCell>
                  <TableCell padding="dense">Status</TableCell>
                  <TableCell padding="dense">Action</TableCell>
                </TableHead>
                <TableBody>{orderInfo.length === 0 ? <TableRow>No Data</TableRow> : orderInfo}</TableBody>
              </Table>
              </div>
              </Card>
            </>
          );
        }}
      </TypedStaffMemberDetailsQuery>
    </Container>
  );
}
);
export default StaffDetails;
