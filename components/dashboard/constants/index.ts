import { DASHBOARD_MENU_KEYS } from "../enum";

const pathname = "/dashboard";
export const MENUS = [
  {
    label: "Your subscriptions",
    key: "your_subscriptions",
    href: pathname.concat(`?tab=${DASHBOARD_MENU_KEYS.YOUR_SUBSCRIPTIONS}`),
  },
  {
    label: "#Community Thread",
    key: "community_thread",
    href: pathname.concat(`?tab=${DASHBOARD_MENU_KEYS.COMMUNITY_THREAD}`),
  },
  {
    label: "Setting",
    key: "setting",
    href: pathname.concat(`?tab=${DASHBOARD_MENU_KEYS.SETTING}`),
  },
];
