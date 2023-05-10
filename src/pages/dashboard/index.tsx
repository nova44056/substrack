import { signOut } from "firebase/auth";
import { Button } from "../../../components/button";
import { AddSubscriptionServices } from "../../../components/dashboard/add-subscription-services";
import { Layout } from "../../../components/layout";
import { AuthContext } from "../../../context";
import { auth } from "../../../firebase";
import { IAuthContext } from "../../../interface";
import { isPrivateRoute } from "../../../routes";
import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Dashboard.module.css";
import { MENUS } from "../../../components/dashboard/constants";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { MenuContent } from "../../../components/dashboard/menu";
import { DASHBOARD_MENU_KEYS } from "../../../components/dashboard/enum";

function Dashboard() {
  const { currentUser } = React.useContext(AuthContext) as IAuthContext;

  const router = useRouter();

  const [menus, setMenus] = React.useState(MENUS);

  const { tab } = router.query;

  return (
    <Layout>
      <aside className={styles.leftContainer}>
        <ul className={styles.menu}>
          <h1>Welcome, {currentUser?.displayName?.split(" ")[0]}</h1>
          {menus.map((menu) => (
            <li
              className={menu.key === tab ? styles.active : ""}
              key={menu.key}
            >
              <Link href={menu.href}>{menu.label}</Link>
            </li>
          ))}
        </ul>

        <Button.PrimaryOutline
          style={{ width: "auto" }}
          onClick={() => {
            signOut(auth).then(() => {
              router.push("/");
            });
          }}
        >
          Logout
        </Button.PrimaryOutline>
      </aside>
      <section className={styles.rightContainer}>
        <MenuContent tab={tab as DASHBOARD_MENU_KEYS} />
      </section>
    </Layout>
  );
}

export default isPrivateRoute(Dashboard);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  if (!query.tab)
    return {
      redirect: {
        destination: MENUS[0].href,
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
