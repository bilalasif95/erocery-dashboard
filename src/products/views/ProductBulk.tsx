import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import {Theme} from "@material-ui/core/styles";

import makeStyles from "@material-ui/styles/makeStyles";
import PropTypes from 'prop-types';
import React from "react";
import SVG from "react-inlinesvg";
import { useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import useNavigator from "@saleor/hooks/useNavigator";
import { sectionNames } from "@saleor/intl";
import image from "../../../assets/images/picture_icon.svg";
import endpoints from "../../configurations.js";
import { productListUrl } from "../urls";

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

interface ProductUpdateProps {
  id: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  browseBtn: {
    color: "#3d9afe",
    cursor: "pointer",
    textDecoration: "underline",
  },
  fileField: {
    display: "none"
  },
  image: {
    display: "block",
    margin: "0 auto",
    marginBottom: "1.5rem",
    maxWidth: "150px",
    width: "100%"
  },
  innerContainer: {
    border: "1px solid #EAEAEA",
    borderRadius: "0 0 5px 5px",
    padding: "100px",
    [theme.breakpoints.down("sm")]: {
      padding:'1rem'
    },
  },
  mainContainer: {
    background: "white"
  },
  resultBox: {
    background: "#f7fafd",
    borderRadius: "5px",
    marginTop: "2rem",
    padding: "20px",
    textAlign: "center",
    
  },
  tabsHeader: {
    background: "white",
    border: "1px solid #EAEAEA",
    borderRadius: "5px 5px 0 0",
    boxShadow: "none",
    color: "black",
  },
  uploadContainer: {
    background: "#e6f1ff",
    border: "2px dotted #c4e0ff",
    borderRadius: "5px",
    padding: "50px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      padding:'2rem'
    },
  }
}));

export const ProductUpdate: React.FC<ProductUpdateProps> = props => {
  const navigate = useNavigator();
  const intl = useIntl();
  const axios = require('axios');
  const classes = useStyles(props);
  const anchor = React.useRef<HTMLInputElement>();
  const anchor2 = React.useRef<HTMLInputElement>();
  const anchor3 = React.useRef<HTMLInputElement>();
  const [value, setValue] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [ProductMessage, setProductMessage] = React.useState("");
  const [updateMessage, setUpdateMessage] = React.useState("");
  const handleImageUploadButtonClick = () => anchor.current.click();
  const handleFileUploadButtonClick = () => anchor2.current.click();
  const handleUpdateUploadButtonClick = () => anchor3.current.click();
  const handleBack = () => navigate(productListUrl());
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const tabClicked = value => {
    setValue(value);
    setMessage("");
    setProductMessage("");
    setUpdateMessage("");
  };
  const onChangeFile = () => {
    setMessage("")
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
    setProductMessage("")
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
    setUpdateMessage("")
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
          <Container>
            <AppHeader onBack={handleBack}>
              {intl.formatMessage(sectionNames.products)}
            </AppHeader>
            <PageHeader title=" Import Bulk Items" />
            <AppBar position="static" className={classes.tabsHeader}>
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Upload Image" onClick={() => tabClicked(0)} />
                <Tab label="Upload CSV" onClick={() => tabClicked(1)} />
                <Tab label="Update CSV" onClick={() => tabClicked(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <div className={classes.mainContainer}>
                <div className={classes.innerContainer}>
                  <div className={classes.uploadContainer}>
                    <SVG
                      className={classes.image}
                      src={image}
                    />
                    <a onClick={handleImageUploadButtonClick} className={classes.browseBtn}>Browse</a> to choose a file
                    <input
                      className={classes.fileField}
                      id="fileUpload"
                      multiple
                      onChange={onChangeFile}
                      type="file"
                      ref={anchor}
                    />
                  </div>
                  {message && (
                  <div className={classes.resultBox}
                  style={
                    message.includes("Uploaded") ? { color: "green" } : { color: "red" }
                  }>
                    {message}
                  </div>
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className={classes.mainContainer}>
                <div className={classes.innerContainer}>
                  <div className={classes.uploadContainer}>
                    <SVG
                      className={classes.image}
                      src={image}
                    />
                    <a onClick={handleFileUploadButtonClick} className={classes.browseBtn}>Browse</a> to choose a file
                    <input
                      className={classes.fileField}
                      id="fileUpload"
                      multiple
                      onChange={onChangeProductFile}
                      type="file"
                      ref={anchor2}
                    />
                  </div>
                  {ProductMessage && (
                  <div className={classes.resultBox}
                  style={
                    ProductMessage.includes("Success") ? { color: "green" } : { color: "red" }
                  }>
                    {ProductMessage}
                  </div>
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className={classes.mainContainer}>
                <div className={classes.innerContainer}>
                  <div className={classes.uploadContainer}>
                    <SVG
                      className={classes.image}
                      src={image}
                    />
                    <a onClick={handleUpdateUploadButtonClick} className={classes.browseBtn}>Browse</a> to choose a file
                    <input
                      className={classes.fileField}
                      id="fileUpload"
                      multiple
                      onChange={onUpdateFile}
                      type="file"
                      ref={anchor3}
                    />
                  </div>
                  {updateMessage && (
                  <div className={classes.resultBox}
                  style={
                    updateMessage.includes("Success") ? { color: "green" } : { color: "red" }
                  }>
                    {updateMessage}
                  </div>
                  )}
                </div>
              </div>
            </TabPanel>
          </Container>
  );
};
export default ProductUpdate;
