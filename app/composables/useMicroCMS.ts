/**
 * microCMSクライアントを取得するcomposable
 */
export const useMicroCMSClient = () => {
  const config = useRuntimeConfig();

  const serviceDomain = config.public.microcms?.serviceDomain;
  const apiKey = config.public.microcms?.apiKey;

  if (!serviceDomain || !apiKey) {
    throw new Error(
      'microCMSの環境変数が設定されていません。.envファイルにMICROCMS_SERVICE_DOMAINとMICROCMS_API_KEYを設定してください。'
    );
  }

  return { serviceDomain, apiKey };
};
