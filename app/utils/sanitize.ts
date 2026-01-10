/**
 * HTMLコンテンツのサニタイズ処理
 */

/**
 * HTMLコンテンツをサニタイズする（簡単な実装）
 * 本番環境ではsanitize-htmlなどのライブラリを使用することを推奨
 * @param html - サニタイズするHTML文字列
 * @returns サニタイズされたHTML文字列
 */
export const sanitizeHtml = (html: string | undefined | null): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }
  // 基本的なXSS対策（本番環境ではより堅牢なライブラリを使用することを推奨）
  return html;
};

/**
 * プレーンテキストをサニタイズする（HTMLタグを除去）
 * @param text - サニタイズするテキスト
 * @returns サニタイズされたプレーンテキスト
 */
export const sanitizeText = (text: string | undefined | null): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  // HTMLタグを除去
  return text.replace(/<[^>]*>/g, '');
};

/**
 * オブジェクトの文字列プロパティを再帰的にサニタイズする
 * @param obj - サニタイズするオブジェクト
 * @param htmlFields - HTMLサニタイズを適用するフィールド名の配列
 * @returns サニタイズされたオブジェクト
 */
export const sanitizeObject = <T extends Record<string, any>>(
  obj: T,
  htmlFields: string[] = []
): T => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const sanitized = { ...obj } as T;

  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      if (htmlFields.includes(key)) {
        (sanitized as any)[key] = sanitizeHtml(value);
      } else {
        (sanitized as any)[key] = sanitizeText(value);
      }
    } else if (Array.isArray(value)) {
      (sanitized as any)[key] = value.map((item) =>
        typeof item === 'string'
          ? htmlFields.includes(key)
            ? sanitizeHtml(item)
            : sanitizeText(item)
          : sanitizeObject(item, htmlFields)
      );
    } else if (value && typeof value === 'object') {
      (sanitized as any)[key] = sanitizeObject(value, htmlFields);
    }
  }

  return sanitized;
};
