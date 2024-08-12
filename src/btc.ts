import { trade, BTC_RULE } from "./trade";

// JPY→BTC 自動取引目安額[円]
const size_jpy: number = 3000;

// 取引実施
trade(BTC_RULE, size_jpy).catch(console.error);
