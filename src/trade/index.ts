import { config as dotenvConfig } from "dotenv";
import { GMOCoinAPI } from "gmocoinapi";
import { sleep } from "~/util/sleep";
import { TradeRule } from "./rule";

export { BTC_RULE, ETH_RULE, XRP_RULE } from "./rule";

export const trade = async (
  rule: TradeRule,
  size_jpy: number,

) => {
  // APIキーとAPIシークレットを取得して認証情報を作成
  dotenvConfig(); // .envファイルから環境変数を読み込み
  const keys: GMOCoinAPI.CC.Private.APIKeys = {
    apiKey: process.env.GMOCOIN_API_KEY,
    secretKey: process.env.GMOCOIN_API_SECRET,
  }

  // 日本円(JPY)の残高が取引に足りているか確認
  const assets = await GMOCoinAPI.CC.Private.account_assets(keys).then(r => r.data);
  const assets_jpy = assets.filter(a => (a.symbol == 'JPY'));
  if (assets_jpy.length != 1) {
    // 日本円の残高取れないエラー
    return;
  }
  const asset_jpy = assets_jpy[0];
  const assetAmount_jpy = Number(asset_jpy.amount);
  if (assetAmount_jpy < size_jpy) {
    // 日本円の残高足りないエラー
    return;
  }

  // 自動取引目安額[円]から注文量を算出
  const tickers = await GMOCoinAPI.CC.Public.ticker({
    symbol: rule.symbol,
  }).then(r => r.data);
  const filteredTickers = tickers.filter(t => (t.symbol == rule.symbol));
  if (filteredTickers.length != 1) {
    // 取引銘柄の最新レート取れないエラー
    return;
  }
  const ticker = filteredTickers[0];
  const bid = Number(ticker.bid); // 買い注文の情報
  const size = size_jpy / bid; // 最小注文数量を考慮
  if (size < rule.minSize) {
    // 最小注文数量に達していないエラー
    return;
  }
  const sizeStr = size.toFixed(rule.minUnitDigit); // 最小注文単位を考慮

  // 算出した注文量の取引銘柄を注文
  const orderId = await GMOCoinAPI.CC.Private.order(keys, {
    symbol: rule.symbol,
    side: 'BUY',
    executionType: 'MARKET',
    timeInForce: 'FAK',
    size: sizeStr,
  }).then(r => r.data);
  await sleep(3_000);

  // 注文約定の確認
  var status: GMOCoinAPI.CC.ParameterType.OrderStatus = 'WAITING';
  for (var i = 0; i < 100; i++) {
    const orders = await GMOCoinAPI.CC.Private.orders(keys, { orderId: orderId }).then(r => r.data.list);
    if (orders.length == 1) {
      const order = orders[0];

      status = order.status;
      if (status == 'EXECUTED') {
        break;
      }
    }

    await sleep(5_000);
  }

  // ステータス出力
  console.log(`[Trade-GMOCoin '${rule.symbol}'] Status: ${status}, Size: ${sizeStr}`);
}
