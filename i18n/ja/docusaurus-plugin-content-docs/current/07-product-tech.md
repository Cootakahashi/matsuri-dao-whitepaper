---
sidebar_position: 7
id: product-tech
title: 🔧 プロダクト＆技術
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# 🔧 プロダクト＆技術——動いているものがすべてを証明する

> **動いているものが、すべてを証明する。**
> 私たちの志は言葉だけではありません。Webプラットフォームはすでに稼働し、iOSアプリは最終段階にあります。

Webアプリ・管理ダッシュボードは**本番運用中**。3つのネイティブiOSアプリのうち**GCF AdminとJ-Timesは2026年4月にApp Storeでリリース済み**、Matsuriは**2026年5月上旬リリース予定**。Solana上のスマートコントラクトはオープンソースで公開済み——構想ではなく、**動いているコードと、まもなく届くプロダクト**で語ります。

![3つのアプリ ── 文化を繋ぐ、手のひらのプロダクト](/brand/09_A_three_phones_workshop.webp)

---

## アプリ一覧

| アプリ | 用途 | ステータス | 対応言語 |
| :--- | :--- | :---: | :--- |
| **GCF Admin** | パートナー管理・運営ツール | ✅ リリース済み | 🇯🇵🇬🇧🇨🇳🇹🇭🇳🇴 |
| **Matsuri** | 一般ユーザー向けメインアプリ | 🔜 2026年5月上旬リリース | 🇯🇵🇬🇧🇨🇳🇹🇭🇳🇴 |
| **J-Times** | カルチャーメディア＆学習 | ✅ App Store リリース済み | 🇯🇵🇬🇧 |

```mermaid
graph TB
    subgraph "Matsuri Mobile Suite"
        GCF["🛡️ GCF Admin\nパートナー管理"]
        MAT["⛩️ Matsuri\nメインアプリ"]
        JT["📰 J-Times\nメディア"]
    end
    subgraph "共通基盤"
        CORE["📦 JCCore\nAuth / Network / Models / Design"]
    end
    subgraph "バックエンド"
        API["🖥️ Django API\n125+ エンドポイント"]
        SOL["⚡ Solana\nMTC / NFT / SBT"]
    end
    GCF --> CORE
    MAT --> CORE
    JT --> CORE
    CORE --> API
    API --> SOL
```

---

## 1. 🛡️ GCF Admin — パートナー管理アプリ

:::info ステータス: App Store リリース済み (v1.0)
GCF (Global Community Friends) メンバー向けの業務管理アプリ。ウェブ管理画面の全機能をモバイルに集約。
:::

<div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', margin: '2rem 0'}}>
  <img src={useBaseUrl("/img/apps/gcf-dashboard.webp")} alt="GCF Admin ダッシュボード" style={{width: '100%', maxWidth: '200px', borderRadius: '16px', border: '1px solid rgba(167,139,250,0.2)'}} />
  <img src={useBaseUrl("/img/apps/gcf-members.webp")} alt="GCF Admin メンバー管理" style={{width: '100%', maxWidth: '200px', borderRadius: '16px', border: '1px solid rgba(167,139,250,0.2)'}} />
  <img src={useBaseUrl("/img/apps/gcf-revenue.webp")} alt="GCF Admin 収益管理" style={{width: '100%', maxWidth: '200px', borderRadius: '16px', border: '1px solid rgba(167,139,250,0.2)'}} />
</div>

<div style={{display: 'flex', justifyContent: 'center', margin: '2rem 0'}}>
  <img src={useBaseUrl('/img/apple-store/gcf.png')} alt="GCF on the App Store" style={{maxWidth: '300px', width: '100%', borderRadius: '28px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)'}} />
</div>


### このアプリでできること

| カテゴリ | 機能 |
| :--- | :--- |
| **📊 ダッシュボード** | KPIカード、売上チャート、クイックアクション |
| **👥 メンバー管理** | 一覧・詳細・編集・ティア管理 |
| **💰 収益管理** | コミッション追跡、MTC出金管理、ペイアウト管理 |
| **📝 コンテンツ管理** | イベント・記事・ポッドキャスト・動画の作成・編集・公開 |
| **🎫 ガイドスロット** | ガイド枠の管理、収益トラッキング |
| **🖼️ NFTダッシュボード** | Founder's Collection、オンチェーン確認、NFT転送 |
| **⛩️ 聖地管理** | サイトのCRUD、ビーコン設定 |
| **🎲 ARマイニング設定** | おみくじ確率テーブル、報酬パラメータ管理 |
| **📊 アナリティクス** | エラーレポート、利用状況分析 |
| **🔗 リファラル** | カスタムQRコード生成、紹介プログラム管理 |

### 技術仕様

| 項目 | 詳細 |
| :--- | :--- |
| **アーキテクチャ** | Clean Architecture + MVVM + `@Observable` (iOS 17) |
| **言語 / SDK** | Swift 6.0 / Xcode 16+ / iOS 17.0+ |
| **API連携** | 125以上のエンドポイント |
| **テスト** | 226テスト / 45テストクラス |
| **ローカライズ** | 5言語 (日英中泰諾) / 957以上の翻訳キー |
| **Swift Concurrency** | Strict Concurrency準拠 / ビルド警告ゼロ |

### QRコード統合

GCF Adminでは、Matsuriロゴ付きのカスタムQRコードを生成可能。イベント招待、リファラルリンク、決済リクエストなど多用途に対応。

---

## 2. ⛩️ Matsuri — メインアプリ

:::info ステータス: 2026年5月上旬リリース予定 (v3.0)
一般ユーザー向けのメインアプリ。イベント予約、決済、Web3ウォレット、ARマイニングまで、すべてを一つのアプリで完結。
:::

<div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', margin: '2rem 0'}}>
  <img src={useBaseUrl("/img/apps/matsuri-home.webp")} alt="Matsuri ホーム画面" style={{width: '100%', maxWidth: '200px', borderRadius: '16px', border: '1px solid rgba(167,139,250,0.2)'}} />
  <img src={useBaseUrl("/img/apps/matsuri-wallet.webp")} alt="Matsuri ウォレット ── MTC残高・送金・履歴" style={{width: '100%', maxWidth: '200px', borderRadius: '16px', border: '1px solid rgba(167,139,250,0.2)'}} />
  <img src={useBaseUrl("/img/apps/matsuri-sacred-map.webp")} alt="Matsuri 聖地マップ" style={{width: '100%', maxWidth: '200px', borderRadius: '16px', border: '1px solid rgba(167,139,250,0.2)'}} />
</div>

### このアプリでできること

| カテゴリ | 機能 |
| :--- | :--- |
| **🎪 イベント予約** | 検索・予約・Stripe決済・チケットQR管理 |
| **💳 4つの決済手段** | クレジットカード / 保存済みカード / MTCバランス / 暗号資産 (SOL/MTC) |
| **👛 Web3ウォレット** | MTCバランス表示、送受信、トランザクション履歴 |
| **🖼️ NFTギャラリー** | 保有NFT/SBT一覧、オンチェーン確認 |
| **🗺️ 聖地マップ** | 神社仏閣の地図表示、チェックイン |
| **🎲 ARマイニング** | WebARおみくじ体験、MTC獲得 |
| **💬 チャット** | コンテキストメニュー付きメッセージング |
| **⭐ ウィッシュリスト** | お気に入りイベント・体験の保存 |
| **🔍 高度な検索** | 音声検索対応 |
| **🤝 リファラル** | 紹介プログラム参加、報酬追跡 |
| **📊 GCFダッシュボード** | GCFメンバー向け簡易管理画面 |

### Phantom Wallet連携 — ゼロ入力の暗号資産決済

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant App as Matsuri App
    participant PH as Phantom Wallet
    participant SOL as Solana

    U->>App: 「SOL/MTCで支払う」をタップ
    App->>PH: Solana Pay URLでディープリンク
    PH->>U: トランザクション承認画面
    U->>PH: 承認
    PH-->>App: コールバック (signature)
    App->>SOL: Helius RPCで自動検出・検証
    SOL-->>App: 確認完了
    App->>U: 決済完了 ✅
```

>**ユーザーはアドレスのコピペ不要。**Phantom Walletが自動で起動し、承認するだけで決済完了。トランザクション署名はHelius RPCで自動検出される。

### 技術仕様

| 項目 | 詳細 |
| :--- | :--- |
| **アーキテクチャ** | Clean Architecture + MVVM + Swift Concurrency |
| **言語 / SDK** | Swift 6.0 / Xcode 16+ / iOS 17.0+ |
| **決済** | Stripe PaymentSheet + MTC Balance + Phantom (Solana Pay) |
| **API連携** | 72エンドポイント / 16カテゴリ |
| **テスト** | 230以上 (Model, ViewModel, Network, Security, DeepLink, E2E) |
| **ローカライズ** | 5言語 (日英中泰諾) / 406翻訳キー |
| **ViewModel数** | 25 (完全MVVM — Viewからの直接API呼び出しゼロ) |
| **認証** | Apple Sign In / Google Sign In (PKCE) |

---

## 3. 📰 J-Times — カルチャーメディアアプリ

:::info ステータス: App Store リリース済み
日本文化の深層を伝えるメディアプラットフォーム。記事を読み、ポッドキャストを聴き、動画を観る — すべてのアクションでMTCを獲得。
:::

<div style={{display: 'flex', justifyContent: 'center', margin: '2rem 0'}}>
  <img src={useBaseUrl('/img/apple-store/jtimes.png')} alt="J-Times on the App Store" style={{maxWidth: '300px', width: '100%', borderRadius: '28px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)'}} />
</div>

<div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', margin: '2rem 0'}}>
  <img src={useBaseUrl("/img/apps/jtimes-article.webp")} alt="J-Times 記事リーダー ── ドロップキャップ・進捗バー" style={{width: '100%', maxWidth: '260px', borderRadius: '20px', border: '1px solid rgba(167,139,250,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.25)'}} />
  <img src={useBaseUrl("/img/apps/jtimes-podcast.webp")} alt="J-Times ポッドキャストプレイヤー ── 波形・スリープタイマー" style={{width: '100%', maxWidth: '260px', borderRadius: '20px', border: '1px solid rgba(167,139,250,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.25)'}} />
</div>


### このアプリでできること

| カテゴリ | 機能 |
| :--- | :--- |
| **📖 記事** | パララックスヒーロー、ドロップキャップ、読書進捗バー、リッチコンテンツ (Markdown, テーブル, 引用) |
| **🎧 ポッドキャスト** | シリーズブラウジング、波形表示プレイヤー、スリープタイマー、AirPlay、ロック画面コントロール |
| **🎬 動画** | アダプティブグリッド/リスト表示、ショート動画 (TikTokスタイル、ダブルタップ) |
| **🔍 検索** | マルチフィルター、トレンドタグ、音声検索 |
| **🧭 ディスカバリー** | フィーチャーカルーセル、スタッフピック、今週の人気 |
| **📚 ライブラリ** | お気に入り、履歴 (日付別)、ダウンロード、プレイリスト |
| **🎵 オーディオプレイヤー** | ミニプレイヤー (スワイプ操作)、フルプレイヤー (波形、歌詞、リピート) |
| **👤 メンバーシップ** | 3ティア (Free / Premium / Pro) の機能比較、購入復元 |

### Media Mining — 読む・聴く・観るがマイニングになる

```mermaid
graph LR
    subgraph "ユーザーアクション"
        READ["📖 記事を読む\n(スクロール75%で完読)"]
        LISTEN["🎧 ポッドキャストを聴く\n(トラック終了で完聴)"]
        WATCH["🎬 動画を観る\n(詳細画面退出で完視聴)"]
        SHARE["📤 シェアする"]
    end
    subgraph "エンゲージメント追跡"
        ET["📊 EngagementTracker\nオフラインキュー対応\n7日間有効期限"]
    end
    subgraph "報酬"
        MTC["💎 MTC獲得"]
    end
    READ --> ET
    LISTEN --> ET
    WATCH --> ET
    SHARE --> ET
    ET --> MTC
```

>**オフラインでも記録される。**電波の届かない山奥の神社で記事を読んでも、ネット復帰時に自動でエンゲージメントが送信され、MTCが付与される。

### デザインシステム — 日本の美意識「四柱」

J-Timesは日本の伝統的な美意識を現代UIに落とし込んだ独自のデザインシステムを採用。

| 柱 | 概念 | UIへの適用 |
| :--- | :--- | :--- |
| **墨 (Sumi)** | 温かみのあるニュートラルグレー | 背景色、テキスト階層 |
| **朱 (Shu)** | 日本の赤 (#C53030) | アクセントカラー、重要アクション |
| **間 (Ma)** | 4ptグリッドの余白 | スペーシング、呼吸感 |
| **紙 (Kami)** | 微細なテクスチャ、グラスモーフィズム | カード表面、奥行き表現 |

### 技術仕様

| 項目 | 詳細 |
| :--- | :--- |
| **アーキテクチャ** | Clean Architecture + MVVM + Swift Concurrency |
| **言語 / SDK** | Swift 6.0 / Xcode 16+ / iOS 17.0+ |
| **外部依存** | **ゼロ**— Apple純正フレームワークのみ |
| **API連携** | 40以上のエンドポイント |
| **テスト** | 371テスト / 20ファイル |
| **ローカライズ** | 2言語 (日英) / 310以上の翻訳キー |
| **オフライン対応** | ContentCache (50MB) + ImageDiskCache (200MB) + ダウンロードマネージャー |
| **認証** | Apple Sign In / Google Sign In (PKCE) |

---

## 共通基盤: JCCore ライブラリ

3つのアプリすべてが共有するSwift Packageライブラリ。

```mermaid
graph TB
    subgraph "JCCore"
        AUTH["🔐 JCAuth\nAuthManager\nTokenStore (Keychain)\nBiometricAuth"]
        NET["🌐 JCNetworking\nAPIClient\nEndpointProtocol\nWebSocket\n自動 snake_case 変換"]
        MOD["📋 JCModels\nUser / AuthTokens\nPaginatedResponse\nMembershipPlan"]
        DES["🎨 JCDesign\nJCThemeProtocol\nSpacing / Radius トークン"]
        UTL["🔧 JCUtilities\n日付フォーマット"]
    end
    GCF["🛡️ GCF Admin"] --> AUTH & NET & MOD & DES
    MAT["⛩️ Matsuri"] --> AUTH & NET & MOD & DES
    JT["📰 J-Times"] --> AUTH & NET & MOD & DES & UTL
```

| モジュール | 役割 |
| :--- | :--- |
| **JCAuth** | Keychain ベースのトークン管理、生体認証 (Face ID / Touch ID) |
| **JCNetworking** | 型安全なAPIクライアント、WebSocket、自動JSON snake_case変換 |
| **JCModels** | アプリ横断の共通データモデル (User, AuthTokens, etc.) |
| **JCDesign** | テーマプロトコル、デザイントークン (スペーシング、角丸) |
| **JCUtilities** | 日付・文字列のユーティリティ |

---

## セキュリティとプライバシー

| 項目 | 実装 |
| :--- | :--- |
| **認証トークン** | iOS Keychainに暗号化保存 (TokenStore) |
| **生体認証** | Face ID / Touch ID による二要素認証 |
| **API通信** | HTTPS + Certificate Pinning |
| **ウォレット秘密鍵** | アプリ内に秘密鍵を保存しない — Phantom Walletに委譲 |
| **ARマイニング** | カメラ画像をサーバーに送信しない (VisionProof) |
| **オフラインデータ** | SwiftData暗号化 + 自動有効期限 |
| **Swift Concurrency** | Actor隔離による競合状態防止 |

---

## 開発品質

### モバイルアプリ：3アプリ合計で**827以上の自動テスト**を実装。

| アプリ | テスト数 | カバレッジ領域 |
| :--- | :---: | :--- |
| **GCF Admin** | 226 | Model, ViewModel, Repository, API, Localization, Navigation |
| **Matsuri** | 230+ | Model, ViewModel, Network, Security, DeepLink, Regression, Performance, E2E |
| **J-Times** | 371 | Model, ViewModel, API, Repository, Navigation, Localization, Security, Performance |

### スマートコントラクト：テスト実装を順次拡充中

Solana上のRustプログラムについては、コアロジック（数学モジュール）のユニットテストから着手しており、セキュリティ監査（2026年Q2〜Q3）に向けてテストカバレッジを順次拡充しています。

---

## スマートコントラクト — オープンソース設計

>**信頼不要（トラストレス）の設計思想。**
> 報酬計算、紹介ツリー、半減期スケジュール —— すべてのロジックは**オンチェーン**で実行され、誰でも監査可能です。
> ソースコード: [GitHub](https://github.com/Cootakahashi/matsuri-contracts)

---

### Contributors

| メンバー | 役割 |
| :--- | :--- |
| **Ko Takahashi** | Founder / Lead Developer — アーキテクチャ設計、スマートコントラクト、フルスタック開発 |

> 🌏**今後、GCFメンバーや世界中の開発者コミュニティも共同開発に参加していきます。**
> Matsuri Protocol は、「文化のインフラ」として永続的に機能するよう、透明性と共同所有を原則としています。

---

### 全体構成

Matsuri は**3つのAnchor（Rust）プログラム**を Solana上にデプロイし、エコシステムの各柱を担います。

```mermaid
graph TB
    subgraph "オンチェーンプログラム (Solana)"
        P1["📣 matsuri-referral 縁マイニング"]
        P2["⛩️ matsuri-worship 巡礼分散エンジン"]
        P3["📊 matsuri-distribution 半減期配布"]
    end
    subgraph "オフチェーン (Django + Next.js)"
        BE["🖥️ バックエンドOracle 本人確認 + GPS検証 + Cranker TX"]
        FE["📱 フロントエンド ウォレット + ダッシュボード + 聖地マップ"]
    end
    FE -->|"ウォレット署名"| P1 & P2 & P3
    BE -->|"Cranker TX"| P1 & P2 & P3
    P1 & P2 & P3 -->|"CPI"| MTC["💎 MTC (SPLトークン)"]
```

---

### 1. 📣 縁マイニング（En-Mining）

**目的:**「広さ（紹介ネットワーク）」と「深さ（経済インパクト）」の両方を報酬化するハイブリッド成長エンジン。単なるアフィリエイトではなく、現実世界の経済活動がオンチェーンの価値を生み出す完全なマイニングプロトコルです。

#### スコアリング設計

貢献スコアは2つの加重コンポーネントに基づきます：

| コンポーネント | ウェイト | 目的 |
| :--- | :---: | :--- |
| **広さ**（紹介人数） | 30% | ネットワークの到達範囲 — 何人を連れてきたか |
| **深さ**（決済取引量） | 70% | 経済的インパクト — 単なるサインアップではなく実際の購入 |

スコアは時間とともに蓄積され、各半減期エポックでMTCに変換されます。追加のブーストメカニズムを予定しています：

| ブースト | 説明 | ステータス |
| :--- | :--- | :---: |
| **Toku（徳）ステーキング** | MTCをロックして貢献スコアをブースト（最大約50%ブースト）。ティアと正確な倍率は半減期プール放出スケジュールに基づいて調整 | ⬜ 係数未定 |
| **シーズンランキング** | 各エポックのトップパフォーマーが**エバンジェリスト**タイトル（永久SBT）とスコアブーストを獲得。正確な割合はガバナンスで決定 | ⬜ 係数未定 |

:::info プログレッシブパラメータ設計
ブースト係数（ステーキングティア、ランキングボーナス）は意図的に調整可能としています。実際のエコシステムデータ — 総アクティブユーザー数、半減期プール放出率、価格安定目標 — に基づいて確定し、スマートコントラクトにロックされます。このアプローチにより、固定リターンを過度に約束することなく**公正な分配**を保証します。
:::

#### 反シビル防御（3層）

| 層 | メカニズム | 場所 |
| :--- | :--- | :--- |
| **本人確認ゲート** | X/Twitter OAuth + SMS | オフチェーン（Django） |
| **オンチェーンゲート** | `is_verified = true` のプロフィールのみ報酬獲得 | スマートコントラクト |
| **深さの重み付け** | スコアの70% = 実際の支払い → ボットは何も稼げない | スコアリングエンジン |

---

### 2. ⛩️ 巡礼分散エンジン（Worship Routing Engine）

**目的:** トークンエコノミクスを活用してオーバーツーリズムを解決する世界初の**ReFiプロトコル**。聖地を訪問してMTCを獲得。ただし重要なのは：*訪問者が少ないサイトほど指数関数的に多くの報酬を得られます。*

:::tip 核心インサイト
「逆Uberサージプライシング」— 混雑したサイトはペナルティ、フロンティアサイトはブースト。観光客は**より収益性が高いから**自発的に訪問者の少ない場所へ向かいます。
:::

#### 報酬設計の原則

各訪問の貢献スコアは複数の要因で決定されます：

| 要因 | 原則 | 効果 |
| :--- | :--- | :--- |
| **サイトの人気度** | 訪問者が少ないサイトほど高スコア | 観光客を混雑エリアから分散 |
| **訪問タイミング** | その日の早い訪問者ほど高スコア | オフピーク訪問を促進 |
| **地域ティア** | 地方・フロンティアサイトが最上位 | 地方創生を推進 |
| **訪問頻度** | 定期的な訪問者がボーナススコアを蓄積 | 継続的なエンゲージメントを報酬化 |
| **おみくじ運勢** | チェックインごとのランダムボーナス抽選 | 楽しいゲーミフィケーション要素 |
| **スポンサードブースト** | 自治体が特定サイトをブースト可能 | B2B/B2G収益モデル |

:::info 係数は調整可能
各要因の正確な倍率（例：地方サイトが主要サイトよりどれだけ多く稼げるか）は、**半減期プールスケジュール**と実際の利用データに基づいて調整され、段階的にスマートコントラクトにロックされます。設計原則は固定 — 係数はエコシステムとともに進化します。
:::

---

### 3. 📊 半減期配布（Halving Distribution）

**目的:**ビットコインに着想を得た半減期スケジュールで、MTCの配布をエポックごとに自動で半減させます。数学的に保証された希少性。

| 命令 | 説明 |
| :--- | :--- |
| `initialize` | 配布プールの初期化 |
| `register_miner` | マイナーの登録 |
| `update_score` | スコアの更新 |
| `advance_epoch` | エポックの進行（半減実行） |
| `claim_distribution` | 配布報酬の受取 |

---

### 4. 🎴 ARマイニング — WebAR おみくじ体験

**目的:**スマホのブラウザだけで現実空間にARおみくじを出現させ、MTCをマイニングする体験。**アプリDL不要**。神道の精神性と最先端技術が融合した、世界初のWebAR×ブロックチェーンインフラです。

#### アーキテクチャ

```mermaid
sequenceDiagram
    participant U as ユーザー (スマホ)
    participant AR as WebAR (Three.js)
    participant API as Django API
    participant SC as Solana

    U->>AR: カメラ起動 + GPS許可
    AR->>API: セッション開始
    API-->>AR: session_token
    AR->>AR: 3Dおみくじボックス表示
    U->>AR: タップ！
    Note over AR: 演出アニメ 2.5秒
    AR->>API: draw_omikuji
    API->>API: 抽選 → NFT判定
    API-->>AR: 結果 + 報酬
    AR->>U: 🏆大吉 +50 MTC！
    API->>SC: Cranker TX（非同期）
```

#### おみくじ確率設定（GCF管理者）

Basis Points (10000 = 100%) で0.01%刻みの精密制御。GCF管理画面から調整可能。

| 等級 | レアリティ | ボーナス | NFT |
|------|-----------|---------|-----|
| 🏆 大吉 | レア | 最大ボーナス | ✅ |
| ✨ 吉 | アンコモン | 高ボーナス | 任意 |
| 🌸 小吉 | コモン | 小ボーナス | — |
| 🍃 末吉 | コモン | 参加記録 | — |
| 💀 凶 | アンコモン | 参加記録 | — |

確率と報酬係数はエコシステムの規模と半減期の放出量に基づいて段階的に確定し、スマートコントラクトに実装されます。

#### ZK-Proof of Vision（5層セキュリティ）

GPS偽装やリプレイ攻撃を多層で排除。**プライバシー保護のため、カメラ画像はサーバーに送信しません。**

| Layer | 検証内容 | 配点 |
| :--- | :--- | :--- |
| Temporal | セッション時間 5-120秒 | /20 |
| Motion | ジャイロの自然さ（手持ち振動検知） | /20 |
| Light | 環境光×時間帯の整合性 | /20 |
| HMAC | proof_hash 署名の検証 | /20 |
| Fingerprint | デバイスの一意性 | /20 |
| **合計** | **60/100 以上で PASS** | |

#### 報酬設計

報酬はサイトの種類、おみくじ結果、地域ティアなどの複数要因に基づく**貢献スコア**として記録されます。具体的な係数は半減期の放出スケジュールとエコシステムの成長に合わせて段階的に確定し、スマートコントラクトに実装されます。

---

### Pure Math Modules（監査可能なコアロジック）

すべてのプログラムは、スコアリング・報酬計算を**純粋で監査可能な `math.rs` モジュール**に分離しています：

- **副作用ゼロ** — I/Oなし、メモリ確保なし、外部呼び出しなし
- **文書化された公式** — rustdoc内のLaTeXスタイル表記
- **オーバーフロー解析** — 証明された範囲のu128中間値
- **包括的テスト** — エッジケース、境界条件、比率検証
- **調整可能な係数** — 報酬パラメータはガバナンスを通じて更新可能に設計されており、エコシステムの成長に合わせた段階的な調整が可能

---

### セキュリティモデル

本コントラクトは**完全オープンソース**です。セキュリティは不透明性ではなく、数学的な保証に基づいています。

| 原則 | 実装 |
| :--- | :--- |
| **PDA限定保管庫** | トークン保管庫はPDA（プログラム派生アドレス）で制御 — 人間の鍵では引き出せない |
| **チェック付き演算** | すべての計算に `checked_*` 演算を使用 — オーバーフロー不可能 |
| **権限分離** | 管理者（マルチシグ）≠ Cranker（限定操作）≠ ユーザー（自己管理） |
| **緊急停止** | セキュリティ上の脅威に対してのみ管理者がプログラムを一時停止可能。ただし**資金の移動・奪取は不可能**——停止は「守るための盾」であり、ルール変更の手段ではない |
| **不変のトークノミクス** | 半減率・総プール・エポック期間は初期設定後に変更不可 |
| **純粋数学モジュール** | 報酬/スコアロジックは分離された、テスト可能な数学ライブラリ |
| **Vision Proof** | カメラデータ不送信の5層偽装検知（プライバシー保護） |

---

**[▶ 次: ロードマップ & チーム](/docs/roadmap)**｜**[◀ 前: トークノミクス](/docs/tokenomics)**
