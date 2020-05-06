import AppBar from '@material-ui/core/AppBar';
import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Grid from '@material-ui/core/Grid';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Tab from '@material-ui/core/Tab';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tabs from '@material-ui/core/Tabs';
import Typography from "@material-ui/core/Typography";
// import classNames from "classnames";
import React from "react";
// import {  useIntl } from "react-intl";

// import Skeleton from "@saleor/components/Skeleton";
// import TablePagination from "@saleor/components/TablePagination";
import {
  // getUserInitials,
  // getUserName,
  // maybe,
  renderCollection
} from "@saleor/misc";
import { ListProps } from "@saleor/types";
import { StaffList_staffUsers_edges_node } from "../../types/StaffList";

import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <Typography
      component="div"
    >
      {value === index && (
        <>{children}</>
      )}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
      width: 47
    },
    avatarDefault: {
      "& p": {
        color: "#fff",
        lineHeight: "47px"
      },
      background: theme.palette.primary.main,
      height: 47,
      textAlign: "center",
      width: 47
    },
    avatarImage: {
      pointerEvents: "none",
      width: "100%"
    },
    btnPending:{
      backgroundColor:'#fff',
      border:'1px solid #fbbd2f',
      borderRadius:'25%',
      color:'#fbbd2f',
      padding: '0.5rem 0.7rem',
      textTransform:'capitalize',
    },
    card: {
      "&:hover": {
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15);"
      },
      cursor: "pointer",
      margin: '0 0.5rem 1rem 0.5rem',
      transition: theme.transitions.duration.standard + "ms",
      [theme.breakpoints.down("xs")]: {
        margin: '0 0 1rem',
        width: '100%'
      },
      width: '100%',
    },
    cardContent: {
      // Overrides Material-UI default theme
      "&:last-child": {
        paddingBottom: 16
      },
      alignItems: 'center',
      display: "flex",
      gridColumnGap: theme.spacing.unit * 4 + "px",
      gridTemplateColumns: "230px 1fr",
      [theme.breakpoints.down("xs")]: {
        flexWrap:'wrap',
        justifyContent:'center',
        width: '100%'
      },
      justifyContent: 'space-between',
    },
    cityDesc: {
      padding: '0 0.5rem',
      [theme.breakpoints.down("xs")]: {
        margin: '0 0 1rem',
        width: '100%'
      },
      width: '80%',
    },
    colItem:{
      display:'flex'
    },
    configurationCategory: {
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr"
      },
      borderTop: `solid 1px ${theme.palette.divider}`,
      // display: "flex",
      gridColumnGap: theme.spacing.unit * 4 + "px",
      gridTemplateColumns: "1fr 3fr",
      paddingTop: theme.spacing.unit * 3 + "px"
    },
    orderCount: {
      display:'flex',
      justifyContent:'flex-end',
      [theme.breakpoints.down("xs")]: {
        justifyContent:'center',
        width: '100%',
      },
      width: '20%',
    },
    orders: {
      background: theme.palette.primary.main,
      borderRadius: "50px",
      color: "white",
      fontFamily:'Inter,roboto, sans-serif',
      fontSize: 20,
      margin:'0',
      padding: "0.5rem",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 600 as 600
    },
    statusText: {
      color: "#9E9D9D"
    },
    tableContainer: {
      display: 'block',
      overflowX: 'scroll',
      width: '100%',
    },
    tableRow: {
      cursor: "pointer"
    },
    tabsHeader: {
      background: "white",
      border: "1px solid #EAEAEA",
      borderRadius: "5px 5px 0 0",
      boxShadow: "none",
      color: "black",
    },
    wideColumn: {
      width: "80%"
    }
  });

interface StaffListProps extends ListProps, WithStyles<typeof styles> {
  staffMembers: StaffList_staffUsers_edges_node[];
}

const StaffList = withStyles(styles, { name: "StaffList" })(
  ({
    classes,
    staffMembers
  }: StaffListProps) => {
    const [value, setValue] = React.useState(0);
    const handleChange = (newValue) => {
      setValue(newValue);
    };
    const tabClicked = value => {
      setValue(value);
    };
    return (
      <Card>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Rider List" onClick={() => tabClicked(0)} />
              <Tab label="Assign Order" onClick={() => tabClicked(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <div className={classes.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="dense">
                      Name
                  </TableCell>
                    <TableCell padding="dense">
                      Rider ID
                  </TableCell>
                    <TableCell padding="dense">
                      Phone  Numer
                  </TableCell>
                    <TableCell padding="dense">
                      CNIC
                  </TableCell>
                    <TableCell padding="dense">
                      City
                  </TableCell>
                    <TableCell padding="dense">
                      Action
                  </TableCell>
                  </TableRow>
                </TableHead>
                {renderCollection(
                  staffMembers,
                  staffMember => (
                    <TableBody>
                      <TableRow>
                        <TableCell padding="dense">
                          {staffMember && staffMember.name}
                      </TableCell>
                        <TableCell padding="dense">
                        {staffMember && staffMember.id}
                      </TableCell>
                        <TableCell padding="dense">
                        {staffMember && staffMember.phone}
                      </TableCell>
                        <TableCell padding="dense">
                        {staffMember && staffMember.cnic}
                      </TableCell>
                        <TableCell padding="dense">
                        {staffMember && staffMember.city}
                      </TableCell>
                        <TableCell padding="dense">
                          Order Assigned
                      </TableCell>
                      </TableRow>
                      </TableBody>
                      ))}
              </Table>

            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className={classes.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="dense">
                      Order #
                  </TableCell>
                    <TableCell padding="dense">
                      Date
                  </TableCell>
                    <TableCell padding="dense">
                      Ship to
                  </TableCell>
                    <TableCell padding="dense">
                      Order Total
                  </TableCell>
                    <TableCell padding="dense">
                      Status
                  </TableCell>
                    <TableCell padding="dense">
                      Assign to
                  </TableCell>
                    <TableCell padding="dense">
                      Action
                  </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                    <TableCell padding="dense">
                      000001234
                  </TableCell>
                    <TableCell padding="dense">
                      04-07-2020
                  </TableCell>
                    <TableCell padding="dense">
                      3rd Floor
                  </TableCell>
                    <TableCell padding="dense">
                      Rs. 1200.00
                  </TableCell>
                    <TableCell padding="dense">
                      <button className={classes.btnPending}>Pending</button>
                    </TableCell>
                    <TableCell padding="dense">
                      Bilal Asif
                  </TableCell>
                    <TableCell padding="dense">
                      Order list
                  </TableCell>
                  </TableRow>
                  </TableBody>
              </Table>
            </div>
          </TabPanel>
        </Card>
    // <div className={classes.configurationCategory}>
    //   <Grid container>
    //     {renderCollection(
    //       staffMembers,
    //       staffMember => (
    //         <Grid item lg={6} md={6} sm={12} xs={12} className={classes.colItem}>
    //           <Card
    //             // className={item.url ? classes.card : classes.cardDisabled}
    //             className={classes.card}
    //             // onClick={() => onSectionClick(item.url)}
    //             key={staffMember && staffMember.id}
    //           >
    //             <CardContent className={classes.cardContent}>
    //               {/* <div className={classes.icon}>{item.icon}</div> */}
    //               <div className={classes.cityDesc}>
    //                 <Typography
    //                   className={classes.sectionTitle}
    //                   color="primary"
    //                 >
    //                   {staffMember && staffMember.name}
    //                 </Typography>
    //                 <Typography>
    //                   {staffMember && staffMember.city}
    //                 </Typography>
    //               </div>
    //               <div className={classes.orderCount}>
    //                 <p className={classes.orders}>
    //                   {staffMember && staffMember.orders.totalCount}
    //               </p>
    //               </div>
    //             </CardContent>
    //           </Card>
    //         </Grid>
    //     ))}
    //   </Grid>
    // </div>
    );
  }
);
StaffList.displayName = "StaffList";
export default StaffList;
