import React from "react";
import { TypedStaffMemberDetailsQuery } from "../queries";
import { StaffMemberDetailsUrlQueryParams } from "../urls";
import { orderUrl } from "../../orders/urls";
import useNavigator from "@saleor/hooks/useNavigator";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@saleor/components/TableHead";
interface OrderListProps {
  id: string;
  params: StaffMemberDetailsUrlQueryParams;
}

export const StaffDetails: React.StatelessComponent<OrderListProps> = ({
  id,
}) => {
  const navigate = useNavigator();
  const showOrderDetails = (orderId) => {
    navigate(orderUrl(orderId));
  };
  return (
    <TypedStaffMemberDetailsQuery displayLoader variables={{ id }}>
      {({ data, loading }) => {
        if (loading) {
          return <h1>loading...</h1>;
        }
        const riderInfo = data.riders.filter((item) => {
          return item.id === id;
        });

        const orderInfo = riderInfo[0].orders.edges.map((info, index) => (
          <TableRow>
            <TableCell></TableCell>
            <TableCell>{riderInfo[0].name}</TableCell>
            <TableCell>{riderInfo[0].id}</TableCell>
            <TableCell>{info.node.id}</TableCell>
            <TableCell>Rs. {info.node.totalBalance.amount}</TableCell>
            <TableCell>{info.node.created}</TableCell>
            <TableCell>
              <span>{info.node.status}</span>
            </TableCell>
            <TableCell onClick={() => showOrderDetails(info.node.id)}>
              <span>Full view order</span>
            </TableCell>
          </TableRow>
        ));
        return (
          <>
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
          </>
        );
      }}
    </TypedStaffMemberDetailsQuery>
  );
};

export default StaffDetails;
