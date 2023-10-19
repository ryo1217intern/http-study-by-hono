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






