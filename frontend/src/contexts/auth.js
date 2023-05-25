import { useSession, signIn } from "next-auth/react"
import { createContext } from "react";

export const AuthContext = createContext({ undefined });
export const AuthProvider = (props) => {
  const { children } = props;
  const { data: session } = useSession()

  if (session) {
    console.log(session.user.email);
  } else {
    signIn("github");
  }

  return (
    <AuthContext.Provider
      value={{
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export const AuthConsumer = AuthContext.Consumer;
export const useAuthContext = () => useContext(AuthContext);