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

function Dashboard() {
  const { currentUser } = React.useContext(AuthContext) as IAuthContext;
  const router = useRouter();

  return (
    <Layout>
      <aside className={styles.leftContainer}>
        <ul className={styles.menu}>
          <h1>Welcome, {currentUser?.displayName?.split(" ")[0]}</h1>
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
        <AddSubscriptionServices />
      </section>
    </Layout>
  );
}

export default isPrivateRoute(Dashboard);
