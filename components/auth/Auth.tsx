import { User, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase";
import { AuthContext } from "../../context";

type Props = {
  children: React.ReactNode;
};

export const Auth = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <></>;

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
