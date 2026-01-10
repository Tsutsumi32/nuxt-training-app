/**
 * Works一覧取得API
 * services/works.tsのgetWorks関数を使用
 * runtimeConfigからmicroCMS設定を取得
 */

import { createMicroCMSClient, getWorks } from '~/services/works';

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
    const limit = query.limit ? parseInt(query.limit as string) : 100;
    const offset = query.offset ? parseInt(query.offset as string) : 0;
    const categoryId = query.categoryId as string | undefined;

    const response = await getWorks(client, {
      limit,
      offset,
      categoryId,
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch works',
    });
  }
});
