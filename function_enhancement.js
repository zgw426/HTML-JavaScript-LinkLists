const key_hightlight = [];
const targetDateList = [];
const targetWeekList = [];
const key_aicon = [];

// ----- カテゴリキーに背景色を設定する ----- //
key_hightlight["資産"] = "#ffc0cb";
key_hightlight["動画"] = "#c0ffcb";

// ----- アイコンボタン：検索キーの簡易登録 ----- //
key_aicon["y_movie.png"] = "動画";
key_aicon["y_money.png"] = "資産";
key_aicon["y_cloud_aws.png"] = "クラウド aws";
key_aicon["y_cloud.png"] = "クラウド";

// ----- イベント：年・月・日 指定 ----- //
targetDateList.push(["2023-10-20","x_mmdd_red.png","13:00～□□点検"]);
targetDateList.push(["YYYY-12-DD","x_month_red.png","今月のやることは〇〇です"]);
targetDateList.push(["2023-12-09","x_mmdd_red.png","△〇に行く"]);
targetDateList.push(["YYYY-01-DD","x_month_red.png","今月のやることは△△です"]);
targetDateList.push(["2024-01-27","x_mmdd_red.png","〇〇に行く"]);
targetDateList.push(["2023-10-16","x_mmdd_red.png","12:00～〇□△に行く"]);


// ----- イベント：曜日 指定 ----- //
targetWeekList.push(["月","z_garbage_can.png","ゴミ出し(プラ)"]);
targetWeekList.push(["火","z_garbage_can.png","ゴミ出し(可燃)"]);
targetWeekList.push(["木","z_garbage_can.png","ゴミ出し(ビンor紙布)"]);
targetWeekList.push(["金","z_garbage_can.png","ゴミ出し(可燃)"]);
