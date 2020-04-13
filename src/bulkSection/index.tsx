// import { parse as parseQs } from "qs";
// import { Route, RouteComponentProps, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Theme } from "@material-ui/core/styles";
import makeStyles from "@material-ui/styles/makeStyles";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";
import endpoints from "../../src/configurations.js";
import { WindowTitle } from "../components/WindowTitle";
// import {
//   customerAddPath,
//   customerAddressesPath,
//   CustomerAddressesUrlQueryParams,
//   customerListPath,
//   CustomerListUrlQueryParams,
//   customerPath,
//   CustomerUrlQueryParams
// } from "./urls";
// import CustomerAddressesViewComponent from "./views/CustomerAddresses";
// import CustomerCreateView from "./views/CustomerCreate";
// import CustomerDetailsViewComponent from "./views/CustomerDetails";
// import CustomerListViewComponent from "./views/CustomerList";

// const CustomerListView: React.StatelessComponent<RouteComponentProps<{}>> = ({
//   location
// }) => {
//   const qs = parseQs(location.search.substr(1));
//   const params: CustomerListUrlQueryParams = qs;
//   return <CustomerListViewComponent params={params} />;
// };

// interface CustomerDetailsRouteParams {
//   id: string;
// }
// const CustomerDetailsView: React.StatelessComponent<
//   RouteComponentProps<CustomerDetailsRouteParams>
// > = ({ location, match }) => {
//   const qs = parseQs(location.search.substr(1));
//   const params: CustomerUrlQueryParams = qs;

//   return (
//     <CustomerDetailsViewComponent
//       id={decodeURIComponent(match.params.id)}
//       params={params}
//     />
//   );
// };

// interface CustomerAddressesRouteParams {
//   id: string;
// }
// const CustomerAddressesView: React.StatelessComponent<
//   RouteComponentProps<CustomerAddressesRouteParams>
// > = ({ match }) => {
//   const qs = parseQs(location.search.substr(1));
//   const params: CustomerAddressesUrlQueryParams = qs;

//   return (
//     <CustomerAddressesViewComponent
//       id={decodeURIComponent(match.params.id)}
//       params={params}
//     />
//   );
// };
const useStyles = makeStyles((theme: Theme) => ({
  fileField: {
    display: "none"
  },
  image: {
    height: "100%",
    objectFit: "contain",
    userSelect: "none",
    width: "100%"
  },
  imageContainer: {
    background: "#ffffff",
    border: "1px solid #eaeaea",
    borderRadius: theme.spacing.unit,
    height: 148,
    justifySelf: "start",
    overflow: "hidden",
    padding: theme.spacing.unit * 2,
    position: "relative",
    width: 148
  }
}));
export const BulkSection: React.StatelessComponent<{}> = props => {
  const intl = useIntl();
  const axios = require('axios');
  const classes = useStyles(props);
  const anchor = React.useRef<HTMLInputElement>();
  const anchor2 = React.useRef<HTMLInputElement>();
  const anchor3 = React.useRef<HTMLInputElement>();
  const [message, setMessage] = React.useState("");
  const [ProductMessage, setProductMessage] = React.useState("");
  const [updateMessage, setUpdateMessage] = React.useState("");
  const handleImageUploadButtonClick = () => anchor.current.click();
  const handleFileUploadButtonClick = () => anchor2.current.click();
  const handleUpdateUploadButtonClick = () => anchor3.current.click();
  const onChangeFile = () => {
    const input = anchor.current
    const files = input.files
    const bodyFormData = new FormData();
    for(let i=0;i<files.length;i++){
      bodyFormData.append('images', files[i]);
    }
    axios
    .post(endpoints.addImages, bodyFormData)
			.then(res=>{
        setMessage(res.data)
			})
			.catch(err=>{
        setMessage(err.response)
      })
  }
  
  const onChangeProductFile = () => {
    const input = anchor2.current
    const files = input.files
    const bodyFormData = new FormData();
    bodyFormData.append('productcsv', files[0]);
    axios
    .post(endpoints.addProducts, bodyFormData)
			.then(res=>{
        setProductMessage(res.data.message)
			})
			.catch(err=>{
        setProductMessage(Object.keys(JSON.parse(err.response.data.error)[0])[0]+JSON.parse(err.response.data.error)[0].row+" "+JSON.parse(err.response.data.error)[0].error)
      })
  }

  const onUpdateFile = () => {
    const input = anchor3.current
    const files = input.files
    const bodyFormData = new FormData();
    bodyFormData.append('productcsv', files[0]);
    axios
    .post(endpoints.addProducts, bodyFormData)
			.then(res=>{
        setUpdateMessage(res.data.message)
			})
			.catch(err=>{
        setUpdateMessage(Object.keys(JSON.parse(err.response.data.error)[0])[0]+JSON.parse(err.response.data.error)[0].row+" "+JSON.parse(err.response.data.error)[0].error)
      })
  }
  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.customers)} />
      <div>
            <Button
              variant="text"
              color="primary"
              onClick={handleImageUploadButtonClick}
            >
              Upload Bulk Images
              {/* <FormattedMessage {...commonMessages.uploadImage} /> */}
            </Button>
            <input
              className={classes.fileField}
              id="fileUpload"
              multiple
              onChange={onChangeFile}
              type="file"
              ref={anchor}
            />
            {message}
      </div>
      <div>
            <Button
              variant="text"
              color="primary"
              onClick={handleFileUploadButtonClick}
            >
              Upload Bulk Products
              {/* <FormattedMessage {...commonMessages.uploadImage} /> */}
            </Button>
            <input
              className={classes.fileField}
              id="productfileUpload"
              onChange={onChangeProductFile}
              type="file"
              ref={anchor2}
            />
            {ProductMessage}
      </div>
      <div>
            <Button
              variant="text"
              color="primary"
              onClick={handleUpdateUploadButtonClick}
            >
              Update
              {/* <FormattedMessage {...commonMessages.uploadImage} /> */}
            </Button>
            <input
              className={classes.fileField}
              id="updatefileUpload"
              multiple
              onChange={onUpdateFile}
              type="file"
              ref={anchor3}
            />
            {updateMessage}
      </div>
      {/* <Switch>
        <Route exact path={customerListPath} component={CustomerListView} />
        <Route exact path={customerAddPath} component={CustomerCreateView} />
        <Route
          path={customerAddressesPath(":id")}
          component={CustomerAddressesView}
        />
        <Route path={customerPath(":id")} component={CustomerDetailsView} />
      </Switch> */}
    </>
  );
};
