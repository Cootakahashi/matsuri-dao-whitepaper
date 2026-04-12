---
sidebar_position: 8
id: smart-contracts
title: ⚡ Pametni ugovori
description: "Četiri Anchor/Rust programa otvorenog koda na Solani — En-Mining, Worship usmjeravanje, distribucija prepolovljavanja i Omikuji — s PDA-only trezorima i 128-bitnom aritmetikom."
---

# ⚡ Pametni ugovori — Arhitektura otvorenog koda

> **Bez povjerenja po dizajnu.**
> Sva logika nagrada, stabla preporuka i rasporedi prepolovljavanja provode se **na lancu** putem provjerljivih Rust programa.
> Izvorni kod: [GitHub](https://github.com/Cootakahashi/matsuri-contracts)

| Specifikacija | Detalji |
| :--- | :--- |
| **Okvir** | Anchor 0.32.1 (Rust) |
| **Lanac** | Solana Mainnet-beta |
| **Programi** | 4 (Distribution, Referral, Worship, Omikuji) |
| **Izgradnja** | Optimizirano izdanje s LTO, provjere prekoračenja omogućene |
| **Matematika** | Čisti `math.rs` moduli — nula nuspojava, 128-bitni međurezultati |

---

## Pregled

Matsuri implementira **tri Anchor (Rust) programa** na Solani, od kojih svaki upravlja posebnim stupom ekosustava:

```mermaid
graph TB
    subgraph "Programi na lancu (Solana)"
        P1["📣 matsuri-referral\nEn-Mining protokol"]
        P2["⛩️ matsuri-worship\nMotor za usmjeravanje hodočašća"]
        P3["📊 matsuri-distribution\nDistribucija prepolovljavanja"]
    end
    subgraph "Izvan lanca (Django + Next.js)"
        BE["🖥️ Pozadinski orakul\nIdentitet + GPS verifikacija\nCranker TX slanje"]
        FE["📱 Sučelje\nNovčanik + Nadzorna ploča\nKarta svetih mjesta"]
    end
    FE -->|"Potpis novčanika"| P1 & P2 & P3
    BE -->|"Cranker TX-ovi"| P1 & P2 & P3
    P1 & P2 & P3 -->|"CPI"| MTC["💎 MTC (SPL Token)"]
```

---

## 1. 📣 En-Mining (縁マイニング) protokol

**Namjena:** Hibridni motor rasta koji nagrađuje i *širinu* (doseg preporuka) i *dubinu* (ekonomski utjecaj). Ne samo affiliate sustav — potpuni protokol rudarenja gdje stvarna ekonomska aktivnost generira vrijednost na lancu.

### Formula bodovanja

```
S_final = S_raw × M_toku × B_title

gdje je:
  S_raw   = 0.30 × referrals + 0.70 × (volume / 10^9)
  M_toku  = f(staked_mtc) ∈ [1.0×, 10.0×]
  B_title = 1.0 + min(seasons_ranked × 0.05, 0.50)
```

| Komponenta | Težina | Namjena |
| :--- | :---: | :--- |
| **Širina** (broj preporuka) | 30% | Doseg mreže — koliko ljudi dovodite |
| **Dubina** (volumen poravnanja) | 70% | Ekonomski utjecaj — stvarne kupnje, ne samo registracije |
| **Toku množitelj** | ×1–10 | Zaključajte MTC za pojačanje snage rudarenja |
| **Pojačanje titule** | +5%/sezona | Trajna nagrada za dosljedne najbolje izvođače |

### Toku (徳) razine stakinga

| Zaključani MTC | Množitelj | Razina |
| :--- | :---: | :--- |
| 0 | 1,0× | — |
| 1.000+ | 1,5× | Bronze |
| 10.000+ | 3,0× | Silver |
| 100.000+ | 5,0× | Gold |
| 1.000.000+ | 10,0× | Diamond |

### En no Banzuke (sezonski rang)

Svake sezone (epohe), najbolji izvođači se rangiraju. Pogodnosti:
- Top 10% zarađuje titulu **Evangelist** (trajna SBT oznaka)
- Svaka rangirana sezona daje **+5% pojačanje rudarenja** (kumulativno, ograničenje: 50%)

### Obrana od Sybil napada (3 sloja)

| Sloj | Mehanizam | Gdje |
| :--- | :--- | :--- |
| **Identitetska provjera** | X/Twitter OAuth + SMS | Izvan lanca (Django) |
| **Provjera na lancu** | Samo profili s `is_verified = true` zarađuju | Pametni ugovor |
| **Težinsko bodovanje dubine** | 70% bodova = stvarna plaćanja → botovi ne zarađuju ništa | Motor bodovanja |

---

## 2. ⛩️ Motor za usmjeravanje hodočašća (巡礼分散エンジン)

**Namjena:** Svjetski prvi **ReFi protokol koji rješava pretjerani turizam koristeći ekonomiku tokena.** Posjetite sveta mjesta → zaradite MTC. No evo trika: *manje posjećena mjesta plaćaju eksponencijalno više.*

:::tip Ključni uvid
Ovo je "obrnuto dinamičko određivanje cijena u stilu Ubera" — pretrpana mjesta se kažnjavaju, granična mjesta se pojačavaju. Turisti se sami usmjeravaju prema manje posjećenim lokacijama jer **je to profitabilnije.**
:::

### Formula nagrade s 6 slojeva

```
R_final = R_pioneer × M_dynamic × M_regional × M_streak × M_omikuji

gdje je:
  R_pioneer  = daily_pool / visit_order     (harmonički 1/n pad)
  M_dynamic  = admin-kontrolirano ∈ [0.1×, 50×]
  M_regional = tier_table[tier] ∈ {1×, 2×, 5×, 10×}
  M_streak   = 1.0 + min(days × 0.02, 0.50)
  M_omikuji  = fortune_lottery ∈ {1.0, 1.2, 1.5, 3.0}
```

### Sloj 1: Pionirski bonus (先行者利益)

Harmonički pad — matematika koja usmjerava turiste:

| Redoslijed posjeta | Nagrada naspram 1. | Stvarni primjer (fond 1000 MTC) |
| :---: | :---: | :--- |
| 1. | 100% | 1.000 MTC |
| 5. | 20% | 200 MTC |
| 10. | 10% | 100 MTC |
| 100. | 1% | 10 MTC |

> **Prvi posjetitelj = 100× veća nagrada od 100. posjetitelja.** Ovo stvara snažan poticaj za posjete izvan vršnih sati.

### Sloj 2: Dinamički množitelj (raspršivanje gužve)

Kontrolira se u stvarnom vremenu od strane administratora putem GCF Admin panela:

| Scenarij | Množitelj | Učinak |
| :--- | :---: | :--- |
| **Pretjerani turizam** (Asakusa u vrhu sezone) | 0,1× | 90% kazna na nagradu |
| **Normalno** | 1,0× | Standardno |
| **Nedovoljno posjećeno** | 10× | 10× pojačanje nagrade |
| **Granična kampanja** | 50× | Maksimalni poticaj |

### Sloj 3: Regionalna razina

| Razina | Oznaka | Množitelj | Primjeri |
| :---: | :--- | :---: | :--- |
| 0 | 🏙️ Glavna | 1× | 浅草寺, 清水寺, 伏見稲荷 |
| 1 | 🌆 Srednja | 2× | Lokalna ichinomiya, velika svetišta u prefekturskim središtima |
| 2 | 🏞️ Ruralna | 5× | Povijesna seoska svetišta |
| 3 | ⛰️ Skrivena | 10× | Svetilišta duboko u planinama, svetišta na udaljenim otocima |

### Sloj 4: Bonus uzastopnosti

+2% po uzastopnom danu, ograničeno na +50%. Nagrađuje redovite posjetitelje.

### Sloj 5: 🎲 Omikuji protokol

| Rezultat | Vjerojatnost | Množitelj |
| :--- | :---: | :---: |
| 🏆 **大吉** (Velika sreća) | 5% | 3,0× |
| ✨ **吉** (Sreća) | 15% | 1,5× |
| 🌸 **小吉** (Mala sreća) | 30% | 1,2× |
| 🍃 **末吉** (Buduća sreća) | 35% | 1,0× |
| 💀 **凶** (Nesreća) | 15% | 1,0× |

### Sloj 6: Sponzorirani signali (B2B/B2G)

Općine, željezničke tvrtke i turistički uredi mogu **položiti MTC** za stvaranje vremenski ograničenih zona visoke nagrade na određenim mjestima.

```mermaid
graph LR
    MUN["🏛️ Općina\nPolaže 100K MTC"] --> BEACON["📡 Signal\n+500 MTC/posjet\n30 dana"]
    BEACON --> SITE["⛩️ Ruralno svetište\n×50 množitelj"]
    SITE --> TOURIST["👤 Turist\nPosjećuje svetište"]
    TOURIST --> REWARD["💎 Visoka MTC nagrada\n→ Ostaje duže\n→ Troši lokalno"]
```

> **B2B model prihoda:** Sponzori plaćaju MTC za usmjeravanje turista. Pritisak kupnje MTC-a → vrijednost tokena. Svi pobjeđuju.

---

## 3. 📊 Distribucija prepolovljavanja

**Namjena:** Fond od 550M MTC za rudarenje distribuira se kroz desetljeća putem **dvogodišnjeg ciklusa prepolovljavanja** — brže od Bitcoinovog četverogodišnjeg ciklusa.

### Raspored prepolovljavanja

```
Ukupni fond: 550.000.000 MTC

Epoha 0 (2027.–2029.):  275.000.000 MTC  (50%)
Epoha 1 (2029.–2031.):  137.500.000 MTC  (25%)
Epoha 2 (2031.–2033.):   68.750.000 MTC  (12,5%)
Epoha 3 (2033.–2035.):   34.375.000 MTC  (6,25%)
        ...              ...
∑ → 550.000.000 MTC (asimptotski ukupno)
```

### Formula individualne nagrade

```
vaša_nagrada = proračun_epohe × (vaš_rezultat / ukupni_rezultat)
```

Sva aritmetika koristi **128-bitnu međuračunicu** — matematički je nemoguće da dođe do prekoračenja.

### Izvori bodova učinka

| Aktivnost | Težina bodova |
| :--- | :--- |
| **Provedene sesije vodstva** | Visoka |
| **Prodaja ulaznica za događaje** | Visoka |
| **Aktivnost mreže preporuka** | Srednja |
| **Posjeti rudarenja hodočašćem** | Srednja |
| **Medijski angažman** | Niska |

:::info Napredovanje epohe bez dozvole
Instrukciju `advance_epoch` može pozvati **bilo tko** — administrator nije potreban. Sistemski sat određuje kada se epohe mijenjaju, osiguravajući rad bez potrebe za povjerenjem čak i ako tim nestane.
:::

---

## Matematički moduli (jezgra otvorenog koda)

Oba programa odvajaju svu matematiku bodovanja/nagrada u **čiste, provjerljive `math.rs` module** sa:

- **Nula nuspojava** — bez I/O, bez alokacija, bez vanjskih poziva
- **Dokumentirane formule** — LaTeX notacija u rustdoc-u
- **Analiza prekoračenja** — u128 međuvrijednosti s dokazanim granicama
- **Sveobuhvatni testovi** — rubni slučajevi, granični uvjeti, verifikacija omjera

```rust
// Primjer: Pionirski bonus (iz worship/math.rs)
#[inline]
pub fn pioneer_reward(daily_pool: u64, visit_order: u32) -> u64 {
    if visit_order == 0 { return 0; }
    (daily_pool as u128 / visit_order as u128) as u64
}
```

---

## 4. 🎴 AR rudarenje — WebAR Omikuji rudarenje

**Namjena:** AR iskustvo temeljeno na pregledniku koje generira virtualnu Omikuji kutiju u stvarnom prostoru — rudarite MTC bez preuzimanja aplikacije. Svjetski prva WebAR × blockchain infrastruktura koja spaja šintoističku duhovnost s najsuvremenijom tehnologijom.

:::info Kako se ovo povezuje s mobilnim aplikacijama
Matsuri iOS aplikacija koristi Kartu svetih mjesta za GPS prijavu. Nakon prijave, **WebAR Omikuji** se otvara u pregledničkom sloju (Three.js) — nije potrebna posebna aplikacija. Rezultat se vraća u sustav nagrada Matsuri aplikacije. I nativno i web iskustvo rade zajedno besprijekorno.
:::

### Arhitektura

```mermaid
sequenceDiagram
    participant U as Korisnik (Telefon)
    participant AR as WebAR (Three.js)
    participant VP as VisionProof
    participant API as Django API
    participant SC as Solana

    U->>AR: Pokretanje kamere + GPS dopuštenje
    AR->>API: Početak sesije (GPS)
    API-->>AR: session_token + site_info
    AR->>AR: Prikaz 3D Omikuji kutije
    U->>AR: Dodir
    AR->>VP: Početak prikupljanja pokreta + svjetla
    AR->>API: draw_omikuji (session_token)
    Note over AR: Reprodukcija animacije 2,5 sekundi
    API->>API: validate (5 slojeva) → draw() → NFT procjena
    API-->>AR: result + reward + nft
    AR->>U: 🏆大吉 (Velika sreća) +50 MTC
    API->>SC: Cranker TX (asinkrono)
```

### Optimistično korisničko sučelje (nula čekanja)

| Korak | Vrijeme | Obrada |
|---------|------|------|
| Dodir → Početak animacije | 0 ms | Trenutna reprodukcija animacije na frontendu |
| API draw_omikuji | ~50 ms | Izvlačenje u Djangu + NFT procjena |
| Završetak animacije | 2500 ms | Rezultat već utvrđen → prikaz |
| Solana TX | ~400 ms | Slanje u pozadini |

### Postavke vjerojatnosti Omikuji (GCF Admin)

Precizna kontrola s korakom od 0,01% koristeći Basis Points (10000 = 100%).

| Razina | Zadano | Množitelj nagrade | NFT |
|------|-----------|---------|-----|
| 🏆 大吉 (Velika sreća) | 5,00% (500bp) | ×3,0 | ✅ |
| ✨ 吉 (Sreća) | 15,00% (1500bp) | ×1,5 | Opcionalno |
| 🌸 小吉 (Mala sreća) | 30,00% (3000bp) | ×1,2 | — |
| 🍃 末吉 (Buduća sreća) | 35,00% (3500bp) | ×1,0 | — |
| 💀 凶 (Nesreća) | 15,00% (1500bp) | ×1,0 | — |

### ZK-Proof of Vision (5-slojna verifikacija)

Višeslojna eliminacija lažiranja GPS-a i replay napada. Slikovni podaci se ne šalju radi zaštite privatnosti.

| Sloj | Sadržaj verifikacije | Bodovi |
|-------|---------|------|
| Vremenski | Trajanje sesije 5-120 sekundi | /20 |
| Pokret | Varijanca žiroskopa 0,005-0,5 (prirodnost držanja rukom) | /20 |
| Svjetlo | Koherentnost ambijentnog svjetla × doba dana | /20 |
| HMAC | Verifikacija potpisa proof_hash | /20 |
| Otisak | Jedinstvenost uređaja | /20 |
| **Ukupno** | **Prag za prolaz** | **60/100** |

### Formula izračuna nagrade

```
Reward = Base(10 MTC) × SiteMultiplier × OmikujiMult × TierMult

TierMult = { Glavna: 1.0, Srednja: 2.0, Ruralna: 5.0, Skrivena: 10.0 }
```

---

## NFT / SBT kolekcija

Matsuri Protocol izdaje neprenosive **Soulbound tokene (SBT-ove)** i ograničene izdanja **NFT-ova** putem Metaplex Core na Solani.

<div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', margin: '2rem 0'}}>
  <img src="/img/nft/founder-nft-001.jpg" alt="Founder's Edition NFT #001" style={{width: '100%', maxWidth: '220px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'}} />
  <img src="/img/nft/founder-nft-002.jpg" alt="Founder's Edition NFT #002" style={{width: '100%', maxWidth: '220px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'}} />
</div>

| Vrsta | Prenosivo | Namjena |
| :--- | :---: | :--- |
| **Founder NFT** | Ne (SBT) | Dokaz člana osnivača — trajno pojačanje rudarenja |
| **Evangelist NFT** | Ne (SBT) | Postignuće sezonskog rangiranja — +5% rudarenja po sezoni |
| **Goshuin NFT** | Ne (SBT) | Dokaz prijave hodočašća — ekskluzivno za lokaciju |
| **Omikuji NFT** | Ne (SBT) | Dokaz sudbine 大吉 (Velika sreća) — rijedak kolekcionarski primjerak |

---

## Verifikacija plaćanja (Na lancu ↔ Izvan lanca)

Platforma verificira Solana transakcije na lancu prije odobravanja kupnji — ne na temelju povjerenja, već **kriptografski verificirano.**

```mermaid
sequenceDiagram
    participant U as Korisnik (App/Web)
    participant PH as Phantom Wallet
    participant SOL as Solana Mainnet
    participant API as Django pozadinski sustav
    participant DB as PostgreSQL

    U->>PH: Potpis transakcije
    PH->>SOL: Slanje TX
    SOL-->>PH: TX potpis
    PH-->>U: Povrat potpisa
    U->>API: POST /payments/solana/verify/
    API->>SOL: getTransaction(signature)
    SOL-->>API: TX detalji (iznos, primatelj, status)
    API->>API: Verifikacija: ispravan primatelj, iznos, unutar 15 min TTL
    API->>DB: Kreiranje EventPurchase + TokenTransaction
    API-->>U: Kupnja potvrđena ✅
```

| Provjera verifikacije | Detalji |
| :--- | :--- |
| **Primatelj** | Mora odgovarati `SOLANA_ADMIN_WALLET` |
| **Iznos** | Mora odgovarati očekivanoj cijeni (SOL ili MTC) |
| **TTL** | Transakcija mora biti unutar 15 minuta |
| **Jedinstvenost** | `solana_signature` ima jedinstveni indeks — nema dvostruke potrošnje |
| **Status** | Potrebna potvrda na lancu |

---

## Sigurnosni model (Otvoreni kod)

Ovi ugovori su **potpuno otvorenog koda.** Sigurnost se oslanja na matematičke garancije, ne na skrivanje.

| Načelo | Implementacija |
| :--- | :--- |
| **PDA-Only trezori** | Trezori tokena kontrolirani su programski izvedenim adresama (PDA) — nijedan ljudski ključ ih ne može isprazniti |
| **Provjerena aritmetika** | Svaki izračun koristi `checked_*` operacije — prekoračenje je nemoguće |
| **Odvojenost ovlasti** | Admin (multisig) ≠ Cranker (ograničene operacije) ≠ Korisnik (vlastito skrbništvo) |
| **Hitna pauza** | Admin može trenutno pauzirati sve programe; ne može ukrasti sredstva |
| **Nepromjenjiva tokenomika** | Faktor prepolovljavanja, ukupni fond i trajanje epohe postavljeni su jednom i ne mogu se mijenjati |
| **Čisti matematički moduli** | Logika bodovanja/nagrada odvojena u provjerljive, testabilne matematičke biblioteke |
| **Vision Proof** | 5-slojna zaštita protiv lažiranja bez prijenosa podataka s kamere (očuvanje privatnosti) |

### Sigurnost izvan lanca (Django pozadinski sustav)

| Sloj | Implementacija |
| :--- | :--- |
| **Autentikacija** | JWT temeljen na kolačićima (HttpOnly + Secure + SameSite=Lax), 1h pristup / 30d osvježavanje |
| **Šifriranje** | Bankovni podaci šifrirani Fernet šifrom, neuspješno dešifriranje vraća prazan rječnik |
| **Ograničenje stope** | Anonimni: 30/min, Autenticirani: 100/min, Prijava: 10/min, Registracija: 5/sat |
| **Sigurnost plaćanja** | PCI usklađenost (bez pohrane podataka s kartice), verifikacija potpisa Stripe/PayPal webhookova |
| **Privatnost podataka** | GDPR izvoz podataka, automatsko brisanje neverificiranih računa nakon 7 dana |
| **CORS** | Eksplicitna lista dopuštenih izvora (bez wildcardova u produkciji) |

---

## Status revizije i verifikacije

Transparentnost je nepobitna. Ovo je trenutno stanje verifikacije od strane trećih strana:

| Stavka | Status | Detalji |
| :--- | :---: | :--- |
| **Izvorni kod** | ✅ Otvoreni kod | [GitHub: matsuri-contracts](https://github.com/Cootakahashi/matsuri-contracts) |
| **MTC token** | ✅ Verificiran | SPL Token na Solana Mainnetu — ovlasti izdavanja i zamrzavanja trajno opozvane |
| **Revizija pametnih ugovora** | 🔜 Planirana Q2 2026. | Profesionalna sigurnosna revizija od strane neovisne tvrtke |
| **Sigurnost pozadinskog sustava** | ✅ Produkcija | Ograničenje stope, šifrirano skladištenje, PCI usklađena plaćanja, 841+ testova |
| **Mobilne aplikacije** | ✅ Testirane | 827+ automatiziranih testova u 3 iOS aplikacije |

:::warning Napomena o transparentnosti
Pametni ugovori još nisu prošli formalnu reviziju treće strane. Kod je otvorenog koda za pregled zajednice, a profesionalna revizija zakazana je za Q2 2026. prije implementacije programa za rudarenje na mainnet. Do tada se sva distribucija nagrada obrađuje izvan lanca s verifikacijom poravnanja na lancu.
:::

---

**[◀ Povratak na plan razvoja](/docs/roadmap)** ｜ **[Pogledajte izvorni kod](https://github.com/Cootakahashi/matsuri-contracts)**
