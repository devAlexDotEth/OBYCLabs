import {  ThirdwebProvider } from "@thirdweb-dev/react";
import { Header } from '../components/common'
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const AnyComponent = Component
  return (
    <>
     <ThirdwebProvider
      activeChain="ethereum" clientId={"cb350418d6eb2571cb5af9e8bdf880da"}
    >
        <Header />
        <AnyComponent {...pageProps} />
    </ThirdwebProvider>
    </>
   
  );
}

export default MyApp;
