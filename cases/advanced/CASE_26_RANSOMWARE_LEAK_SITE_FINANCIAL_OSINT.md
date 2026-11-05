# 📂 Case File 26: Ransomware Extortion & Blockchain Financial Telemetry

**Difficulty:** Advanced (Score: 8/10)  
**Standard Reference:** `CASE-ADV-026`  
**Target Entity:** Public Ransomware Incident Financial Telemetry (e.g., Colonial Pipeline DarkSide ransom wallet or declassified CISA advisories)  
**Investigative Focus:** Blockchain OSINT, Cryptocurrency Transaction Tracing, Clustering Algorithms, and Fiat Off-Ramp Identification  

---

## 🎯 Case Objective

Cyber extortion syndicates rely on public blockchain cryptocurrencies (such as Bitcoin) to receive ransom payments and launder proceeds. Because Bitcoin operates on a transparent, immutable public ledger, forensic investigators can trace transaction flows, cluster change addresses, and identify deposits into Know-Your-Customer (KYC) regulated exchanges or mixing services without requiring specialized proprietary software.

In this case, the student will investigate the public blockchain transaction trail of a historic declassified ransomware payment (e.g., the May 2021 DarkSide ransom payment of 75 BTC) using open-source blockchain explorers and Python graphing libraries.

---

## 🔍 Available Clues & Starting Point
1. **Target Ransomware Wallet Address:** Declassified FBI / CISA DarkSide extortion receiving address (`135Gz...` or `bc1q...` declassified test wallet).
2. **Public Blockchain Explorers:**
   * [Blockchain.com Explorer](https://www.blockchain.com/explorer)
   * [Blockstream.info (Clean mempool & transaction data)](https://blockstream.info/)
   * [OXT (Open Bitcoin Forensics)](https://oxt.me/)
   * [Chainabuse (Community report database)](https://www.chainabuse.com/)
3. **CLI Tools:** `curl`, `jq`, `python3`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Query Blockchain REST API for Address Ledger
1. In your Linux VM, query the Blockstream public API to extract the transaction history of the seed extortion address:
   ```bash
   curl -s "https://blockstream.info/api/address/135Gz...REPLACE_WITH_SEED_ADDR/txs" > ransom_txs.json
   ```
2. Compute the cryptographic hash for evidence chain-of-custody:
   ```bash
   sha256sum ransom_txs.json
   ```

### Step 2: Trace Inbound Ingot & Victim Payment Confirmation
1. Parse the inbound transaction (`vin` / `vout`):
   ```bash
   jq '.[] | {txid: .txid, block_time: .status.block_time, outputs: .vout[] | {value: .value, addr: .scriptpubkey_address}}' ransom_txs.json
   ```
2. Note the exact timestamp, block height, and satoshi value (1 BTC = 100,000,000 satoshis).
3. Correlate the timestamp with public reporting or corporate breach timelines.

### Step 3: Implement the Common-Input Ownership Heuristic
1. When multiple input addresses are spent in a single transaction, the **Common-Input Heuristic** dictates that all input addresses are controlled by the same wallet entity.
2. Identify subsequent peeling chains:
   * **Peeling Chain:** A structural pattern where the extortionist repeatedly sends a small payment to an affiliate or service while returning the vast majority of funds to a newly generated change address.

### Step 4: Map Transaction Outflows Toward Known Services
1. Trace the downstream hops (Hop 1, Hop 2, Hop 3):
   * Do funds route through known coin-join / mixer protocols (Wasabi, Whirlpool)?
   * Or do funds pool into high-volume deposit addresses belonging to centralized crypto exchanges (Binance, Coinbase, Kraken)?
2. Document potential subpoena points where law enforcement can issue freeze orders or KYC information requests.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `ransom_txs.json`.
* Chronological transaction graph (Source Victim $\rightarrow$ Extortion Wallet $\rightarrow$ Peeling Chains $\rightarrow$ Exchange Deposit).
* Calculation of total BTC received, unspent balances, and transaction fees.
* Admiralty-scored assessment (**A1**) based on immutable, cryptographically validated blockchain ledgers.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT purchase cryptocurrency, communicate with extortionists, or attempt to initiate transactions on the blockchain. The exercise is strictly analytical and retrospective using public ledger data.
