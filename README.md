# Vercel + Supabase ベースアプリ

Next.js、Vercel、Supabaseを使用したベースアプリケーションです。

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. Supabaseプロジェクトの設定:
   - [Supabase](https://supabase.com/)でプロジェクトを作成
   - プロジェクトのURL and API keyを取得

3. 環境変数の設定:
```bash
cp .env.example .env.local
```

`.env.local`ファイルを編集して、Supabaseの認証情報を設定:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. 開発サーバーの起動:
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリを確認できます。

## Vercelへのデプロイ

1. [Vercel](https://vercel.com/)にアカウントを作成
2. GitHubリポジトリをVercelに接続
3. 環境変数を設定
4. デプロイ

## 技術スタック

- **Next.js 15**: React フレームワーク
- **TypeScript**: 型安全性
- **Tailwind CSS**: スタイリング
- **Supabase**: バックエンドサービス（データベース、認証など）
- **Vercel**: ホスティングプラットフォーム

## 機能

- Supabase接続ステータスの表示
- レスポンシブデザイン
- ダークモード対応

## Learn More

Next.jsについて詳しく学ぶには:

- [Next.js Documentation](https://nextjs.org/docs) - Next.jsの機能とAPI
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブなNext.jsチュートリアル
- [Supabase Documentation](https://supabase.com/docs) - Supabaseの使い方
