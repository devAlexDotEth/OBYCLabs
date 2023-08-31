import { useState } from "react";
import { NextPage } from 'next'
import TokenImg from './TokenImg'
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import usePagination from "../pagination/Pagination";
import { Box } from "@mui/material";

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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", justifyContent: "center" }}>
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
        }
      </div>
      <Box sx={{ display: "flex", justifyContent: "center" }} >
        {/* <Pagination
          sx={{
            mt: 5,
            "& .MuiPaginationItem-root": {
              color: "black",
              borderColor: "black",
              fontWeight: "bold"
            },
            "& .Mui-selected": {
              color: "white",
              borderColor: "white",
              fontWeight: "bold"
            }
          }}
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
       */}
      </Box>

    </>
  );
};

export default AllTokens;
