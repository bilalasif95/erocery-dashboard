import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { CategoryFragment } from "@saleor/categories/types/CategoryFragment";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import SearchBar from "@saleor/components/SearchBar";
import { sectionNames } from "@saleor/intl";
import {
  ListActions,
  PageListProps,
  SearchPageProps,
  TabPageProps
} from "@saleor/types";
import CategoryList from "../CategoryList";

export interface CategoryTableProps
  extends PageListProps,
    ListActions,
    SearchPageProps,
    TabPageProps {
  categories: CategoryFragment[];
}

export const CategoryListPage: React.StatelessComponent<CategoryTableProps> = ({
  categories,
  currentTab,
  disabled,
  initialSearch,
  isChecked,
  pageInfo,
  selected,
  settings,
  tabs,
  toggle,
  toggleAll,
  toolbar,
  onAdd,
  onAll,
  onNextPage,
  onPreviousPage,
  onRowClick,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  onUpdateListSettings
}) => {
  const intl = useIntl();

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.categories)}>
      {window.localStorage.getItem("subshop") === "null" ? 
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage
            defaultMessage="Create category"
            description="button"
          />
        </Button>
        : "" }
      </PageHeader>
      <Card>
        <SearchBar
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Categories",
            description: "tab name"
          })}
          currentTab={currentTab}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Category"
          })}
          tabs={tabs}
          onAll={onAll}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <CategoryList
          categories={categories}
          disabled={disabled}
          isChecked={isChecked}
          isRoot={true}
          pageInfo={pageInfo}
          selected={selected}
          settings={settings}
          toggle={toggle}
          toggleAll={toggleAll}
          toolbar={toolbar}
          onAdd={onAdd}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onRowClick={onRowClick}
          onUpdateListSettings={onUpdateListSettings}
        />
      </Card>
    </Container>
  );
};
CategoryListPage.displayName = "CategoryListPage";
export default CategoryListPage;
