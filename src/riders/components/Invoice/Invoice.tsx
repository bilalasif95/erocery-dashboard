import React from "react";

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import codeBar from "@assets/images/invoice/bar.png";
import logo from "@assets/images/invoice/logo.png";

const styles = StyleSheet.create({
  image: {
    height: "10px",
    width: "300px",
  },
  imageBar: {
    height: "40px",
    marginLeft: "10px",
    marginTop: "10px",
    width: "300px",
  },
  imageLogo: {
    height: "40",
    marginLeft: "100px",
    width: "100px",
  },
  page: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  section: {
    flexGrow: 0,
    margin: 10,
    padding: 10,
  },
});
// import logo from "../../assets/ab";
interface InvoiceDataProps {
  data: any;
}
export const Invoice: React.FC<InvoiceDataProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A6" style={styles.page}>
        <View>
          <Image src={logo} style={styles.imageLogo} />
          <Image src={codeBar} style={styles.imageBar} />
          <Text
            style={{ fontSize: "6", marginLeft: "90px", marginTop: "10px" }}
          >
            Tracking Number:
            <Text style={{ fontWeight: "bold" }}>122334455</Text>
          </Text>
          <View>
            <Text
              style={{
                fontSize: "6",
                fontWeight: "bold",
                marginLeft: "5px",
                marginTop: "10px",
              }}
            >
              ORDER P.O NO:
              <Text style={{ fontWeight: "bold" }}>{data.info.node.id}</Text>
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: "6",
                fontWeight: "bold",
                marginLeft: "200px",
              }}
            >
              ORDER Date:
              <Text style={{ fontWeight: "bold" }}>
                {data.info.node.created}
              </Text>
            </Text>
          </View>
          <View style={{ marginLeft: "5px", marginTop: "10px" }}>
            <Text style={{ fontWeight: "bold", fontSize: "8" }}>
              Recipient:
            </Text>
            <Text style={{ fontSize: "6" }}>
              {data.riderInfo[0].name} City:{data.riderInfo[0].city}
            </Text>
          </View>
          <View style={{ marginLeft: "5px", marginTop: "10px" }}>
            <Text style={{ fontWeight: "bold", fontSize: "8" }}>Seller:</Text>
            <Text style={{ fontSize: "6" }}>
              {data.riderInfo[0].name} City:{data.riderInfo[0].city}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
