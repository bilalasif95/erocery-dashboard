import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { sectionNames } from "@saleor/intl";
import { WindowTitle } from "../components/WindowTitle";
import {
  staffListPath,
  StaffListUrlQueryParams,
  staffMemberDetailsPath,
  // StaffMemberDetailsUrlQueryParams,
} from "./urls";
import StaffDetailsComponent from "./views/StaffDetails";
import StaffListComponent from "./views/StaffList";

const StaffList: React.StatelessComponent<RouteComponentProps<{}>> = ({
  location,
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: StaffListUrlQueryParams = qs;
  return <StaffListComponent params={params} />;
};

interface StaffDetailsRouteProps {
  id: string;
}
const StaffDetails: React.StatelessComponent<RouteComponentProps<
  StaffDetailsRouteProps
>> = ({ match }) => {
  return (
    <StaffDetailsComponent
      id={decodeURIComponent(match.params.id)}
      // params={"parms"}
      riderInfo={[]}
    />
  );
};

const Component = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.rider)} />
      <Switch>
        <Route exact path={staffListPath} component={StaffList} />
        <Route path={staffMemberDetailsPath(":id")} component={StaffDetails} />
      </Switch>
    </>
  );
};

export default Component;
