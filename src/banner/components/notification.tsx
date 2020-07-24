import React from "react"

import Button from "@material-ui/core/Button";

import { FormattedMessage } from "react-intl";
const Notification = () => {


    const handlePushNotification = () => {


    }
    return (

        <>

            <input type="text" />
            <textarea />
            <Button onClick={() => handlePushNotification()} variant="contained" color="primary">
                <FormattedMessage
                    defaultMessage="Save"
                    description="button"
                />
            </Button>

        </>
    )
}

export default Notification;