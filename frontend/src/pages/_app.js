import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useNProgress } from "src/hooks/use-nprogress";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";
import { ExpenseProvider } from "src/contexts/expenses";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "src/contexts/auth";

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Expenses</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <AuthProvider>
              <ThemeProvider theme={theme}>
                <ExpenseProvider>
                  <CssBaseline />
                  {getLayout(<Component {...pageProps} />)}
                </ExpenseProvider>
              </ThemeProvider>
            </AuthProvider>
          </LocalizationProvider>
        </CacheProvider>
      </AuthProvider>
    </SessionProvider>
  );
};

export default App;