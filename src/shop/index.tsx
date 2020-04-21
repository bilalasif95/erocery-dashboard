import React from "react";
import { IntlShape, useIntl } from "react-intl";

import { attributeListUrl } from "@saleor/attributes/urls";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useUser from "@saleor/hooks/useUser";
import Attributes from "@saleor/icons/Attributes";
// import Bot from "@saleor/icons/Bot";
// import Navigation from "@saleor/icons/Navigation";
// import Pages from "@saleor/icons/Pages";
// import Plugins from "@saleor/icons/Plugins";
import ProductTypes from "@saleor/icons/ProductTypes";
// import ShippingMethods from "@saleor/icons/ShippingMethods";
// import SiteSettings from "@saleor/icons/SiteSettings";
// import StaffMembers from "@saleor/icons/StaffMembers";
// import Taxes from "@saleor/icons/Taxes";
// import Webhooks from "@saleor/icons/Webhooks";
import { commonMessages,sectionNames } from "@saleor/intl";
import { getMutationState,maybe } from "@saleor/misc";
// import { menuListUrl } from "@saleor/navigation/urls";
// import { pageListUrl } from "@saleor/pages/urls";
// import { pluginsListUrl } from "@saleor/plugins/urls";
import { productTypeListUrl } from "@saleor/productTypes/urls";
// import { serviceListUrl } from "@saleor/services/urls";
// import { shippingZonesListUrl } from "@saleor/shipping/urls";
// import { siteSettingsUrl } from "@saleor/siteSettings/urls";
// import { staffListUrl } from "@saleor/staff/urls";
// import { taxSection } from "@saleor/taxes/urls";
import { PermissionEnum } from "@saleor/types/globalTypes";
// import { webhooksListUrl } from "@saleor/webhooks/urls";
import ConfigurationPage, { MenuSection } from "./ConfigurationPage";
import { TypedStaffMemberAddMutation } from "./mutations";
import { TypedStaffListQuery } from "./queries";

import { StaffMemberAdd } from "../staff/types/StaffMemberAdd";

import {
  staffListUrl,
  StaffListUrlQueryParams,
  staffMemberDetailsUrl
} from "./urls";

import StaffAddMemberDialog, {
  FormData as AddStaffMemberForm
} from "./StaffAddMemberDialog";

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
          icon: <Attributes fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_PRODUCTS,
          title: "Sargodha",
          url: attributeListUrl()
        },
        {
          description: intl.formatMessage({
            defaultMessage: "See the order received",
            id: "configurationMenuProductTypes"
          }),
          icon: <ProductTypes fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_PRODUCTS,
          title: "Rawalpindi/Islamabad",
          url: productTypeListUrl()
        }
      ]
    },
  ];
}

export const configurationMenuUrl = "/shop/";

interface StaffListProps {
  params: StaffListUrlQueryParams;
}

export const ShopSection: React.FC<StaffListProps> = params => {
  const navigate = useNavigator();
  const user = useUser();
  const notify = useNotifier();
  const intl = useIntl();
  const closeModal = () =>
    navigate(
      staffListUrl({
        ...params,
        action: undefined,
        ids: undefined
      }),
      true
    );

    return (
      <TypedStaffListQuery displayLoader>
        {() => {
          const handleStaffMemberAddSuccess = (data: StaffMemberAdd) => {
            if (data.staffCreate.errors.length === 0) {
              notify({
                text: intl.formatMessage(commonMessages.savedChanges)
              });
              navigate(staffMemberDetailsUrl(data.staffCreate.user.id));
            }
          };
  
          return (
            <TypedStaffMemberAddMutation
              onCompleted={handleStaffMemberAddSuccess}
            >
              {(addStaffMember, addStaffMemberData) => {
                const handleStaffMemberAdd = (variables: AddStaffMemberForm) =>
                  addStaffMember({
                    variables: {
                      input: {
                        email: variables.email,
                        firstName: variables.firstName,
                        lastName: variables.lastName,
                        // permissions: variables.fullAccess
                        //   ? maybe(() => shop.permissions.map(perm => perm.code))
                        //   : undefined,
                        // redirectUrl: urlJoin(
                        //   window.location.origin,
                        //   APP_MOUNT_URI === "/" ? "" : APP_MOUNT_URI,
                        //   newPasswordUrl().replace(/\?/, "")
                        // ),
                        sendPasswordEmail: true
                      }
                    }
                  });
                const addTransitionState = getMutationState(
                  addStaffMemberData.called,
                  addStaffMemberData.loading,
                  maybe(() => addStaffMemberData.data.staffCreate.errors)
                );
                return (
                  <>
                    <WindowTitle title={intl.formatMessage(sectionNames.shop)} />
                    <ConfigurationPage
                      menu={createConfigurationMenu(intl)}
                      user={maybe(() => user.user)}
                      onSectionClick={navigate}
                      onAdd={() =>
                        navigate(
                          staffListUrl({
                            action: "add"
                          })
                        )
                      }
                    />
                    <StaffAddMemberDialog
                      confirmButtonState={addTransitionState}
                      errors={maybe(
                        () => [],
                        []
                      )}
                      open={params.action === "add"}
                      onClose={closeModal}
                      onConfirm={handleStaffMemberAdd}
                    />
                  </>
                );
              }}
              </TypedStaffMemberAddMutation>
            );
          }}
        </TypedStaffListQuery>
      );
};
export default ShopSection;
