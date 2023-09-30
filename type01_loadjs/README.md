# リンクリスト

サイトやファイルのリンクを検索／表示します。

## デモ動画

[![](https://img.youtube.com/vi/gzVICp4xvZs/0.jpg)](https://www.youtube.com/watch?v=gzVICp4xvZs)

## ファイル構成

|ファイル|説明|
|---|---|
|index.html|アプリ本体|
|aicon_mapinfo.js|カテゴリキーアイコンのマップ情報|
|areac_key_hightlight.js|強調表示するカテゴリキーの設定|
|links_01.json.js|リンク情報を含むjsファイル|
|links_02.json.js|リンク情報を含むjsファイル|
|links_03.json.js|リンク情報を含むjsファイル|
|links_04.json.js|リンク情報を含むjsファイル|
|links_05.json.js|リンク情報を含むjsファイル|
|links_06.json.js|リンク情報を含むjsファイル|
|links_07.json.js|リンク情報を含むjsファイル|
|links_08.json.js|リンク情報を含むjsファイル|
|links_09.json.js|リンク情報を含むjsファイル|
|links_10.json.js|リンク情報を含むjsファイル|
|make_json_js.html|json.jsファイルの更新補助ツール|

## アプリ起動方法

全てのファイルをダウンロードし、index.htmlをブラウザアプリで起動するだけです。Webサーバは不要です。

＜Windows10環境：ブラウザの稼働確認結果＞

|ブラウザ|確認結果|
|------|------|
|Chrome|動作しました|
|Firefox|動作しました|
|Edge|動作しました|

※ 確認日 2021/8/22

＜Windows11環境：ブラウザの稼働確認結果＞

|ブラウザ|確認結果|
|------|------|
|Chrome|動作しました|
|Edge|動作しました|

※ 確認日 2022/12/04

## リンクファイル(links_xx.json.js)の登録情報

リンク情報はリンクファイル(links_xx.json.js)に格納されています。
リンクファイルは`links_01.json.js`～`links_10.json.js`の10ある

リンク情報の追加/編集方法を紹介します。
`links_xx.json.js`にはJSON形式で情報が登録されています。JSON形式を崩さないよう情報を編集、追加することでリンク情報を編集できます。
JSONファイルを直接編集したくない場合は、index.htmlをブラウザで開き `リンク情報の更新` ボタンからJSONファイルを編集することもできます。

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

リンクファイル(links_xx.json.js)は最大10読み込みできます。読み込み数を変更するには`index.html`ファイルをテキストエディタで開き、変数`load_arr`の値を更新します。

```javascript:index.htmlより抜粋
let load_arr = [list01,list02,list03,list04,list05,list06,list07,list08,list09,list10];
```

たとえば、`links_03.json.js`, `links_05.json.js` のみ読み込むようにしたい場合

```javascript
let load_arr = [list03,list05];
```

load_arr に登録する値は、`xxxx.json.js`ファイルの1行目に記載されている変数名です。
`links_01.json.js`では1行目が以下のようになっているため `list01` となります

```javascript:links_01.json.js
let list01 = {
"info": {"Title":"開発","ID":"01"},
"list": [
{
	"aicon": "google.png",
    :
    :
```

