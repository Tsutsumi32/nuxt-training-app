/**
 * Works詳細取得API
 * services/works.tsのgetWorkDetails関数を使用
 * runtimeConfigからmicroCMS設定を取得
 */

import { createMicroCMSClient, getWorkDetails } from '~/services/works';

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

    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Work ID is required',
      });
    }

    const work = await getWorkDetails(client, id);
    if (!work) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Work not found',
      });
    }

    return work;
  } catch (error: any) {
    if (error.statusCode === 404) {
      throw error;
    }
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch work details',
    });
  }
});
