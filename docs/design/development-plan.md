# 開発計画 (Development Plan)

## 1. 開発ロードマップ
### Phase 1: MVP (Minimum Viable Product) - "The Silent Core"
- **期間**: 2ヶ月
- **目標**: コアUX（位置情報マップ + 言語化不要オファー）の技術検証。
- **主要機能**:
  - Clerk認証 & 所属ドメイン判定。
  - 基本マップ表示（Mapbox）と位置情報更新。
  - Visibility Matrix（曖昧化ロジック）の初版。
  - 4段階ステータス切替と「Cheers!」オファー。

### Phase 2: Engagement & Value - "Smart Match"
- **期間**: 2ヶ月
- **目標**: マッチング精度の向上と、ビジネスモデル（送客）の検証。
- **主要機能**:
  - Smart Spotlight (OpenAI API 連携)。
  - SOS / Ticket 機能の実装。
  - 提携店舗データの表示と簡易予約連携。
  - プッシュ通知（Expo Notifications / Firebase）。

### Phase 3: Enterprise & Ecosystem - "Organization Health"
- **期間**: 3ヶ月
- **目標**: 法人契約獲得に向けた管理・分析機能の完成。
- **主要機能**:
  - 法人向け管理ダッシュボード。
  - 組織活性化分析レポート（部署間交流データの匿名集計）。
  - 経費精算システムとのAPI連携。
  - ボスブロック機能の細分化。

## 2. タスク分解 (WBS - Phase 1)
### 2.1 基盤構築
- [ ] Supabase プロジェクト作成、PostGIS 有効化。
- [ ] Clerk 認証連携 (Next.js + Expo)。
- [ ] Mapbox SDK の統合。

### 2.2 バックエンド開発
- [ ] `users`, `location_logs`, `matches` テーブル作成とRLS設定。
- [ ] 位置情報更新 API (Edge Functions)。
- [ ] Visibility Matrix (関係性に基づく座標曖昧化) ロジック実装。

### 2.3 フロントエンド開発
- [ ] マップ画面 (Mapbox レンダリング)。
- [ ] マジック・トグル UI コンポーネント作成。
- [ ] ユーザー詳細カード & オファー送信アニメーション。

## 3. リスク管理
| リスク内容 | 影響度 | 対策案 |
| :--- | :--- | :--- |
| **バッテリー消費** | 高 | アクティブモードのみ高頻度取得。ジオフェンスを活用した効率化。 |
| **監視感への抵抗** | 高 | 初回起動時に曖昧化ロジックを丁寧に説明。デフォルトを「Ghost」または「曖昧」に設定。 |
| **トラブル/事件** | 中 | 企業メール必須による身元保証、24時間通報窓口、特定個人ブロック。 |
| **マッチング不成立** | 中 | AIによる Spotlight で「誘いやすい相手」を意図的に提示。 |

## 4. 運用・保守方針
- **デプロイ**: Vercel (Frontend/API), Supabase (DB/Realtime)。
- **監視**: Sentry によるエラー監視、Vercel Analytics によるパフォーマンス計測。
- **保守**: 週次でのDB位置ログクリーンアップ（24時間以前のデータ削除）。

