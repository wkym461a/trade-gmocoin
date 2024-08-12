import { trade, XRP_RULE } from "./trade";

// JPY→XRP 自動取引目安額[円]
const size_jpy: number = 1000;

// 取引実施
trade(XRP_RULE, size_jpy).catch(console.error);
