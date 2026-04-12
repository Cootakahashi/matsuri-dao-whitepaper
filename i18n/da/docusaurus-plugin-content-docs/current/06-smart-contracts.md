---
sidebar_position: 8
id: smart-contracts
title: ⚡ Smart Contracts
description: "Fire open source Anchor/Rust-programmer på Solana — En-Mining, Worship Routing, Halveringsdistribution og Omikuji — med PDA-only vaults og 128-bit aritmetik."
---

# ⚡ Smart Contracts — Open source-arkitektur

> **Tillidsløst by design.**
> Al belønningslogik, henvisningstræer og halveringsplaner håndhæves **on-chain** via reviderbare Rust-programmer.
> Kildekode: [GitHub](https://github.com/Cootakahashi/matsuri-contracts)

| Specifikation | Detaljer |
| :--- | :--- |
| **Framework** | Anchor 0.32.1 (Rust) |
| **Kæde** | Solana Mainnet-beta |
| **Programmer** | 4 (Distribution, Referral, Worship, Omikuji) |
| **Build** | Optimeret release med LTO, overflow-checks aktiveret |
| **Matematik** | Pure `math.rs`-moduler — nul sideeffekter, 128-bit mellemberegninger |

---

## Oversigt

Matsuri udrulller **tre Anchor (Rust)-programmer** på Solana, der hver håndterer en distinkt søjle af økosystemet:

```mermaid
graph TB
    subgraph "On-chain-programmer (Solana)"
        P1["📣 matsuri-referral\nEn-Mining-protokol"]
        P2["⛩️ matsuri-worship\nWorship Routing Engine"]
        P3["📊 matsuri-distribution\nHalveringsdistribution"]
    end
    subgraph "Off-chain (Django + Next.js)"
        BE["🖥️ Backend-orakel\nIdentitet + GPS-verificering\nCranker TX-indsendelse"]
        FE["📱 Frontend\nWallet + dashboard\nHelligt stedkort"]
    end
    FE -->|"Wallet-signering"| P1 & P2 & P3
    BE -->|"Cranker TX'er"| P1 & P2 & P3
    P1 & P2 & P3 -->|"CPI"| MTC["💎 MTC (SPL Token)"]
```

---

## 1. 📣 En-Mining (縁マイニング)-protokol

**Formål:** En hybrid vækstmotor, der belønner både *bredde* (henvisningsrækkevidde) og *dybde* (økonomisk effekt). Ikke bare affiliates — en fuld mining-protokol, hvor reel økonomisk aktivitet genererer on-chain-værdi.

### Scoringsformel

```
S_final = S_raw × M_toku × B_title

where:
  S_raw   = 0.30 × referrals + 0.70 × (volume / 10^9)
  M_toku  = f(staked_mtc) ∈ [1.0×, 10.0×]
  B_title = 1.0 + min(seasons_ranked × 0.05, 0.50)
```

| Komponent | Vægt | Formål |
| :--- | :---: | :--- |
| **Bredde** (henvisningsantal) | 30% | Netværksrækkevidde — hvor mange mennesker du bringer |
| **Dybde** (afregningsvolumen) | 70% | Økonomisk effekt — reelle køb, ikke bare tilmeldinger |
| **Toku-multiplikator** | ×1–10 | Lås MTC for at booste mining-kraft |
| **Titelboost** | +5%/sæson | Permanent belønning for konsistente toppræsterende |

### Toku (徳) staking-niveauer

| Staket MTC | Multiplikator | Niveau |
| :--- | :---: | :--- |
| 0 | 1,0× | — |
| 1.000+ | 1,5× | Bronze |
| 10.000+ | 3,0× | Silver |
| 100.000+ | 5,0× | Gold |
| 1.000.000+ | 10,0× | Diamond |

### En no Banzuke (sæsonrangliste)

Hver sæson (epoke) rangeres toppræsterende. Fordele:
- Top 10% optjener titlen **Evangelist** (permanent SBT-flag)
- Hver rangeret sæson giver **+5% mining-boost** (kumulativ, maks.: 50%)

### Anti-Sybil-forsvar (3 lag)

| Lag | Mekanisme | Placering |
| :--- | :--- | :--- |
| **Identitetsport** | X/Twitter OAuth + SMS | Off-chain (Django) |
| **On-chain-port** | Kun `is_verified = true`-profiler optjener | Smart Contract |
| **Dybdevægtning** | 70% af scoren = reelle betalinger → bots tjener intet | Scoringsmotor |

---

## 2. ⛩️ Worship Routing Engine (pilgrimsspredningsmotor)

**Formål:** Verdens første **ReFi-protokol, der løser overturisme ved hjælp af tokenøkonomi.** Besøg hellige steder → tjen MTC. Men her er det geniale: *mindre besøgte steder betaler eksponentielt mere.*

:::tip Indsigten
Dette er "omvendt Uber surge pricing" — overfyldte steder straffes, grænseområder boostes. Turister ruter sig selv til mindre besøgte steder, fordi **det er mere profitabelt.**
:::

### 6-lags belønningsformel

```
R_final = R_pioneer × M_dynamic × M_regional × M_streak × M_omikuji

where:
  R_pioneer  = daily_pool / visit_order     (harmonic 1/n decay)
  M_dynamic  = admin-controlled ∈ [0.1×, 50×]
  M_regional = tier_table[tier] ∈ {1×, 2×, 5×, 10×}
  M_streak   = 1.0 + min(days × 0.02, 0.50)
  M_omikuji  = fortune_lottery ∈ {1.0, 1.2, 1.5, 3.0}
```

### Lag 1: Pionerbonus (first-mover-fordel)

Harmonisk henfald — matematikken der router turister:

| Besøgsrækkefølge | Belønning vs. 1. | Reelt eksempel (1000 MTC-pulje) |
| :---: | :---: | :--- |
| 1. | 100% | 1.000 MTC |
| 5. | 20% | 200 MTC |
| 10. | 10% | 100 MTC |
| 100. | 1% | 10 MTC |

> **Første besøgende = 100× mere belønning end 100. besøgende.** Dette skaber et stærkt incitament til at besøge på tidspunkter uden for spidsbelastning.

### Lag 2: Dynamisk multiplikator (menneskemængdespredning)

Styret i realtid af administratorer via GCF Admin-panelet:

| Scenarie | Multiplikator | Effekt |
| :--- | :---: | :--- |
| **Overturistificeret** (Asakusa spidstid) | 0,1× | 90% belønningsstraf |
| **Normal** | 1,0× | Standard |
| **Underbesøgt** | 10× | 10× belønningsboost |
| **Grænseområdekampagne** | 50× | Maksimalt incitament |

### Lag 3: Regionalt niveau

| Niveau | Betegnelse | Multiplikator | Eksempler |
| :---: | :--- | :---: | :--- |
| 0 | 🏙️ Større | 1× | 浅草寺, 清水寺, 伏見稲荷 |
| 1 | 🌆 Mellemstort | 2× | Regionale hovedhelligdomme, præfekturhovedstadstempeler |
| 2 | 🏞️ Landligt | 5× | Historiske landlige helligdomme |
| 3 | ⛰️ Skjult | 10× | Fjerntliggende bjergtempler, ø-helligdomme |

### Lag 4: Seriebonus

+2% pr. sammenhængende dag, maks. +50%. Belønner regelmæssige besøgende.

### Lag 5: 🎲 Omikuji-protokol

| Resultat | Sandsynlighed | Multiplikator |
| :--- | :---: | :---: |
| 🏆 **大吉** (Stor lykke) | 5% | 3,0× |
| ✨ **吉** (Lykke) | 15% | 1,5× |
| 🌸 **小吉** (Lille lykke) | 30% | 1,2× |
| 🍃 **末吉** (Fremtidig lykke) | 35% | 1,0× |
| 💀 **凶** (Ulykke) | 15% | 1,0× |

### Lag 6: Sponsorerede beacons (B2B/B2G)

Kommuner, jernbaneselskaber og turismebestyrelser kan **indsætte MTC** for at skabe tidsbegrænsede højbelønningszoner ved specifikke steder.

```mermaid
graph LR
    MUN["🏛️ Kommune\nIndsætter 100K MTC"] --> BEACON["📡 Beacon\n+500 MTC/besøg\n30 dage"]
    BEACON --> SITE["⛩️ Landlig helligdom\n×50 multiplikator"]
    SITE --> TOURIST["👤 Turist\nBesøger helligdommen"]
    TOURIST --> REWARD["💎 Høj MTC-belønning\n→ Bliver længere\n→ Bruger lokalt"]
```

> **B2B-indtægtsmodel:** Sponsorer betaler MTC for at route turister. MTC-købspres → tokenværdi. Win-win-win.

---

## 3. 📊 Halveringsdistribution

**Formål:** 550 mio. MTC mining-puljen distribueret over årtier via en **2-årig halveringscyklus** — hurtigere end Bitcoins 4-årige cyklus.

### Halveringsplan

```
Total Pool: 550,000,000 MTC

Epoch 0 (2027–2029):  275,000,000 MTC  (50%)
Epoch 1 (2029–2031):  137,500,000 MTC  (25%)
Epoch 2 (2031–2033):   68,750,000 MTC  (12.5%)
Epoch 3 (2033–2035):   34,375,000 MTC  (6.25%)
        ...              ...
∑ → 550,000,000 MTC (asymptotic total)
```

### Individuel belønningsformel

```
your_reward = epoch_budget × (your_score / total_score)
```

Al aritmetik bruger **128-bit mellemberegning** — matematisk umuligt at overflowe.

### Præstationsscore-kilder

| Aktivitet | Scorevægt |
| :--- | :--- |
| **Gennemførte guidesessioner** | Høj |
| **Eventbilletsalg** | Høj |
| **Henvisningsnetværksaktivitet** | Middel |
| **Worship-mining-besøg** | Middel |
| **Medieengagement** | Lav |

:::info Tilladelsesløs epokefremdrift
`advance_epoch`-instruktionen kan kaldes af **hvem som helst** — ingen admin nødvendig. Systemuret bestemmer, hvornår epoker skifter, hvilket sikrer tillidsløs drift, selv hvis teamet forsvinder.
:::

---

## Matematikmoduler (open source-kerne)

Begge programmer adskiller al scorings-/belønningsmatematik i **rene, reviderbare `math.rs`-moduler** med:

- **Nul sideeffekter** — ingen I/O, ingen allokeringer, ingen eksterne kald
- **Dokumenterede formler** — LaTeX-stil notation i rustdoc
- **Overflow-analyse** — u128 mellemberegningsværdier med beviste grænser
- **Omfattende tests** — kanttilstande, grænseforhold, ratioverificering

```rust
// Example: Pioneer Bonus (from worship/math.rs)
#[inline]
pub fn pioneer_reward(daily_pool: u64, visit_order: u32) -> u64 {
    if visit_order == 0 { return 0; }
    (daily_pool as u128 / visit_order as u128) as u64
}
```

---

## 4. 🎴 AR Mining — WebAR Omikuji-mining

**Formål:** En browserbaseret AR-oplevelse, der spawner en virtuel Omikuji-boks i det virkelige rum — min MTC uden at downloade en app. Verdens første WebAR × blockchain-infrastruktur, der fusionerer shinto-spiritualitet med banebrydende teknologi.

:::info Hvordan dette hænger sammen med mobilappsene
Matsuri iOS-appen bruger det hellige stedkort til GPS-check-in. Når du har checket ind, åbner **WebAR Omikuji** i en browseroverlejring (Three.js) — ingen separat app nødvendig. Resultatet fødes tilbage til Matsuri-appens belønningssystem. Både native og weboplevelser fungerer sømløst sammen.
:::

### Arkitektur

```mermaid
sequenceDiagram
    participant U as Bruger (telefon)
    participant AR as WebAR (Three.js)
    participant VP as VisionProof
    participant API as Django API
    participant SC as Solana

    U->>AR: Start kamera + GPS-tilladelse
    AR->>API: Sessionsstart (GPS)
    API-->>AR: session_token + site_info
    AR->>AR: Vis 3D Omikuji-boks
    U->>AR: Tryk
    AR->>VP: Start indsamling af bevægelse + lys
    AR->>API: draw_omikuji (session_token)
    Note over AR: Effektanimation afspilles i 2,5 sek.
    API->>API: valider (5 lag) → draw() → NFT-vurdering
    API-->>AR: resultat + belønning + nft
    AR->>U: 🏆大吉 (Stor lykke) +50 MTC
    API->>SC: Cranker TX (asynkron)
```

### Optimistic UI (nul ventetid)

| Trin | Tid | Behandling |
|---------|------|------|
| Tryk → Effektstart | 0ms | Animationen afspilles straks i frontend |
| API draw_omikuji | ~50ms | Lodtrækning + NFT-vurdering i Django |
| Effekt fuldført | 2500ms | Resultat allerede bestemt → vises |
| Solana TX | ~400ms | Sendes i baggrunden |

### Omikuji-sandsynlighedsindstillinger (GCF Admin)

Basis Points (10000 = 100%) med præcisionskontrol i trin af 0,01%.

| Rang | Standard | Belønnings-multiplikator | NFT |
|------|-----------|---------|-----|
| 🏆 大吉 (Stor lykke) | 5,00% (500bp) | ×3,0 | ✅ |
| ✨ 吉 (Lykke) | 15,00% (1500bp) | ×1,5 | Valgfrit |
| 🌸 小吉 (Lille lykke) | 30,00% (3000bp) | ×1,2 | — |
| 🍃 末吉 (Fremtidig lykke) | 35,00% (3500bp) | ×1,0 | — |
| 💀 凶 (Ulykke) | 15,00% (1500bp) | ×1,0 | — |

### ZK-Proof of Vision (5-lags verificering)

GPS-forfalskning og replay-angreb elimineres via flere lag. Billeddata sendes ikke af hensyn til privatlivets fred.

| Lag | Verificeringsindhold | Point |
|-------|---------|------|
| Temporal | Sessionstid 5-120 sekunder | /20 |
| Bevægelse | Gyroskopvarians 0,005-0,5 (naturlig håndbevægelse) | /20 |
| Lys | Omgivelseslys × tidspunktkonsistens | /20 |
| HMAC | proof_hash signaturverificering | /20 |
| Fingeraftryk | Enhedsunikalitet | /20 |
| **I alt** | **PASS-tærskel** | **60/100** |

### Belønningsberegningsformel

```
Reward = Base(10 MTC) × SiteMultiplier × OmikujiMult × TierMult

TierMult = { Større: 1.0, Mellemstort: 2.0, Landligt: 5.0, Skjult: 10.0 }
```

---

## NFT / SBT-kollektion

Matsuri Protocol udsteder ikke-overførbare **Soulbound Tokens (SBT'er)** og begrænsede udgaver af **NFT'er** via Metaplex Core på Solana.

<div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', margin: '2rem 0'}}>
  <img src="/img/nft/founder-nft-001.jpg" alt="Founder's Edition NFT #001" style={{width: '100%', maxWidth: '220px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'}} />
  <img src="/img/nft/founder-nft-002.jpg" alt="Founder's Edition NFT #002" style={{width: '100%', maxWidth: '220px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'}} />
</div>

| Type | Overførbar | Formål |
| :--- | :---: | :--- |
| **Founder NFT** | Nej (SBT) | Bevis for grundlæggende medlemskab — permanent mining-boost |
| **Evangelist NFT** | Nej (SBT) | Sæsonrangeringspræstation — +5% mining pr. sæson |
| **Goshuin NFT** | Nej (SBT) | Pilgrimscheck-in-bevis — stedseksklusiv |
| **Omikuji NFT** | Nej (SBT) | 大吉 (Stor lykke)-bevis — sjælden samlergenstand |

---

## Betalingsverificering (on-chain ↔ off-chain)

Platformen verificerer Solana-transaktioner on-chain, før køb krediteres — ikke tillidsbaseret, men **kryptografisk verificeret.**

```mermaid
sequenceDiagram
    participant U as Bruger (app/web)
    participant PH as Phantom Wallet
    participant SOL as Solana Mainnet
    participant API as Django Backend
    participant DB as PostgreSQL

    U->>PH: Signer transaktion
    PH->>SOL: Indsend TX
    SOL-->>PH: TX-signatur
    PH-->>U: Returner signatur
    U->>API: POST /payments/solana/verify/
    API->>SOL: getTransaction(signature)
    SOL-->>API: TX-detaljer (beløb, modtager, status)
    API->>API: Verificer: korrekt modtager, beløb, inden for 15 min. TTL
    API->>DB: Opret EventPurchase + TokenTransaction
    API-->>U: Køb bekræftet ✅
```

| Verificeringstjek | Detaljer |
| :--- | :--- |
| **Modtager** | Skal matche `SOLANA_ADMIN_WALLET` |
| **Beløb** | Skal matche forventet pris (SOL eller MTC) |
| **TTL** | Transaktionen skal være inden for 15 minutter |
| **Unikhed** | `solana_signature` er unikt indekseret — ingen dobbeltforbrug |
| **Status** | On-chain-bekræftelse påkrævet |

---

## Sikkerhedsmodel (open source)

Disse kontrakter er **fuldt open source.** Sikkerheden bygger på matematiske garantier, ikke hemmeligholdelse.

| Princip | Implementering |
| :--- | :--- |
| **PDA-only vaults** | Token-vaults styres af Program Derived Addresses — ingen menneskelig nøgle kan tømme dem |
| **Kontrolleret aritmetik** | Enhver beregning bruger `checked_*`-operationer — overflow er umuligt |
| **Autoritetsseparation** | Admin (multisig) ≠ Cranker (begrænsede operationer) ≠ Bruger (selvforvarende) |
| **Nødpause** | Admin kan pausere alle programmer øjeblikkeligt; kan ikke stjæle midler |
| **Uforanderlig tokenomics** | Halveringsfaktor, samlet pulje og epokevarighed sættes én gang og kan ikke ændres |
| **Rene matematikmoduler** | Scorings-/belønningslogik adskilt i reviderbare, testbare matematikbiblioteker |
| **Vision Proof** | 5-lags anti-spoofing uden at overføre kameradata (privatlivsbeskyttende) |

### Off-chain-sikkerhed (Django Backend)

| Lag | Implementering |
| :--- | :--- |
| **Autentificering** | Cookie-baseret JWT (HttpOnly + Secure + SameSite=Lax), 1t adgang / 30d fornyelse |
| **Kryptering** | Bankoplysninger krypteret med Fernet-cipher, mislykket dekryptering returnerer tom dict |
| **Hastighedsbegrænsning** | Anon: 30/min, Auth: 100/min, Login: 10/min, Registrering: 5/time |
| **Betalingssikkerhed** | PCI-kompatibel (ingen kortdata lagret), Stripe/PayPal webhook-signaturverificering |
| **Databeskyttelse** | GDPR-dataeksport, auto-sletning af uverificerede konti efter 7 dage |
| **CORS** | Eksplicit origin-hvidliste (ingen wildcards i produktion) |

---

## Revisions- og verifikationsstatus

Gennemsigtighed er ikke til forhandling. Her er den aktuelle status for tredjepartsverificering:

| Post | Status | Detaljer |
| :--- | :---: | :--- |
| **Kildekode** | ✅ Open source | [GitHub: matsuri-contracts](https://github.com/Cootakahashi/matsuri-contracts) |
| **MTC-token** | ✅ Verificeret | SPL Token på Solana Mainnet — Mint- og Freeze-autoriteter permanent tilbagekaldt |
| **Smart contract-revision** | 🔜 Planlagt Q2 2026 | Professionel sikkerhedsrevision af uafhængigt firma |
| **Backend-sikkerhed** | ✅ Produktion | Hastighedsbegrænsning, krypteret lagring, PCI-kompatible betalinger, 841+ tests |
| **Mobilapps** | ✅ Testet | 827+ automatiserede tests på tværs af 3 iOS-apps |

:::warning Gennemsigtighedsnote
Smart contracts har endnu ikke gennemgået en formel tredjepartsrevision. Koden er open source til fællesskabsgennemgang, og en professionel revision er planlagt til Q2 2026 før mainnet-udrulning af mining-programmer. Indtil da håndteres al belønningsdistribution off-chain med on-chain-afregningsverificering.
:::

---

**[◀ Tilbage til køreplanen](/docs/roadmap)** ｜ **[Se kildekode](https://github.com/Cootakahashi/matsuri-contracts)**
