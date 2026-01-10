# Base Components

基本的な再利用可能なコンポーネントを配置するディレクトリです。

## 配置するコンポーネント

- **基本的なUI要素**: Button, Input, Card, Badgeなど
- **プロジェクト全体で使用される汎用的なコンポーネント**
- **スタイルシステムの基礎となるコンポーネント**

## 命名規則

- ファイル名: PascalCase（例: `Button.vue`, `Card.vue`）
- 使用時: `<BaseButton />`, `<BaseCard />`（Nuxtの自動インポートにより、`base/`ディレクトリ内のコンポーネントには`Base`プレフィックスが付きます）

## コンポーネント一覧

- `Button.vue` - ボタンコンポーネント（primary, secondary, outline, dangerバリアント）
- `Card.vue` - カードコンポーネント

