# リンクリスト

サイトやファイルのリンクを検索／表示します。

## デモ動画

[![](https://img.youtube.com/vi/gzVICp4xvZs/0.jpg)](https://www.youtube.com/watch?v=gzVICp4xvZs)

## ファイル構成

|ファイル|説明|
|---|---|
|index.html|アプリ本体|
|links_01_aaa.json.js|リンク情報を含むjsファイル|
|links_02_bbb.json.js|リンク情報を含むjsファイル|
|links_03_ccc.json.js|リンク情報を含むjsファイル|
|index_plas_99.html|links_99_zzz.json.jsファイルを追加したアプリ|
|links_99_zzz.json.js|リンク情報を含むjsファイル|
|make_json_js.html|json.jsファイルの更新補助ツール|
|make_json_js_plas_99.html|json.jsファイルの更新補助ツールにlinks_99_zzz.json.js追加|


## アプリ起動方法

4つのファイル(index.html,links_01.json.js,links_02.json.js,links_03.json.js)をダウンロードし、index.htmlをブラウザアプリで起動するだけです。Webサーバは不要です。

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

(2) `index.html`ファイルを以下のように編集します。（編集したファイルは`linklists_99.html`として保存しています）

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

以上で設定は完了です。ファイルを保存し`index.html`を起動し`links_99_zzz.json.js`内のリンク情報が表示されれば成功です。

## XXXX.json.jsファイルの更新

- リンク情報を格納している `XXXX.json.js` ファイルの更新は、ツール `make_json_js.html` を使用します。
- ツール `make_json_js.html`をブラウザで開くと、ボタン `links_01`,`links_02`,`links_03`が表示されます。
- ボタン `links_01` をクリックすると `links_01_aaa.json.js` の情報をもとにしたフォームが表示されます。
- 新規登録するリンク情報が多い場合は、ボタン `links_xx`クリック前に、`新規登録枠数`の値を変更します（デフォルト3）
- 表示されたホームの情報を更新します。
    - 各項目に入力する情報
      - `aicon` : `aicon`ディレクトリ配下の画像ファイル名を記載。ない場合は空白にします。
      - `kana` : このリンクの`Name`のかな表記です。ひらがなとカタカナで記載することを推奨します。リンク情報はこの`kana`情報でソートし表示します。
      - `Name` : このリンクのタイトルです。
      - `URL` : このリンクのURLです。
      - `category` : このリンクに付与するキーワードです。キーワードは`"{{キーワード}}": "{{キーワードのかな}}"`の形式です。複数登録する場合は1つづつ改行します。
        - 例：検索、ニュース、SNSの3つを登録する場合
          - "検索": "けんさく"
          - "ニュース": "ニュース"
          - "SNS": "エスエヌエス"
      - `note` : リンク情報とともに表示する情報です。この`note`に記載した情報も検索対象になります。
  - リンク情報を新規登録する場合は、フォームの値が登録されていない箇所にそれら情報を登録します。
- 表示されたホームの情報を更新したら、フォーム下にあるボタン `jsファイル作成` をクリックするとjson.jsに登録する形式の情報が表示されます。
- `jsファイル作成`ボタンをクリックすると、json.jsに登録する形式の情報がクリップボードにもコピーされます。
  - さらに、`ファイル出力`ボタンが表示されます
- `links_01_aaa.json.js`ファイルを更新する方法は、手動と`ファイル出力`ボタンの2種類あります。
  - 手動で更新する場合
    - `links_01_aaa.json.js`をテキストエディタで開きクリップボードの内容に置き換えると更新完了です。
  - `ファイル出力`ボタンで更新する場合
    - `ファイル出力`ボタンをクリックします。
      - `名前を付けて保存`ウィンドウが開きます。
    - 更新するファイル(例 `links_01_aaa.json.js`)に上書き保存します。
      - 注意：上書きするファイルを誤ると情報が消える可能性がありますので注意ください。

## make_json_js.htmlの修正方法

`links_xx_xxx.json.js`ファイルを追加する場合は`make_json_js.html`ファイルの更新が必要になります。

## make_json_js.htmlに`links_99_zzz.json.js`ファイルを追加する場合

以下追記①～追記⑥のように情報を追記します。実際に追加したものが`make_json_js_plas_99.html`です。
（`make_json_js.html`と`make_json_js_plas_99.html`のdiffを確認した方がわかりやすいかも）

- 追記①

追記前

```
  <script src="links_01_aaa.json.js"></script>
  <script src="links_02_bbb.json.js"></script>
  <script src="links_03_ccc.json.js"></script>
```

追記後

```
  <script src="links_01_aaa.json.js"></script>
  <script src="links_02_bbb.json.js"></script>
  <script src="links_03_ccc.json.js"></script>
  <script src="links_99_zzz.json.js"></script>
```

- 追記②

追記前

```
<input type="button" value="links_01" onclick='root_flow("list01");' />
<input type="button" value="links_02" onclick='root_flow("list02");' />
<input type="button" value="links_03" onclick='root_flow("list03");' />
```

追記後

```
<input type="button" value="links_01" onclick='root_flow("list01");' />
<input type="button" value="links_02" onclick='root_flow("list02");' />
<input type="button" value="links_03" onclick='root_flow("list03");' />
<input type="button" value="links_99" onclick='root_flow("list99");' />
```

- 追記③

追記前

```
js_file_name["list01"] = "links_01_aaa.json.js";
js_file_name["list02"] = "links_02_bbb.json.js";
js_file_name["list03"] = "links_03_ccc.json.js";
```

追記後

```
js_file_name["list01"] = "links_01_aaa.json.js";
js_file_name["list02"] = "links_02_bbb.json.js";
js_file_name["list03"] = "links_03_ccc.json.js";
js_file_name["list99"] = "links_99_zzz.json.js";
```

- 追記④

追記前

```
js_file_name["list01"] = "links_01_aaa.json.js";
js_file_name["list02"] = "links_02_bbb.json.js";
js_file_name["list03"] = "links_03_ccc.json.js";
```

追記後

```
js_file_name["list01"] = "links_01_aaa.json.js";
js_file_name["list02"] = "links_02_bbb.json.js";
js_file_name["list03"] = "links_03_ccc.json.js";
js_file_name["list99"] = "links_99_zzz.json.js";
```

- 追記⑤

追記前

```
  switch (arg_no){
      case "list01": 
        list_str_lo = 'list01["list"]';
        info_str_lo = 'list01["info"]';
        break;
      case "list02":
        list_str_lo = 'list02["list"]';
        info_str_lo = 'list02["info"]';
        break;
      case "list03":
        list_str_lo = 'list03["list"]';
        info_str_lo = 'list03["info"]';
        break;
  }
```

追記後

```
  switch (arg_no){
      case "list01": 
        list_str_lo = 'list01["list"]';
        info_str_lo = 'list01["info"]';
        break;
      case "list02":
        list_str_lo = 'list02["list"]';
        info_str_lo = 'list02["info"]';
        break;
      case "list03":
        list_str_lo = 'list03["list"]';
        info_str_lo = 'list03["info"]';
        break;
      case "list99":
        list_str_lo = 'list99["list"]';
        info_str_lo = 'list99["info"]';
        break;
  }
```

- 追記⑥

追記前

```
  switch (arg_no){
      case "list01": list_str = 'list01["list"]'; info_str = 'list01["info"]'; break;
      case "list02": list_str = 'list02["list"]'; info_str = 'list02["info"]'; break;
      case "list03": list_str = 'list03["list"]'; info_str = 'list03["info"]'; break;
  }
```

追記後

```
  switch (arg_no){
      case "list01": list_str = 'list01["list"]'; info_str = 'list01["info"]'; break;
      case "list02": list_str = 'list02["list"]'; info_str = 'list02["info"]'; break;
      case "list03": list_str = 'list03["list"]'; info_str = 'list03["info"]'; break;
      case "list99": list_str = 'list99["list"]'; info_str = 'list99["info"]'; break;
  }
```
