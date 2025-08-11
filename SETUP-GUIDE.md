# Next.js + Supabase + Vercel アプリ構築ガイド

このガイドは、Next.js 15 + Supabase + Vercel で構成されたモダンWebアプリケーションを一括で構築するための手順書です。

## 前提条件

- Node.js 18以上がインストール済み
- Dockerがインストール済み（ローカルSupabase用）
- GitHubアカウント
- Vercelアカウント
- Supabaseアカウント

## 0. プロジェクト名の設定

まず最初に、作成するプロジェクトの名前を決めて、以下のコマンドで環境変数として設定します：

```bash
# プロジェクト名を設定（例：my-awesome-app）
export PROJECT_NAME="your-project-name"

# 設定確認
echo "プロジェクト名: $PROJECT_NAME"
```

**注意:** プロジェクト名は以下の規則に従ってください：
- 英数字とハイフン（-）のみ使用可能
- 小文字で始まる
- GitHubリポジトリ名としても使用可能な名前

## 1. プロジェクト初期化

### Next.jsプロジェクト作成
```bash
# 設定したプロジェクト名でNext.jsアプリケーションを作成
npx create-next-app@latest $PROJECT_NAME --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# プロジェクトディレクトリに移動
cd $PROJECT_NAME
```

### Supabase依存関係の追加
```bash
# Supabaseクライアントをインストール
npm install @supabase/supabase-js
```

## 2. Supabase設定

### ローカルSupabase初期化
```bash
# Supabase CLIをインストール（未インストールの場合）
npm install -g supabase

# Supabaseプロジェクトを初期化
supabase init
```

### 本番Supabaseプロジェクト作成
```bash
# Supabaseにログイン
supabase login

# 組織一覧を確認
supabase orgs list

# 本番プロジェクトを作成（組織IDとパスワードは適宜変更）
supabase projects create ${PROJECT_NAME}-prod --org-id YOUR_ORG_ID --db-password "SecurePass123!" --region ap-northeast-1

# プロジェクトをリンク（プロジェクトIDは作成時に表示）
supabase link --project-ref YOUR_PROJECT_REF
```

## 3. Supabaseクライアント設定

### lib/supabase.ts作成
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 4. 環境変数設定

### .env.local（開発環境用）
```env
# Supabase Development Environment (Local)
# When running locally, start with: supabase start
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvY2FsaG9zdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQ1MTg1NTUwLCJleHAiOjE5NjA3NjE1NTB9.A9x7b1FhjCTFWVGa8QJ5OJMGq9D3LY1Ib3YGI5X2-OY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvY2FsaG9zdCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2NDUxODU1NTAsImV4cCI6MTk2MDc2MTU1MH0.M2f7-MgBMi7J7bGl8iXV5bCr6-9d8z6QJfWuDkGqKzs

# Production credentials (used by Vercel)
# NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

## 5. メインページ作成（接続テスト付き）

### src/app/page.tsx
```typescript
'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Try to get the current session to test the connection
        const { data, error } = await supabase.auth.getSession()
        
        // If we can call the auth API without network errors, the connection is working
        setIsConnected(true)
      } catch (error) {
        console.log('Supabase connection error:', error)
        setIsConnected(false)
      } finally {
        setLoading(false)
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <span className="text-2xl font-bold">+</span>
          <div className="text-2xl font-bold text-green-600">Supabase</div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500' : isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">
              Supabase Status: {loading ? 'Checking...' : isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          {!loading && !isConnected && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Make sure to set your Supabase URL and API key in .env.local
            </p>
          )}
        </div>

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Configure your Supabase credentials in{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              .env.local
            </code>
          </li>
          <li className="tracking-[-.01em]">
            Start building your app with Next.js and Supabase
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy to Vercel
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="https://supabase.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supabase Docs
          </a>
        </div>
      </main>
    </div>
  )
}
```

## 6. Vercel設定

### Vercelプロジェクト作成とデプロイ
```bash
# Vercelにログイン
vercel login

# プロジェクトを初回デプロイ
vercel

# 本番用Supabaseの認証情報を取得
supabase projects api-keys --project-ref YOUR_PROJECT_REF

# Vercelに環境変数を設定
echo "https://YOUR_PROJECT_REF.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "YOUR_ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# 環境変数を反映してデプロイ
vercel --prod
```

## 7. Git設定

### GitHubリポジトリ作成とプッシュ
```bash
# Gitリポジトリ初期化（create-next-appで作成済みの場合はスキップ）
git init
git add .
git commit -m "初期コミット"

# GitHubでリポジトリを作成後（リポジトリ名は$PROJECT_NAMEを使用）
git remote add origin https://github.com/YOUR_USERNAME/$PROJECT_NAME.git
git push -u origin main

# または、GitHub CLIを使用してリポジトリを自動作成
gh repo create $PROJECT_NAME --public --source . --push
```

## 8. ドキュメント作成

### README.md作成
プロジェクトの概要、セットアップ手順、環境構成を記載したREADME.mdを作成

### CLAUDE.md作成
Claude Code用のプロジェクトガイダンスを記載

## 9. 開発開始

### ローカル開発環境起動
```bash
# Supabaseローカル環境を起動
supabase start

# 開発サーバー起動
npm run dev
```

### 確認項目
- [ ] ローカルでSupabase接続ステータスが「Connected」
- [ ] Vercelデプロイで本番環境が正常動作
- [ ] GitHubリポジトリに全変更がプッシュ済み

## 環境構成

| 環境 | Supabase | URL | 設定場所 |
|------|----------|-----|----------|
| 開発 | ローカルDocker | http://127.0.0.1:54321 | .env.local |
| 本番 | Supabaseクラウド | https://プロジェクト.supabase.co | Vercel環境変数 |

## トラブルシューティング

### よくある問題

1. **Supabase接続エラー**
   - `supabase start`でローカル環境が起動しているか確認
   - Dockerが起動しているか確認

2. **Vercelデプロイエラー**
   - 環境変数が正しく設定されているか確認
   - 本番Supabaseプロジェクトが正常に作成されているか確認

3. **ポート競合**
   - 3000番ポートが使用中の場合、自動的に3001番を使用

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

## プロジェクト名の使用例

このガイドでは、`PROJECT_NAME` 環境変数を使用して以下のように動的に名前を設定します：

```bash
# 例：プロジェクト名を "my-todo-app" に設定
export PROJECT_NAME="my-todo-app"
```

設定後、以下のような構成になります：
- **Next.jsプロジェクト**: `my-todo-app/`
- **Supabaseプロジェクト**: `my-todo-app-prod`
- **GitHubリポジトリ**: `https://github.com/YOUR_USERNAME/my-todo-app`
- **Vercelデプロイ**: `my-todo-app-xxx.vercel.app`

このガイドに従って作業することで、開発環境と本番環境が分離された安全なNext.js + Supabase + Vercelアプリケーションが構築できます。