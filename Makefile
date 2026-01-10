.PHONY: help init build up down restart logs shell install dev generate preview clean lint format

# .envファイルから環境変数を読み込む
-include .env
export

# デフォルト値の設定
FRONT_CONTAINER ?= nuxt
CONTAINER_NAME ?= nuxt-portfolio
HOST_PORT ?= 3000
CONTAINER_PORT ?= 3000
PREVIEW_HOST_PORT ?= 3001
PREVIEW_CONTAINER_PORT ?= 3000

# デフォルトターゲット
help:
	@echo "利用可能なコマンド:"
	@echo "  make init       - 初回セットアップ（docker compose up -d & pre-commitフック設置）"
	@echo "  make build      - Dockerイメージをビルド"
	@echo "  make up         - コンテナを起動"
	@echo "  make down       - コンテナを停止・削除"
	@echo "  make restart    - コンテナを再起動"
	@echo "  make logs       - コンテナのログを表示"
	@echo "  make shell      - コンテナ内のシェルにアクセス"
	@echo "  make install    - 依存関係をインストール"
	@echo "  make dev        - 開発サーバーを起動 (http://localhost:$(HOST_PORT))"
	@echo "  make generate   - 静的サイトを生成（SSG）"
	@echo "  make preview    - 生成された静的サイトをプレビュー (http://localhost:$(PREVIEW_HOST_PORT))"
	@echo "  make lint       - ESLintでコードをチェック"
	@echo "  make format     - Prettierでコードを整形"
	@echo "  make clean      - 生成ファイルとnode_modulesを削除"

# 初回セットアップ（docker compose up -d & pre-commitフック設置）
init: ## 初回セットアップ（docker compose up -d ＆ pre-commitフック設置）
	@if [ ! -f .env ]; then \
		echo "🟡 .envファイルが見つかりません。.env-exampleからコピーします..."; \
		cp -n .env-example .env 2>/dev/null || true; \
		echo "✅ .envファイルを作成しました。必要に応じて編集してください。"; \
	fi
	@echo "🟢 docker compose up -d を実行します..."
	docker compose up -d
	@echo "🟢 pre-commit フックを .git/hooks にコピーします..."
	@if [ ! -d .git/hooks ]; then \
		echo "❌ .git/hooks ディレクトリがありません。git 管理下で実行してください。"; \
		exit 1; \
	fi
	@cp -f pre-commit .git/hooks/pre-commit
	@chmod +x .git/hooks/pre-commit
	@echo "✅ 初期セットアップ完了: pre-commit フック設置済み"

# Dockerイメージをビルド
build:
	docker compose build

# コンテナを起動
up:
	docker compose up -d

# コンテナを停止・削除
down:
	docker compose down

# コンテナを再起動
restart: down up

# コンテナのログを表示
logs:
	docker compose logs -f

# コンテナ内のシェルにアクセス
shell:
	docker compose exec $(FRONT_CONTAINER) sh

# 依存関係をインストール
install:
	docker compose run --rm $(FRONT_CONTAINER) npm install

# 開発サーバーを起動（フォアグラウンド）
dev:
	@echo "🟢 開発サーバーを起動中..."
	@echo "📍 開発サーバー: http://localhost:$(HOST_PORT)"
	docker compose up

# 静的サイトを生成（SSG）
generate:
	@echo "🟡 静的サイト生成前に実行中のコンテナを一時停止します..."
	@docker compose stop $(FRONT_CONTAINER) 2>/dev/null || true
	@echo "🟢 ホスト側のapp/.outputディレクトリを削除します..."
	@rm -rf app/.output || true
	@echo "🟢 静的サイトを生成中..."
	docker compose run --rm --no-deps $(FRONT_CONTAINER) npm run generate
	@echo "✅ 静的サイトの生成が完了しました"

# 生成された静的サイトをプレビュー
preview:
	@if [ ! -d "app/.output" ]; then \
		echo "❌ .outputディレクトリが見つかりません。"; \
		echo "🟡 静的サイトを生成します..."; \
		$(MAKE) generate; \
	fi
	@echo "🟢 プレビューサーバーを起動中..."
	@echo "📍 開発サーバー: http://localhost:$(HOST_PORT)"
	@echo "📍 プレビューサーバー: http://localhost:$(PREVIEW_HOST_PORT)"
	docker compose run --rm -p $(PREVIEW_HOST_PORT):$(PREVIEW_CONTAINER_PORT) $(FRONT_CONTAINER) npm run preview

# ESLintでコードをチェック
lint:
	docker compose exec $(FRONT_CONTAINER) npm run lint

# ESLintでコードを自動修正
lint-fix:
	docker compose exec $(FRONT_CONTAINER) npm run lint:fix

# Prettierでコードを整形
format:
	docker compose exec $(FRONT_CONTAINER) npm run format

# Prettierでコードの整形状況をチェック
format-check:
	docker compose exec $(FRONT_CONTAINER) npm run format:check

# 生成ファイルとnode_modulesを削除
clean:
	@echo "🟡 コンテナを停止します..."
	@docker compose stop $(FRONT_CONTAINER) 2>/dev/null || true
	@echo "🟢 コンテナ内で生成ファイルを削除します..."
	@docker compose run --rm --no-deps $(FRONT_CONTAINER) sh -c "rm -rf .nuxt .output dist .nitro .data .cache" 2>/dev/null || true
	@echo "🟢 ホスト側の生成ファイルを削除します..."
	@rm -rf app/node_modules app/.nuxt app/.output app/dist app/.nitro app/.data app/.cache || true
	@echo "🟢 コンテナ・ボリューム・イメージを削除します..."
	docker compose down --rmi all --volumes --remove-orphans
	@echo "✅ クリーンアップが完了しました"

