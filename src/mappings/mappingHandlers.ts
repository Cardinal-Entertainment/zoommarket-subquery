import {
  TokenWhiteListed,
  NftWhiteListed,
  MaxNFTCountChanged,
  ZoomBurnFeeChanged,
  AuctionMaxTimeChanged,
  ItemListed,
  Bid,
  Settled,
} from "../types/models";
import { MoonbeamEvent } from "@subql/contract-processors/dist/moonbeam";
import { BigNumber } from "ethers";

import { getAndStoreCardForItem } from "../utils/cardUtil";

// Setup types from ABI
type TokenWhiteListedEventArgs = [string, Boolean, BigNumber] & {
  token: string;
  isWhitelisted: boolean;
  minBidIncrement: bigint;
};
type NftWhiteListedEventArgs = [string, Boolean] & {
  token: string;
  isWhitelisted: boolean;
};
type MaxNFTCountChangedEventArgs = [BigNumber] & { newMaxNFTCount: bigint };
type ZoomBurnFeeChangedEventArgs = [BigNumber] & { newZoomBurnFee: bigint };
type AuctionMaxTimeChangedEventArgs = [BigNumber] & {
  newMaxAuctionTime: bigint;
};
type ItemListedEventArgs = [
  BigNumber,
  BigNumber,
  string,
  [BigNumber],
  string,
  string,
  BigNumber,
  BigNumber
] & {
  itemNumber: bigint;
  auctionEnd: bigint;
  seller: string;
  tokenIds: [BigNumber];
  saleToken: string;
  nftToken: string;
  minPrice: bigint;
  zoomBurned: bigint;
};
type BidPlacedEventArgs = [BigNumber, string, [BigNumber]] & {
  itemNumber: bigint;
  bidder: string;
  tokenIds: [BigNumber];
};
type ItemSettledEventArgs = [
  BigNumber,
  string,
  string,
  BigNumber,
  string,
  string,
  string,
  BigNumber,
  [BigNumber]
] & {
  itemNumber: bigint;
  nftToken: string;
  saleToken: string;
  bidAmount: bigint;
  winner: string;
  seller: string;
  royaltyReceiver: string;
  royaltyAmount: bigint;
  tokenIds: [BigNumber];
};

export async function handleTokenWhiteListedEvent(
  event: MoonbeamEvent<TokenWhiteListedEventArgs>
): Promise<void> {
  const twl = new TokenWhiteListed(event.transactionHash);
  twl.blockNumber = Math.trunc(event.blockNumber);
  twl.blockTimestamp = event.blockTimestamp;
  twl.token = event.args.token;
  twl.isWhitelisted = event.args.isWhitelisted;
  twl.minBidIncrement = event.args.minBidIncrement;

  await twl.save();
}

export async function handleNftWhiteListed(
  event: MoonbeamEvent<NftWhiteListedEventArgs>
): Promise<void> {
  const twl = new NftWhiteListed(event.transactionHash);
  twl.blockNumber = Math.trunc(event.blockNumber);
  twl.blockTimestamp = event.blockTimestamp;
  twl.token = event.args.token;
  twl.isWhitelisted = event.args.isWhitelisted;

  await twl.save();
}

export async function handleMaxNFTCountChanged(
  event: MoonbeamEvent<MaxNFTCountChangedEventArgs>
): Promise<void> {
  const mch = new MaxNFTCountChanged(event.transactionHash);
  mch.blockNumber = Math.trunc(event.blockNumber);
  mch.blockTimestamp = event.blockTimestamp;
  mch.newMaxNFTCount = event.args.newMaxNFTCount;

  await mch.save();
}

export async function handleZoomBurnFeeChanged(
  event: MoonbeamEvent<ZoomBurnFeeChangedEventArgs>
): Promise<void> {
  const mch = new ZoomBurnFeeChanged(event.transactionHash);
  mch.blockNumber = Math.trunc(event.blockNumber);
  mch.blockTimestamp = event.blockTimestamp;
  mch.newZoomBurnFee = event.args.newZoomBurnFee;

  await mch.save();
}

export async function handleAuctionMaxTimeChanged(
  event: MoonbeamEvent<AuctionMaxTimeChangedEventArgs>
): Promise<void> {
  const mch = new AuctionMaxTimeChanged(event.transactionHash);
  mch.blockNumber = Math.trunc(event.blockNumber);
  mch.blockTimestamp = event.blockTimestamp;
  mch.newMaxAuctionTime = event.args.newMaxAuctionTime;

  await mch.save();
}

export async function handleItemListed(
  event: MoonbeamEvent<ItemListedEventArgs>
): Promise<void> {
  try {
    const il = new ItemListed(event.transactionHash);
    il.blockNumber = Math.trunc(event.blockNumber);
    il.blockTimestamp = event.blockTimestamp;
    il.itemNumber = event.args.itemNumber;
    il.auctionEnd = event.args.auctionEnd;
    il.seller = event.args.seller;
    il.tokenIds = event.args.tokenIds.map((tokenId) => tokenId.toString());
    il.saleToken = event.args.saleToken;
    il.nftToken = event.args.nftToken;
    il.minPrice = event.args.minPrice;
    il.zoomBurned = event.args.zoomBurned;

    logger.info("Trying to fetch cards");
    await getAndStoreCardForItem(
      event.args.tokenIds.map((tokenId) => tokenId.toString()),
      event.args.itemNumber.toString(),
      event.args.nftToken
    );
    // const result = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    // const json = await result.json();
    // logger.info(json.title);

    await il.save();
  } catch (error) {
    logger.error("Something failed for item listed");
    logger.error(error);
  }

  // Fetch cards and store card Model
  // const stringTokenIds = il.tokenIds.map((tokenId) => tokenId.toString());
  // await getAndStoreCardForItem(
  //   il.tokenIds,
  //   il.itemNumber.toString(),
  //   il.nftToken
  // );
}

export async function handleBidPlaced(
  event: MoonbeamEvent<BidPlacedEventArgs>
): Promise<void> {
  const il = new Bid(event.transactionHash);
  il.blockNumber = Math.trunc(event.blockNumber);
  il.blockTimestamp = event.blockTimestamp;
  il.itemNumber = event.args.itemNumber;
  il.bidder = event.args.bidder;
  il.tokenIds = event.args.tokenIds.map((tokenId) => tokenId.toString());

  await il.save();
}

export async function handleItemSettled(
  event: MoonbeamEvent<ItemSettledEventArgs>
): Promise<void> {
  const il = new Settled(event.transactionHash);
  il.blockNumber = Math.trunc(event.blockNumber);
  il.blockTimestamp = event.blockTimestamp;
  il.itemNumber = event.args.itemNumber;
  il.nftToken = event.args.nftToken;
  il.saleToken = event.args.saleToken;
  il.bidAmount = event.args.bidAmount;
  il.winner = event.args.winner;
  il.seller = event.args.seller;
  il.royaltyReceiver = event.args.royaltyReceiver;
  il.royaltyAmount = event.args.royaltyAmount;
  il.tokenIds = event.args.tokenIds.map((tokenId) => tokenId.toString());

  await il.save();
}
