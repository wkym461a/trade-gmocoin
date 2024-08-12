const esbuild = require('esbuild');

// ESBuildの設定
esbuild.build({
  entryPoints: ['src/eth.ts'],    // エントリーポイント
  bundle: true,                   // バンドルを有効にする
  outfile: 'dist/eth.bundle.js',  // 出力ファイル
  platform: 'node',               // Node.js環境向け
  target: ['es6'],                // トランスパイルターゲット
  sourcemap: true                 // ソースマップの生成

}).catch(() => process.exit(1));
