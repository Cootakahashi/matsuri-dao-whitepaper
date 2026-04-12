---
sidebar_position: 5
id: how-to-earn
title: 💎 Sådan tjener og bruger du MTC
description: "Den komplette guide til at tjene MTC gennem 6 kanaler — og hvor du kan bruge den. Fra at læse artikler til at besøge helligdomme, har enhver handling værdi."
---

# 💎 Sådan tjener og bruger du MTC

> **Tjen ved handling. Brug på oplevelser. Hold for vækst.**
> MTC er ikke bare et spekulativt token — det flyder gennem en reel økonomi, hvor enhver handling skaber og fanger værdi.

:::tip Det store billede
MTC har en **komplet cirkulær økonomi**: du tjener den gennem reelle aktiviteter, bruger den på reelle oplevelser, og dens værdi vokser i takt med, at økosystemet udvides. Denne side viser dig præcis hvordan.
:::

---

## MTC-livscyklussen

```mermaid
graph LR
    subgraph "TJEN"
        E1["📖 Læs og lyt\n(J-Times)"]
        E2["⛩️ Besøg helligdomme\n(Matsuri-appen)"]
        E3["🤝 Henvis venner\n(Social Mining)"]
        E4["🎪 Vær vært for events\n(Guide/Skaber)"]
        E5["🏦 Tilvejebring likviditet\n(Raydium)"]
        E6["🎲 Træk Omikuji\n(Lykkebonus)"]
    end
    subgraph "BRUG"
        U1["🎫 Book oplevelser"]
        U2["🏷️ 5-10% rabat"]
        U3["🔑 Eksklusiv adgang"]
        U4["📈 Toku-staking"]
    end
    E1 & E2 & E3 & E4 & E5 & E6 --> MTC["💎 MTC"]
    MTC --> U1 & U2 & U3 & U4
```

---

## Sådan tjener du MTC

### 1. 📖 Medie-mining — Læs, lyt og se på J-Times

Åbn **J-Times-appen** og forbruge indhold om japansk kultur. Enhver fuldført handling tjener MTC automatisk.

| Handling | Fuldførelseskriterium | Belønning |
| :--- | :--- | :---: |
| **Læs en artikel** | Scroll til 75% dybde | MTC |
| **Lyt til en podcast** | Sporet afspilles til slut | MTC |
| **Se en video** | Forlad detaljeskærmen efter visning | MTC |
| **Del indhold** | Delingsdialog præsenteret | MTC |
| **Fuldfør en quiz** | Bestå forståelsestest | MTC (øjeblikkeligt) |

:::info Offline-understøttelse
Intet internet ved en landlig helligdom? Intet problem. J-Times registrerer din aktivitet lokalt og **synkroniserer automatisk, når du er online igen** (offlinekø med 7 dages retention). Du mister aldrig optjent MTC.
:::

**Hvordan det fungerer under motorhjelmen:**
1. `EngagementTracker` i appen registrerer fuldførelsesevents
2. Handlinger sættes i kø lokalt (selv offline)
3. Ved netværksgenoprettelse samles handlinger i batch og sendes til Django API
4. API'en validerer og krediterer MTC til din saldo
5. Efter august 2026: handlinger vil blive indsendt on-chain via Cranker-orakel

---

### 2. ⛩️ Eventyr-mining — Besøg hellige steder med Matsuri-appen

Åbn **Matsuri-appen**, find en helligdom eller et tempel på det hellige stedkort, tag derhen og check ind. Din aktivitet registreres som en **bidragsscore**.

**Sådan fungerer det:**

```mermaid
sequenceDiagram
    participant U as Dig (Matsuri-appen)
    participant GPS as GPS-check-in
    participant API as Matsuri Backend
    participant SC as Solana (efter aug. 2026)

    U->>GPS: Ankommer til helligdom, tryk "Check ind"
    GPS->>API: Send koordinater + proof-hash
    API->>API: Valider placering + registrer bidragsscore
    API-->>U: Vis resultat: "⛩️ Check-in fuldført!" + Omikuji-trækning
    U->>API: Træk Omikuji
    API-->>U: "🏆 大吉! Bonusscore!"
    API->>SC: Indsend til Solana (asynkron, efter aug.)
```

**Kerneprincip — mindre besøgte steder tjener mere:**

| Stedtype | Eksempler | Score |
| :--- | :--- | :---: |
| 🏙️ **Større** | Sensoji, Kiyomizu-dera, Fushimi Inari | Standard |
| 🌆 **Regional** | Præfekturets ichinomiya, regionale storhelligdomme | Højere |
| 🏞️ **Landlig** | Historiske landhelligdomme | Meget højere |
| ⛰️ **Grænseområde** | Bjergtempeler, fjerne ø-helligdomme | Højest |

**Yderligere scoringsfaktorer:**
- **Besøgshyppighed** — regelmæssige besøgende tjener mere over tid
- **Omikuji** — tilfældig lykketrækning tilføjer bonusscore (大吉 er den bedste!)
- **Sponsorerede steder** — kommuner kan booste specifikke steder

:::info Bidragsscore → MTC
Din aktivitet akkumuleres som en **bidragsscore**. Ved hver halveringsepoke (starter juni 2027) konverteres scorer til MTC fra mining-puljen på 550 mio. Jo mere du bidrager i forhold til fællesskabet, jo mere MTC modtager du. Præcise boost-koefficienter vil blive endeligt fastlagt progressivt og implementeret i smart contracts — for at sikre retfærdig distribution tilpasset den faktiske puljestørrelse.
:::

---

### 3. 🤝 Social mining — Henvis venner og byg dit netværk

Del din henvisningskode. Når dit netværk handler, tjener du automatisk.

| Lag | Relation | Provision |
| :---: | :--- | :---: |
| **L1** | Dig → Ven (direkte) | **20%** |
| **L2** | Ven → Deres ven | **5%** |
| **L3** | 3. grad | **5%** |
| **L4** | 4. grad | **5%** |

**Hvordan En-Mining-scoren fungerer:**

Din bidragsscore beregnes baseret på to faktorer:
- **Netværksrækkevidde** (30%) — hvor mange mennesker du bringer
- **Økonomisk aktivitet** (70%) — reelle køb fra dit henvisningsnetværk

> **Vigtig indsigt:** Størstedelen af din score kommer fra **reel økonomisk aktivitet** i dit netværk, ikke bare tilmeldinger. At invitere 1.000 mennesker, der aldrig bruger penge, tjener mindre end at invitere 10 aktive forbrugere.

Scorer akkumuleres over tid og konverteres til MTC ved hver halveringsepoke. Boost-multiplikatorer (f.eks. staking af MTC, sæsonranglister) vil blive introduceret progressivt via smart contracts.

:::warning I øjeblikket off-chain → Flytter on-chain august 2026
Henvisningsprovisioner spores i øjeblikket i Django (PostgreSQL) og betales via bankoverførsel eller krypto. Fra **august 2026** migrerer hele henvisningsprovisionssystemet til **Matsuri Referral smart contract** på Solana — hvilket gør udbetalinger tillidsløse, øjeblikkelige og reviderbare on-chain.
:::

---

### 4. 🎪 Skaber- og guide-mining — Vær vært for events, skab indhold

Hvis du er GCF-medlem, guide eller indholdsskaber:

| Aktivitet | Hvordan du tjener |
| :--- | :--- |
| **Vær vært for en tur** | Guideprovision (sat pr. event) + drikkepenge |
| **Sælg eventbilletter** | Omsætningsandel via EventPurchase |
| **Offentliggør et kursus** | Tilmeldingsgebyr pr. kursus |
| **Opret podcastepisoder** | Abonnementsindtægt |
| **Start en crowdfundingkampagne** | Solana-baserede bidrag |

**Drikkepengessystem:** Efter hvert event kan gæster give guides drikkepenge (Uber-stil). Drikkepenge behandles via Stripe og spores på et offentligt leaderboard.

---

### 5. 🏦 Likviditets-mining — Tilvejebring likviditet på Raydium

Tilvejebring MTC/SOL-likviditet på Raydium DEX og tjen belønninger.

| Post | Detaljer |
| :--- | :--- |
| **Mål-APY** | 20% (tidlig likviditetsincitament) |
| **DEX** | Raydium (Solana) |
| **Hvem** | Alle der holder MTC og SOL |

---

### 6. 🎲 Omikuji-bonus — Lykketrækning

Hvert Eventyr-mining-check-in inkluderer en gratis Omikuji (lykke)-trækning — en bonus oven på din almindelige score.

| Lykke | Sjældenhed | Bonus |
| :--- | :---: | :--- |
| 🏆 **大吉** (Stor lykke) | Sjælden | Højeste bonusscore + NFT |
| ✨ **吉** (Lykke) | Ualmindelig | God bonusscore |
| 🌸 **小吉** (Lille lykke) | Almindelig | Lille bonus |
| 🍃 **末吉** (Fremtidig lykke) | Almindelig | Deltagelse registreret |
| 💀 **凶** (Ulykke) | Ualmindelig | Deltagelse registreret |

Resultatet bestemmes af en **manipulationssikker commit-reveal-protokol** på Solana. Ikke engang serveren kan ændre dit resultat efter commit-fasen. Præcise sandsynligheder og bonusbeløb vil blive endeligt fastlagt i smart contract-implementeringen.

---

## Hvor du bruger MTC

| Anvendelse | Fordel | Tilgængelig |
| :--- | :--- | :---: |
| **🎫 Book oplevelser** | Betal for ture, events og kulturaktiviteter med MTC | ✅ Nu |
| **🏷️ Rabat** | 5–10% rabat i forhold til yen-priser ved betaling med MTC | ✅ Nu |
| **🔑 Eksklusiv adgang** | NFT-låste events, VIP-ceremonier, private ture | ✅ Nu |
| **📈 Toku-staking** | Lås MTC for at booste din bidragsscore (op til ~50% boost) | 🔜 Aug. 2026 |
| **🗳️ DAO-styring** | Stem om kasse, protokolopgraderinger og stedcertificering | 🔜 2027 |
| **🛍️ Partnerbutikker** | Betal i deltagende butikker og restauranter | 🔜 Udvides |

:::info MTC som betaling
I Matsuri-appen er MTC en førsteklasses betalingsmetode på linje med kreditkort og Solana Pay. Ingen konvertering nødvendig — vælg "Betal med MTC" ved kassen, og saldoen trækkes øjeblikkeligt.
:::

### Eksempel: En dag i MTC-økonomien

> **Morgen:** Læs 3 J-Times-artikler i toget → tjen MTC.
> **Eftermiddag:** Besøg en landlig helligdom med Matsuri-appen → check ind, træk 吉 (Lykke) (×1,5) → tjen mere MTC.
> **Aften:** Brug optjent MTC til at booke en ¥9.000 Golden Gai-kulturtur med 10% rabat (betal ¥8.100 tilsvarende).
> **Resultat:** Din kulturelle nysgerrighed finansierede en reel oplevelse — og guiden, helligdommen og lokalsamfundet modtog alle direkte betaling. Ingen OTA tog en 20%-andel.

### Økonomisk bæredygtighed

:::warning Hvad sker der, når mining-puljen løber tør?
550 mio. MTC halveringspuljen er designet til at vare **årtier** (20 epoker × 2 år = 40 år teoretisk). Men selv efter puljen er opbrugt:

- **Transaktionsgebyrer** fra on-chain-aktivitet fortsætter med at belønne netværksdeltagere
- **Tilbagekøbsprotokollen** (20-25% af forretningsindtægten) skaber permanent købspres
- **Toku-staking** låser cirkulerende udbud og reducerer salgspres
- **Reel forretningsindtægt** (events, medlemskaber, kurser) opretholder økosystemet uafhængigt af tokendistribution

MTC er bakket af en **reel økonomi** — ikke bare tokenemissioner.
:::

---

## On-chain-migreringskøreplan

Matsuri-økonomien bevæger sig progressivt fra off-chain (Django/PostgreSQL) til on-chain (Solana smart contracts). Denne overgang gør alle operationer **tillidsløse, reviderbare og tilladelsesløse**.

```mermaid
graph LR
    subgraph "NU (Off-chain)"
        O1["💳 Eventbetalinger\n(Stripe/PayPal)"]
        O2["🤝 Henvisningsprovisioner\n(Django DB)"]
        O3["📊 Engagementssporing\n(PostgreSQL)"]
        O4["💰 Udbetalinger\n(Bank/krypto manuelt)"]
    end
    subgraph "AUGUST 2026 (Hybrid)"
        H1["⚡ Henvisning → On-chain\n(matsuri-referral-kontrakt)"]
        H2["⛩️ Eventyr-mining → On-chain\n(matsuri-worship-kontrakt)"]
        H3["🎲 Omikuji → On-chain\n(matsuri-omikuji-kontrakt)"]
        H4["📖 Medie-mining → Orakel\n(Cranker-indsendelse)"]
    end
    subgraph "JUNI 2027 (Fuldt on-chain)"
        F1["📊 Halveringsdistribution live\n(550 mio. MTC mining-pulje)"]
        F2["🗳️ DAO-styring"]
        F3["🔄 Alle belønninger on-chain"]
    end
    subgraph "2027+ (Samskabelses-økonomi)"
        G1["🏪 On-chain markedsplads\n(Lokale butikker + GCF-butikker)"]
        G2["🎫 Crowdfunding + NFT-rettigheder\n(Støtterstyring)"]
        G3["⚡ Automatisk omsætningsopdeling\n(Skaber + Fællesskab + Tilbagekøb)"]
    end
    O1 & O2 & O3 & O4 -->|"Migrering"| H1 & H2 & H3 & H4
    H1 & H2 & H3 & H4 -->|"Grand Unlock"| F1 & F2 & F3
    F1 & F2 & F3 -->|"Samskabelse"| G1 & G2 & G3
```

| Fase | Tidslinje | Hvad der flyttes on-chain |
| :--- | :--- | :--- |
| **Fase 1 (Nu)** | Live | MTC-token (SPL), Raydium LP, Solana Pay-verificering |
| **Fase 2 (Aug. 2026)** | Smart contract mainnet-udrulning | Henvisningsprovisioner, eventyr-mining-belønninger, Omikuji-trækninger, medie-mining via orakel |
| **Fase 3 (Jun. 2027)** | Grand Unlock | 550 mio. MTC halveringsdistribution, DAO-styring, fuld decentralisering |
| **Fase 4 (2027+)** | Samskabelses-økonomi | On-chain markedsplads (lokale butikker + GCF-butikker), crowdfunding med NFT-rettigheder, automatisk omsætningsopdeling til skabere + fællesskab + tilbagekøb |

:::warning Hvorfor ikke alt on-chain i dag?
At flytte alt on-chain før en **professionel sikkerhedsrevision** (planlagt Q2 2026) ville være uansvarligt. Den nuværende hybridtilgang lader os iterere sikkert, mens vi forbereder tillidsløse on-chain-operationer. Off-chain-belønninger er stadig verificerbare — enhver transaktion har en `solana_signature` som afregningsbevis.
:::

---

**[▶ Næste: Mobilapps](/docs/mobile-apps)** ｜ **[◀ Forrige: Økosystem og mining](/docs/ecosystem)**
