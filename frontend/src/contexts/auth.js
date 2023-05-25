export const AuthContext = createContext({ undefined });
import { useSession, signIn, signOut } from "next-auth/react"

export const AuthProvider = (props) => {
  const { children } = props;
  const { data: session } = useSession()

  if (session) {
    console.log(session.user.email);
  } else {
    console.log("Here")
    // signIn("github");
  }

  return (
    <ExpenseContext.Provider
      value={{
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);