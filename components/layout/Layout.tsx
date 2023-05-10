import styles from "./Layout.module.css";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <main className={styles.container}>{children}</main>;
};
