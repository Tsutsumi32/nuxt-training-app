.PHONY: help init build up down restart logs shell install dev generate preview clean lint format

# .envファイルから環境変数を読み込む
-include .env
export

# デフォルト値の設定
FRONT_CONTAINER ?= nuxt
CONTAINER_NAME ?= nuxt-portfolio

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
	@echo "  make dev        - 開発サーバーを起動"
	@echo "  make generate   - 静的サイトを生成（SSG）"
	@echo "  make preview    - 生成された静的サイトをプレビュー"
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
	docker compose up

# 静的サイトを生成（SSG）
generate:
	docker compose run --rm $(FRONT_CONTAINER) npm run generate

# 生成された静的サイトをプレビュー
preview:
	docker compose run --rm -p ${HOST_PORT:-3000}:${CONTAINER_PORT:-3000} $(FRONT_CONTAINER) npm run preview

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
	rm -rf node_modules .nuxt .output dist
	docker compose down -v

