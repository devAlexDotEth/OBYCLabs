import { useState } from "react";
import { NextPage } from 'next'
import TokenImg from './TokenImg'
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import usePagination from "../pagination/Pagination";
import { Box } from "@mui/material";
import styles from "../../../styles/AllTokens.module.css"
interface IProps {
  tokenIds: any[],
  selectedToken: any,
  type: string,
  setToken: (tokenid: any) => void
}

const AllTokens: NextPage<IProps> = ({ tokenIds, setToken, selectedToken, type }) => {

  const Token = TokenImg as any;

  if (tokenIds.length == 0) {
    return <div style={{
      color: "white"
    }} >You Don&apos;t Have Tokens to Select</div>
  }
  console.log("tokenIds", tokenIds);

  return (
    <>
      <div className={styles.tokensDisplay} style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "30px", justifyContent: "center" }}>
        {
          tokenIds.map((item: any, index: any) => {
            return (
              <div
                style={{ maxWidth: "100%" }}
                key={"nft" + index + item?.tokenId}

              >

                <Token
                  type={type}
                  selectedToken={selectedToken}
                  setToken={setToken}
                  key={"nftToken" + index + item?.tokenId}
                  tokenId={item?.tokenId}
                  imageUrl={item.rawMetadata ? item.rawMetadata?.image : "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"}
                  token={item}
                />
              </div>
            )
          })
          // ["https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png", "https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/5567.png",].map((item: any, index: any) => {
          //   return (
          //     <div
          //       style={{ maxWidth: "100%" }}
          //       key={"nft" + index}

          //     >

          //       <Token
          //         type={"1"}
          //         selectedToken={0}
          //         setToken={setToken}
          //         key={"nftToken" + index}
          //         tokenId={"token" + index}
          //         imageUrl={item}
          //         token={item}
          //       />
          //     </div>
          //   )
          // })

        }
      </div>

    </>
  );
};

export default AllTokens;
