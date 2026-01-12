/**
 * microCMSクライアントを取得するcomposable
 * SSGではビルド時にサーバーサイドで実行されるため、
 * runtimeConfig（publicなし）から取得可能
 */
export const useMicroCMSClient = () => {
  const config = useRuntimeConfig();

  // サーバーサイドのみでアクセス可能（クライアント側に公開されない）
  const serviceDomain = config.microcmsServiceDomain;
  const apiKey = config.microcmsApiKey;

  if (!serviceDomain || !apiKey) {
    throw new Error(
      'microCMSの環境変数が設定されていません。.envファイルにMICROCMS_SERVICE_DOMAINとMICROCMS_API_KEYを設定してください。'
    );
  }

  return { serviceDomain, apiKey };
};
