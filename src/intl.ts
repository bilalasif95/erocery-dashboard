import { defineMessages, IntlShape } from "react-intl";

export const commonMessages = defineMessages({
  availability: {
    defaultMessage: "Availability"
  },
  catalog: {
    defaultMessage: "Catalog"
  },
  dashboard: {
    defaultMessage: "Dashboard"
  },
  description: {
    defaultMessage: "Description"
  },
  discounts: {
    defaultMessage: "Discounts"
  },
  drafts: {
    defaultMessage: "Drafts"
  },
  email: {
    defaultMessage: "E-mail Address"
  },
  endDate: {
    defaultMessage: "End Date"
  },
  endHour: {
    defaultMessage: "End Hour"
  },
  firstName: {
    defaultMessage: "First Name"
  },
  generalInformations: {
    defaultMessage: "General Informations"
  },
  lastName: {
    defaultMessage: "Last Name"
  },
  no: {
    defaultMessage: "No"
  },
  optionalField: {
    defaultMessage: "Optional",
    description: "field is optional"
  },
  phone: {
    defaultMessage: "Phone Number",
    description: "Format:- 03xxxxxxxxx"
  },
  properties: {
    defaultMessage: "Properties"
  },
  readOnly: {
    defaultMessage: "Erocery runs in read-only mode. Changes not saved."
  },
  requiredField: {
    defaultMessage: "This field is required"
  },
  savedChanges: {
    defaultMessage: "Saved changes"
  },
  somethingWentWrong: {
    defaultMessage: "Erocery ran into an unexpected problem"
  },
  startDate: {
    defaultMessage: "Start Date"
  },
  startHour: {
    defaultMessage: "Start Hour"
  },
  summary: {
    defaultMessage: "Summary"
  },
  uploadImage: {
    defaultMessage: "Upload image",
    description: "button"
  },
  yes: {
    defaultMessage: "Yes"
  }
});

export const buttonMessages = defineMessages({
  back: {
    defaultMessage: "Back",
    description: "button"
  },
  cancel: {
    defaultMessage: "Cancel",
    description: "button"
  },
  confirm: {
    defaultMessage: "Confirm",
    description: "button"
  },
  delete: {
    defaultMessage: "Delete",
    description: "button"
  },
  done: {
    defaultMessage: "Done",
    description: "button"
  },
  edit: {
    defaultMessage: "Edit",
    description: "button"
  },
  manage: {
    defaultMessage: "Manage",
    description: "button"
  },
  remove: {
    defaultMessage: "Remove",
    description: "button"
  },
  save: {
    defaultMessage: "Save",
    description: "button"
  },
  show: {
    defaultMessage: "Show",
    description: "button"
  },
  undo: {
    defaultMessage: "Undo",
    description: "button"
  }
});

export const sectionNames = defineMessages({
  attributes: {
    defaultMessage: "Attributes",
    description: "attributes section name"
  },
  blogs: {
    defaultMessage: "Blogs",
    description: "blogs section name"
  },
  categories: {
    defaultMessage: "Categories",
    description: "categories section name"
  },
  collections: {
    defaultMessage: "Collections",
    description: "collections section name"
  },
  configuration: {
    defaultMessage: "Configuration",
    description: "configuration section name"
  },
  customers: {
    defaultMessage: "Customers",
    description: "customers section name"
  },
  draftOrders: {
    defaultMessage: "Draft Orders",
    description: "draft orders section name"
  },
  home: {
    defaultMessage: "Home",
    description: "home section name"
  },
  imagesBanner: {
    defaultMessage: "Images Banner",
    description: "Images section name"
  },
  navigation: {
    defaultMessage: "Navigation",
    description: "navigation section name"
  },
  notification: {
    defaultMessage: "Push Notification",
    description: "Notification section name"
  },
  orders: {
    defaultMessage: "Orders",
    description: "orders section name"
  },
  ordersList: {
    defaultMessage: "Orders List",
    description: "orders section name"
  },
  pages: {
    defaultMessage: "Pages",
    description: "pages section name"
  },
  plugins: {
    defaultMessage: "Plugins",
    description: "plugins section name"
  },
  productTypes: {
    defaultMessage: "Product Types",
    description: "product types section name"
  },
  products: {
    defaultMessage: "Products",
    description: "products section name"
  },
  rider: {
    defaultMessage: "Rider List",
    description: "rider list section name"
  },
  sales: {
    defaultMessage: "Sales",
    description: "sales section name"
  },
  serviceAccounts: {
    defaultMessage: "Service Accounts",
    description: "service accounts section name"
  },
  shipping: {
    defaultMessage: "Shipping Methods",
    description: "shipping section name"
  },
  shop: {
    defaultMessage: "Store/Shop",
    description: "shop section name"
  },
  shopPageHeader: {
    defaultMessage: "Orders Received",
    description: "shop header section name"
  },
  siteSettings: {
    defaultMessage: "Site Settings",
    description: "site settings section name"
  },
  staff: {
    defaultMessage: "Staff Members",
    description: "staff section name"
  },
  taxes: {
    defaultMessage: "Taxes",
    description: "taxes section name"
  },
  translations: {
    defaultMessage: "Translations",
    description: "translations section name"
  },
  vouchers: {
    defaultMessage: "Vouchers",
    description: "vouchers section name"
  },
  webhooks: {
    defaultMessage: "Webhooks",
    description: "webhooks section name"
  },
});

export function translateBoolean(value: boolean, intl: IntlShape): string {
  return value
    ? intl.formatMessage(commonMessages.yes)
    : intl.formatMessage(commonMessages.no);
}
