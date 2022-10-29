# リンクリスト

サイトやファイルのリンクを検索／表示します。

## デモ動画

[![](https://img.youtube.com/vi/gzVICp4xvZs/0.jpg)](https://www.youtube.com/watch?v=gzVICp4xvZs)

## ファイル構成

|ファイル|説明|
|---|---|
|linklists.html|アプリ本体|
|links_01.json.js|リンク情報を含むjsファイル|
|links_02.json.js|リンク情報を含むjsファイル|
|links_03.json.js|リンク情報を含むjsファイル|
|linklists_99.html|links_99_zzz.json.jsファイルを追加したアプリ|
|links_99_zzz.json.js|リンク情報を含むjsファイル|


## アプリ起動方法

4つのファイル(linklists.html,links_01.json.js,links_02.json.js,links_03.json.js)をダウンロードし、linklists.htmlをブラウザアプリで起動するだけです。Webサーバは不要です。

＜Windows10環境：ブラウザの稼働確認結果＞

|ブラウザ|確認結果|
|------|------|
|Chrome|動作しました|
|Firefox|動作しました|
|Edge|動作しました|

※ 確認日 2021/8/22
※ ブラウザの設定などにより動作しない場合もあると思います

## リンク情報の追加/編集方法

リンク情報の追加/編集方法を紹介します。
`links_xx.json.js`にはJSON形式で情報が登録されています。JSON形式を崩さないよう情報を編集、追加することでリンク情報を編集できます。
以下は1つのリンクに必要な情報です。

```
  {
    "aicon"    : "google.png",
    "kana"     : "google",
    "Name"     : "Google",
    "URL"      : "https://www.google.com/",
    "category" : [
        { "key": "検索", "kana": "けんさく"}
      ],
    "note"     : "検索サイト"
  }
```

|パラメータ|説明|
|--------|--------|
|aicon|(オプション)表示する画像ファイル名。|
|kana|Nameの読み仮名。情報の表示順序に影響|
|Name|リンクを表示する際のタイトル|
|URL|リンクのURL|
|category|カテゴリ欄に表示する単語を登録。複数登録可|
|category-key|カテゴリ欄に表示する単語|
|category-kana|カテゴリ欄に表示する単語の読み仮名|
|note|備考欄|

※ パラメータ aicon について

パラメータ `aicon` には表示する画像ファイル名を記載します。
画像ファイルは、`aicon`フォルダ配下に格納しておきます。
サンプルとして以下の画像ファイルを格納しています。

- ./HTML-JavaScript-LinkLists/aicon
  - amazon.png
  - bing.png
  - file.png
  - folder.png
  - google.png
  - yahoo.png
  - youtube.png

## リンクファイル(links_xx.json.js)追加方法

新規作成したリンクファイル`links_99_zzz.json.js`をアプリに読み込ませる方法を紹介します。

(1) 新規リンクファイル`links_99_zzz.json.js`を作成します。

```
let list99 = {
"info": {"Title":"９９","ID":"99"},
"list": [
  {
    "kana"     : "ヤフーてんき",
    "Name"     : "Yahoo!天気",
    "URL"      : "https://weather.yahoo.co.jp/weather/",
    "category" : 
      [
        { "key": "天気予報", "kana": "てんきよほう"}
      ],
    "note"     : "メモ"
  },
];
```

新規リンクファイル`links_99_zzz.json.js`内の変数名`list99`は、他の`links_xx.json.js`ファイルと重複しないよう注意ください。

(2) `linklists.html`ファイルを以下のように編集します。（編集したファイルは`linklists_99.html`として保存しています）

```
<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>リンクリスト</title>
  <script src="links_01_aaa.json.js"></script>
  <script src="links_02_bbb.json.js"></script>
  <script src="links_03_ccc.json.js"></script>
  <script src="links_99_zzz.json.js"></script>
<script>
let list = [];
let listinfo = [];
let b1key  = new Array(); // list02_infoの情報
let c1key  = new Array(); // categoryの情報
let iptkey = new Array(); // 検索欄の情報

// 読み込むjsonを変数 list に追加
function set_List(){
  list.length = 0;
  if( b1key.length == 0 ){
    list = list.concat(list01["list"]);
    list = list.concat(list02["list"]);
    list = list.concat(list03["list"]);
    list = list.concat(list99["list"]);
    listinfo = listinfo.concat(list01["info"]);
    listinfo = listinfo.concat(list02["info"]);
    listinfo = listinfo.concat(list03["info"]);
    listinfo = listinfo.concat(list99["info"]);
  }else{
    for (let i = 0; i < b1key.length; i++) {
      if(list01["info"]["ID"] == b1key[i]){ list = list.concat(list01["list"]); }
      if(list02["info"]["ID"] == b1key[i]){ list = list.concat(list02["list"]); }
      if(list03["info"]["ID"] == b1key[i]){ list = list.concat(list03["list"]); }
      if(list99["info"]["ID"] == b1key[i]){ list = list.concat(list99["list"]); }
    }
  }
}
    ：
    ：
```

- 以下の4行を追記しています
    - `<script src="links_99_zzz.json.js"></script>`
    - `list = list.concat(list99["list"]);`
    - `listinfo = listinfo.concat(list99["info"]);`
    - `if(list99["info"]["ID"] == b1key[i]){ list = list.concat(list99["list"]); }`

以上で設定は完了です。ファイルを保存し`linklists.html`を起動し`links_99_zzz.json.js`内のリンク情報が表示されれば成功です。
