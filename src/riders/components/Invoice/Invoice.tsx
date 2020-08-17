import moment from "moment-timezone";
import React from "react";
import { FormattedMessage } from "react-intl";

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import logo from "@assets/images/invoice/erocery-black-logo.png";
// import codeBar from "@assets/images/invoice/QR-code.jpg";

import Money from "@saleor/components/Money";
// import Skeleton from "@saleor/components/Skeleton";
import { maybe } from "../../../misc";

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
  // <View style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
  //               <View style={{ width: '200px', margin: 'auto', padding: 10 }}>
  //                 <Image src={codeBar} />
  //               </View>
  //             </View>
  return (
    <Document>
      <Page size="A4" style={styles.pageContainer}>
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
                    flexWrap: 'nowrap',
                    fontSize: "7",
                    fontWeight: "bold",
                    justifyContent: 'flex-start',
                    width: '50%'
                  }}
                >
                  <Text style={{ fontWeight: 'bold', marginRight: 2 }}>Order #</Text>
                  <Text>{data.info.node.number}</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    fontSize: "7",
                    fontWeight: "bold",
                    justifyContent: 'flex-end',
                    width: '50%'
                  }}
                >
                  <Text style={{ fontWeight: 'bold', marginRight: 2 }}>Order Date:</Text>
                  <Text>
                    {moment.utc(data.info.node.created,"YYYY-MM-DD hh:mm:ss A").local().format("YYYY-MM-DD hh:mm:ss A")}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: 'white', marginBottom: 1, padding: 5 }}>
              <Text style={{ fontWeight: "bold", fontSize: "10" }}>
                Recipient:
            </Text>
              <Text style={{ fontSize: "8" }}>
                {data.info.node.shippingAddress.firstName} {data.info.node.shippingAddress.lastName} (Tel: {data.info.node.shippingAddress.phone}). {data.info.node.shippingAddress.streetAddress1},{data.info.node.shippingAddress.city},{data.info.node.shippingAddress.country.country}.
              </Text>
            </View>
            <View style={{ 
              alignItems: 'center',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'row',
              fontSize: "8",
              justifyContent: 'space-between',
              marginBottom: 1,
              padding: 5,
              textTransform: 'uppercase',
              width: '100%'
            }}>
              <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: '40%'
                  }}
                >
                  <Text>Product Name</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: '20%'
                  }}
                >
                  <Text>Price</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: '20%'
                  }}
                >
                  <Text>Qty</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '20%'
                  }}
                >
                  <Text>Subtotal</Text>
                </View>
            </View>
            {data.info.node.lines.map(product => (
              <View style={{ 
                alignItems: 'center',
                backgroundColor: 'white',
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
                      width: '40%'
                    }}
                  >
                    <Text style={{
                      width: '90%'
                    }}>{maybe(() => product.productName) || ""
                    // <Skeleton />
                    }</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      width: '20%'
                    }}
                  >
                    <Text>{maybe(() => product.unitPrice.gross) ? (
                  <Money money={product.unitPrice.gross} />
                ) : (
                  ""
                  // <Skeleton />
                )}</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      width: '20%'
                    }}
                  >
                    {/* <Text>{maybe(() => product.quantity - product.quantityFulfilled) || ( "" */}
                    <Text>{maybe(() => product.quantity
                  // <Skeleton />
                )}</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      width: '20%'
                    }}
                  >
                    <Text>{maybe(
                  () =>
                    // (product.quantity - product.quantityFulfilled) *
                    product.quantity * product.unitPrice.gross.amount
                ) ? (
                  // <Money
                  //   money={{
                  //     amount:
                  //       (product.quantity - product.quantityFulfilled) *
                  //       product.unitPrice.gross.amount,
                  //     currency: product.unitPrice.gross.currency
                  //   }}
                  // />
                  <Money
                    money={{
                      amount: product.quantity * product.unitPrice.gross.amount,
                      currency: product.unitPrice.gross.currency
                    }}
                  />
                ) : (
                  ""
                  // <Skeleton />
                )}</Text>
                  </View>
              </View>
            ))}
            <View style={{
                alignItems: 'center',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'row',
                fontSize: "8",
                justifyContent: 'space-between',
                marginTop: 1,
                padding: 5,
                textTransform: 'uppercase',
                width: '100%'
              }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: '33%'
                  }}
                >
                  <Text>Subtotal</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '33%'
                  }}
                >
                  <Text>
                  {maybe(() => data.info.node.lines) === undefined ? (
                    ""
                    // <Skeleton />
                  ) : (
                    <FormattedMessage
                      defaultMessage="{quantity} items"
                      description="ordered products"
                      values={{
                        quantity: data.info.node.lines
                          .map(line => line.quantity)
                          .reduce((curr, prev) => prev + curr, 0)
                      }}
                    />
                  )}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '33%'
                  }}
                >
                  <Text>{maybe(() => data.info.node.subtotal.gross) === undefined ? (
                    ""
                    // <Skeleton />
                  ) : (
                    <Money money={data.info.node.subtotal.gross} />
                  )}</Text>
                </View>
              </View>
              <View style={{
                alignItems: 'center',
                backgroundColor: 'white',
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
                    width: '33%'
                  }}
                >
                  <Text>Shipping</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '33%'
                  }}
                >
                  <Text>
                  {maybe(() => data.info.node.shippingMethodName) === undefined &&
                  maybe(() => data.info.node.shippingPrice) === undefined ? (
                    ""
                    // <Skeleton />
                  ) : data.info.node.shippingMethodName === null ? (
                    <>
                    <FormattedMessage
                      defaultMessage="does not apply"
                      description="order does not require shipping"
                      id= "orderPaymentShippingDoesNotApply"
                    />
                    </>
                  ) : (
                    data.info.node.shippingMethodName
                  )}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '33%'
                  }}
                >
                  <Text>{maybe(() => data.info.node.shippingPrice.gross) === undefined ? (
                    ""
                    // <Skeleton />
                  ) : (
                    <Money money={data.info.node.shippingPrice.gross} />
                  )}</Text>
                </View>
              </View>
              <View style={{
                alignItems: 'center',
                backgroundColor: 'white',
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
                  <Text style={{fontWeight: "bold"}}>{maybe(() => data.info.node.total.gross) === undefined ? (
                    ""
                    // <Skeleton />
                  ) : (
                    <Money money={data.info.node.total.gross} />
                  )}</Text>
                </View>
              </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
