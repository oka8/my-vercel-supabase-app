# CLAUDE.md

このファイルはClaude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

これはSupabaseと統合され、VercelにデプロイされたNext.js 15アプリケーションです。モダンなApp Routerアーキテクチャを使用し、TypeScriptとTailwind CSSを採用しています。

## アーキテクチャ

### 技術スタック
- **フロントエンド**: Next.js 15.4.6 (App Router)、React 19、TypeScript 5
- **スタイリング**: Tailwind CSS 4.x、PostCSS
- **バックエンド**: Supabase（データベース、認証、リアルタイム機能）
- **デプロイ**: Vercel（自動デプロイ）

### プロジェクト構造
```
src/app/           # Next.js App Routerのページとレイアウト
lib/supabase.ts    # Supabaseクライアント設定
.env.local         # 環境変数（Supabase認証情報）
supabase/          # Supabase設定とマイグレーション
```

## よく使うコマンド

### 開発
```bash
npm run dev        # 開発サーバー起動（通常3000番ポート、競合時は3001）
npm run build      # 本番用ビルド
npm run start      # 本番サーバー起動
npm run lint       # ESLint実行
```

### Supabaseローカル開発
```bash
supabase start     # ローカルSupabaseスタック起動（Docker必須）
supabase stop      # ローカルSupabaseスタック停止
supabase status    # ローカルサービス状況確認
supabase link      # リモートプロジェクトとリンク（既にfiwlltohirxtgbjfmlfocにリンク済み）
```

### デプロイ
```bash
vercel --prod      # 本番環境にデプロイ
vercel env add     # Vercelに環境変数追加
```

## 設定

### 環境変数
`.env.local`に必要な変数：
- `NEXT_PUBLIC_SUPABASE_URL` - SupabaseプロジェクトURL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase匿名キー
- `SUPABASE_SERVICE_ROLE_KEY` - Supabaseサービスロールキー（サーバーサイドのみ）

### Supabase設定
- プロジェクトID: `test-prj01`（ローカル）、`fiwlltohirxtgbjfmlfo`（本番）
- リージョン: `ap-northeast-1`（東京）
- 設定ファイル: `supabase/config.toml`

### Vercel設定
- メインブランチからの自動デプロイ
- 本番用環境変数設定済み
- Vercelダッシュボードからカスタムドメイン設定可能

## 重要な実装詳細

### Supabase統合
- `@supabase/supabase-js`を使用したクライアントサイドのみの統合
- `supabase.auth.getSession()`を使用したメインページでの接続状況監視
- クライアント設定のフォールバック値で初期化エラーを防止

### TypeScript設定
- パスエイリアス: `@/*` が `./src/*` にマッピング
- ストリクトモード有効
- Next.js型定義が自動include

### スタイリングアプローチ
- Tailwind CSS 4.x のモダン機能使用
- `sm:`ブレークポイントでレスポンシブデザイン
- CSSカスタムプロパティによるダークモード対応
- TailwindのPostCSS設定

### エラーハンドリングパターン
```typescript
try {
  const { data, error } = await supabase.auth.getSession()
  // 成功時の処理
} catch (error) {
  console.log('Error:', error)
  // ネットワーク/接続エラーの処理
}
```

## 開発時の注意点

### ポート競合
開発サーバーは自動的にポート競合を検出し、利用可能な次のポートを使用します（例：3000が使用中の場合は3001）。

### Supabase状態チェック
メインページには、存在しないテーブルへのクエリではなく、auth APIを使用してSupabase接続をテストするリアルタイム接続状況インジケーターが含まれています。

### ビルド警告
現在のビルドには、接続チェックでの未使用変数（`data`と`error`）に対するESLint警告が含まれていますが、これは接続テストパターンのために意図的なものです。

### ローカル vs 本番
- ローカル開発では同じ本番Supabaseインスタンスを使用
- ローカルとVercelで環境変数は同一
- ローカルSupabaseインスタンスは設定されていません（リモート本番データベースを使用）