import { Box, Button, TextField } from "@mui/material";
import { createContext, useState, useEffect } from "react";
import MD5 from "crypto-js/md5";

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const constantMd5Password = "d1816a8b1ed276e2d6b42b45e54bb219"; // The correct hash

  // On component mount, check if a password is saved in localStorage
  useEffect(() => {
    const storedPasswordHash = localStorage.getItem("passwordHash");
    if (storedPasswordHash) {
      const autoLoginHash = MD5("b6ec9d3e4b2ac735a6f98742ddecb027" + storedPasswordHash).toString();
      if (autoLoginHash === constantMd5Password) {
        setUser({ name: "moonblade" });
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogin = () => {
    const hashedPassword = MD5("b6ec9d3e4b2ac735a6f98742ddecb027" + password).toString();
    if (username === "moonblade" && hashedPassword === constantMd5Password) {
      setUser({ name: "moonblade" });
      setIsLoggedIn(true);
      localStorage.setItem("passwordHash", password); // Store the plain password in localStorage
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setUser({});
    setIsLoggedIn(false);
    localStorage.removeItem("passwordHash"); // Clear stored password
  };

  if (!isLoggedIn) {
    return (
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" onClick={handleLogin}>
          Sign In
        </Button>
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        signOut: handleLogout,
        user,
      }}
    >
      {user.name === "moonblade" && children}
      {user.name !== "moonblade" && (
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Button variant="outlined">You aren't me, go away</Button>
        </Box>
      )}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
export const useAuthContext = () => useContext(AuthContext);
