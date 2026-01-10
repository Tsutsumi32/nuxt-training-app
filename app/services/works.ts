/**
 * Works API Service
 * microCMS連携実装
 * Nuxt 4 runtimeConfig対応
 */

import { createClient } from 'microcms-js-sdk';
import type { Works, WorksCategory, WorksListResponse } from '~/types/works';
import { sanitizeObject } from '~/utils/sanitize';

/**
 * microCMSクライアントの型定義
 */
export type MicroCMSClient = ReturnType<typeof createClient>;

/**
 * microCMSクライアントを作成する関数
 * サーバーAPIルートから呼び出され、runtimeConfigを使用して設定を取得する
 */
export const createMicroCMSClient = (serviceDomain: string, apiKey: string): MicroCMSClient => {
  if (!serviceDomain || !apiKey) {
    throw new Error('microCMSの環境変数が設定されていません。serviceDomainとapiKeyは必須です。');
  }

  return createClient({
    serviceDomain,
    apiKey,
  });
};

// set:htmlで使用されるフィールドのみサニタイズ
const SET_HTML_FIELDS = [
  'title', // Worksのタイトル（set:html使用）
  'subject', // Worksの課題・目的（リッチエディタ）
  'target', // Worksのターゲット（リッチエディタ）
  'information_plan', // Worksの情報設計（リッチエディタ）
];

/**
 * works一覧内容取得（全データ取得・カテゴリフィルタ対応）
 * @param client microCMSクライアント
 * @param options 取得オプション
 */
export const getWorks = async (
  client: MicroCMSClient,
  options?: {
    limit?: number;
    offset?: number;
    categoryId?: string;
  }
): Promise<WorksListResponse> => {
  const { limit = 100, offset = 0, categoryId } = options || {};

  const queries: any = {
    fields: ['id', 'title', 'thumbnail', 'category', 'client'].join(','),
    limit,
    offset,
    orders: '-publishedAt', // 新しい順
  };

  // カテゴリフィルタがある場合
  if (categoryId && categoryId !== 'All') {
    queries.filters = `category[equals]${categoryId}`;
  }

  const res = await client.get({
    endpoint: 'works',
    queries,
  });

  return {
    contents: res.contents.map((content: any) =>
      sanitizeObject(content, SET_HTML_FIELDS)
    ) as Works[],
    totalCount: res.totalCount,
    limit: res.limit,
    offset: res.offset,
  };
};

/**
 * 最新の実績を取得（トップページ用）
 * @param client microCMSクライアント
 * @param limit 取得件数
 */
export const getLatestWorks = async (
  client: MicroCMSClient,
  limit: number = 9
): Promise<WorksListResponse> => {
  return getWorks(client, { limit, offset: 0 });
};

/**
 * works詳細取得（ID指定）
 * @param client microCMSクライアント
 * @param id 実績ID
 */
export const getWorkDetails = async (client: MicroCMSClient, id: string): Promise<Works | null> => {
  try {
    const res = await client.get({
      endpoint: 'works',
      contentId: id,
      queries: {
        fields: [
          'id',
          'title',
          'thumbnail',
          'category',
          'launch_date',
          'client',
          'url',
          'overview',
          'subject',
          'target',
          'information_plan',
          'period',
          'tool',
          'in_charge',
          'materials',
          'productions',
          'click',
        ].join(','),
      },
    });

    return sanitizeObject(res, SET_HTML_FIELDS) as Works;
  } catch (error) {
    console.error(`Failed to fetch work details for id ${id}:`, error);
    return null;
  }
};

/**
 * works詳細一覧取得（SSG用）
 * @param client microCMSクライアント
 */
export const getAllWorkIds = async (client: MicroCMSClient): Promise<string[]> => {
  try {
    const res = await client.get({
      endpoint: 'works',
      queries: {
        fields: 'id',
        limit: 100,
      },
    });
    return res.contents.map((content: any) => content.id);
  } catch (error) {
    console.error('Failed to fetch work IDs:', error);
    return [];
  }
};

/**
 * works-categories一覧取得
 * @param client microCMSクライアント
 */
export const getWorksCategories = async (client: MicroCMSClient): Promise<WorksCategory[]> => {
  try {
    const res = await client.get({
      endpoint: 'works-category',
      queries: {
        fields: ['id', 'name'].join(','),
        limit: 100,
      },
    });
    return res.contents.map((content: any) =>
      sanitizeObject(content, SET_HTML_FIELDS)
    ) as WorksCategory[];
  } catch (error) {
    console.error('Failed to fetch works categories:', error);
    return [];
  }
};

/**
 * 関連作品を取得（同じカテゴリの最新5件、現在の作品を除く）
 * @param client microCMSクライアント
 * @param currentId 現在の作品ID
 * @param categoryId カテゴリID
 */
export const getRelatedWorks = async (
  client: MicroCMSClient,
  currentId: string,
  categoryId: string
): Promise<Works[]> => {
  try {
    const res = await client.get({
      endpoint: 'works',
      queries: {
        fields: ['id', 'title', 'thumbnail', 'category', 'client'].join(','),
        filters: `category[equals]${categoryId}[and]id[not_equals]${currentId}`,
        limit: 5,
        orders: '-publishedAt',
      },
    });

    return res.contents.map((content: any) => sanitizeObject(content, SET_HTML_FIELDS)) as Works[];
  } catch (error) {
    console.error('Failed to fetch related works:', error);
    return [];
  }
};
