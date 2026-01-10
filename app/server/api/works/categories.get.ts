/**
 * Worksカテゴリ一覧取得API
 * services/works.tsのgetWorksCategories関数を使用
 * runtimeConfigからmicroCMS設定を取得
 */

import { createMicroCMSClient, getWorksCategories } from '~/services/works';

export default defineEventHandler(async (event: any) => {
  try {
    const config = useRuntimeConfig(event);

    // runtimeConfigからmicroCMS設定を取得
    const serviceDomain = config.microcmsServiceDomain;
    const apiKey = config.microcmsApiKey;

    if (!serviceDomain || !apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'microCMS設定が正しく設定されていません',
      });
    }

    // microCMSクライアントを作成
    const client = createMicroCMSClient(serviceDomain, apiKey);

    const categories = await getWorksCategories(client);
    return categories;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch categories',
    });
  }
});
