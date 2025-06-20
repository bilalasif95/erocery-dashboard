import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { setContext } from "apollo-link-context";
import { ErrorResponse, onError } from "apollo-link-error";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { useIntl } from "react-intl";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AttributeSection from "./attributes";
import { attributeSection } from "./attributes/urls";
import Auth, { getAuthToken, removeAuthToken } from "./auth";
import AuthProvider from "./auth/AuthProvider";
import LoginLoading from "./auth/components/LoginLoading";
import SectionRoute from "./auth/components/SectionRoute";
import { hasPermission } from "./auth/misc";
import Banner from "./banner";
import BlogSection from "./blogs";
import CategorySection from "./categories";
import CollectionSection from "./collections";
import { AppProgressProvider } from "./components/AppProgress";
import { DateProvider } from "./components/Date";
import { LocaleProvider } from "./components/Locale";
import { MessageManager } from "./components/messages";
import { ShopProvider } from "./components/Shop";
import ThemeProvider from "./components/Theme";
import { WindowTitle } from "./components/WindowTitle";
import { API_URI, APP_MOUNT_URI } from "./config";
import ConfigurationSection, { createConfigurationMenu } from "./configuration";
import { CustomerSection } from "./customers";
import DiscountSection from "./discounts";
import HomePage from "./home";
import { commonMessages } from "./intl";
import NavigationSection from "./navigation";
import { navigationSection } from "./navigation/urls";
import { NotFound } from "./NotFound";
import Notification from "./notification";
import OrdersSection from "./orders";
import PageSection from "./pages";
import PluginsSection from "./plugins";
import ProductSection from "./products";
import ProductTypesSection from "./productTypes";
import RiderListSection from "./riders";
import ServiceSection from "./services";
import { serviceSection } from "./services/urls";
import ShippingSection from "./shipping";
import ShopSection from "./shops";
import SiteSettingsSection from "./siteSettings";
import StaffSection from "./staff";
import TaxesSection from "./taxes";
import TranslationsSection from "./translations";
import { PermissionEnum } from "./types/globalTypes";
import WebhooksSection from "./webhooks";

interface ResponseError extends ErrorResponse {
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
  };
}

const invalidTokenLink = onError((error: ResponseError) => {
  if (error.networkError && error.networkError.statusCode === 401) {
    removeAuthToken();
  }
});

const authLink = setContext((_, context) => {
  const authToken = getAuthToken();

  return {
    ...context,
    headers: {
      ...context.headers,
      Authorization: authToken ? `JWT ${authToken}` : null
    }
  };
});

// DON'T TOUCH THIS
// These are separate clients and do not share configs between themselves
// so we need to explicitly set them
const linkOptions = {
  credentials: "same-origin",
  uri: API_URI
};
const uploadLink = createUploadLink(linkOptions);
const batchLink = new BatchHttpLink({
  batchInterval: 100,
  ...linkOptions
});

const link = ApolloLink.split(
  operation => operation.getContext().useBatching,
  batchLink,
  uploadLink
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (obj: any) => {
      // We need to set manually shop's ID, since it is singleton and
      // API does not return its ID
      if (obj.__typename === "Shop") {
        return "shop";
      }
      return defaultDataIdFromObject(obj);
    }
  }),
  link: invalidTokenLink.concat(authLink.concat(link))
});

const App: React.FC = () => {
  const isDark = localStorage.getItem("theme") === "true";

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter basename={APP_MOUNT_URI}>
        <ThemeProvider isDefaultDark={isDark}>
          <DateProvider>
            <LocaleProvider>
              <MessageManager>
                <AppProgressProvider>
                  <ShopProvider>
                    <Routes />
                  </ShopProvider>
                </AppProgressProvider>
              </MessageManager>
            </LocaleProvider>
          </DateProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

const Routes: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <WindowTitle title={intl.formatMessage(commonMessages.dashboard)} />
      <AuthProvider>
        {({
          hasToken,
          isAuthenticated,
          tokenAuthLoading,
          tokenVerifyLoading,
          user
        }) =>
          isAuthenticated && !tokenAuthLoading && !tokenVerifyLoading ? (
            <Switch>
              <SectionRoute exact path="/" component={HomePage} />
              <SectionRoute
                permissions={[window.localStorage.getItem("subshop") === "null" ? PermissionEnum.MANAGE_PRODUCTS : PermissionEnum.VIEW_PRODUCT]}
                path="/categories"
                component={CategorySection}
              />
              <SectionRoute
                permissions={[window.localStorage.getItem("subshop") === "null" ? PermissionEnum.MANAGE_PRODUCTS : PermissionEnum.VIEW_PRODUCT]}
                path="/collections"
                component={CollectionSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_USERS]}
                path="/customers"
                component={CustomerSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_DISCOUNTS]}
                path="/discounts"
                component={DiscountSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_PAGES]}
                path="/pages"
                component={PageSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_PAGES]}
                path="/blogs"
                component={BlogSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_PLUGINS]}
                path="/plugins"
                component={PluginsSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_ORDERS]}
                path="/orders"
                component={OrdersSection}
              />
              <SectionRoute
                permissions={[window.localStorage.getItem("subshop") === "null" ? PermissionEnum.MANAGE_PRODUCTS : PermissionEnum.VIEW_PRODUCT]}
                path="/products"
                component={ProductSection}
              />
              <SectionRoute
                permissions={[window.localStorage.getItem("subshop") === "null" ? PermissionEnum.MANAGE_PRODUCTS : PermissionEnum.VIEW_PRODUCT]}
                path="/product-types"
                component={ProductTypesSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_STAFF]}
                path="/staff"
                component={StaffSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_SETTINGS]}
                path="/site-settings"
                component={SiteSettingsSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_SETTINGS]}
                path="/taxes"
                component={TaxesSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_SHIPPING]}
                path="/shipping"
                component={ShippingSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_TRANSLATIONS]}
                path="/translations"
                component={TranslationsSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_SUBSHOPS]}
                path="/shop"
                component={ShopSection}
              />
                <SectionRoute
                permissions={[PermissionEnum.VIEW_RIDER]}
                path="/riderlist"
                component={RiderListSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_WEBHOOKS]}
                path="/webhooks"
                component={WebhooksSection}
              />
               <SectionRoute
                permissions={[PermissionEnum.MANAGE_WEBHOOKS]}
                path="/banner"
                component={Banner}
              />
               <SectionRoute
                permissions={[PermissionEnum.MANAGE_WEBHOOKS]}
                path="/notification"
                component={Notification}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_MENUS]}
                path={navigationSection}
                component={NavigationSection}
              />
              <SectionRoute
                permissions={[window.localStorage.getItem("subshop") === "null" ? PermissionEnum.MANAGE_PRODUCTS : PermissionEnum.VIEW_PRODUCT]}
                path={attributeSection}
                component={AttributeSection}
              />
              <SectionRoute
                permissions={[PermissionEnum.MANAGE_SERVICE_ACCOUNTS]}
                path={serviceSection}
                component={ServiceSection}
              />
              {createConfigurationMenu(intl).filter(menu =>
                menu.menuItems.map(item => hasPermission(item.permission, user))
              ).length > 0 && (
                <SectionRoute
                  exact
                  path="/configuration"
                  component={ConfigurationSection}
                />
              )}
              <Route component={NotFound} />
            </Switch>
          ) : hasToken && tokenVerifyLoading ? (
            <LoginLoading />
          ) : (
            <Auth />
          )
        }
      </AuthProvider>
    </>
  );
};

render(<App />, document.querySelector("#dashboard-app"));
