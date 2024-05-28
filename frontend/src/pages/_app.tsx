import "@/styles/globals.css";
import NavBar from "@/components/navigation/Navbar";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React, { createContext, useState } from "react";
import { MessageFlashProvider } from "@/context/MessageFlash";
import MessageFlashBar from "@/components/flashMassage.tsx/messageFlashBar";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
});

// interface NotificationContext {
//     notification: undefined,
//     notificationText: undefined,
//     success: () => void,
//     error: () => void,
// };

// const NotificationContext = createContext({
//   notification: null,
//   notificationText: null,
//   sucess: () => {},
//   error: () => {},
// });

const ThemeContext = createContext("ligth");

function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light");
  return (
    <ApolloProvider client={client}>
      <MessageFlashProvider>
        {/* <NotificationContext.Provider value={defaultValue}> */}
        <NavBar />
        <MessageFlashBar />
        <Component {...pageProps} />
      </MessageFlashProvider>
      {/* </NotificationContext.Provider> */}
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
