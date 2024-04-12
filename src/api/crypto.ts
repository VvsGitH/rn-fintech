import { Crypto, CryptoInfo } from "@/types";
import { CRYPTO_INFO } from "./mocks/crypto-info";
import { CRYPTO_LISTINGS } from "./mocks/crypto-listings";

export async function getCryptoInfoById(ids: string) {
  console.log(`Getting info about ${ids}`);
  return await Promise.resolve<Record<string, CryptoInfo>>(CRYPTO_INFO);
}

export async function getCryptos(limit: number = 5, offset: number = 0) {
  console.log(`Getting listings from ${offset} to ${limit}`);
  return await Promise.resolve<Crypto[]>(CRYPTO_LISTINGS);
}
