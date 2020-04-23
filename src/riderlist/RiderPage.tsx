import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
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

import React from "react";
import { FormattedMessage,useIntl } from "react-intl";

import { IconProps } from "@material-ui/core/Icon";
// import AppHeader from "@saleor/components/AppHeader";
import useNavigator from "@saleor/hooks/useNavigator";
import { sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";

import { User } from "../auth/types/User";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";

import AddRiderDialog, {
  FormData as AddStaffMemberForm
} from "./AddRiderDialog";

import { PermissionEnum } from "../types/globalTypes";

import {
  staffListUrl
} from "./urls";

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

export interface MenuItem {
  description: string;
  icon: React.ReactElement<IconProps>;
  permission: PermissionEnum;
  title: string;
  url?: string;
}

export interface MenuSection {
  label: string;
  menuItems: MenuItem[];
}

const styles = (theme: Theme) =>
  createStyles({
    btnPending:{
      backgroundColor:'#fff',
      border:'1px solid #fbbd2f',
      borderRadius:'25%',
      color:'#fbbd2f',
      textTransform:'capitalize',
    },
    card: {
      "&:hover": {
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15);"
      },
      cursor: "pointer",
      marginBottom: theme.spacing.unit * 3,
      transition: theme.transitions.duration.standard + "ms"
    },
    cardContent: {
      // Overrides Material-UI default theme
      "&:last-child": {
        paddingBottom: 16
      },
      display: "grid",
      gridColumnGap: theme.spacing.unit * 4 + "px",
      gridTemplateColumns: "48px 1fr"
    },
    cardDisabled: {
      "& $icon, & $sectionTitle, & $sectionDescription": {
        color: theme.palette.text.disabled
      },
      marginBottom: theme.spacing.unit * 3
    },
    configurationCategory: {
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr"
      },
      borderTop: `solid 1px ${theme.palette.divider}`,
      display: "grid",
      gridColumnGap: theme.spacing.unit * 4 + "px",
      gridTemplateColumns: "1fr 3fr",
      paddingTop: theme.spacing.unit * 3 + "px"
    },
    configurationItem: {
      display: "grid",
      gridColumnGap: theme.spacing.unit * 4 + "px",
      gridTemplateColumns: "1fr 1fr"
    },
    configurationLabel: {
      paddingBottom: 20
    },
    header: {
      margin: 0
    },
    icon: {
      color: theme.palette.primary.main,
      fontSize: 48
    },
    sectionDescription: {},
    sectionTitle: {
      fontSize: 20,
      fontWeight: 600 as 600
    },
    tabsHeader: {
      background: "white",
      border: "1px solid #EAEAEA",
      borderRadius: "5px 5px 0 0",
      boxShadow: "none",
      color: "black",
    }
  });

export interface RiderPageProps {
  menu: MenuSection[];
  user: User;
  onSectionClick: (sectionName: string) => void;
}

export const RiderPage = withStyles(styles, {
  name: "RiderPage"
})(
  ({
    classes,
    menu: []
  }: RiderPageProps & WithStyles<typeof styles>) => {
    const intl = useIntl();
    const navigate = useNavigator();
    const [value, setValue] = React.useState(0);
    const [addCity, setAddCity] = React.useState(false);
    const toggleModal = () => {
      setAddCity(!addCity);
    }
    const addStaffMember = (e) => {
      e.preventDefault()
    }

    const handleStaffMemberAdd = (variables: AddStaffMemberForm) => {
    addStaffMember({
      variables: {
        input: {
          email: variables.email,
          firstName: variables.firstName,
          lastName: variables.lastName,
          // permissions: variables.fullAccess
          //   ? maybe(() => shop.permissions.map(perm => perm.code))
          //   : undefined,
          // redirectUrl: urlJoin(
          //   window.location.origin,
          //   APP_MOUNT_URI === "/" ? "" : APP_MOUNT_URI,
          //   newPasswordUrl().replace(/\?/, "")
          // ),
          sendPasswordEmail: true
        }
      }
    })};
    const handleChange = (newValue) => {
      setValue(newValue);
    };
    const tabClicked = value => {
      setValue(value);
      // setMessage("");
      // setProductMessage("");
      // setUpdateMessage("");
    };
    const onAdd = e => {
      e.preventDefault();
      navigate(
        staffListUrl({
          action: "add"
        })
      )
      setAddCity(true);
    } 
    // const handleBack = () => navigate(productListUrl());
    return (
      <Container>
        {/* <AppHeader onBack={handleBack}>
          Rawalpindi
        </AppHeader> */}
        <PageHeader
          className={classes.header}
          title={intl.formatMessage(sectionNames.rider)}
        >
           <Button color="primary" variant="contained" onClick={onAdd}>
            <FormattedMessage
              defaultMessage="Add Rider"
              description="button"
            />
          </Button>
        </PageHeader>
        {addCity ?
          <AddRiderDialog
          confirmButtonState="default"
          errors={maybe(
            () => [],
            []
          )}
          open={window.location.search.includes("add")}
          onClose={toggleModal}
          onConfirm={handleStaffMemberAdd}
        />
        : ""
        }
        <Card>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Rider List" onClick={() => tabClicked(0)} />
              <Tab label="Assign Order" onClick={() => tabClicked(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
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
              <TableBody>
                <TableRow>
                  <TableCell padding="dense">
                    Bilal
                  </TableCell>
                  <TableCell padding="dense">
                    001
                  </TableCell>
                  <TableCell padding="dense">
                    0321-1234567
                  </TableCell>
                  <TableCell padding="dense">
                    82302-1234567-1
                  </TableCell>
                  <TableCell padding="dense">
                    Sargodha
                  </TableCell>
                  <TableCell padding="dense">
                    Order Assigned
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell padding="dense">
                    Bilal
                  </TableCell>
                  <TableCell padding="dense">
                    001
                  </TableCell>
                  <TableCell padding="dense">
                    0321-1234567
                  </TableCell>
                  <TableCell padding="dense">
                    82302-1234567-1
                  </TableCell>
                  <TableCell padding="dense">
                    Sargodha
                  </TableCell>
                  <TableCell padding="dense">
                    Order Assigned
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell padding="dense">
                    Bilal
                  </TableCell>
                  <TableCell padding="dense">
                    001
                  </TableCell>
                  <TableCell padding="dense">
                    0321-1234567
                  </TableCell>
                  <TableCell padding="dense">
                    82302-1234567-1
                  </TableCell>
                  <TableCell padding="dense">
                    Sargodha
                  </TableCell>
                  <TableCell padding="dense">
                    Order Assigned
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell padding="dense">
                    Bilal
                  </TableCell>
                  <TableCell padding="dense">
                    001
                  </TableCell>
                  <TableCell padding="dense">
                    0321-1234567
                  </TableCell>
                  <TableCell padding="dense">
                    82302-1234567-1
                  </TableCell>
                  <TableCell padding="dense">
                    Sargodha
                  </TableCell>
                  <TableCell padding="dense">
                    Order Assigned
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell padding="dense">
                    Bilal
                  </TableCell>
                  <TableCell padding="dense">
                    001
                  </TableCell>
                  <TableCell padding="dense">
                    0321-1234567
                  </TableCell>
                  <TableCell padding="dense">
                    82302-1234567-1
                  </TableCell>
                  <TableCell padding="dense">
                    Sargodha
                  </TableCell>
                  <TableCell padding="dense">
                    Order Assigned
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell padding="dense">
                    Bilal
                  </TableCell>
                  <TableCell padding="dense">
                    001
                  </TableCell>
                  <TableCell padding="dense">
                    0321-1234567
                  </TableCell>
                  <TableCell padding="dense">
                    82302-1234567-1
                  </TableCell>
                  <TableCell padding="dense">
                    Sargodha
                  </TableCell>
                  <TableCell padding="dense">
                    Order Assigned
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabPanel>
          <TabPanel value={value} index={1}>
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
                  <Button className={classes.btnPending}>Pending</Button>
                  </TableCell>
                  <TableCell padding="dense">
                    Bilal Asif
                  </TableCell>
                  <TableCell padding="dense">
                    Order list
                  </TableCell>
                </TableRow>
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
                  <Button>Pending</Button>
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
          </TabPanel>
        </Card>
      </Container>
    );
  }
);
RiderPage.displayName = "RiderPage";
export default RiderPage;
