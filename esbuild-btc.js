const esbuild = require('esbuild');

// ESBuildの設定
esbuild.build({
  entryPoints: ['src/btc.ts'],    // エントリーポイント
  bundle: true,                   // バンドルを有効にする
  outfile: 'dist/btc.bundle.js',  // 出力ファイル
  platform: 'node',               // Node.js環境向け
  target: ['es6'],                // トランスパイルターゲット
  sourcemap: true                 // ソースマップの生成

}).catch(() => process.exit(1));
