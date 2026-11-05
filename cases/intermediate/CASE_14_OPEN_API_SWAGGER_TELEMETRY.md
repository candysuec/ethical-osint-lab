# 📂 Case File 14: Passive API Enumeration & OpenAPI / Swagger Telemetry

**Difficulty:** Intermediate (Score: 5/10)  
**Standard Reference:** `CASE-INT-014`  
**Target Entity:** Public Developer Portal or Cloud SaaS Provider (e.g., public endpoints of `api.github.com` or authorized public developer sandbox)  
**Investigative Focus:** Passive API Specification Mining, OpenAPI / Swagger Discovery, and Schema Profiling  

---

## 🎯 Case Objective

Application Programming Interfaces (APIs) drive modern web and cloud architectures. Software engineering teams frequently deploy automated documentation frameworks—such as OpenAPI Specifications, Swagger UI, or Postman Public Workspaces—to make endpoints discoverable. When left publicly accessible without authentication, these schemas expose the application's entire internal routing taxonomy, authentication schemes, internal object schemas, and deprecated parameters.

In this case, the student will passively locate, download, and analyze an official public API specification to map out the application's attack surface without executing any test API calls or injecting payloads.

---

## 🔍 Available Clues & Starting Point
1. **Target Developer Domain:** Official developer documentation portal (e.g., `developer.target.com` or `api.target.com`).
2. **Standard Specification Paths:**
   * `/v1/openapi.json`
   * `/v2/swagger.json`
   * `/api-docs`
   * `/swagger/v1/swagger.json`
3. **Public Repositories:** [APIs.guru](https://apis.guru/) (The Wikipedia of Web APIs).
4. **CLI Tools:** `curl`, `jq`, `spectral` (or python `json.tool`).

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Passive Discovery of Public OpenAPI Specification
1. Query the APIs.guru public index to locate official, publicly published API schemas:
   ```bash
   curl -s "https://api.apis.guru/v2/list.json" > apis_guru_directory.json
   ```
2. Search for the target organization within the index:
   ```bash
   jq 'keys[] | select(contains("fastly") or contains("github"))' apis_guru_directory.json
   ```
3. Extract the direct link to the canonical OpenAPI / Swagger JSON document.

### Step 2: Download and Authenticate Schema Integrity
1. In your Linux VM, download the specification file:
   ```bash
   curl -s -L "https://api.apis.guru/v2/specs/fastly.com/1.0.0/openapi.json" -o openapi_spec.json
   ```
2. Compute the cryptographic hash:
   ```bash
   sha256sum openapi_spec.json
   ```

### Step 3: Analyze Authentication & Authorization Schemes
1. Extract the `securityDefinitions` or `components.securitySchemes` block:
   ```bash
   jq '.components.securitySchemes // .securityDefinitions' openapi_spec.json
   ```
2. Document the supported authentication mechanisms:
   * Bearer Tokens (JWT).
   * API Key in HTTP Headers (e.g., `Fastly-Key`).
   * Basic Authentication or OAuth 2.0 flows.

### Step 4: Catalog High-Risk Administrative Endpoints
1. Parse the endpoint paths for administrative, billing, or debug capabilities:
   ```bash
   jq -r '.paths | keys[]' openapi_spec.json | grep -iE "(admin|delete|billing|token|user|internal|debug)" > sensitive_endpoints.txt
   ```
2. Count the total exposed endpoints across the API footprint:
   ```bash
   jq -r '.paths | keys[]' openapi_spec.json | wc -l
   ```

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `openapi_spec.json`.
* Complete inventory of exposed endpoints categorized by HTTP method (GET, POST, PUT, DELETE).
* Evaluation of the API's security architecture (e.g., required scopes, authentication headers).
* Admiralty-scored assessment (**A1**) based on published, authoritative OpenAPI JSON specifications.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT send HTTP requests to test or invoke any of the endpoints discovered in the OpenAPI schema. Do NOT fuzz endpoints with invalid parameters or test for authorization bypass. The task is strictly architectural mapping and schema analysis.
