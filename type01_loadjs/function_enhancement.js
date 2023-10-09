// 特定のカテゴリキーを強調表示して目立たせる
let key_hightlight = new Array();
key_hightlight.length = 0;

// ----- category key aicon ----- //
key_hightlight["ニュース"] = "#ffc0cb";
key_hightlight["マイクロソフト"] = "#c0ffcb";

// アイコンを使ったフィルタ用のキー
let key_aicon = new Array();
key_aicon.length = 0;

key_aicon["y_movie.png"] = "動画";
key_aicon["google.png"] = "google.png";
key_aicon["yahoo.png"] = "yahoo.png";
key_aicon["y_money.png"] = "楽天";

// 月・日のイベント情報

const targetDateList = [];

targetDateList.push(["YYYY-MM-01","","毎月1日のイベント"]);
targetDateList.push(["YYYY-MM-02","","毎月2日のイベント"]);
targetDateList.push(["YYYY-MM-03","","毎月3日のイベント"]);
targetDateList.push(["YYYY-MM-04","","毎月4日のイベント"]);
targetDateList.push(["YYYY-MM-05","","毎月5日のイベント"]);
targetDateList.push(["YYYY-MM-06","","毎月6日のイベント"]);
targetDateList.push(["YYYY-MM-07","x_day_red.png","毎月7日のイベント"]);
targetDateList.push(["YYYY-MM-08","","毎月8日のイベント"]);
targetDateList.push(["YYYY-MM-09","","毎月9日のイベント"]);
targetDateList.push(["YYYY-MM-10","","毎月10日のイベント"]);
targetDateList.push(["YYYY-MM-11","","毎月11日のイベント"]);
targetDateList.push(["YYYY-MM-12","","毎月12日のイベント"]);
targetDateList.push(["YYYY-MM-13","","毎月13日のイベント"]);
targetDateList.push(["YYYY-MM-14","","毎月14日のイベント"]);
targetDateList.push(["YYYY-MM-15","","毎月15日のイベント"]);
targetDateList.push(["YYYY-MM-16","","毎月16日のイベント"]);
targetDateList.push(["YYYY-MM-17","","毎月17日のイベント"]);
targetDateList.push(["YYYY-MM-18","","毎月18日のイベント"]);
targetDateList.push(["YYYY-MM-19","","毎月19日のイベント"]);
targetDateList.push(["YYYY-MM-20","","毎月20日のイベント"]);

targetDateList.push(["YYYY-MM-01","","毎月1日のイベント２"]);
targetDateList.push(["YYYY-MM-02","","毎月2日のイベント２"]);
targetDateList.push(["YYYY-MM-03","","毎月3日のイベント２"]);
targetDateList.push(["YYYY-MM-04","","毎月4日のイベント２"]);
targetDateList.push(["YYYY-MM-05","","毎月5日のイベント２"]);
targetDateList.push(["YYYY-MM-06","","毎月6日のイベント２"]);
targetDateList.push(["YYYY-MM-07","","毎月7日のイベント２"]);
targetDateList.push(["YYYY-MM-08","","毎月8日のイベント２"]);
targetDateList.push(["YYYY-MM-09","","毎月9日のイベント２"]);
targetDateList.push(["YYYY-MM-10","","毎月10日のイベント２"]);
targetDateList.push(["YYYY-MM-11","","毎月11日のイベント２"]);
targetDateList.push(["YYYY-MM-12","","毎月12日のイベント２"]);
targetDateList.push(["YYYY-MM-13","","毎月13日のイベント２"]);
targetDateList.push(["YYYY-MM-14","","毎月14日のイベント２"]);
targetDateList.push(["YYYY-MM-15","","毎月15日のイベント２"]);
targetDateList.push(["YYYY-MM-16","","毎月16日のイベント２"]);
targetDateList.push(["YYYY-MM-17","","毎月17日のイベント２"]);
targetDateList.push(["YYYY-MM-18","","毎月18日のイベント２"]);
targetDateList.push(["YYYY-MM-19","","毎月19日のイベント２"]);
targetDateList.push(["YYYY-MM-20","","毎月20日のイベント２"]);
targetDateList.push(["2023-10-07","x_month_red.png","10月7日のイベント"]);
targetDateList.push(["2023-10-07","","10月7日のイベント"]);
targetDateList.push(["2023-01-31","","月末"]);
targetDateList.push(["2023-02-30","","月末"]);
targetDateList.push(["2023-03-31","","月末"]);
targetDateList.push(["2023-04-30","","月末"]);
targetDateList.push(["2023-05-31","","月末"]);
targetDateList.push(["2023-06-30","","月末"]);
targetDateList.push(["2023-07-31","","月末"]);
targetDateList.push(["2023-08-31","","月末"]);
targetDateList.push(["2023-09-30","","月末"]);
targetDateList.push(["2023-10-31","","月末"]);
targetDateList.push(["2023-11-30","","月末"]);
targetDateList.push(["2023-12-31","","月末"]);









// 週のイベント情報

const targetWeekList = [];

targetWeekList.push(["日","","日曜日のイベントＡ"]);
targetWeekList.push(["月","","月曜日のイベントＡ"]);
targetWeekList.push(["火","","火曜日のイベントＡ"]);
targetWeekList.push(["水","","水曜日のイベントＡ"]);
targetWeekList.push(["木","","木曜日のイベントＡ"]);
targetWeekList.push(["金","","金曜日のイベントＡ"]);
targetWeekList.push(["土","","土曜日のイベントＡ"]);

targetWeekList.push(["日","x_week_red.png","日曜日のイベントＢ"]);
targetWeekList.push(["月","x_week_red.png","月曜日のイベントＢ"]);
targetWeekList.push(["火","x_week_red.png","火曜日のイベントＢ"]);
targetWeekList.push(["水","x_week_red.png","水曜日のイベントＢ"]);
targetWeekList.push(["木","x_week_red.png","木曜日のイベントＢ"]);
targetWeekList.push(["金","x_week_red.png","金曜日のイベントＢ"]);
targetWeekList.push(["土","x_week_red.png","土曜日のイベントＢ"]);

