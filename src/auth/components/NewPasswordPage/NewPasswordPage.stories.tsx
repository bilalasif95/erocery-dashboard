import { storiesOf } from "@storybook/react";
import React from "react";

import CardDecorator from "@saleor/storybook//CardDecorator";
import Decorator from "@saleor/storybook//Decorator";
import NewPasswordPage from "./NewPasswordPage";

storiesOf("Views / Authentication / Set up a new password", module)
  .addDecorator(CardDecorator)
  .addDecorator(Decorator)
  .add("default", () => (
    <NewPasswordPage disabled={false} onSubmit={() => undefined} error="" Submit={() => undefined} setTimer={() => undefined} timer={0} />
  ))
  .add("loading", () => (
    <NewPasswordPage disabled={true} onSubmit={() => undefined} error="" Submit={() => undefined} setTimer={() => undefined} timer={0} />
  ));
