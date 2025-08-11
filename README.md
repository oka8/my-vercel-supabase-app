# My Vercel Supabase App

Next.js 15 + Supabase + Vercel で構築されたモダンWebアプリケーション

## 環境構成

### 開発環境 (ローカル)
- **Supabase**: ローカルDocker環境 (http://127.0.0.1:54321)
- **データベース**: PostgreSQL (ポート: 54322)
- **認証**: Supabase Auth (ローカル)
- **ファイル**: `.env.local` (ローカル用設定)

### 本番環境 (Vercel)
- **Supabase**: 本番プロジェクト (fiwlltohirxtgbjfmlfo)
- **データベース**: Supabase Cloud (ap-northeast-1)
- **認証**: Supabase Auth (本番)
- **環境変数**: Vercelダッシュボードで管理

## 開発開始

### 1. 依存関係のインストール
```bash
npm install
```

### 2. Supabaseローカル環境の起動
```bash
supabase start
```

### 3. 開発サーバー起動
```bash
npm run dev
```

## 環境の切り替え

### ローカル開発環境
- `.env.local` でローカルSupabaseを使用
- `supabase start` でローカル環境が必要

### 本番環境
- Vercelの環境変数で本番Supabaseを使用
- 自動デプロイでmainブランチから反映

## よく使うコマンド

```bash
# 開発
npm run dev          # 開発サーバー起動
npm run build        # 本番ビルド
npm run lint         # ESLint実行

# Supabase
supabase start       # ローカル環境起動
supabase stop        # ローカル環境停止
supabase status      # 状況確認

# デプロイ
vercel --prod        # 本番デプロイ
```

## プロジェクト構造

```
src/app/           # Next.js App Routerページ
lib/supabase.ts    # Supabaseクライアント設定
supabase/          # Supabaseローカル設定
CLAUDE.md          # Claude Code用ドキュメント
```

## 注意事項

- ローカル開発時は必ず `supabase start` を実行してください
- 本番環境への変更は慎重に行ってください
- 環境変数の設定ミスに注意してください