/**
 * フォーマッター関数
 */

/**
 * 日付をフォーマット
 */
export const formatDate = (date: Date | string, format = 'YYYY-MM-DD'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return format.replace('YYYY', String(year)).replace('MM', month).replace('DD', day);
};

/**
 * 数値をカンマ区切りでフォーマット
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('ja-JP');
};

/**
 * 文字列を省略表示
 */
export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};
