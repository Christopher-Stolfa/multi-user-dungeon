import { WebsocketProvider } from "@/contexts/WebsocketProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <WebsocketProvider>
        <Component {...pageProps} />
      </WebsocketProvider>
    </ChakraProvider>
  );
};

export default App;
