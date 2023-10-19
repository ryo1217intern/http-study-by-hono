# HTTPメソッドを学習する
## まずは環境構築を行う
前提：NodeとVScodeはInstall済みであるとする.(Dockerでもいい)

今回言語および環境はJSのライブラリであるhonoを用いる.

また実際にデプロイもしたいのでcloudflareを使ってデプロイする.

## Install
```
npm create hono@latest {任意の名前}
```
任意の名前で使えない文字を使うとターミナルから叱責されるため注意が必要.

基本的にアルファベットとハイフン(-)なら怒られないはずなのでこれらを使おう.

無事createできたらディレクトリに移動する.
```
cd {任意の名前}
```
ディレクトリに移動したらまずはnpm iを行おう.
```
npm i
```
ちなみにこの「i」は「install」の意.

ここまでできたら準備環境.

実際にlocalで開いてみる.

```
npm run dev
```
実行するとかっこいい緑色の文字でlocal環境でサーバーが起動しているはず.

ここまでできたら準備完了.

※追記

もしかしたらこれだけだとtsconfig.jsonが赤唐辛子になっているかもしれない.

原因としては@cloudflare/workes-typesが入っていないからだと考えられる.

そのためこのタイプスをnpm iしよう.

```
npm i @cloudflare/workers-types
```

## GETメソッドを使ってみる
いきなりGETメソッドと言われてもわからない人もいると思うので自分のアウトプットを含めて説明する.

まずGETとは情報を取得するプロトコルである.

じゃあなんのデータを取得するかというとURIで指定したデータを取得する.

URIとはURLとURNの総称？抽象化？したものである.

まあURLと思ってもらえればいい.

URIとはリソースの名前.要するにファイル名だと思ってもらえればいい.

**従ってGETメソッドとは指定したURIのリソースを取得するということである.**

では今回リソースの名前とリソースの内容は何かというと...

```JavaScript
app.get("/", () => {
  return new Response("Hello! world! by hono", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
});
```
Responseの第一引数である`"Hello! world! by hono"`がリソース、そしてそれ以降の波括弧で囲まれた箇所がステータスコードとヘッダである.「404 not found」とかのあれです.ヘッダはメタ情報.

詳しくはあらかたのHTTPメソッドを使った後に説明しようと思います.

またGETメソッドはべき等であり、安全であるという点です.

数学でいうと掛け算における１のような存在です.

どんなnに１をかけても元のデータは変わりません.

**すなわち元のリソースに対して何回でもGETしても安全かつ結果は変わらないという話.**

## GETメソッドをJSONに対して使う.

ただテキストを表示するためにGETメソッドは存在するのではない.

基本的にはJSONを取り扱う.

まずはsrcディレクトリ内にapiフォルダを作り,api.tsファイルを作成する.

以下のような内容にする.

```JavaScript
import { Hono } from "hono";

let bookList = [
  { id: 1, title: "数学の教科書1", completed: false },
  { id: 2, title: "数学の教科書2", completed: false },
  { id: 3, title: "数学の教科書3", completed: false },
  { id: 4, title: "数学の教科書4", completed: false },
  { id: 5, title: "数学の教科書5", completed: false },
  { id: 6, title: "数学の教科書6", completed: false },
  { id: 7, title: "数学の教科書7", completed: false },
  { id: 8, title: "数学の教科書8", completed: false },
  { id: 9, title: "数学の教科書9", completed: false },
  { id: 10, title: "数学の教科書10", completed: false },
];

const books = new Hono();
books.get("/", (c) => c.json(bookList));

export { books };
```

今回はデータベースを使わずにデータを生牡蠣する.

フィールドがid: int, title: string, completed: booleanで構成された配列.

※JSONなのでフィールドという表現が適切か危うい.

最終的にこのプログラムファイルはindex.tsにて使用するので出力としてexportする.

`c.json(bookList)`とすることによってGETメソッドがリクエストされた際にJSON形式のbookListがレスポンスされる.

それではindex.tsにてこのapi.tsをどのように使うのかという話だがimportをすればいい.

```JavaScript
import { Hono } from "hono";
import { books } from "./api/api"

const app = new Hono();
app.route("/api/books", books);

app.fire();
```

`import { books } from "./api/api`というのがその部分に当たる.

※今回apiというディレクトリ名の中にapi.tsというプログラムファイルを入れてしまっていて,一意性がなく可読性の低下につながってしまうと思われる.今後は気をつけます.

この`import`によってindex.tsというプログラムファイルにてapi.tsというファイルを認識できるようになった.

では実際にどのように扱うかという話だが`~.route`を使う.

このrouteメソッドによってアドレスにこのパスが入力された際にapi.tsにて宣言された処理を返すことになる.

実際にlocalhostで指定されたポート番号と/api/booksを入力すると先ほどレスポンスとして設定してjsonが画面に表示される.







