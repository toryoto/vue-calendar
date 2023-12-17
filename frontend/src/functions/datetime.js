export const getTimeIntervalList = () => {
  // 15分感覚の時間のリストを返す
  // スプレッド構文とArrayでインデックスiを取得
  // ０を先頭に着けることで二桁or三桁の数字にする
  // slice(-2)で末尾から2文字を取得
  const hours = [...Array(24)].map((_, i) => ('0' + i).slice(-2));
  const minutes = ['00', '15', '30', '45'];
  const timeList = hours.map((hour) => minutes.map((minute) => hour + ':' + minute)).flat();
  return timeList;
};
