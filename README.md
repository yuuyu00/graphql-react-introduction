# GraphQL勉強会リポジトリ

## セットアップ手順

pnpmが必要なのでインストールしてない方は恐縮ですがインストールお願いします！
https://pnpm.io/installation

pnpmをインストールしたら

- `pnpm install`
- `pnpm bootstrap`
- `pnpm dev`
- `cd packages/frontend && pnpm codegen-watch`

localhost:9000 にGraphQL APIのPlayground
localhost:3000 にReactアプリが開かれます

## GraphQLとは

https://graphql.org/

- API用のクエリ言語
- あくまでGraphQLは「仕様」であり、個別の実装は各プラットフォームに任される

### 特徴

- GraphQLは、フロントエンドとバックエンドの間に立って双方の「約束」を決める
- その約束を定義するものが「スキーマ」というもの
- 欲しいデータをJSONのように書いて、引数はvariablesに渡すだけ
- REST APIにおける `GET` に相当するものは `Query` と呼ばれる
- REST APIにおける `POST` `PUT` `DELETE` に相当するものは `Mutation` と呼ばれる

### なにが嬉しいのか

#### パス設計・レスポンス設計が不要

基本的にテーブル定義をそのままスキーマに書き写して各カラムを自由に取得できるように実装するだけなので、パス設計もレスポンス設計も不要になる。
コードベースが拡大するにつれて歪になっていくパス設計や、フロントエンド側の都合に応じて微調整しながら実質的に重複していくレスポンス設計に頭を悩ませる必要がなくなる。

#### 型安全性が高い

APIの仕様は全てスキーマに書いてあり、実装はそのスキーマの内容を守る実装をしなければならないので、スキーマだけ見れば確実にAPIの形がわかる。
スキーマからTSの型を生成して利用するツールチェインも豊富で、しっかりスキーマから生成された型を利用している以上、バックエンドの実装ミス以外は「叩いてみたら想定と違うレスポンスが返ってきた」みたいなことが一切なくなる。

#### APIインターフェースが中立になる

フロントエンドに寄せすぎてバックエンドが苦しむ必要がなくなる。逆も然り。
お互いにインターフェースを話し合って合意してから実装するみたいなことをする必要もなくなって、スキーマだけ先に決めたらAPIの実装を待たずにフロントエンドの実装を進めることができる。

#### リッチなドキュメントとPlaygroundが最初から用意されている

Apollo Serverを利用する場合、普通に起動するだけで高機能なPlaygroundとドキュメントがすぐに利用可能になる。
補完がばっちり効くので、postmanでちまちまやるより生産性も開発体験も圧倒的に良い

#### 不要なネットワークリクエスト削減

必要なデータだけ絞って取得できるので、API側の都合で不要なデータまで一緒に取ってくる、みたいな状況を防ぐことがフロントエンドだけの裁量でできる。

#### 複数のAPIを1回のネットワークリクエストで叩ける

query/mutationは1回のリクエストにいくらでも詰め込めるので、1画面でいくつかのデータを取得する必要がある場合に何個もリクエストを飛ばす必要がなくなる

### 欠点

#### 超高速プロトタイプ開発には向かない（かもしれない）

実装者の習熟度によってはREST APIの方が実装速度が早い可能性がある。

#### 学習コストが高い

扱える人が少ないので、採用/アサインの観点で困る可能性が高い

#### エンドポイント単位でのパフォーマンス計測ができない

使い慣れたパフォーマンス計測ツールがあったとしても、GraphQLではエンドポイントが一つなので利用できない。
ただし、Apollo Server含め多くのGraphQLライブラリにはパフォーマンス計測ツールがある。

#### レート制限が困難な可能性がある

レスポンスのデータ量はクエリの内容に応じて変わるので、REST APIのように時間単位でいくらのリクエスト、というような制限は意味が薄くなる。
一応、queryでネスト可能な階層を制限するなどの対策はあるにはある。

## ReactでQueryを書いてみよう

### Providerについて

Apollo Clientを使用するためにProviderを書く必要がある。
App.tsxに書かれている。

### 投稿を取得してみる

1. localhost:9000 にアクセスして、Playgroundを開く。
2. `articles` Queryを叩いてみる
3. 実行してみて、無事にデータを取得できたら `src/graphql/article.ts` にQueryの内容を書き写す。
4. ArticleList コンポーネントにて `useQuery` を使って、 `src/graphql/article.ts` に書いたクエリを呼んでみる
5. レスポンスが型つきで返ってくるので、コンポーネントの中で表示してみる
