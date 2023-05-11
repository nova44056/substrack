import Link from "next/link";
import { Layout } from "../../../components/layout";
import styles from "../../styles/Login.module.css";
import { Spacer } from "../../../components/spacer";
import { LoginForm } from "../../../components/login";
import { ILoginUserDto } from "../../../interface";
import React from "react";
import { LoginContext } from "../../../context";
import { auth } from "../../../firebase";
import { isPublicRoute } from "../../../routes";

function Login() {
  const [payload, setPayload] = React.useState<ILoginUserDto>({
    email: "",
    password: "",
  });

  return (
    <LoginContext.Provider
      value={{
        payload,
        setPayload,
      }}
    >
      <Layout>
        <aside className={styles.leftContainer}>
          <h1>SubsTrack</h1>
          <p style={{ fontSize: "14px" }}>
            SubsTrack is a web application designed to help you manage your
            subscription payments and track your finances in one easy-to-use
            platform. With SubsTrack, you can quickly and easily view all of
            your active subscriptions, set reminders for upcoming payments, and
            track your spending on subscription services. Our user-friendly
            interface makes it simple to add or remove subscriptions, update
            payment information, and view detailed analytics about your
            subscription habits. With SubsTrack, you can take control of your
            subscriptions and achieve your financial goals with ease. Sign up
            today and start managing your subscriptions like a pro!
          </p>
        </aside>
        <section className={styles.rightContainer}>
          <h2>Welcome to SubsTrack,</h2>
          <h2>Sign In to Continue</h2>
          <div>
            <span>Don't have an account?</span>
            <Spacer direction="horizontal" size={1} />
            <Link href="/register">Create a account</Link>
          </div>
          <Spacer direction="vertical" size={32} />
          <LoginForm />
        </section>
      </Layout>
    </LoginContext.Provider>
  );
}

export default isPublicRoute(Login);
