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
import { useIntl } from "react-intl";

import Grid from '@material-ui/core/Grid';
import { IconProps } from "@material-ui/core/Icon";
import { sectionNames } from "@saleor/intl";
import { hasPermission } from "../auth/misc";
import { User } from "../auth/types/User";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { PermissionEnum } from "../types/globalTypes";

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
    colItem:{
      display:'flex'
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
  });

export interface ConfigurationPageProps {
  menu: MenuSection[];
  user: User;
  onSectionClick: (sectionName: string) => void;
}

export const ConfigurationPage = withStyles(styles, {
  name: "ConfigurationPage"
})(
  ({
    classes,
    menu: menus,
    user,
    onSectionClick
  }: ConfigurationPageProps & WithStyles<typeof styles>) => {
    const intl = useIntl();
    return (
      <Container>
        <PageHeader
          className={classes.header}
          title={intl.formatMessage(sectionNames.configuration)}
        />
        {menus
          .filter(menu =>
            menu.menuItems.some(menuItem =>
              hasPermission(menuItem.permission, user)
            )
          )
          .map((menu, menuIndex) => (
            <div className={classes.configurationCategory} key={menuIndex}>
              <div className={classes.configurationLabel}>
                <Typography>{menu.label}</Typography>
              </div>
              <Grid container>
              {/* <div className={classes.configurationItem}> */}
                {menu.menuItems
                  .filter(menuItem => hasPermission(menuItem.permission, user))
                  .map((item, itemIndex) => (
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.colItem}>
                    <Card
                      className={item.url ? classes.card : classes.cardDisabled}
                      onClick={() => onSectionClick(item.url)}
                      key={itemIndex}
                    >
                      <CardContent className={classes.cardContent}>
                        <div className={classes.icon}>{item.icon}</div>
                        <div>
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
ConfigurationPage.displayName = "ConfigurationPage";
export default ConfigurationPage;
