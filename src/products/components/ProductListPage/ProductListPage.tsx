import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from '@material-ui/core/Grid';
import { Theme } from "@material-ui/core/styles";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ColumnPicker, {
  ColumnPickerChoice
} from "@saleor/components/ColumnPicker";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import { ProductListColumns } from "@saleor/config";
import useNavigator from "@saleor/hooks/useNavigator";
import { sectionNames } from "@saleor/intl";
import {
  AvailableInGridAttributes_availableInGrid_edges_node,
  AvailableInGridAttributes_grid_edges_node
} from "@saleor/products/types/AvailableInGridAttributes";
import { ProductList_products_edges_node } from "@saleor/products/types/ProductList";
import {
  FetchMoreProps,
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage
} from "@saleor/types";
import { productBulkUrl, ProductListUrlSortField } from "../../urls";
import ProductList from "../ProductList";
import ProductListFilter, { ProductFilterKeys } from "../ProductListFilter";

export interface ProductListPageProps
  extends PageListProps<ProductListColumns>,
  ListActions,
  FilterPageProps<ProductFilterKeys>,
  FetchMoreProps,
  SortPage<ProductListUrlSortField> {
  activeAttributeSortId: string;
  availableInGridAttributes: AvailableInGridAttributes_availableInGrid_edges_node[];
  currencySymbol: string;
  gridAttributes: AvailableInGridAttributes_grid_edges_node[];
  totalGridAttributes: number;
  products: ProductList_products_edges_node[];
}

const useStyles = makeStyles((theme: Theme) => ({
  bulkButton: {
    margin: "0 24px 0 0",
    width:'100%',
    [theme.breakpoints.down("xs")]: {
      margin: "0 0.5rem 1rem",
    }
  },
  columnPicker: {
    display:'flex',
    justifyContent:'flex-end',
    margin: "0 24px 0 0",
    width:'100%',
    [theme.breakpoints.down("xs")]: {
      justifyContent:'center',
      margin: "0 0 1rem",
    }
  },
  pageHead: {
    margin:'0 0 1rem'
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    //   justifyContent: "center !important"
    // }
  },
  pageTitle: {
    margin:'0',
    width: '100%',
  },
  proButton: {
    width:'100%',
    [theme.breakpoints.down("xs")]: {
      margin: "0 0.5rem 1rem",
    }
  },
  textAlign: {
    alignItems:'center',
    display: "flex",
    justifyContent: 'flex-end'
  },
}));

export const ProductListPage: React.FC<ProductListPageProps> = props => {
  const {
    currencySymbol,
    currentTab,
    defaultSettings,
    filtersList,
    gridAttributes,
    availableInGridAttributes,
    hasMore,
    initialSearch,
    loading,
    settings,
    tabs,
    totalGridAttributes,
    onAdd,
    onAll,
    onFetchMore,
    onSearchChange,
    onFilterAdd,
    onTabChange,
    onTabDelete,
    onTabSave,
    onUpdateListSettings,
    ...listProps
  } = props;
  const intl = useIntl();
  const navigate = useNavigator();
  const classes = useStyles(props);
  const handleSave = (columns: ProductListColumns[]) =>
    onUpdateListSettings("columns", columns);

  const columns: ColumnPickerChoice[] = [
    {
      label: intl.formatMessage({
        defaultMessage: "Published",
        description: "product status"
      }),
      value: "isPublished" as ProductListColumns
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Price",
        description: "product price"
      }),
      value: "price" as ProductListColumns
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Type",
        description: "product type"
      }),
      value: "productType" as ProductListColumns
    },
    ...availableInGridAttributes.map(attribute => ({
      label: attribute.name,
      value: `attribute:${attribute.id}`
    }))
  ];

  return (
    <Container>
      <Grid container className={classes.pageHead}>
        <Grid item md={3} sm={6} xs={6}>
          <PageHeader title={intl.formatMessage(sectionNames.products)} className={classes.pageTitle} />
        </Grid>
        <Grid item md={3} sm={6} xs={6} className={classes.textAlign}>
          <ColumnPicker
            className={classes.columnPicker}
            columns={columns}
            defaultColumns={defaultSettings.columns}
            hasMore={hasMore}
            loading={loading}
            initialColumns={settings.columns}
            total={
              columns.length -
              availableInGridAttributes.length +
              totalGridAttributes
            }
            onFetchMore={onFetchMore}
            onSave={handleSave}
          />
        </Grid>
        {window.localStorage.getItem("subshop") === "null" ?
        <>
        <Grid item md={3} sm={6} xs={6} className={classes.textAlign}>
          <Button
            onClick={() => navigate(productBulkUrl)}
            color="primary"
            className={classes.bulkButton}
            variant="contained"
            data-tc="add-product"
          >
            <FormattedMessage
              defaultMessage="Upload Bulk Items"
              description="button"
            />
          </Button>
        </Grid>
        <Grid item md={3} sm={6} xs={6} className={classes.textAlign}>
          <Button
            onClick={onAdd}
            color="primary"
            className={classes.proButton}
            variant="contained"
            data-tc="add-product"
          >
            <FormattedMessage
              defaultMessage="Create Product"
              description="button"
            />
          </Button>
        </Grid>
        </>
        : "" }
      </Grid>
      {/* <PageHeader title={intl.formatMessage(sectionNames.products)} className={classes.pageTitle}>

        <ColumnPicker
          className={classes.columnPicker}
          columns={columns}
          defaultColumns={defaultSettings.columns}
          hasMore={hasMore}
          loading={loading}
          initialColumns={settings.columns}
          total={
            columns.length -
            availableInGridAttributes.length +
            totalGridAttributes
          }
          onFetchMore={onFetchMore}
          onSave={handleSave}
        />
        <Button
          onClick={() => navigate(productBulkUrl)}
          color="primary"
          className={classes.bulkButton}
          variant="contained"
          data-tc="add-product"
        >
          <FormattedMessage
            defaultMessage="Upload Bulk Items"
            description="button"
          />
        </Button>
        <Button
          onClick={onAdd}
          color="primary"
          className={classes.proButton}
          variant="contained"
          data-tc="add-product"
        >
          <FormattedMessage
            defaultMessage="Create Product"
            description="button"
          />
        </Button>
      </PageHeader> */}
      <Card>
        <ProductListFilter
          currencySymbol={currencySymbol}
          currentTab={currentTab}
          filtersList={filtersList}
          initialSearch={initialSearch}
          onAll={onAll}
          onFilterAdd={onFilterAdd}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
          tabs={tabs}
        />
        <ProductList
          {...listProps}
          gridAttributes={gridAttributes}
          settings={settings}
          onUpdateListSettings={onUpdateListSettings}
        />
      </Card>
    </Container>
  );
};
ProductListPage.displayName = "ProductListPage";
export default ProductListPage;
