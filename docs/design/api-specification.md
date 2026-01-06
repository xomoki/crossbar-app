# API仕様書

## 1. 設計原則
- 本システムは RESTful API 原則に基づき、ステートレスな通信を行う。
- リアルタイム性が求められる位置情報・通知については Supabase Realtime (Websocket) を併用する。

## 2. 認証・認可
- **認証**: Clerk による JWT (JSON Web Token) 認証。
- **認可**: HTTP ヘッダー `Authorization: Bearer <JWT>` を必須とする。
- サーバー側（Vercel Edge Functions）で JWT を検証し、所属ドメインやロールを確認する。

## 3. エンドポイント一覧

### 3.1 ユーザー・ステータス関連
#### `POST /api/status/update`
現在のマジック・トグル状態を更新する。
- **Request**:
  ```json
  {
    "status": "Listen",
    "location": { "lat": 35.6586, "lng": 139.7454 }
  }
  ```
- **Response** (200 OK):
  ```json
  { "success": true, "updated_at": "2026-01-06T21:00:00Z" }
  ```

### 3.2 マップ・位置情報関連
#### `GET /api/map/nearby`
周辺ユーザーの情報を取得する（Visibility Matrix 適用済）。
- **Query Params**: `lat`, `lng`, `radius_meters`
- **Response** (200 OK):
  ```json
  [
    {
      "id": "uuid-1",
      "status": "Open",
      "location": { "lat": 35.6590, "lng": 139.7460 },
      "precision": "fuzzy",
      "is_recommended": true,
      "tags": ["#M&A", "#Wine"]
    },
    ...
  ]
  ```

### 3.3 マッチング・オファー関連
#### `POST /api/offers/send`
特定の相手にオファー（乾杯/相談/おごり）を送信する。
- **Request**:
  ```json
  {
    "receiver_id": "uuid-1",
    "offer_type": "Cheers",
    "venue_id": "optional-uuid"
  }
  ```
- **Response** (201 Created):
  ```json
  { "match_id": "uuid-m1", "status": "pending" }
  ```

#### `POST /api/offers/respond`
受け取ったオファーに応答する。
- **Request**:
  ```json
  {
    "match_id": "uuid-m1",
    "action": "accepted"
  }
  ```
- **Response** (200 OK):
  ```json
  { "success": true, "meeting_point": { "name": "Bar High Five", "address": "..." } }
  ```

## 4. エラーレスポンス
標準的な HTTP ステータスコードを使用。
- `401 Unauthorized`: 認証エラー
- `403 Forbidden`: 権限不足（他社の情報を直接取得しようとした等）
- `429 Too Many Requests`: レートリミット超過（位置情報更新頻度が高すぎる場合）
