import React from "react";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";

import { TypedStaffMemberDetailsQuery } from "../queries";
import { StaffMemberDetailsUrlQueryParams } from "../urls";
import Container from "@saleor/components/Container";
// import PageHeader from "@saleor/components/PageHeader";
import { orderUrl } from "../../orders/urls";
// import { sectionNames } from "@saleor/intl";
import useNavigator from "@saleor/hooks/useNavigator";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

interface OrderListProps {
  id: string;
  params: StaffMemberDetailsUrlQueryParams;
}

export const StaffDetails: React.StatelessComponent<OrderListProps> = ({
  id,
}) => {
  const navigate = useNavigator();
  // const intl = useIntl();
  return (
    <TypedStaffMemberDetailsQuery displayLoader variables={{ id }}>
      {({ data, loading }) => {
        if (loading) {
          return <h1>loading...</h1>;
        }
        const riderInfo = data.riders.filter((item) => {
          return item.id === id;
        });

        const orderInfo = riderInfo[0].orders.edges.map((info) => (
          <TableRow>
            {/* <TableCell></TableCell> */}
            <TableCell>{riderInfo[0].name}</TableCell>
            <TableCell>{riderInfo[0].id}</TableCell>
            <TableCell>{info.node.id}</TableCell>
            <TableCell>{info.node.totalBalance.currency}.{info.node.totalBalance.amount}</TableCell>
            <TableCell>{info.node.created}</TableCell>
            <TableCell>
              <span>{info.node.status}</span>
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
          <Container>
            {/* <PageHeader title={intl.formatMessage(sectionNames.orders)}>
            </PageHeader> */}
            <Card>
              <Table>
                <TableHead>
                  <TableCell>Rider Name</TableCell>
                  <TableCell>Rider ID</TableCell>
                  <TableCell>Order #</TableCell>
                  <TableCell>Order Total</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableHead>
                <TableBody>{orderInfo}</TableBody>
              </Table>
            </Card>
          </Container>
        );
      }}
    </TypedStaffMemberDetailsQuery>
  );
};

export default StaffDetails;
