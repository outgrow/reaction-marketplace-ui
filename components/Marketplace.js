import React, { useState, Fragment } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PrimaryAppBar from "/imports/client/ui/components/PrimaryAppBar/PrimaryAppBar";
import Invitations from "./Invitations";
import ShopTable from "./ShopTable";

export default function Marketplace() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Fragment>
      <PrimaryAppBar title="Marketplace" />

      <Tabs value={currentTab} onChange={(event, value) => setCurrentTab(value)}>
        <Tab label="Shops" />
        <Tab label="Invitations" />
      </Tabs>

      {currentTab === 0 &&
        <ShopTable />
      }

      {currentTab === 1 &&
        <Invitations />
      }
    </Fragment>
  );
}
