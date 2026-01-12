// functions/_middleware.js

////////////////////////////////////////////////////////////////
// ベーシック認証をかける
////////////////////////////////////////////////////////////////
const noStore = { 'Cache-Control': 'no-store' };

const shouldAuth = (env) => {
  // BASIC_AUTH_DISABLEDがtrueの場合はベーシック認証を無効化する
  if (env.BASIC_AUTH_DISABLED && env.BASIC_AUTH_DISABLED.toString().toLowerCase() === 'true') {
    return false;
  }
  // BASIC_AUTH_ENABLEDが空の場合はベーシック認証を行わない
  if (!env.BASIC_AUTH_ENABLED || env.BASIC_AUTH_ENABLED.trim() === '') {
    return false;
  }

  // ユーザー名とパスワードの環境変数が設定されていない場合はベーシック認証を行わない
  if (!env.BASIC_AUTH_USER || !env.BASIC_AUTH_PASS) {
    return false;
  }

  // OPTIONAL: 環境切替。不要なら常に true を返す
  // BASIC_AUTH_MODE: "production" | "preview" | "all" | その他/未設定 = 無効
  const mode = env.BASIC_AUTH_MODE;
  const current = env.PAGES_ENV || 'preview'; // "production" | "preview"

  if (mode === 'all') return true;
  if (mode === 'production' && current === 'production') return true;
  if (mode === 'preview' && current === 'preview') return true;
  if (!mode) return true; // BASIC_AUTH_ENABLEDが設定されていて、ユーザー名・パスワードもある場合は有効
  return false;
};

export const onRequest = [
  async ({ request, next, env }) => {
    // 例: 特定パスは除外（必要なら）
    const { pathname } = new URL(request.url);
    if (pathname.startsWith('/.well-known/acme-challenge')) {
      return next();
    }

    // Astro ClientRouterのPrefetchingリクエストを認証から除外
    const userAgent = request.headers.get('user-agent') || '';
    const isPrefetch =
      request.headers.get('purpose') === 'prefetch' ||
      request.headers.get('x-astro-prefetch') === 'true' ||
      userAgent.includes('Astro');
    if (isPrefetch) {
      return next();
    }

    if (!shouldAuth(env)) {
      return next();
    }

    const userEnv = env.BASIC_AUTH_USER;
    const passEnv = env.BASIC_AUTH_PASS;
    if (!userEnv || !passEnv) {
      // 資格情報未設定なら 401 を返す（デフォルト admin/admin は危険なので廃止）
      return new Response('Authentication not configured.', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Portfolio Access", charset="UTF-8"',
          ...noStore,
        },
      });
    }

    const auth = request.headers.get('Authorization');
    if (!auth) {
      return new Response('Authentication required.', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Portfolio Access", charset="UTF-8"',
          ...noStore,
        },
      });
    }

    const [scheme, encoded] = auth.split(' ');
    if (scheme !== 'Basic' || !encoded) {
      return new Response('The Authorization header must start with Basic', {
        status: 400,
        headers: {
          'WWW-Authenticate': 'Basic realm="Portfolio Access", charset="UTF-8"',
          ...noStore,
        },
      });
    }

    // Base64 デコード（UTF-8 / 制御文字チェック）
    const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes).normalize();
    const idx = decoded.indexOf(':');
    if (idx === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
      return new Response('Invalid authorization value.', {
        status: 400,
        headers: {
          'WWW-Authenticate': 'Basic realm="Portfolio Access", charset="UTF-8"',
          ...noStore,
        },
      });
    }

    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);

    if (user !== userEnv || pass !== passEnv) {
      return new Response('Invalid credentials.', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Portfolio Access", charset="UTF-8"',
          ...noStore,
        },
      });
    }

    const res = await next();
    // 認証後のレスポンスもキャッシュさせない
    res.headers.set('Cache-Control', 'no-store');
    return res;
  },
];
