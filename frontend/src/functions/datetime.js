import { format, addHours } from 'date-fns';
import { ja } from 'date-fns/locale';

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

//デフォルトで開始時間を現在時刻+1、終了時間を+2で返すメソッド
export const getDefaultStartAndEnd = (date) => {
  // 現在時刻
  const currentTime = format(new Date(), 'HH:mm:ss');
  // 日時＋現在時刻
  const dateTime = new Date(`${date} ${currentTime}`);
  const start = format(addHours(dateTime, 1), 'yyyy/MM/dd HH:00:00');
  const end = format(addHours(dateTime, 2), 'yyyy/MM/dd HH:00:00');
  return [start, end];
};

export const isGreaterEndThanStart = (startDate, startTime, endDate, endTime, allDay) => {
  // 終了日時が開始日時の後になっているか
  if (allDay) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return end >= start;
  } else {
    const start = new Date(`${startDate} ${startTime}`).getTime();
    const end = new Date(`${endDate} ${endTime}`).getTime();
    return end > start;
  }
};

export const formatDateToJa = date => {
  return format(new Date(date), 'M月d日(E)', { locale: ja })
}
