import type { AppProps } from "next/app";

import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { Provider } from "react-redux";
import { wrapper } from "../store";

import Navbar from "../components/navbar";

const theme = extendTheme({
  colors: {
    brand: {
      900: "#63171B",
      800: "#822727",
      700: "#9B2C2C",
      600: "#C53030",
      500: "#E53E3E",
      400: "#f95723",
      300: "#FC8181",
      200: "#FEB2B2",
      100: "#FED7D7",
      50: "#FFF5F5",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
