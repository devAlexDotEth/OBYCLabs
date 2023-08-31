
import {
  Web3Button,
  useAddress,
  useDisconnect
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import styles from "../styles/Theme.module.css";
import {
  url3,
  originalAddressObycLab,
} from "../components/utils/consts";
import { disconnect } from "process";
import TabPanelComponent from "./TabPanelComponent"
const Transform = () => {

  //thirdweb hooks
  const address = useAddress()
  const [walletAddress, setWalletAddress] = useState(undefined);
  useEffect(() => {
    setWalletAddress(address)
  }, [address])
  const tabs = [
    {
      title: 'Tab 1',
      content: <p>This is the content of Tab 1.</p>,
    },
    {
      title: 'Tab 2',
      content: <p>This is the content of Tab 2.</p>,
    },
    {
      title: 'Tab 3',
      content: <p>This is the content of Tab 3.</p>,
    },
  ];
  return (
    <>

      <div className={styles.transformContainer} >
        {
          walletAddress != undefined ? <>
            <TabPanelComponent tabs={tabs}/>
            <button
              onClick={() => disconnect()}

            >
              Disconnect
            </button>


          </>
            :
            <>
              <Web3Button
                contractAddress={originalAddressObycLab}
                action={async (contract) =>
                  console.log('l')
                }
                // If the function is successful, we can do something here.
                onSuccess={(_result) => window.open(url3, "_blank")}
                // If the function fails, we can do something here.
                onError={(error) => alert(error?.message)}
                accentColor="#060606"
                colorMode="dark"
                className="botonMint"
              >
                Bio-Infused Honey Bid Coming Soon
              </Web3Button>
            </>
        }
      </div>
    </>

  );
};

export default Transform;

