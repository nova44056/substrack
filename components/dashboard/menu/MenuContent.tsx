import { DASHBOARD_MENU_KEYS } from "../enum";
import React from "react";
import { YOUR_SUBSCRIPTIONS } from "./YOUR_SUBSCRIPTIONS";
import { COMMUNITY_THREAD } from "./COMMUNITY_THREAD";
import { SETTING } from "./SETTING";

type Props = {
  tab: DASHBOARD_MENU_KEYS;
};

export const MenuContent = (props: Props) => {
  switch (props.tab) {
    case DASHBOARD_MENU_KEYS.YOUR_SUBSCRIPTIONS:
      return <YOUR_SUBSCRIPTIONS />;
    case DASHBOARD_MENU_KEYS.COMMUNITY_THREAD:
      return <COMMUNITY_THREAD />;
    case DASHBOARD_MENU_KEYS.SETTING:
      return <SETTING />;
    default:
      return <></>;
  }
};
