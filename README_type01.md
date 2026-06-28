# リンクリスト

サイトやファイルのリンクを検索／表示します。

## デモ動画

[![](https://img.youtube.com/vi/gzVICp4xvZs/0.jpg)](https://www.youtube.com/watch?v=gzVICp4xvZs)

## ファイル構成

|ファイル|説明|
|---|---|
|index.html|アプリ本体|
|make_json_js.html|jsonファイルの更新補助ツール|
|area_c_icon_mapinfo.js|カテゴリキーアイコンのマップ情報|
|area_c_key_highlight.js|強調表示するカテゴリキーの設定|
|links_01.json|リンク情報を含むjsファイル|
|links_02.json|リンク情報を含むjsファイル|
|links_03.json|リンク情報を含むjsファイル|
|links_04.json|リンク情報を含むjsファイル|
|links_05.json|リンク情報を含むjsファイル|
|links_06.json|リンク情報を含むjsファイル|
|links_07.json|リンク情報を含むjsファイル|
|links_08.json|リンク情報を含むjsファイル|
|links_09.json|リンク情報を含むjsファイル|
|links_10.json|リンク情報を含むjsファイル|

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

## リンク情報の登録／削除・表示／非表示 について

- リンク情報は、links_XX.json をインポートすることで登録できます。
- `JSON取込` ボタンでインポートします。
- `登録情報の更新` ボタンで表示される画面いて、インポートした情報の削除や、表示／非表示の設定ができます。
- リンク情報の表示には、常時表示と一時表示の2種類あります。
- 常時表示とはリンクリストにて表示されるリンク情報のことです。
- 今後必要だが今は利用しないリンク情報は常時表示をオフにすると、表示されるリンク情報数を減らせます。
  - 一時表示とはリンクリストにて表示されるリンク情報のうち、一時的に表示するリンク情報のことです。
- 目当てのリンク以外を非表示にするなどフィルタとしての利用を想定しています。


以下は1つのリンクに必要な情報です。

```
  {
    "icon"    : "google.png",
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
|icon|(オプション)表示する画像ファイル名|
|kana|Nameの読み仮名。情報の表示順序に影響|
|Name|リンクを表示する際のタイトル|
|URL|リンクのURL|
|category|カテゴリ欄に表示する単語を登録。複数登録可|
|category-key|カテゴリ欄に表示する単語|
|category-kana|カテゴリ欄に表示する単語の読み仮名|
|note|備考欄|

※ パラメータ icon について

パラメータ `icon` には表示する画像ファイル名を記載します。
画像ファイルは、`icon`フォルダ配下に格納しておきます。
サンプルとして以下の画像ファイルを格納しています。

- ./HTML-JavaScript-LinkLists/icon
  - amazon.png
  - bing.png
  - file.png
  - folder.png
  - google.png
  - yahoo.png
  - youtube.png

