# microCMS セットアップガイド

## 概要
このプロジェクトでは、Works（実績）コンテンツをmicroCMSで管理しています。
Cloudflare Pagesでのデプロイに対応しています。

## 環境変数の設定

### 開発環境（ローカル）

`.env`ファイルに以下の環境変数を追加してください（`PUBLIC_`プレフィックス付き）：

```env
PUBLIC_MICROCMS_SERVICE_DOMAIN=your-service-domain
PUBLIC_MICROCMS_API_KEY=your-api-key
```

### Cloudflare Pagesでの設定

1. Cloudflare Pagesのダッシュボードにアクセス
2. プロジェクトの「Settings」→「Environment variables」に移動
3. 以下の環境変数を追加（`PUBLIC_`プレフィックス**なし**）：
   - `MICROCMS_SERVICE_DOMAIN`: microCMSのサービスドメイン（例：`your-service`）
   - `MICROCMS_API_KEY`: microCMSのAPIキー

**重要**: 
- 開発環境: `PUBLIC_`プレフィックス付きの環境変数を使用
- 本番環境（Cloudflare Pages）: `PUBLIC_`プレフィックスなしの環境変数を使用
- コードは両方の環境変数をチェックし、利用可能な方を使用します

### 環境変数の取得方法

1. microCMSの管理画面にログイン
2. サービス設定から`MICROCMS_SERVICE_DOMAIN`を確認
   - 例：`https://your-service.microcms.io` の場合、`your-service`がサービスドメイン
3. API設定からAPIキーを生成し、`MICROCMS_API_KEY`に設定

## アーキテクチャ

このプロジェクトでは、以下のアーキテクチャを採用しています：

1. **サーバーAPIルート**: `/server/api/works/*.get.ts`
   - サーバーサイドでのみ実行される
   - `process.env`から直接環境変数を読み取る
   - Cloudflare Pagesでも動作

2. **ページコンポーネント**: `/pages/works.vue`, `/pages/index.vue`
   - `useFetch`を使用してサーバーAPIルートにアクセス
   - クライアントサイドでも動作（SSR/SSG）

3. **サービス層**: `/services/works.ts`
   - 現在は使用していない（サーバーAPIルートで直接実装）
   - 将来的な拡張用に保持

## microCMS API設定

### Works エンドポイント

エンドポイント名：`works`

#### 必須フィールド

| フィールドID | フィールド名 | タイプ | 必須 | 説明 |
|-------------|------------|-------|-----|------|
| title | タイトル | テキストフィールド | ✓ | 作品タイトル（set:html使用可能） |
| thumbnail | サムネイル | 画像 | ✓ | サムネイル画像 |
| category | カテゴリー | 参照-カテゴリ | ✓ | 作品カテゴリー |
| launch_date | 公開日 | 日時 | ✓ | 作品の公開日 |
| client | クライアント | テキストフィールド | ✓ | クライアント名 |
| url | URL | テキストフィールド | - | 外部リンク |
| overview | 概要 | リッチエディタ | - | 作品の概要説明 |
| subject | 課題・目的 | リッチエディタ | - | 制作の課題・目的 |
| target | ターゲット | リッチエディタ | - | 対象ユーザー |
| information_plan | 情報設計 | リッチエディタ | - | 情報設計の説明 |
| period | 製作期間 | テキストフィールド | - | 製作期間 |
| tool | 使用ツール | テキストフィールド | - | 使用したツール |
| in_charge | 担当業務 | テキストフィールド | - | 担当した業務内容 |
| materials | 資料 | 複数画像 | - | 制作資料の画像 |
| productions | 成果物 | 複数画像 | - | 成果物の画像 |
| click | クリック可能な画像 | 複数選択 | - | クリック可能な成果物のインデックス |

### Works Category エンドポイント

エンドポイント名：`works-category`

| フィールドID | フィールド名 | タイプ | 必須 |
|-------------|------------|-------|-----|
| name | カテゴリー名 | テキストフィールド | ✓ |

## 実装ファイル

- **サーバーAPIルート**: 
  - `app/server/api/works/index.get.ts` - Works一覧取得
  - `app/server/api/works/[id].get.ts` - Works詳細取得
  - `app/server/api/works/categories.get.ts` - カテゴリ一覧取得
  - `app/server/api/works/latest.get.ts` - 最新Works取得（トップページ用）
- **ページコンポーネント**: 
  - `app/pages/works.vue` - Works一覧ページ
  - `app/pages/works/[id].vue` - Works詳細ページ
  - `app/pages/index.vue` - トップページ（最新Works表示）
- **型定義**: `app/types/works.ts`
- **ユーティリティ**: `app/utils/sanitize.ts` - HTMLサニタイズ

## 使用方法

### ページコンポーネントでの使用例

```vue
<script setup lang="ts">
import type { Works } from '~/types/works'

// useFetchを使用してサーバーAPIルートにアクセス
const { data: worksResponse } = await useFetch<{ contents: Works[] }>('/api/works', {
  params: {
    limit: 10,
    categoryId: 'category-id',
  },
})

const works = computed(() => worksResponse.value?.contents || [])
</script>
```

## 注意事項

- **環境変数**: Cloudflare Pagesでは、環境変数は`process.env`から直接読み取れます
- **APIキーの安全性**: APIキーはサーバーAPIルートでのみ使用され、クライアントサイドに公開されません
- **SSG対応**: このプロジェクトはSSG（Static Site Generation）を採用しているため、ビルド時にデータを取得します
- **HTMLサニタイズ**: `set:html`で使用されるフィールドは自動的にサニタイズされます
- **最大取得件数**: デフォルトで100件まで取得可能です

## トラブルシューティング

### 環境変数が読み込まれない

1. Cloudflare Pagesの環境変数設定を確認
2. 環境変数名が正確か確認（`MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY`）
3. ビルドログでエラーメッセージを確認

### APIエラーが発生する

1. microCMSのAPIキーが正しいか確認
2. サービスドメインが正しいか確認
3. エンドポイント名が正しいか確認（`works`, `works-category`）
