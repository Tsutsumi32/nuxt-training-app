/**
 * Works関連の型定義
 */

export interface WorksCategory {
  id: string;
  name: string;
}

export interface Works {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  category: WorksCategory;
  client: string;
  launch_date?: string;
  url?: string;
  overview?: string;
  subject?: string;
  target?: string;
  information_plan?: string;
  period?: string;
  tool?: string;
  in_charge?: string;
  materials?: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  productions?: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  click?: string[];
}

export interface WorksListResponse {
  contents: Works[];
  totalCount: number;
  limit: number;
  offset: number;
}
