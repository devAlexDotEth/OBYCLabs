import { NextPage } from 'next'
import styles from "../../../styles/Theme.module.css";

interface IProps {
  tokenId: number,
  imageUrl?: string,
  selectedToken: any,
  type: string,
  setToken: (tokenid: any) => void,
  token: any

}
const TokenImg: NextPage<IProps> = ({ tokenId, imageUrl, setToken, selectedToken, type, token }) => {

  const dimention = type == 'obyc' ? '100px' : "150px"
  console.log("token is ", tokenId);
  let tokenImg=null;
  if(token.metadata)
  tokenImg = token?.metadata?.image

  const handleClick = () => {
    // console.log(tokenId,'tpokeneada')
    setToken(tokenId)
  }

  return (
    <div>
      <img
        className={selectedToken == tokenId ? styles.selectedBorder : ''}
        onClick={handleClick}
        src={
          tokenImg ? tokenImg :
            type == 'obyc' ? `https://ipfs.io/ipfs/QmaGv9ihX3ey3W958H64e1ZvXeFs4cs655xH5xY5xZuibD/${tokenId}.png` :
              `https://ipfs.io/ipfs/QmTpD7Dxr6eKzRBiXnFupZ9KGYBbiCjG7eqwGhnqWcyXCX/${tokenId}.jpg`}
        alt='obyc'
        style={{ height: dimention, width: dimention, borderRadius: "15px" }}
      />
    </div>
  );
};

export default TokenImg;
