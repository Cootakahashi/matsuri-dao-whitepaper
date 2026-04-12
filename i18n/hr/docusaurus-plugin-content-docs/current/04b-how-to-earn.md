---
sidebar_position: 5
id: how-to-earn
title: 💎 Kako zaraditi i koristiti MTC
description: "Potpuni vodič za zaradu MTC-a putem 6 kanala — i gdje ga potrošiti. Od čitanja članaka do posjeta svetištima, svaka akcija ima vrijednost."
---

# 💎 Kako zaraditi i koristiti MTC

> **Zaradite akcijom. Potrošite na iskustvo. Držite za rast.**
> MTC nije samo špekulativni token — teče kroz stvarnu ekonomiju gdje svaka akcija stvara i hvata vrijednost.

:::tip Šira slika
MTC ima **potpunu cirkularnu ekonomiju**: zarađujete ga stvarnim aktivnostima, trošite na stvarna iskustva, a njegova vrijednost raste kako se ekosustav širi. Ova stranica pokazuje točno kako.
:::

---

## Životni ciklus MTC-a

```mermaid
graph LR
    subgraph "ZARADA"
        E1["📖 Čitaj i slušaj\n(J-Times)"]
        E2["⛩️ Posjeti svetišta\n(Matsuri App)"]
        E3["🤝 Preporuči prijatelje\n(Društveno rudarenje)"]
        E4["🎪 Organiziraj događaje\n(Vodič/Kreator)"]
        E5["🏦 Osiguraj likvidnost\n(Raydium)"]
        E6["🎲 Izvuci Omikuji\n(Bonus sreće)"]
    end
    subgraph "KORIŠTENJE"
        U1["🎫 Rezerviraj iskustva"]
        U2["🏷️ 5-10% popust"]
        U3["🔑 Ekskluzivni pristup"]
        U4["📈 Toku staking"]
    end
    E1 & E2 & E3 & E4 & E5 & E6 --> MTC["💎 MTC"]
    MTC --> U1 & U2 & U3 & U4
```

---

## Kako zaraditi MTC

### 1. 📖 Medijsko rudarenje — Čitajte, slušajte i gledajte na J-Times

Otvorite **J-Times aplikaciju** i konzumirajte sadržaj o japanskoj kulturi. Svaka završena akcija automatski zarađuje MTC.

| Akcija | Kriterij završetka | Nagrada |
| :--- | :--- | :---: |
| **Pročitajte članak** | Pomaknite se do 75% dubine | MTC |
| **Slušajte podcast** | Reprodukcija do kraja | MTC |
| **Pogledajte video** | Napustite ekran detalja nakon gledanja | MTC |
| **Podijelite sadržaj** | Prikaz lista dijeljenja | MTC |
| **Riješite kviz** | Položite test razumijevanja | MTC (trenutno) |

:::info Podrška za izvanmrežni rad
Nema interneta kod ruralnog svetišta? Nema problema. J-Times bilježi vašu aktivnost lokalno i **automatski sinkronizira kad se vratite na mrežu** (izvanmrežni red s 7-dnevnim zadržavanjem). Nikad ne gubite zarađeni MTC.
:::

**Kako to funkcionira ispod haube:**
1. `EngagementTracker` u aplikaciji detektira događaje završetka
2. Akcije se stavljaju u lokalni red (čak i izvanmrežno)
3. Pri ponovnom uspostavljanju mreže, akcije se grupiraju i šalju Django API-ju
4. API validira i kreditira MTC na vaše stanje
5. Nakon kolovoza 2026.: akcije će se slati na lanac putem Cranker orakula

---

### 2. ⛩️ Avanturističko rudarenje — Posjetite sveta mjesta s Matsuri aplikacijom

Otvorite **Matsuri aplikaciju**, pronađite svetište ili hram na Karti svetih mjesta, odite tamo i prijavite se. Vaša aktivnost se bilježi kao **doprinos bodova**.

**Kako funkcionira:**

```mermaid
sequenceDiagram
    participant U as Vi (Matsuri App)
    participant GPS as GPS prijava
    participant API as Matsuri pozadinski sustav
    participant SC as Solana (nakon kol. 2026.)

    U->>GPS: Stignete do svetišta, dodirnite "Prijavi se"
    GPS->>API: Pošalji koordinate + hash dokaza
    API->>API: Validiraj lokaciju + zabilježi doprinos bodova
    API-->>U: Prikaži rezultat: "⛩️ Prijava završena!" + Omikuji izvlačenje
    U->>API: Izvuci Omikuji
    API-->>U: "🏆 大吉! Bonus bodovi!"
    API->>SC: Pošalji na Solanu (asinkrono, nakon kol.)
```

**Osnovno načelo — manje posjećena mjesta zarađuju više:**

| Vrsta mjesta | Primjeri | Bodovi |
| :--- | :--- | :---: |
| 🏙️ **Glavna** | Sensoji, Kiyomizu-dera, Fushimi Inari | Standardni |
| 🌆 **Regionalna** | Prefekturalna ichinomiya, regionalna velika svetišta | Viši |
| 🏞️ **Ruralna** | Povijesna seoska svetišta | Mnogo viši |
| ⛰️ **Granična** | Planinski hramovi, sveta mjesta na udaljenim otocima | Najviši |

**Dodatni čimbenici bodovanja:**
- **Učestalost posjeta** — redoviti posjetitelji zarađuju više s vremenom
- **Omikuji** — nasumično izvlačenje sudbine dodaje bonus bodove (大吉 je najbolji!)
- **Sponzorirana mjesta** — općine mogu pojačati određena mjesta

:::info Doprinos bodova → MTC
Vaša aktivnost se akumulira kao **doprinos bodova**. Na svakoj epohi prepolovljavanja (počevši od lipnja 2027.), bodovi se pretvaraju u MTC iz fonda za rudarenje od 550M. Što više doprinosite u odnosu na zajednicu, to više MTC-a primate. Točni koeficijenti pojačanja bit će postupno finalizirani i implementirani u pametne ugovore — osiguravajući pravednu distribuciju usklađenu sa stvarnom veličinom fonda.
:::

---

### 3. 🤝 Društveno rudarenje — Preporučite prijatelje i izgradite svoju mrežu

Podijelite svoj kod za preporuku. Kad vaša mreža obavlja transakcije, zarađujete automatski.

| Sloj | Odnos | Provizija |
| :---: | :--- | :---: |
| **L1** | Vi → Prijatelj (izravno) | **20%** |
| **L2** | Prijatelj → Njihov prijatelj | **5%** |
| **L3** | 3. stupanj | **5%** |
| **L4** | 4. stupanj | **5%** |

**Kako En-Mining bodovanje funkcionira:**

Vaš doprinos bodova izračunava se na temelju dva čimbenika:
- **Doseg mreže** (30%) — koliko ljudi dovodite
- **Ekonomska aktivnost** (70%) — stvarne kupnje iz vaše mreže preporuka

> **Ključni uvid:** Većina vašeg rezultata dolazi od **stvarne ekonomske aktivnosti** u vašoj mreži, ne samo od registracija. Pozivanje 1.000 ljudi koji nikad ne potroše zarađuje manje od pozivanja 10 aktivnih potrošača.

Bodovi se akumuliraju s vremenom i pretvaraju u MTC na svakoj epohi prepolovljavanja. Množitelji pojačanja (npr. staking MTC-a, sezonska rangiranja) bit će postupno uvedeni putem pametnih ugovora.

:::warning Trenutno izvanlanačno → Prelazak na lanac kolovoz 2026.
Provizije za preporuke trenutno se prate u Djangu (PostgreSQL) i isplaćuju putem bankovne doznake ili kripta. Od **kolovoza 2026.**, cijeli sustav provizija za preporuke migrirat će na **Matsuri Referral pametni ugovor** na Solani — čineći isplate pouzdanima bez povjerenja, trenutnima i provjerljivima na lancu.
:::

---

### 4. 🎪 Rudarenje kreatora i vodiča — Organizirajte događaje, stvarajte sadržaj

Ako ste GCF član, vodič ili kreator sadržaja:

| Aktivnost | Kako zarađujete |
| :--- | :--- |
| **Vodite turu** | Provizija vodiča (postavljena po događaju) + napojnice |
| **Prodajte ulaznice za događaje** | Udio prihoda putem EventPurchase |
| **Objavite tečaj** | Naknada po upisu |
| **Stvarajte podcast epizode** | Prihod od pretplate |
| **Pokrenite kampanju grupnog financiranja** | Doprinosi temeljeni na Solani |

**Sustav napojnica:** Nakon svakog događaja, gosti mogu dati napojnicu vodičima (u stilu Ubera). Napojnice se obrađuju putem Stripea i prate se na javnoj rang-listi.

---

### 5. 🏦 Rudarenje likvidnošću — Osigurajte likvidnost na Raydium

Osigurajte MTC/SOL likvidnost na Raydium DEX-u i zarađujte nagrade.

| Stavka | Detalji |
| :--- | :--- |
| **Ciljani APY** | 20% (poticaj za ranu likvidnost) |
| **DEX** | Raydium (Solana) |
| **Tko** | Svatko tko drži MTC i SOL |

---

### 6. 🎲 Omikuji bonus — Izvlačenje sudbine

Svaka prijava avanturističkog rudarenja uključuje besplatno Omikuji (sudbina) izvlačenje — bonus povrh vašeg redovnog rezultata.

| Sudbina | Rijetkost | Bonus |
| :--- | :---: | :--- |
| 🏆 **大吉** (Velika sreća) | Rijetko | Najviši bonus bodovi + NFT |
| ✨ **吉** (Sreća) | Neobično | Dobar bonus bodovi |
| 🌸 **小吉** (Mala sreća) | Uobičajeno | Mali bonus |
| 🍃 **末吉** (Buduća sreća) | Uobičajeno | Sudjelovanje zabilježeno |
| 💀 **凶** (Nesreća) | Neobično | Sudjelovanje zabilježeno |

Rezultat se određuje **protokolom urezivanja i otkrivanja otpornim na manipulaciju** na Solani. Čak ni poslužitelj ne može promijeniti vaš rezultat nakon faze urezivanja. Točne vjerojatnosti i iznosi bonusa bit će finalizirani u implementaciji pametnog ugovora.

---

## Gdje potrošiti MTC

| Slučaj korištenja | Prednost | Dostupno |
| :--- | :--- | :---: |
| **🎫 Rezervirajte iskustva** | Plaćajte ture, događaje i kulturne aktivnosti s MTC-om | ✅ Sada |
| **🏷️ Popust** | 5–10% popusta u odnosu na cijene u jenima kad plaćate s MTC-om | ✅ Sada |
| **🔑 Ekskluzivni pristup** | NFT-zaštićeni događaji, VIP ceremonije, privatne ture | ✅ Sada |
| **📈 Toku staking** | Zaključajte MTC za pojačanje vašeg doprinosa bodova (do ~50% pojačanja) | 🔜 Kol. 2026. |
| **🗳️ DAO upravljanje** | Glasajte o riznici, nadogradnjama protokola i certifikaciji mjesta | 🔜 2027. |
| **🛍️ Partnerske trgovine** | Plaćajte u sudjelujućim trgovinama i restoranima | 🔜 Širi se |

:::info MTC kao sredstvo plaćanja
U Matsuri aplikaciji, MTC je prvorazredni način plaćanja uz kreditne kartice i Solana Pay. Nije potrebna konverzija — odaberite "Plati s MTC-om" pri naplati i stanje se odmah odbija.
:::

### Primjer: Dan u MTC ekonomiji

> **Jutro:** Pročitajte 3 J-Times članka u vlaku → zaradite MTC.
> **Poslijepodne:** Posjetite ruralno svetište s Matsuri aplikacijom → prijavite se, izvucite 吉 (Sreća) (×1,5) → zaradite više MTC-a.
> **Večer:** Iskoristite zarađeni MTC za rezervaciju kulturne ture po Golden Gaiu od ¥9.000 s 10% popusta (platite ekvivalent od ¥8.100).
> **Rezultat:** Vaša kulturna znatiželja financirala je stvarno iskustvo — a vodič, svetište i zajednica svi su primili izravnu isplatu. Nijedan OTA nije uzeo 20% provizije.

### Ekonomska održivost

:::warning Što se događa kad se fond za rudarenje isprazni?
Fond od 550M MTC s prepolovljavanjem dizajniran je da traje **desetljećima** (20 epoha × 2 godine = 40 godina teoretski). No čak i nakon što se fond iscrpi:

- **Naknade za transakcije** od aktivnosti na lancu nastavljaju nagrađivati sudionike mreže
- **Protokol otkupa** (20–25% poslovnog prihoda) stvara trajni pritisak kupnje
- **Toku staking** zaključava cirkulirajuću ponudu, smanjujući pritisak prodaje
- **Stvarni poslovni prihod** (događaji, članstva, tečajevi) održava ekosustav neovisno o distribuciji tokena

MTC je podržan **stvarnom ekonomijom** — ne samo emisijama tokena.
:::

---

## Plan migracije na lanac

Matsuri ekonomija postupno se prebacuje s izvanlanačnog sustava (Django/PostgreSQL) na lanac (Solana pametni ugovori). Ova tranzicija čini sve operacije **pouzdanima bez povjerenja, provjerljivima i bez dozvola**.

```mermaid
graph LR
    subgraph "SADA (Izvanlanačno)"
        O1["💳 Plaćanja događaja\n(Stripe/PayPal)"]
        O2["🤝 Provizije za preporuke\n(Django DB)"]
        O3["📊 Praćenje angažmana\n(PostgreSQL)"]
        O4["💰 Isplate\n(Banka/Kripto ručno)"]
    end
    subgraph "KOLOVOZ 2026. (Hibridno)"
        H1["⚡ Preporuke → Na lanac\n(matsuri-referral ugovor)"]
        H2["⛩️ Avanturističko rudarenje → Na lanac\n(matsuri-worship ugovor)"]
        H3["🎲 Omikuji → Na lanac\n(matsuri-omikuji ugovor)"]
        H4["📖 Medijsko rudarenje → Orakul\n(Cranker slanje)"]
    end
    subgraph "LIPANJ 2027. (Potpuno na lancu)"
        F1["📊 Distribucija prepolovljavanja aktivna\n(Fond za rudarenje 550M MTC)"]
        F2["🗳️ DAO upravljanje"]
        F3["🔄 Sve nagrade na lancu"]
    end
    subgraph "2027.+ (Ekonomija sustvaranja)"
        G1["🏪 Tržište na lancu\n(Lokalne trgovine + GCF trgovine)"]
        G2["🎫 Grupno financiranje + NFT prava\n(Upravljanje podupiratelja)"]
        G3["⚡ Automatska podjela prihoda\n(Kreator + Zajednica + Otkup)"]
    end
    O1 & O2 & O3 & O4 -->|"Migracija"| H1 & H2 & H3 & H4
    H1 & H2 & H3 & H4 -->|"Veliko otključavanje"| F1 & F2 & F3
    F1 & F2 & F3 -->|"Sustvaranje"| G1 & G2 & G3
```

| Faza | Vremenski okvir | Što prelazi na lanac |
| :--- | :--- | :--- |
| **Faza 1 (Sada)** | Aktivno | MTC token (SPL), Raydium LP, Solana Pay verifikacija |
| **Faza 2 (Kol. 2026.)** | Implementacija pametnih ugovora na mainnet | Provizije za preporuke, nagrade avanturističkog rudarenja, Omikuji izvlačenja, medijsko rudarenje putem orakula |
| **Faza 3 (Lip. 2027.)** | Veliko otključavanje | Distribucija prepolovljavanja 550M MTC, DAO upravljanje, potpuna decentralizacija |
| **Faza 4 (2027.+)** | Ekonomija sustvaranja | Tržište na lancu (lokalne trgovine + GCF trgovine), grupno financiranje s NFT pravima, automatska podjela prihoda kreatorima + zajednici + otkup |

:::warning Zašto nije sve na lancu danas?
Prebacivanje svega na lanac prije **profesionalne sigurnosne revizije** (planirane za Q2 2026.) bilo bi neodgovorno. Trenutni hibridni pristup omogućuje nam sigurno iteriranje dok se pripremamo za operacije na lancu bez potrebe za povjerenjem. Izvanlanačne nagrade su i dalje provjerljive — svaka transakcija ima `solana_signature` kao dokaz poravnanja.
:::

---

**[▶ Dalje: Mobilne aplikacije](/docs/mobile-apps)** ｜ **[◀ Prethodno: Ekosustav i rudarenje](/docs/ecosystem)**
