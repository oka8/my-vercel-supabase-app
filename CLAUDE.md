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

### 環境分離
**開発環境（ローカル）:**
- ローカルSupabaseスタック使用（Docker必須）
- URL: http://127.0.0.1:54321
- `supabase start` でローカル環境を起動
- `.env.local` でローカル設定を管理

**本番環境（Vercel）:**
- Supabaseクラウド使用（fiwlltohirxtgbjfmlfo）
- リージョン: ap-northeast-1（東京）
- Vercelの環境変数で本番設定を管理
- 自動デプロイでmainブランチから反映

**重要:** 開発時は `supabase start` を必ず実行してからローカル開発を開始してください。

## プロジェクト構築履歴

このプロジェクトは以下の手順で構築されました：

### 1. 基盤構築
1. **Next.jsアプリ作成**: `create-next-app`でTypeScript + Tailwind + App Routerのプロジェクト作成
2. **Supabase統合**: `@supabase/supabase-js`をインストール、クライアント設定作成
3. **接続テスト実装**: メインページにSupabase接続状況を表示する機能を追加

### 2. Supabase設定
1. **ローカル環境**: `supabase init`でローカルプロジェクト初期化
2. **本番環境**: `supabase projects create`で本番プロジェクト作成（fiwlltohirxtgbjfmlfo）
3. **プロジェクトリンク**: ローカルと本番プロジェクトを`supabase link`で連携

### 3. 環境分離設定
1. **開発環境**: `.env.local`をローカルSupabase（127.0.0.1:54321）用に設定
2. **本番環境**: Vercelに本番Supabaseの環境変数を設定
3. **自動切り替え**: ローカル開発とVercelデプロイで自動的に適切なSupabaseに接続

### 4. Vercel連携
1. **初回デプロイ**: `vercel`コマンドでプロジェクトをVercelに初期デプロイ
2. **環境変数設定**: `vercel env add`で本番Supabase認証情報を設定
3. **本番デプロイ**: `vercel --prod`で本番環境にデプロイ

### 5. Git・GitHub設定
1. **リポジトリ作成**: GitHubにリモートリポジトリを作成
2. **初回プッシュ**: ローカルの変更をGitHubにプッシュ
3. **継続的更新**: 機能追加のたびにコミット・プッシュを実行

### 6. ドキュメント整備
1. **CLAUDE.md作成**: Claude Code用のプロジェクトガイダンスを作成
2. **README.md作成**: プロジェクト概要と環境構成を文書化
3. **SETUP-GUIDE.md作成**: 一括構築手順書を作成

### 構築完了後の状態
- ✅ ローカル開発環境（Supabaseローカルスタック）
- ✅ 本番環境（Vercelデプロイ + Supabaseクラウド）
- ✅ 環境自動切り替え機能
- ✅ 接続状況監視機能
- ✅ 完全なドキュメント整備
- ✅ GitHubリポジトリ管理

### 参考ファイル
- `SETUP-GUIDE.md`: 同様のプロジェクトを一から構築する完全手順書（動的プロジェクト名対応）
- `README.md`: プロジェクトの概要と環境構成
- `supabase/config.toml`: Supabaseローカル設定

## リージョン設定

### Vercel設定
**現在の環境:**
- ビルドリージョン: `iad1`（ワシントンD.C.、アメリカ東部）
- Serverless Functions: `iad1`（アメリカ東部）
- 設定状況: リージョン未指定（デフォルト）

**日本リージョンに変更する場合:**
```json
// vercel.json
{
  "regions": ["hnd1"]
}
```

**利用可能な日本リージョン:**
- `hnd1` - 東京（羽田）- 推奨
- `nrt1` - 東京（成田）
- `kix1` - 大阪（関西）

### Supabase設定
**現在の環境:**
- リージョン: `ap-northeast-1`（東京）✅
- プロジェクトID: `fiwlltohirxtgbjfmlfo`
- 状況: 日本環境で最適化済み

### パフォーマンス最適化推奨事項
1. **Vercelリージョン変更**: `vercel.json`で`hnd1`（東京羽田）を指定
2. **メリット**: 日本ユーザー向けのレイテンシ大幅改善
3. **現状**: Supabaseは既に東京、Vercelのみアメリカ東部

## 最新の改善履歴

### SETUP-GUIDE.md の改善
- **動的プロジェクト名**: `PROJECT_NAME`環境変数での柔軟な命名
- **命名規則**: 英数字・ハイフン、小文字開始
- **自動設定**: Next.js、Supabase、GitHub全てで統一命名
- **GitHub CLI対応**: `gh repo create`オプション追加

### 環境分離の完成
- **開発環境**: ローカルSupabase（127.0.0.1:54321）
- **本番環境**: SupabaseCloud（ap-northeast-1）+ Vercel（iad1）
- **自動切り替え**: 環境変数による透明な切り替え