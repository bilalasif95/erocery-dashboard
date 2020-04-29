import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { IconProps } from "@material-ui/core/Icon";
import useNavigator from "@saleor/hooks/useNavigator";
import { sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";

import { hasPermission } from "../auth/misc";
import { User } from "../auth/types/User";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import AddCityDialog, {
  FormData as AddStaffMemberForm
} from "./AddCityDialog";

import { PermissionEnum } from "../types/globalTypes";

import {
  staffListUrl
} from "./urls";
import Grid from '@material-ui/core/Grid';

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
    card: {
      "&:hover": {
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15);"
      },
      cursor: "pointer",
      margin: '0 0.5rem 1rem 0.5rem',
      width: '100%',
      transition: theme.transitions.duration.standard + "ms",
      [theme.breakpoints.down("xs")]: {
        margin: '0 0 1rem',
        width: '100%'
      },
    },
    cardContent: {
      // Overrides Material-UI default theme
      "&:last-child": {
        paddingBottom: 16
      },
      display: "flex",
      justifyContent: 'space-between',
      alignItems: 'center',
      gridColumnGap: theme.spacing.unit * 4 + "px",
      gridTemplateColumns: "230px 1fr",
      [theme.breakpoints.down("xs")]: {
        justifyContent:'center',
        flexWrap:'wrap',
        width: '100%'
      },
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
      // display: "flex",
      gridColumnGap: theme.spacing.unit * 4 + "px",
      gridTemplateColumns: "1fr 3fr",
      paddingTop: theme.spacing.unit * 3 + "px"
    },
    configurationItem: {
      display: "flex",
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
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
      background: theme.palette.primary.main,
      borderRadius: "50px",
      color: "white",
      fontSize: 40,
      padding: "2px 0 0 6px",
      width: '10%',
      [theme.breakpoints.down("xs")]: {
        margin: '0 0 1rem',
        width: '100%'
      },
    },
    cityDesc: {
      width: '80%',
      padding: '0 0.5rem',
      [theme.breakpoints.down("xs")]: {
        margin: '0 0 1rem',
        width: '100%'
      },
    },
    orderCount: {
      width: '20%',
      display:'flex',
      justifyContent:'flex-end',
      [theme.breakpoints.down("xs")]: {
        width: '100%',
        justifyContent:'center',
      },
    },
    orders: {
      background: theme.palette.primary.main,
      borderRadius: "50px",
      color: "white",
      fontSize: 40,
      padding: "0.5rem",
      fontFamily:'Inter,roboto, sans-serif',
      fontSize:'20px',
      margin:'0'
    },
    sectionDescription: {},
    sectionTitle: {
      fontSize: 20,
      fontWeight: 600 as 600
    },
    colItem:{
      display:'flex'
    }
  });

export interface ShopPageProps {
  menu: MenuSection[];
  user: User;
  onSectionClick: (sectionName: string) => void;
}

export const ShopPage = withStyles(styles, {
  name: "ShopPage"
})(
  ({
    classes,
    menu: menus,
    user,
    onSectionClick
  }: ShopPageProps & WithStyles<typeof styles>) => {
    const intl = useIntl();
    const navigate = useNavigator();
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
      })
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

    return (
      <Container>
        <PageHeader
          className={classes.header}
          title={intl.formatMessage(sectionNames.shop)}
        >
          <Button color="primary" variant="contained" onClick={onAdd}>
            <FormattedMessage
              defaultMessage="Add Shop"
              description="button"
            />
          </Button>
        </PageHeader>
        {addCity ?
          <AddCityDialog
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
        {/* <div className={classes.configurationLabel}>
                <Typography>{menu.label}</Typography>
              </div> */}
        {menus
          .filter(menu =>
            menu.menuItems.some(menuItem =>
              hasPermission(menuItem.permission, user)
            )
          )
          .map((menu, menuIndex) => (
            <div className={classes.configurationCategory} key={menuIndex}>
              <Grid container>
                {/* <div className={classes.configurationItem}> */}
                {menu.menuItems
                  .filter(menuItem => hasPermission(menuItem.permission, user))
                  .map((item, itemIndex) => (

                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.colItem}>
                      <Card
                        // className={item.url ? classes.card : classes.cardDisabled}
                        className={classes.card}
                        onClick={() => onSectionClick(item.url)}
                        key={itemIndex}
                      >
                        <CardContent className={classes.cardContent}>
                          {/* <div className={classes.icon}>{item.icon}</div> */}
                          <div className={classes.cityDesc}>
                            <Typography
                              className={classes.sectionTitle}
                              color="primary"
                            >
                              {item.title}
                            </Typography>
                            <Typography className={classes.sectionDescription}>
                              {item.description}
                            </Typography>
                          </div>
                          <div className={classes.orderCount}>
                            <p className={classes.orders}>
                              10
                          </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>

                  ))}
                {/* </div> */}
              </Grid>
            </div>
          ))}
      </Container>
    );
  }
);
ShopPage.displayName = "ShopPage";
export default ShopPage;
