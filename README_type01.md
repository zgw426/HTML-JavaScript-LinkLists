# リンクリスト

サイトやファイルのリンクを検索／表示します。

## デモ動画

[![](https://img.youtube.com/vi/gzVICp4xvZs/0.jpg)](https://www.youtube.com/watch?v=gzVICp4xvZs)

## ファイル構成

|ファイル|説明|
|---|---|
|index.html|アプリ本体|
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
|make_json_js.html|jsonファイルの更新補助ツール|

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

## リンクファイル(links_xx.json)の登録情報

リンク情報はリンクファイル(links_xx.json)に格納されています。
リンクファイルは`links_01.json`～`links_10.json`の10ある

リンク情報の追加/編集方法を紹介します。
`links_xx.json`にはJSON形式で情報が登録されています。JSON形式を崩さないよう情報を編集、追加することでリンク情報を編集できます。
JSONファイルを直接編集したくない場合は、index.htmlをブラウザで開き `リンク情報の更新` ボタンからJSONファイルを編集することもできます。（ `リンク情報の更新` ボタンではファイルを上書き保存するため、誤って他のファイルを上書きしないよう注意くだささい）

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
|icon|(オプション)表示する画像ファイル名。|
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


## リンクファイル(links_xx.json)の取り込みと出力

リンク情報は links_01.json から links_10.json の JSON ファイルとして管理します。
index.html は JSON ファイルを直接読み込まず、ブラウザの Web Storage に保存されたリンク情報を表示します。

1. index.html をブラウザで開きます。
2. JSON取込 ボタンから links_XX.json ファイルを選択します。複数ファイルをまとめて選択できます。
3. 取り込んだリンク情報は Web Storage に保存され、次回以降は Web Storage の情報から表示されます。
4. Web Storage のリンク情報をファイル化する場合は JSON出力 ボタンを押します。links_XX.json としてダウンロードされます。

JSON ファイルは info と list を持つオブジェクトです。info.ID の値により list01 から list10 の保存先が決まります。
