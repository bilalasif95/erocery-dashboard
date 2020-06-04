import moment from "moment-timezone";
import React from "react";

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import logo from "@assets/images/invoice/erocery-black-logo.png";
import codeBar from "@assets/images/invoice/QR-code.jpg";


const styles = StyleSheet.create({
  imageLogo: {
    margin: '1rem auto',
    maxWidth: '200px',
    width: "100%",
  },
  innerContainer: {
    margin: 2
  },
  // orderer: {

  // },
  page: {
    backgroundColor: "black",
    flexDirection: "column",
    margin: 15
  },
  pageContainer: {
    backgroundColor: "white",
  },

  section: {
    flexGrow: 0,
    margin: 10,
    padding: 10,
  },
  topHeader: {
    borderBottom: '1px solid #000',
    display: 'flex',
    justifyContent: 'center',
  },

  intro: {
    fontSize: '5px',
    lineHeight: '30px',
    textAlign: 'center',
  }
});
// import logo from "../../assets/ab";
interface InvoiceDataProps {
  data: any;
}
export const Invoice: React.FC<InvoiceDataProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A6" style={styles.pageContainer}>
        <View style={styles.page}>
          <View style={styles.innerContainer}>
            <View style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', width: '100%', padding: 2 }}>
              <View style={{ width: '130px', margin: 'auto', padding: 15 }}>
                <Image src={logo} />
              </View>
            </View>
            <View style={{ backgroundColor: 'white', paddingBottom: 5 }}>
              <Text style={{ fontSize: 8, textAlign: 'center', lineHeight: '30px', width: '100%' }}>3rd Floor, Al-Rahim Arcade, National Market, Satellite Town, Rawalpindi, Pakistan.</Text>
              <Text style={{ fontSize: 8, textAlign: 'center', lineHeight: '30px', width: '100%' }}>info@erocery.com | www.erocery.com</Text>
            </View>
            <View style={{ backgroundColor: "white", display: 'flex', justifyContent: 'center', width: '100%', marginTop: 1, marginBottom: 1 }}>
              <Text
                style={{ fontSize: "20", textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', padding: 5 }}
              >
                Delivery Slip
              </Text>
              <View style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <View style={{ width: '200px', margin: 'auto', padding: 10 }}>
                  <Image src={codeBar} />
                </View>
              </View>
              <View style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
                textTransform: 'uppercase',
                width: '100%'
              }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: "7",
                    fontWeight: "bold",
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-start',
                    width: '50%'
                  }}
                >
                  <Text style={{ fontWeight: 'bold', marginRight: 2 }}>Order P.O. No:</Text>
                  <Text>{data.info.node.id}</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: "7",
                    fontWeight: "bold",
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-end',
                    width: '50%'
                  }}
                >
                  <Text style={{ fontWeight: 'bold', marginRight: 2 }}>Order Date:</Text>
                  <Text>
                    {moment.utc(data.info.node.created).local().format("DD/MM/YYYY hh:mm A")}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: 'white', marginBottom: 1, padding: 5 }}>
              <Text style={{ fontWeight: "bold", fontSize: "10" }}>
                Recipient:
            </Text>
              <Text style={{ fontSize: "8" }}>
                {data.riderInfo[0].name} City:{data.riderInfo[0].city}
              </Text>
            </View>
            <View style={{ backgroundColor: 'white',  marginBottom: 1, padding: 5}}>
              <Text style={{ fontWeight: "bold", fontSize: "10" }}>Seller:</Text>
              <Text style={{ fontSize: "8" }}>
              3rd Floor, Al-Rahim Arcade, National Market, Satellite Town, Rawalpindi, Pakistan. 
                {/* {data.riderInfo[0].name} City:{data.riderInfo[0].city} */}
              </Text>
            </View>
            <View style={{
                backgroundColor: 'white',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                fontSize: "8",
                justifyContent: 'space-between',
                padding: 5,
                textTransform: 'uppercase',
                width: '100%'
              }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: '50%'
                  }}
                >
                  <Text>Subtotal</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '50%'
                  }}
                >
                  <Text>PKR 620.0</Text>
                </View>
              </View>
              <View style={{
                backgroundColor: 'white',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                fontSize: "8",
                justifyContent: 'space-between',
                padding: 5,
                textTransform: 'uppercase',
                width: '100%'
              }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: '50%'
                  }}
                >
                  <Text>Shipping</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '50%'
                  }}
                >
                  <Text>PKR 620.0</Text>
                </View>
              </View>
              <View style={{
                backgroundColor: 'white',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                fontSize: "8",
                justifyContent: 'space-between',
                padding: 5,
                textTransform: 'uppercase',
                width: '100%'
              }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: '50%'
                  }}
                >
                  <Text style={{fontWeight: "bold"}}>Total</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '50%'
                  }}
                >
                  <Text style={{fontWeight: "bold"}}>PKR 620.0</Text>
                </View>
              </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
