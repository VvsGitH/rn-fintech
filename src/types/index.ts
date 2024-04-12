export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

interface CryptoPlatform {
  id: string | number;
  name: string;
  slug: string;
  symbol: string;
  token_address: string;
}

export interface CryptoInfo {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string; // url
  subreddit: string;
  notice: string;
  tags: string[];
  "tag-names": string[];
  "tag-groups": string[];
  urls: Record<string, string[]>;
  platform: CryptoPlatform | null;
  date_added: string; // ISO-date
  twitter_username: string;
  is_hidden: number;
  date_launched: string | null; // ISO-date
  contract_address: unknown[];
  self_reported_circulating_supply: unknown;
  self_reported_tags: unknown;
  self_reported_market_cap: unknown;
  infinite_supply: boolean;
}

interface CryptoQuote {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: number | null;
  last_updated: string; // ISO-Date
}

export interface Crypto {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string; // ISO-date
  last_updated: string; // ISO-date
  tags: string[];
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  infinite_supply: boolean;
  platform: CryptoPlatform | null;
  cmc_rank: number;
  self_reported_circulating_supply: unknown;
  self_reported_market_cap: unknown;
  tvl_ratio: number | null;
  quote: {
    EUR: CryptoQuote;
  };
}
