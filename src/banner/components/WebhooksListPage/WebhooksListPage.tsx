import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
// import DeleteImage from "../../../../assets/images/delete.svg"
import { sectionNames } from "@saleor/intl";

import { TypeImagesDelete, TypeImagesUpload } from "../../mutations"
import { TypedBannerImagesQuery } from "../../queries"

export interface WebhooksListPageProps {
  onBack: () => void;

}
let fileObj = [];
let fileArray = [];
let totalFinal = [];

const WebhooksListPage: React.StatelessComponent<WebhooksListPageProps> = ({
  onBack
}) => {
  const intl = useIntl();
  const [, setFile] = useState([null]);
  // const [total, setTotal] = useState([null]);
  const [, setName] = useState("");
  const uploadMultipleFiles = (e) => {

    fileObj.push(e.target.files)
    // for (let i = 0; i < fileObj[0].length; i++) {
    //   const url = URL.createObjectURL(fileObj[0][i])
    //   fileArray.push(url)
    //   totalFinal.push({ file: fileObj[0][i], url })
    // }

    fileObj[0].forEach((value) => {
      const url = URL.createObjectURL(value)
      fileArray.push(url)
      totalFinal.push({ file: value, url })
    });
    setFile(fileArray)
  }


  const removeImage = (url) => {


    const filteredTotal = totalFinal.filter((value) => {
      return value.url !== url
    })


    totalFinal = filteredTotal

    const filteredImages = fileArray.filter(value => value !== url)
    fileArray = filteredImages
    setName(url)
  }

  const filterFinalImageFile = () => {
    return new Promise((resolve) => {
      const updateArray = [];
      totalFinal.map((item) => updateArray.push(item.file))
      resolve(updateArray);

    })

  }

  const showUpdateData = () => {

    // alert("You have successfully deleted image")
    // window.location.reload()
    setName("tttt")

  }
  return (
    <>
      <TypedBannerImagesQuery>
        {({ data, loading, refetch }) => {
          if (loading) {
            return (<h3>loding..</h3>)
          }
          else {


            return (
              <TypeImagesUpload onCompleted={async ({ shopBannerCreate: { errors } }) => {

                if (errors.length) {
                  alert("Error occure try again.")
                }
                else {
                  refetch()
                  fileObj = [];
                  fileArray = [];
                  totalFinal = [];
                }

              }}>
                {(imageUpload) => {

                  const handleSubmit = () => {
                    filterFinalImageFile().then((data) => {
                      imageUpload({
                        variables: {
                          images: data
                        }
                      })
                    })
                  }
                  return (
                    <Container>
                      <AppHeader onBack={onBack}>
                        {intl.formatMessage(sectionNames.configuration)}
                      </AppHeader>
                      <PageHeader title={intl.formatMessage(sectionNames.imagesBanner)}>
                        <Button onClick={() => handleSubmit()} variant="contained" color="primary">
                          <FormattedMessage
                            defaultMessage="Save"
                            description="button"
                          />
                        </Button>
                      </PageHeader>
                      <Card>
                        <form>

                          <div className="form-group">
                            <input type="file" className="form-control" onChange={(e) => uploadMultipleFiles(e)} multiple accept="image/*" />
                          </div>
                          {/* {fileArray.length > 0 ? <button type="button" className="btn btn-danger btn-block" onClick={(e) => uploadFiles(e)}>Save.</button> : ""} */}
                          <div className="form-group multi-preview">
                            {(fileArray || []).map(url => (
                              <img src={url} alt="..." height="200px" width="200px" onClick={() => removeImage(url)} style={{ margin: "10px" }} />
                            ))}
                          </div>
                        </form >

                        <TypeImagesDelete onCompleted={async ({ shopBannerDelete: { shopErrors } }) => {

                          if (shopErrors.length) {
                            alert("Error occure try again.")
                          }
                          else {
                            refetch()
                            showUpdateData()
                          }

                        }}>
                          {(imageDelete) => {

                            const handleSubmitDelete = (id) => {
                              imageDelete({
                                variables: {
                                  ids: id
                                }
                              })
                            }
                            return (
                              data.shop.banners && data.shop.banners.map(url =>
                                <div className="bannerImg">
                                  {/* <img src={DeleteImage} className="delIcon"/> */}
                                  <img src={url.image} alt="..." height="200px" width="200px" onClick={() => handleSubmitDelete(url.id)} style={{ margin: "10px" }} />
                                </div>

                              )
                            )
                          }}

                        </TypeImagesDelete>

                      </Card>
                    </Container>);
                }}
              </TypeImagesUpload>

            )



          }
        }}
      </TypedBannerImagesQuery>






    </>
  );
};
WebhooksListPage.displayName = "WebhooksListPage";
export default WebhooksListPage;
