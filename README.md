# Nuxt ポートフォリオサイト

Nuxt 3/4系を使用したポートフォリオサイトのプロジェクトです。Docker環境で開発を行い、SSG（Static Site Generation）を採用しています。

## 📋 要件

- Docker & Docker Compose
- Make（任意、コマンド実行に使用）

## 🚀 セットアップ

### 1. リポジトリのクローン（初回のみ）

```bash
git clone <repository-url>
cd nuxt-training-app
```

### 2. 環境変数の設定

まず、`.env`ファイルを作成します：

```bash
cp .env-example .env
```

`.env`ファイルには以下の設定項目があります（必要に応じて編集してください）：

- `FRONT_CONTAINER`: Makefileで使用するサービス名（デフォルト: `nuxt`、通常は変更不要）
  - 注意: `docker-compose.yml`のサービス名は`nuxt`に固定されています
- `CONTAINER_NAME`: コンテナ名（デフォルト: `nuxt-portfolio`）
- `HOST_PORT`: ホスト側のポート番号（デフォルト: `3000`）
- `CONTAINER_PORT`: コンテナ側のポート番号（デフォルト: `3000`）
- `NODE_ENV`: Node.jsの環境変数（デフォルト: `development`）

### 3. 初回セットアップ（推奨）

**初回セットアップコマンドを使用する場合**（Dockerコンテナの起動とpre-commitフックの設置を一度に実行）：

```bash
make init
```

このコマンドは以下を実行します：
- `.env`ファイルが存在しない場合、`.env-example`からコピー
- Dockerコンテナを起動（`docker compose up -d`）
- pre-commitフックを`.git/hooks/pre-commit`に設置

### 4. 手動セットアップ

**手動でセットアップする場合**：

まず、Dockerイメージをビルドします：

```bash
make build
```

または、直接docker composeコマンドを使用：

```bash
docker compose build
```

**注意**: 初回起動時、コンテナ内で`npm install`が自動的に実行されます。型定義エラーは、依存関係のインストール後に解決されます。

### 5. コンテナの起動

開発サーバーを起動します：

```bash
make up
```

または、フォアグラウンドで起動（ログを確認しながら開発）：

```bash
make dev
```

**初回起動時**: Dockerイメージをビルドする際に、依存関係が自動的にインストールされます。  
初回起動後、少し待ってからブラウザで以下のURLにアクセスしてください：

```
http://localhost:${HOST_PORT:-3000}
```

ポート番号は`.env`ファイルの`HOST_PORT`設定で変更できます。

もし依存関係がインストールされていない場合は、手動でインストールできます：

```bash
make install
```

## 📝 利用可能なコマンド（Makefile）

プロジェクトでは、Makefileを使用してコマンドを管理しています。

### 基本コマンド

- `make init` - 初回セットアップ（docker compose up -d & pre-commitフック設置）
- `make build` - Dockerイメージをビルド
- `make up` - コンテナをバックグラウンドで起動
- `make down` - コンテナを停止・削除
- `make restart` - コンテナを再起動
- `make logs` - コンテナのログを表示（-fオプションでフォロー）
- `make shell` - コンテナ内のシェルにアクセス

### 開発コマンド

- `make install` - 依存関係をインストール（コンテナ内で実行）
- `make dev` - 開発サーバーを起動（フォアグラウンド）

### コード品質コマンド

- `make lint` - ESLintでコードをチェック
- `make lint-fix` - ESLintでコードを自動修正
- `make format` - Prettierでコードを整形
- `make format-check` - Prettierでコードの整形状況をチェック

### ビルド・デプロイコマンド

- `make generate` - 静的サイトを生成（SSG）
- `make preview` - 生成された静的サイトをプレビュー
- `make clean` - 生成ファイルとnode_modulesを削除

### ヘルプ

- `make help` - 利用可能なコマンド一覧を表示

## 🏗️ プロジェクト構成

```
nuxt-training-app/
├── .dockerignore          # Dockerビルド時に除外するファイル
├── .env                   # 環境変数設定（.gitignoreに含まれる）
├── .env-example           # 環境変数設定のサンプル
├── .gitignore             # Git除外ファイル
├── docker/                # Docker関連ファイル
│   └── Dockerfile         # Dockerイメージの定義
├── docker-compose.yml     # Docker Composeの設定（環境変数対応）
├── Makefile               # コマンド管理用Makefile（環境変数対応）
├── pre-commit             # Git pre-commitフック（自動整形・Lint）
├── README.md              # このファイル
└── app/                   # Nuxtアプリケーションのソースコード
    ├── .eslintignore      # ESLintチェックから除外するファイル
    ├── .eslintrc.cjs      # ESLint設定ファイル
    ├── .prettierignore    # Prettier整形から除外するファイル
    ├── .prettierrc        # Prettier設定ファイル
    ├── nuxt.config.ts     # Nuxtの設定ファイル（SSG設定）
    ├── package.json       # プロジェクトの依存関係
    ├── tsconfig.json      # TypeScript設定ファイル
    ├── app.vue            # アプリケーションのルートコンポーネント
    └── pages/             # ページコンポーネント
        └── index.vue      # トップページ
```

**注意**: プロジェクトは環境ファイル群（ルート直下）とNuxtアプリケーションのソースコード（`app/`配下）が分離されています。

## 🐳 Docker環境について

### 開発環境

開発環境では、`docker-compose.yml`を使用してホットリロードが有効な開発サーバーを起動します。

- ポート: `.env`ファイルの`HOST_PORT`設定（デフォルト: 3000）
- コンテナ名: `.env`ファイルの`CONTAINER_NAME`設定（デフォルト: nuxt-portfolio）
- ボリュームマウント: ソースコードがリアルタイムで同期
- ホットリロード: ファイル変更時に自動的に反映
- Dockerfile: `docker/Dockerfile`に配置

### 本番環境

本番環境では、マルチステージビルドを使用して最適化されたイメージを作成します。

Dockerfileは`docker/Dockerfile`に配置されており、以下のステージがあります：
- `deps`: 依存関係のインストール
- `builder`: アプリケーションのビルド
- `runner`: 本番環境用のランタイム
- `dev`: 開発環境用（docker-compose.ymlで使用）

## 📦 SSG（Static Site Generation）

このプロジェクトはSSGを採用しています。静的サイトを生成するには：

```bash
make generate
```

生成されたファイルは`app/.output/public`ディレクトリに出力されます。

生成されたサイトをプレビューするには：

```bash
make preview
```

## 🔍 コード品質ツール

### ESLint

プロジェクトでは、Nuxt 3/4に最適化されたESLint設定を使用しています。

- **設定ファイル**: `app/.eslintrc.cjs`
- **チェック**: `make lint`
- **自動修正**: `make lint-fix`

### Prettier

コードの整形にはPrettierを使用しています。

- **設定ファイル**: `app/.prettierrc`
- **整形**: `make format`
- **整形状況チェック**: `make format-check`

### Pre-commitフック

Gitコミット前に自動的にコードの整形とLintチェックが実行されます。

- **フックファイル**: `pre-commit`
- **設定**: `make init`コマンドで自動的に設置されます
- **対象ファイル**: Vue, TypeScript, JavaScript, JSON, CSS, SCSS

コミット前にステージングされたファイルに対して、Prettierによる整形とESLintによる自動修正が実行されます。

## 🔧 トラブルシューティング

### ポート3000が既に使用されている場合

`.env`ファイルの`HOST_PORT`を変更してください：

```bash
HOST_PORT=3001  # ホスト側のポートを変更
```

変更後、コンテナを再起動：

```bash
make restart
```

### 環境変数の設定を変更した場合

環境変数を変更した後は、コンテナを再起動してください：

```bash
make restart
```

### コンテナの再構築が必要な場合

```bash
make clean
make build
make up
```

### 依存関係のインストールエラー

コンテナ内で直接実行：

```bash
make shell
npm install
```

## 📚 参考資料

- [Nuxt Documentation](https://nuxt.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## 📄 ライセンス

MIT

