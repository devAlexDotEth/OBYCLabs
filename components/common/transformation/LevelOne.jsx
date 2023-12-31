import { useState, useEffect } from "react";
import { useContract, useAddress } from "@thirdweb-dev/react";
import {
  originalAddressObyc,
  originalAddressObycLab,
  originalAddressMvm,
} from "../../utils/consts";
import { OBYC } from "../../utils/abi";
import AllTokens from "../tokens/AllTokens";
import { Alchemy, Network, OwnedNft, OwnedNftsResponse } from "alchemy-sdk";
import { getHasApproved } from "../../utils/Web3Util";
import Box from "@mui/material/Box";
import axios from "axios";
import FullScreenLoader from "../../common/shared/Loader";
import { BigNumber, ethers } from "ethers";

export const LevelOne = () => {
  const Tokens = AllTokens;

  //states
  const [status, setStatus] = useState(1);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [ownedNFTsObyc, setOwnedNFTsObyc] = useState();
  const [ownedNFTsObycPageKey, setOwnedNFTsObycPageKey] = useState("");
  const [ownedNFTsObycLab, setOwnedNFTsObycLab] = useState();
  const [obycToken, setObycToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasApproved, setHasApproved] = useState(false);
  const [obycLabToken, setObycLabToken] = useState("");
  const [btnText, setBtnText] = useState("Select Your OBYC Token");
  const [err, setErr] = useState(false);
  const [animation, setAnimation] = useState({
    show: false,
    src: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const settings = {
    apiKey: "yCzkW-1vE5miOKVP3Ur_X48UpBzhaUMV", // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  const options2 = {
    contractAddresses: [originalAddressObycLab],
  };
  const address = useAddress();

  const setLevelOneData = async (address, obycToken, obycLabToken) => {
    let response = await axios.post(
      "https://mint-backend.obyclabs.com/save-single-tokens",
      {
        token: {
          address: address,
          mvm: 0,
          obyc: obycToken,
          lab: obycLabToken,
        },
        type: "1",
      }
    );
    if (response.data.status) {
      return true;
    }
    // console.log(data)
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      setData();
    } catch (error) {
      setIsLoading(false);
    }
  }, [address]);

  const setData = async () => {
    setHasApproved(await getHasApproved(address, originalAddressMvm));
    let flag = false;
    let arr = [];
    // let response: OwnedNftsResponse

    const options = {
      contractAddresses: [originalAddressObyc],
      pageKey: "",
    };

    let response = await alchemy.nft.getNftsForOwner(String(address), options);
    // console.log(Math.ceil((response.totalCount) / 100), 'cell')
    // do {

    // console.log(response, 'page key')
    for (let index = 0; index < Math.ceil(response.totalCount / 100); index++) {
      let response = await alchemy.nft.getNftsForOwner(
        String(address),
        options
      );
      // console.log(response, 'ffff')
      options.pageKey = response?.pageKey || "";
      arr.push(...response.ownedNfts);
      // setOwnedNFTsObyc(ownedNFTsObyc,...response.ownedNfts)
      // arr[]
      console.log(arr);
    }

    setOwnedNFTsObyc(arr);
    alchemy.nft.getNftsForOwner(String(address), options2).then((res) => {
      setOwnedNFTsObycLab(res.ownedNfts);
    });
    setIsLoading(false);
  };
  //thirdweb hooks
  const { contract: obycContract } = useContract(
    originalAddressObyc,
    OBYC.output.abi
  );
  const { contract: obycLabContract } = useContract(originalAddressObycLab);
  const { contract: mvmContract } = useContract(originalAddressMvm);

  const handleOnClickBtn = async () => {
    // setLevelOneData()
    // mintMutantNft()
    console.log("handling btn click",{
      status,obycLabToken,hasApproved
    });
    if (status == 1 && obycToken.length == 0) {
      setErr(true);
      setErrMsg("Please Select An Obyc Token First");
    } else if (status == 2 && obycLabToken.length == 0) {
      setErr(true);
      setErrMsg("Please Select An Obyc Lab Token First");
    } else if (
      status == 1 &&
      obycToken >= 0 &&
      (await isAlreadyMintedMvML1(obycToken))
    ) {
      alert("This Bear 🐼 is already transformed")
      // setErr(true);
      // setErrMsg("This token has been minted already");
    } else if (status == 2 && obycLabToken >= 0 && !hasApproved) {
      console.log("calling setApproval");
      await setApproval();
    } else if (status == 1 && obycToken >= 0 && !hasApproved) {
      // await setApproval();
      setStatus(2);
      setShowDisclaimer(true);
      setBtnText("Permission to Burn Lab Item");
    } else if (status == 1 && obycToken >= 0 && hasApproved) {
      setStatus(2);
      setBtnText("Select Your Obyc Lab Token and Transform");
    } else if (status == 2 && obycLabToken >= 0 && obycToken > 0) {
      mintMutantNft();
    }
  };

  const handleGoBack = async () => {
    setStatus(1);
    setBtnText("Select Your OBYC Token");
  };

  const handleCloseSnackBar = () => {
    setErr(false);
  };

  const mintMutantNft = async () => {
    try {
      setStatus(0);
      if (obycLabToken == 0) {
        setAnimation({
          show: true,
          src: "./mutant-1.mp4",
        });
      } else if (obycLabToken == 1) {
        setAnimation({
          show: true,
          src: "./machine-1.mp4",
        });
      }
      console.log("checking owner of_",BigNumber.from(obycToken),'_');
      console.log("obyc lab token",(obycLabToken));

      const owner = await obycContract.call("ownerOf", [BigNumber.from(obycToken)]);
      console.log("owner is ",owner);
      if (String(owner) != String(address)) {
        setStatus(1);
        setErr(true);
        alert("You Are Not the Owner of this Token");
        return;
      }
      // params mint obycToken,labTokenId,mvmToken,mvmL2TokenId,level
      console.log("calling mint",[parseInt(obycToken), parseInt(obycLabToken), 0,0,1]);
      await mvmContract
        ?.call("mint", [parseInt(obycToken), parseInt(obycLabToken), 0,0,1])
        .then((res) => {
          setStatus(1);
          setErr(true);
          setBtnText("Select Your OBYC Token");
          setErrMsg(
            "You minted successfully. Your Bear 🐼 is transforming, it will reveal during transformations Tuesdays/Thursdays!"
          );
          setLevelOneData(address, obycToken, obycLabToken);
        })
        .catch((error) => {
          console.log(error, "errx");
          setBtnText("Select Your OBYC Token");
          setStatus(1);
          setErr(true);
          setErrMsg("Error While Minting");
        });
    } catch (error) {
      console.log(error, "erry");
      setBtnText("Select Your OBYC Token");
      setStatus(1);
      setErr(true);
      setErrMsg("Error Cannot Continue");
    }
  };

  const setApproval = async () => {
    try {
      let mvmContractAddress= mvmContract?.getAddress()
      const approval = await obycLabContract?.call(
        "setApprovalForAll",
        [mvmContractAddress,true]
        
      );
      if (approval) {
        setStatus(2);
        setShowDisclaimer(false);
        setBtnText("Transform");
        setHasApproved(true);
      }
    } catch (error) {
      console.log(error, "err");
      setShowDisclaimer(false);
      setStatus(1);
      setBtnText("Select Your OBYC Token");
      setErr(true);
      setErrMsg("Error Cannot Continue");
    }
  };

  const isAlreadyMintedMvML1 = async (_obycTokenId) => {
    // const response = await fetch('/api/staticdata')
    // const data = await response.json()
    // // console.log(JSON.parse(data), 'dadasdddd')
    // // console.log(JSON.parse(data).findIndex((item:  ) => item.obyc == _obycTokenId), 'flag')
    // let flag = JSON.parse(data).findIndex((item:  ) => item.obyc == _obycTokenId)
    // if (flag >= 0) {
    //   return true
    // }
    // return false;

    //---------------second option
    // const l1TokenPromises = []
    // const l1tTransformsPromises = []
    // const mvmL1TokensCount = await mvmContract?.call("mvmL1TokensCount")
    // for (let index = 0; index < mvmL1TokensCount; index++) {
    //   l1TokenPromises.push(mvmContract?.call("mvmL1Tokens", index))
    // }
    // const tokens = await Promise.all(l1TokenPromises)
    // for (let index = 0; index < tokens.length; index++) {
    //   l1tTransformsPromises.push(mvmContract?.call("transformInfoLevelOneByTokenId", tokens[index]))
    // }
    // const transformInfo = await Promise.all(l1tTransformsPromises)
    // for (let index = 0; index < transformInfo.length; index++) {
    //   if (await transformInfo[index]?.obycTokenId == _obycTokenId) {
    //     return true;
    //   }
    // }
    // return false;
    //-------------------------axios call
    let response = await axios.post(
      "https://mint-backend.obyclabs.com/check-token",
      {
        obyc: obycToken,
      }
    );
    console.log("response of isMinted",response);
    if (response.data.status) {
      return true;
    }
    return false;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {status === 1 && !isLoading ? (
        <Tokens
          type="obyc"
          setToken={setObycToken}
          selectedToken={obycToken}
          tokenIds={ownedNFTsObyc || []}
        />
      ) : (
        <>
          {status === 2 && !isLoading ? (
            <Tokens
              type="obyclabs"
              setToken={setObycLabToken}
              selectedToken={obycLabToken}
              tokenIds={
                ownedNFTsObycLab?.filter(
                  (item) => item.tokenId == "0" || item.tokenId == "1"
                ) || []
              }
            />
          ) : (
            <>
              {status === 0 && animation.show ? (
                <video
                  controls={false}
                  muted
                  loop
                  autoPlay
                  playsInline
                  src={animation.src}
                  style={{ width: "100%", height: "400px" }}
                />
              ) : (
                <>
                  <FullScreenLoader />
                </>
              )}
            </>
          )}
        </>
      )}
      {
        status == 1 && !isLoading ?
          <button
            onClick={handleOnClickBtn}
            style={{
              backgroundColor: "#333",
              color: "yellow",
              padding: "10px 20px",
              margin: "10px 0",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}            color="secondary"
            variant="contained">{btnText}
          </button> :
          status == 2 && !isLoading ?
            <Box sx={{
              display: "flex",
              mt: 4
            }}>
              <button
                onClick={handleGoBack}
                
                >{"Go Back"}
              </button>
              <button
                onClick={handleOnClickBtn}
                              
                >{btnText}
              </button>
            </Box> :
            <></>
      }
      {
        showDisclaimer ?
          <p style={{ marginTop: "18px", fontSize: "10px" }}>*need permission to burn obyclab token</p> :
          <></>
      }
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={err}
        onClose={handleCloseSnackBar}
        message={errMsg}
        key={"top" + "center"}
      /> 
       */}
    </div>
  );
};
