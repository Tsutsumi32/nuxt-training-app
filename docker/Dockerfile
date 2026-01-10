# マルチステージビルドを使用
# ステージ1: 依存関係のインストール
FROM node:20-alpine AS deps

WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./
COPY .npmrc* ./

# 依存関係をインストール
RUN npm ci

# ステージ2: ビルドステージ
FROM node:20-alpine AS builder

WORKDIR /app

# 依存関係をコピー
COPY --from=deps /app/node_modules ./node_modules

# ソースコードをコピー
COPY . .

# ビルド実行
RUN npm run build

# ステージ3: 本番環境
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 必要なファイルのみコピー
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", ".output/server/index.mjs"]

# 開発環境用
FROM node:20-alpine AS dev

WORKDIR /app

ENV NODE_ENV=development

# 開発環境ではボリュームマウントを使用するため、package.jsonのみコピー
COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]

