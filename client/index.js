import React from "react";
import { withApollo } from "react-apollo";
import Shopping from "mdi-material-ui/Shopping";
import { registerOperatorRoute } from "/imports/client/ui";
import { Marketplace } from "../components";

registerOperatorRoute({
  group: "navigation",
  mainComponent: Marketplace,
  hocs: [
    withApollo
  ],
  path: "/marketplace",
  // eslint-disable-next-line react/display-name
  SidebarIconComponent: (props) => <Shopping {...props} />,
  sidebarI18nLabel: "marketplaceSettings.sidebarLabel",
  shouldShowSidebarLink: (currentShop) => currentShop.shopType === "primary"
});
