import { trade, ETH_RULE } from "./trade";

// JPY→ETH 自動取引目安額[円]
const size_jpy: number = 5000;

// 取引実施
trade(ETH_RULE, size_jpy).catch(console.error);
