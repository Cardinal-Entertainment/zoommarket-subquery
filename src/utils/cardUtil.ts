import { cardTypeUrl, nftContracts, NFT_CONTRACT_TYPES } from "../constants";
import { AuctionCards } from "../types/models";
import fetch from "node-fetch";

type CardsetFetchResponse = {
  name: string;
  image: string;
  description: string;
  external_url: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
};

export const fetchCardType = async (
  cardTypeId: string
): Promise<CardsetFetchResponse | null> => {
  try {
    logger.info("got here");
    const cardTypeResponse = await fetch(`${cardTypeUrl}/${cardTypeId}.json`);

    if (cardTypeResponse.status === 200) {
      const data = await cardTypeResponse.json();

      if (data) {
        return data;
      }

      return null;
    }
  } catch (error) {
    logger.error(`Failed to fetch card type: ${cardTypeId}, ${error}`);
  }
};

export const parseZoombiesData = (
  cardData: CardsetFetchResponse,
  itemNumber: string,
  editionNumber: string,
  tokenId: string
): AuctionCards => {
  try {
    const attributeMap = {};

    cardData.attributes.forEach((attribute) => {
      attributeMap[attribute.trait_type] = attribute.value;
    });

    const auctionCard = new AuctionCards(tokenId);
    auctionCard.itemNumber = BigInt(itemNumber);
    auctionCard.editionCurrent = BigInt(editionNumber);
    auctionCard.name = cardData.name;
    auctionCard.cardOrigin = attributeMap["in_store"];
    auctionCard.rarity = attributeMap["rarity"];

    auctionCard.isNotZoombies = false;
    auctionCard.tokenId = BigInt(tokenId);
    auctionCard.image = cardData.image;
    auctionCard.description = cardData.description;
    auctionCard.typeId = attributeMap["type_id"];
    auctionCard.cardSet = attributeMap["card_set"];
    auctionCard.zombieType = attributeMap["zombie_type"];
    auctionCard.editionTotal = attributeMap["edition_total"];
    auctionCard.cardLevel = attributeMap["card_level"];
    auctionCard.originalCost = BigInt(attributeMap["cost"]);
    auctionCard.earnCZXP = BigInt(attributeMap["buy_czxp"]);
    auctionCard.sacrificeCZXP = BigInt(attributeMap["sacrifice_czxp"]);
    auctionCard.unlockCZXP = BigInt(attributeMap["unlock_czxp"]);
    auctionCard.releaseTime = BigInt(attributeMap["release_time"]);

    return auctionCard;
  } catch (error) {
    logger.error(`Failed to parse card data: ${error}`);
  }
};

export const getAndStoreCardForItem = async (
  tokenIds: Array<string>,
  itemNumber: string,
  nftToken: string
) => {
  const contract = nftContracts[nftToken];

  const cardInfoPromises = tokenIds.map(async (tokenId) => {
    if (contract.name === NFT_CONTRACT_TYPES.ZOOMBIES) {
      const [cardTypeId, editionNumber] = await contract.contract.getNFTData(
        tokenId
      );

      const cardType = await fetchCardType(cardTypeId as string);

      if (cardType) {
        const parsedData = parseZoombiesData(
          cardType,
          itemNumber,
          editionNumber,
          tokenId
        );

        return parsedData;
      }

      return null;
    } else if (contract.name === NFT_CONTRACT_TYPES.NEXT_GEM) {
    }
  });

  const cardInfo = await Promise.all(cardInfoPromises);

  cardInfo.forEach((card) => {
    card.save();
    logger.info(`Saved card ${card.tokenId} for item number: ${itemNumber}`);
  });
};
