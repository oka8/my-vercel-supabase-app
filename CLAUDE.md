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

### プロジェクト構造（2024年12月更新）
```
src/
├── app/                    # Next.js App Routerのページとレイアウト
│   ├── demo/              # 設計パターンデモページ
│   ├── error.tsx          # エラーページ
│   └── global-error.tsx   # グローバルエラーページ
├── components/            # Reactコンポーネント（設計パターン別整理）
│   ├── providers/         # React Context Providers（状態管理）
│   ├── hoc/              # Higher-Order Components
│   ├── renderProps/      # Render Props pattern components
│   ├── compositions/     # Composition pattern components
│   ├── containers/       # Business logic containers
│   ├── presentational/  # Pure UI components (presentations)
│   ├── features/         # Feature-specific components
│   ├── ui/               # Reusable UI components
│   └── examples/         # パターンデモ用コンポーネント
├── hooks/                # Custom React hooks
├── lib/                  # 外部ライブラリ設定
│   ├── supabase.ts       # Supabaseクライアント設定
│   └── stores/           # Zustand状態管理ストア
├── types/                # TypeScript型定義
├── utils/                # ユーティリティ関数
.env.local                # 環境変数（Supabase認証情報）
supabase/                 # Supabase設定とマイグレーション
.github/workflows/        # GitHub Actions CI/CD設定
```

## よく使うコマンド

### 開発
```bash
npm run dev          # 開発サーバー起動（通常3000番ポート、競合時は3001）
npm run build        # 本番用ビルド
npm run start        # 本番サーバー起動
npm run lint         # ESLint実行
npm run lint:fix     # ESLintエラー自動修正（将来追加予定）
npm run types:check  # TypeScript型チェック
npm run analyze      # バンドルサイズ分析
```

### テスト（Phase 1で実装予定）
```bash
npm run test         # Jest単体テスト実行
npm run test:watch   # テストをwatchモードで実行
npm run test:coverage # テストカバレッジ取得
npm run test:e2e     # Playwright E2Eテスト（将来追加）
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

## 🎯 現在の実装状況（2024年12月）

### ✅ 完了済み項目

#### 1. アーキテクチャ大幅改善（2024年12月実装）
- **フォルダ構造標準化**: 設計パターン別のコンポーネント整理
- **モジュール分離**: 関心事の分離とコードの再利用性向上
- **型安全性強化**: TypeScript strict mode完全対応

#### 2. 設計パターン実装
- **Container/Presentational パターン**: ビジネスロジックとUIの分離
- **Higher-Order Components (HOC)**: withLoading, withErrorBoundary, withAuth等
- **Render Props パターン**: AsyncOperation, Toggle, Mouse, Form, Connection
- **Provider パターン**: Theme, Settings, Error, Connection状態管理
- **コンポーネント合成**: Card, Modal, Form, Layout等の合成可能コンポーネント
- **Custom Hooks**: useConnection, useAsyncOperation, useToggle等20+のhooks

#### 3. 状態管理の統一化
- **Zustand導入**: 軽量で高性能な状態管理
- **Provider Pattern**: React Contextによる状態共有
- **エラーストア**: 統一されたエラーハンドリング
- **接続状態管理**: Supabase接続状況の監視

#### 4. パフォーマンス最適化
- **React.memo**: 不要な再レンダリング防止
- **Lazy Loading**: コンポーネントの遅延読み込み
- **Code Splitting**: バンドルサイズの最適化
- **画像最適化**: next/image活用設定

#### 5. 品質管理基盤
- **ESLint強化**: strict設定でコード品質確保
- **TypeScript厳格化**: exactOptionalPropertyTypes等の厳密型チェック
- **エラーバウンダリ**: 包括的なエラーキャッチ機能
- **パフォーマンス監視**: Web Vitals計測機能

#### 6. セキュリティ強化
- **セキュリティヘッダー**: CSP, HSTS, X-Frame-Options等の実装
- **依存関係管理**: 脆弱性のない安全なパッケージ構成
- **環境変数保護**: 機密情報の適切な分離

#### 7. 開発者体験 (DX) 向上
- **デモページ**: `/demo`で設計パターンの動作確認
- **包括的ドキュメント**: IMPROVEMENT-PROPOSALS.md, ROADMAP.md
- **GitHub Actions**: CI/CD基盤設定完了

### 📊 現在の品質指標
- **TypeScript厳格度**: 100%（strict mode）
- **ESLintエラー**: 0件
- **設計パターン実装**: 6パターン完了
- **カスタムHooks**: 20+個実装
- **コンポーネント数**: 50+個（パターン別整理済み）

## 🚀 次期対応予定（優先度順）

### Phase 1: テスト・CI/CD基盤強化（2-3週間）🔴 高優先度

#### 1.1 テスト環境構築
```bash
# 導入予定パッケージ
npm install -D @testing-library/react @testing-library/jest-dom 
npm install -D jest jest-environment-jsdom @types/jest
```

**実装予定:**
- [ ] Jest設定の本格運用（jest.config.js設定済み）
- [ ] Custom Hooksのユニットテスト
- [ ] コンポーネントテスト（全設計パターン対象）
- [ ] Zustandストアのテスト
- [ ] APIモック・統合テスト

**目標指標:**
- テストカバレッジ: 80%以上
- 重要機能のテスト: 100%

#### 1.2 CI/CD本格運用
**設定済み項目:**
- ✅ GitHub Actions ワークフロー（.github/workflows/ci.yml）
- ✅ Lighthouse CI設定（lighthouserc.json）
- ✅ 自動ビルド・デプロイ設定

**実装予定:**
- [ ] テスト自動実行の確認
- [ ] プルリクエスト時の品質チェック
- [ ] パフォーマンス劣化の自動検知
- [ ] セキュリティスキャン自動化

#### 1.3 品質監視強化
```bash
# 導入予定監視ツール
npm install @sentry/nextjs          # エラートラッキング
npm install @axe-core/react         # アクセシビリティ
```

### Phase 2: 認証・データベース本格実装（3-4週間）🟡 中優先度

#### 2.1 Supabase認証システム
**実装予定機能:**
- [ ] ユーザー登録・ログイン機能
- [ ] プロフィール管理システム
- [ ] Row Level Security (RLS) 設定
- [ ] OAuth プロバイダー統合（Google, GitHub）

**データベース設計:**
```sql
-- 実装予定テーブル
user_profiles(id, full_name, avatar_url, created_at)
user_settings(user_id, theme, language, notifications)
user_sessions(user_id, device_info, last_active)
```

#### 2.2 リアルタイム機能
- [ ] Supabase Realtime活用
- [ ] 接続状況の共有機能
- [ ] 通知システム基盤

### Phase 3: UX/パフォーマンス最適化（2-3週間）🟡 中優先度

#### 3.1 アクセシビリティ強化
- [ ] ARIA属性の適切な実装
- [ ] キーボードナビゲーション完全対応
- [ ] スクリーンリーダー対応
- [ ] カラーコントラスト比の確保

#### 3.2 パフォーマンス目標達成
**目標指標:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Core Web Vitals: すべて緑評価

#### 3.3 Storybook導入
```bash
# コンポーネントカタログ作成
npx storybook@latest init
```

### Phase 4: 付加価値機能（任意実装）🟢 低優先度

#### 4.1 国際化 (i18n) 対応
- [ ] next-intl導入
- [ ] 日本語・英語対応
- [ ] 将来的な多言語展開基盤

#### 4.2 PWA機能
- [ ] オフライン対応
- [ ] プッシュ通知
- [ ] アプリライクUX

## 📋 実装時の注意事項

### 開発時の原則
1. **段階的実装**: 各Phase完了後に品質確認
2. **後方互換性**: 既存機能への影響最小化
3. **パフォーマンス重視**: 機能追加時の性能劣化防止
4. **セキュリティファースト**: 全機能でセキュリティ考慮

### 品質基準
- **型安全性**: TypeScript strict mode維持
- **テストカバレッジ**: 新機能は必ずテスト実装
- **ESLint準拠**: コード品質基準の維持
- **アクセシビリティ**: WCAG 2.1 AA準拠

### パフォーマンス基準
- **バンドルサイズ**: 200KB以下維持
- **ビルド時間**: 30秒以下
- **Core Web Vitals**: 全指標で緑評価

## 📚 参考ドキュメント

- **詳細改善提案**: `IMPROVEMENT-PROPOSALS.md`
- **実装ロードマップ**: `ROADMAP.md`
- **設計パターンデモ**: `/demo`ページ
- **型定義**: `src/types/`ディレクトリ

---

**最終更新**: 2024年12月  
**次回レビュー予定**: Phase 1完了時