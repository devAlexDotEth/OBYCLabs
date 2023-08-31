import { Web3Button, useAddress, useDisconnect } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import styles from "../styles/Theme.module.css";
import { url3, originalAddressObycLab } from "../components/utils/consts";
import  TabPanelComponent  from "./TabPanelComponent";
const Transform = () => {
  //thirdweb hooks
  const disconnect=useDisconnect()
  const address = useAddress();
  const [walletAddress, setWalletAddress] = useState(undefined);
  useEffect(() => {
    setWalletAddress(address);
  }, [address]);

  async function disconnectWallet(){
    try {
      disconnect()
      setWalletAddress(null)
      
    } catch (error) {
    console.log(error , "error");
    }
  }
  return (
    <>
      <div className={styles.transformContainer}>
        {walletAddress ? (
          <>
            <TabPanelComponent  />
            <button
              onClick={() => 
                disconnectWallet()
              
              }
              style={{
                backgroundColor: "#333",
                color: "yellow",
                padding: "10px 20px",
                margin: "10px 0",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Disconnect
            </button>{" "}
          </>
        ) : (
          <>
            <Web3Button
              contractAddress={originalAddressObycLab}
              action={async (contract) => console.log("l")}
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
        )}
      </div>
    </>
  );
};

export default Transform;
