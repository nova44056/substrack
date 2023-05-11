import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const router = useRouter();
  React.useEffect(() => {
    router.push("/login");
  }, []);

  return <></>;
}
