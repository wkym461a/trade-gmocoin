import { GMOCoinAPI } from "gmocoinapi";

// GMOコイン暗号資産の取引ルールを定義
// 参考: https://coin.z.com/jp/corp/product/info/exchange/#ank-02

export type TradeRule = {

  // 銘柄名
  symbol: GMOCoinAPI.CC.ParameterType.HandledSpotSymbol,

  // 最小注文数量
  minSize: number,

  // 最小注文単位の桁数
  minUnitDigit: number,

  // 最大注文数量
  maxSize: number,
}

export const BTC_RULE: TradeRule = {
  symbol: 'BTC',
  minSize: 0.0001,
  minUnitDigit: 4,
  maxSize: 5,
}

export const ETH_RULE: TradeRule = {
  symbol: 'ETH',
  minSize: 0.01,
  minUnitDigit: 4,
  maxSize: 100,
}

export const XRP_RULE: TradeRule = {
  symbol: 'XRP',
  minSize: 1,
  minUnitDigit: 0,
  maxSize: 100_000,
}
