import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import useNotifier from "@saleor/hooks/useNotifier";


import { sectionNames } from "@saleor/intl";

import {  TypeNotificationPush } from "../../mutations"



const styles = (theme: Theme) =>
  createStyles({
    bannerList: {
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "1rem 1.5rem",
      width: "100%"
    },

    bannerImg: {
      width: "100%"
    },

    delIcon: {
      background: "#fafafa",
      borderRadius: "25px",
      cursor: "pointer",
      padding: "5px",
      position: "absolute",
      right: "0",
      top: "0",
    },

    imgBox: {
      height: "200px",
      margin: "0 0 2rem",
      overflow: "hidden",
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        height: "100%",
        width: "100%",

      },
      width: "48%",
    },
    inputField: {

      height: "46px",
      margin: "0 0 1rem",
      padding: "0.5rem 1rem",
      width: "100%",

    },
    inputFieldL: {


      height: "100px",
      margin: "0 0 1rem",
      padding: "0.5rem 1rem",
      width: "100%",
    },
    notification: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      padding: "0 2rem",
      width: "300px",

    },
    sendBtn: {
      marginBottom: "20px",
      width: "100%",

    },
    textFieldGrid: {
      padding: "2rem 0 0 1.5rem"
    },

    title: {
      width: "100%",
    },



  });

interface WebhooksListPageProps extends WithStyles<typeof styles> {
  onBack: () => void;

}


const WebhooksListPage = withStyles(styles, {
  name: "StaffAddMemberDialog"
})(
  ({
    classes,
    onBack,
  }: WebhooksListPageProps) => {

   
    const intl = useIntl();
    const notify = useNotifier();

    const [title, setTitle] = React.useState("")
    const [descripation, setDescripation] = React.useState("")


    return (
      <>

        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.configuration)}
          </AppHeader>
          <PageHeader title={intl.formatMessage(sectionNames.notification)}>
            {/* <Button>
              <FormattedMessage
                defaultMessage="Save"
                description="button"
              />
            </Button> */}
          </PageHeader>
          <Card>
            <TypeNotificationPush onCompleted={async ({ sendPormotion: { errors } }) => {

              if (errors.length) {

                notify({ text: "" + errors[0].message });

              }
              else {
                setTitle("")
                setDescripation("")
                notify({ text: "Successfully pushed." });
              }

            }}>
              {(sendNotification) => {

                const handleSubmit = () => {
                  sendNotification({
                    variables: {
                      description: descripation,
                      title

                    }
                  })
                }
                return <div className={classes.notification}>
                  {/* <h2>Push Notification</h2> */}
                  {/* onKeyDown={(evt) => title.length > 10 ? evt.preventDefault() : ""}
                  onKeyDown={(evt) => descripation.length > 20 ? evt.preventDefault() : ""} */}
                  <input type="text" className={classes.inputField} value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}  style={{marginTop:"20px"}}/>
                  <textarea className={classes.inputFieldL} onChange={(e) => setDescripation(e.target.value)} value={descripation} placeholder="Description" />
                  <Button onClick={() => handleSubmit()} variant="contained" color="primary" className={classes.sendBtn} disabled={descripation.length > 0 && title.length > 0 ? false : true}>
                    <FormattedMessage
                      defaultMessage="Send Notification"
                      description="button"
                    />
                  </Button>
                </div>
              }}
            </TypeNotificationPush>

          </Card>
        </Container>
      </>
    );
  }
);
WebhooksListPage.displayName = "WebhooksListPage";
export default WebhooksListPage;
