import React from "react";
import { IntlShape, useIntl } from "react-intl";

// import { attributeListUrl } from "@saleor/attributes/urls";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useUser from "@saleor/hooks/useUser";
// import Attributes from "@saleor/icons/Attributes";
// import Bot from "@saleor/icons/Bot";
// import Navigation from "@saleor/icons/Navigation";
// import Pages from "@saleor/icons/Pages";
// import Plugins from "@saleor/icons/Plugins";
// import ProductTypes from "@saleor/icons/ProductTypes";
// import ShippingMethods from "@saleor/icons/ShippingMethods";
// import SiteSettings from "@saleor/icons/SiteSettings";
// import StaffMembers from "@saleor/icons/StaffMembers";
// import Taxes from "@saleor/icons/Taxes";
// import Webhooks from "@saleor/icons/Webhooks";
import { sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";
// import { menuListUrl } from "@saleor/navigation/urls";
// import { pageListUrl } from "@saleor/pages/urls";
// import { pluginsListUrl } from "@saleor/plugins/urls";
// import { productTypeListUrl } from "@saleor/productTypes/urls";
// import { serviceListUrl } from "@saleor/services/urls";
// import { shippingZonesListUrl } from "@saleor/shipping/urls";
// import { siteSettingsUrl } from "@saleor/siteSettings/urls";
// import { staffListUrl } from "@saleor/staff/urls";
// import { taxSection } from "@saleor/taxes/urls";
import { PermissionEnum } from "@saleor/types/globalTypes";
// import { webhooksListUrl } from "@saleor/webhooks/urls";
import ShopPage, { MenuSection } from "./ShopPage";

export function createConfigurationMenu(intl: IntlShape): MenuSection[] {
  return [
    {
      label: intl.formatMessage({
        defaultMessage: "Orders Received"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "See the order received",
            id: "configurationMenuAttributes"
          }),
          icon: <></>,
          permission: PermissionEnum.MANAGE_PRODUCTS,
          title: "Sargodha",
          // url: attributeListUrl()
        },
        {
          description: intl.formatMessage({
            defaultMessage: "See the order received",
            id: "configurationMenuProductTypes"
          }),
          icon: <></>,
          permission: PermissionEnum.MANAGE_PRODUCTS,
          title: "Rawalpindi/Islamabad",
          // url: productTypeListUrl()
        }
      ]
    },
  ];
}

export const configurationMenuUrl = "/shop/";

export const ShopSection: React.FC = () => {
  const navigate = useNavigator();
  const user = useUser();
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.shop)} />
      <ShopPage
        menu={createConfigurationMenu(intl)}
        user={maybe(() => user.user)}
        onSectionClick={navigate}
      />
    </>
  );
};
export default ShopSection;
