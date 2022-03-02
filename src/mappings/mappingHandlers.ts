import {TokenWhiteListed} from "../types";
import { MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';
import { BigNumber } from "ethers";

// Setup types from ABI
type TokenWhiteListedEventArgs = [string, Boolean, BigNumber] & { token: string; isWhitelisted: boolean; minBidIncrement: bigint ; };

// function createSum(id: string): Sum {
//   const entity = new Sum(id);
//   entity.mintedTotal = BigInt(0);
//   entity.burnedTotal = BigInt(0);
//   return entity;
// }
//
// function createTrackedPerDay(timestamp: string): ZoomPerDay {
//   const entity = new ZoomPerDay(timestamp);
//   entity.minted = BigInt(0);
//   entity.burned = BigInt(0);
//   return entity;
// }

// export async function handleMoonriverEvent(event: MoonbeamEvent<TransferEventArgs>): Promise<void> {
//     const transaction = new Transaction(event.transactionHash);
//     transaction.blockNumber = Math.trunc(event.blockNumber);
//     transaction.blockTimestamp = event.blockTimestamp;
//     transaction.value = event.args.value.toBigInt();
//     transaction.from = event.args.from;
//     transaction.to = event.args.to;
//     transaction.contractAddress = event.address;
//     await transaction.save();
//
//     //Create entity to hold TOTAL minted/burned
//     let entity = await Sum.get("1");
//     if(entity === undefined){
//       entity = createSum("1");
//     }
//
//     //Create entity to hold Summary minted/burned Per Day
//     const date = Date.parse(new Date(transaction.blockTimestamp).toISOString().split('T')[0]).toString();
//
//     let zpd = await ZoomPerDay.get(date);
//     if(zpd === undefined){
//       zpd = createTrackedPerDay(date);
//     }
//
//     //Track our totals
//     if(transaction.from == "0x0000000000000000000000000000000000000000") {
//       entity.mintedTotal = BigInt(entity.mintedTotal) + event.args.value.toBigInt();
//       zpd.minted = BigInt(zpd.minted) + event.args.value.toBigInt();
//     }
//     if(transaction.to == "0x0000000000000000000000000000000000000000") {
//       entity.burnedTotal = BigInt(entity.burnedTotal) + event.args.value.toBigInt();
//       zpd.burned = BigInt(zpd.burned) + event.args.value.toBigInt();
//     }
//
//     await entity.save();
//     await zpd.save();
// }

export async function handleTokenWhiteListedEvent(event: MoonbeamEvent<TokenWhiteListedEventArgs>): Promise<void> {
  const twl = new TokenWhiteListed(event.transactionHash);
  twl.blockNumber = 1;
  twl.blockTimestamp = new Date();
  twl.token = event.args.token;
  twl.isWhitelisted = event.args.isWhitelisted;
  twl.minBidIncrement = event.args.minBidIncrement;

  await twl.save();
}
