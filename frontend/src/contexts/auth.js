import { Box, Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { createContext, useState } from "react";

export const AuthContext = createContext({ undefined });
export const AuthProvider = (props) => {
  const { children } = props;
  const { data: session } = useSession();
  const [user, setUser] = useState({});

  if (session) {
    if (user != session.user) {
      setUser(session.user);
    }
  } else {
    if (Object.keys(user).length != 0) {
      setUser({});
    }
    return (
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button variant="outlined" onClick={() => signIn("github")}>
          Sign In (Github)
        </Button>
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        signOut,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
export const useAuthContext = () => useContext(AuthContext);