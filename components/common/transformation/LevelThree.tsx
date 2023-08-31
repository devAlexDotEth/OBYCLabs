import { useState } from "react";
import {
  useContract,
  useOwnedNFTs,
  useAddress,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import {
  originalAddressObycLab,
  originalAddressMvm
} from "../../utils/consts";
import AllTokens from "../tokens/AllTokens";
import { Snackbar } from "@mui/material";
import FullScreenLoader from "../shared/Loader";

const LevelThree: NextPage = () => {

  const Tokens = AllTokens as any;
  //thirdweb hooks
  const address = useAddress()
  const { contract: mvmContract } = useContract(originalAddressMvm)
  const {
    data: ownedNFTs,
    isLoading
  } = useOwnedNFTs(mvmContract, address)
  const { contract: obycLabContract } = useContract(originalAddressObycLab)
  const {
    data: ownedNFTsObycLab,
    isLoading: isLoadingObycLab
  } = useOwnedNFTs(obycLabContract, address)

  //usestates
  const [status, setStatus] = useState(1)
  const [mvmToken, setMvmToken] = useState("")
  const [obycLabToken, setObycLabToken] = useState("")
  const [btnText, setBtnText] = useState("Select Your MvM Level Two Token")
  const [err, setErr] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [animation, setAnimation] = useState({
    show: false,
    src: ""
  })

//   const handleOnClickBtn = () => {
//     if (status == 1 && mvmToken.length == 0) {
//       setErr(true);
//       setErrMsg("Please Select An MvM Token First")
//     }
//     else if (status == 2 && obycLabToken.length == 0) {
//       setErr(true);
//       setErrMsg("Please Select An Obyc Lab Token First")
//     }
//     else if (status == 1 && parseInt(mvmToken) >= 0) {
//       setStatus(2)
//       setBtnText('Select Your Obyc Lab Token and Transform')
//     }
//     else if (status == 2 && parseInt(obycLabToken) == 4 && parseInt(mvmToken) >= 0) {
//       //transform logic
//       mintMutantNft()
//     }
//   }

//   const handleCloseSnackBar = () => {
//     setErr(false)
//   };

//   const mintMutantNft = async () => {
//     try {
//       setStatus(0)
//       setAnimation({
//         show: true,
//         src: "/3.mp4"
//       })
//       const owner = await mvmContract?.call("ownerOf", parseInt(mvmToken))
//       if (String(owner) != String(address)) {
//         setStatus(1)
//         setErr(true);
//         setErrMsg("You Are Not the Owner of this Token")
//         return
//       }
//       if (await isAlreadyMintedMvML3(mvmToken)) {
//         setStatus(1)
//         setErr(true);
//         setErrMsg("You Have Already Minted This Token")
//         return
//       }
//       const hasApproval = await obycLabContract?.call(
//         "isApprovedForAll",
//         address,
//         mvmContract?.getAddress()
//       );



//       if (!hasApproval) {
//         // Set approval
//         await obycLabContract?.call(
//           "setApprovalForAll",
//           mvmContract?.getAddress(),
//           true
//         );
//       }
//       // params mint obycToken,labTokenId,mvmToken,mvmL2TokenId,level
//       await mvmContract?.call("mint", 0, obycLabToken, 0, mvmToken, 3)
//         .then((res) => {
//           setStatus(1)
//           setErr(true);
//           setErrMsg("Minted Successfully!")
//         })
//         .catch(() => {
//           setStatus(1)
//           setErr(true);
//           setErrMsg("Error While Minting")
//         })
//     } catch (error) {
//       setStatus(1)
//       setErr(true);
//       setErrMsg("Error While Minting")
//     }
//   };

//   const isAlreadyMintedMvML3 = async (_mvmTokenId: any) => {
//     const mvmL3TokensCount = await mvmContract?.call("mvmL3TokensCount")
//     for (let index = 0; index < mvmL3TokensCount; index++) {
//       const mvmL3Token = await mvmContract?.call("mvmL1Tokens", index)
//       const transformInfoLevelThree = await mvmContract?.call("transformInfoLevelThreeByTokenId", mvmL3Token)
//       if (transformInfoLevelThree.mvmLevelTwoTokenId == _mvmTokenId) {
//         return true;
//       }
//     }
//     return false;
//   }

//   console.log(ownedNFTs, 'owners')
// console.log("btn text",btnText);


  return (
    <>
    Coming soon...</>
    // <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
    //   {
    //     status == 1 && !isLoading ?
    //       <Tokens
    //         type="obyc"
    //         setToken={setMvmToken}
    //         selectedToken={mvmToken}
    //         tokenIds={ownedNFTs?.filter(
    //           item => {
    //             if (Array.isArray(item.metadata.attributes)) {
    //               item?.metadata.attributes[8].value == "Level 2"
    //               return item
    //             }
    //           })
    //           || []}
    //       /> :
    //       status == 2 && !isLoadingObycLab ?
    //         <Tokens
    //           type="obyclabs"
    //           setToken={setObycLabToken}
    //           selectedToken={obycLabToken}
    //           tokenIds={ownedNFTsObycLab?.filter(item => item.metadata.id == "4") || []}
    //         /> :
    //         <FullScreenLoader />
    //   }
    //   <>
    //     {
    //     status == 1 && !isLoading ?
    //       <button
    //         onClick={handleOnClickBtn}
    //         style={{
    //           padding:"10px",
    //           borderRadius:"10px",
    //           background:"black",
    //           color:"white"
    //         }}
            
    //         >{btnText}
    //       </button> :
          
    //       status == 2 && !isLoadingObycLab ?
    //         <button
    //           onClick={handleOnClickBtn}
    //           style={{
    //             padding:"10px",
    //             borderRadius:"10px",
    //             background:"black",
    //             color:"white"
    //           }}
              
    //           >{btnText}
    //         </button> :
    //         <></>
    //   }
    //    {/* <Snackbar
    //     anchorOrigin={{ vertical: "top", horizontal: "center" }}
    //     open={err}
    //     onClose={handleCloseSnackBar}
    //     message={errMsg}
    //     key={"top" + "center"}
    //   /> */}
       
    //   </>

    // </div>

  );
};

export default LevelThree;
