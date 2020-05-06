import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

// import AppHeader from "@saleor/components/AppHeader";
import { Container } from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
// import SearchBar from "@saleor/components/SearchBar";
import { sectionNames } from "@saleor/intl";
import { ListProps, SearchPageProps, TabPageProps } from "@saleor/types";
import { StaffList_staffUsers_edges_node } from "../../types/StaffList";
import StaffList from "../StaffList/StaffList";

export interface StaffListPageProps
  extends ListProps,
    SearchPageProps,
    TabPageProps {
  staffMembers: StaffList_staffUsers_edges_node[];
  onAdd: () => void;
  onBack: () => void;
}

const StaffListPage: React.StatelessComponent<StaffListPageProps> = ({
  // currentTab,
  // initialSearch,
  onAdd,
  // onAll,
  // onBack,
  // onSearchChange,
  // onTabChange,
  // onTabDelete,
  // onTabSave,
  // tabs,
  ...listProps
}) => {
  const intl = useIntl();

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.rider)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage
            defaultMessage="Add Rider"
            description="button"
          />
        </Button>
      </PageHeader>
      <StaffList {...listProps} />
      {/* <Card>
        <SearchBar
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Staff Members",
            description: "tab name"
          })}
          currentTab={currentTab}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Staff Member"
          })}
          tabs={tabs}
          onAll={onAll}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <StaffList {...listProps} />
      </Card> */}
    </Container>
  );
};
StaffListPage.displayName = "StaffListPage";
export default StaffListPage;
