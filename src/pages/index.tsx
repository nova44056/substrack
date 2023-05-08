import Head from "next/head";

export default function Home() {
  return <></>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}
