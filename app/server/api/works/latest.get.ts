/**
 * 最新のWorks取得API（トップページ用）
 * services/works.tsのgetLatestWorks関数を使用
 * runtimeConfigからmicroCMS設定を取得
 */

import { createMicroCMSClient, getLatestWorks } from '~/services/works';

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

    const query = getQuery(event);
    const limit = query.limit ? parseInt(query.limit as string) : 9;

    const response = await getLatestWorks(client, limit);
    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch latest works',
    });
  }
});
