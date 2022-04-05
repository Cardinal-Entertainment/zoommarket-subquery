import { Contract, ethers } from "ethers";
import zoombiesContractJson from "./contracts/Zoombies.json";

export const NFT_CONTRACT_TYPES = {
  ZOOMBIES: "Zoombies",
  NEXT_GEM: "NextGem",
};

const zoombiesContractAddress = "0x3E7997B8D30AA6216102fb2e9206246e478d57d3";
const nextGemContractAddress = "0x4c0EaC154AE7cB755b260E835895e9F471B640f3";

export const cardTypeUrl = "https://zoombies.world/services/card_types";

const providerURL =
  "https://moonbase-alpha-api.bwarelabs.com/d6e703e6-a9d9-41bd-ab0a-5b96fae88395";
const rpcProvider = new ethers.providers.StaticJsonRpcProvider(providerURL, {
  chainId: 1287,
  name: "moonbase-alphanet",
});

type nftContract = {
  name: string;
  contractAddress: string;
  contract: Contract;
};

export const nftContracts: {
  [key: string]: nftContract;
} = {
  [zoombiesContractAddress]: {
    name: NFT_CONTRACT_TYPES.ZOOMBIES,
    contractAddress: zoombiesContractAddress,
    contract: new ethers.Contract(
      zoombiesContractAddress,
      zoombiesContractJson.abi,
      rpcProvider
    ),
  },
  [nextGemContractAddress]: {
    name: NFT_CONTRACT_TYPES.NEXT_GEM,
    contractAddress: nextGemContractAddress,
    contract: new ethers.Contract(
      nextGemContractAddress,
      zoombiesContractJson.abi,
      rpcProvider
    ),
  },
};
