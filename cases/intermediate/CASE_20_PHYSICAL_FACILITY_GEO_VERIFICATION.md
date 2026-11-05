# 📂 Case File 20: Physical Facility Verification via Open Geospatial Data

**Difficulty:** Intermediate (Score: 4/10)  
**Standard Reference:** `CASE-INT-020`  
**Target Entity:** Public Corporate Headquarters or Data Center Campus (e.g., Apple Park, Cupertino or Google Data Center, The Dalles, OR)  
**Investigative Focus:** Geospatial OSINT (GEOINT), Satellite Imagery Verification, OpenStreetMap Tagging, and Physical Perimeter Security  

---

## 🎯 Case Objective

Geospatial Intelligence (GEOINT) is a vital sub-discipline of OSINT used to verify the physical existence, campus boundaries, auxiliary power infrastructure, and operational perimeter security of corporate facilities and data centers. Threat analysts utilize GEOINT to assess natural disaster risks, fiber optic ingress routes, backup diesel generator capacities, and physical access vulnerabilities.

In this case, the student will verify the physical campus of a major public technology facility using open satellite imagery, municipal parcel maps, and OpenStreetMap (OSM) vector data without visiting the site or deploying physical surveillance.

---

## 🔍 Available Clues & Starting Point
1. **Target Facility:** A public corporate data center or campus (e.g., Apple Park, Cupertino, CA or public municipal utility).
2. **Open Geospatial Repositories:**
   * [OpenStreetMap (OSM)](https://www.openstreetmap.org/)
   * [Overpass Turbo (OSM Query Language API)](https://overpass-turbo.eu/)
   * [USGS EarthExplorer / National Map](https://apps.nationalmap.gov/)
   * [Google Earth Web / Bing Maps Aerial](https://earth.google.com/)
3. **CLI Tools:** `curl`, `jq`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Query OpenStreetMap Overpass API for Facility Boundaries
1. In your Linux VM or browser, craft an Overpass QL query to extract building polygons and infrastructure tags for the target coordinates:
   ```overpass
   [out:json][timeout:25];
   way["building"](around:500, 37.3346, -122.0090);
   out body;
   >;
   out skel qt;
   ```
2. Save the Overpass GeoJSON response:
   ```bash
   curl -s -d '[out:json];way["building"](around:500, 37.3346, -122.0090);out body;>;out skel qt;' "https://overpass-api.de/api/interpreter" > facility_osm.json
   ```
3. Compute the evidence checksum:
   ```bash
   sha256sum facility_osm.json
   ```

### Step 2: Satellite Imagery Analysis & Feature Identification
1. Open the target coordinates in high-resolution satellite imagery (Google Earth Web or USGS National Map).
2. Identify critical physical infrastructure features:
   * **Electrical Substation & Transmission Towers:** Where does grid power enter the campus?
   * **Backup Generators & Fuel Storage:** Identify rows of exterior diesel generators and exhaust vents.
   * **Cooling Towers & Chillers:** Locate industrial HVAC and water retention ponds essential for computing hardware cooling.
   * **Security Perimeters:** Identify guard huts, physical security gates, perimeter fences, and loading docks.

### Step 3: Analyze Municipal Planning & Zoning Disclosures
1. Query local county GIS or property assessor databases (public record):
   * Confirm parcel acreage, taxable assessed value, and legal property owner (often registered under a specialized LLC subsidiary).
   * Note building square footage and construction permit dates.

### Step 4: Geospatial Risk Evaluation
1. Cross-reference the facility's location against public FEMA flood hazard maps and USGS earthquake fault maps.
2. Formulate a physical disaster resilience rating for the facility.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `facility_osm.json`.
* High-resolution satellite screenshot with labeled physical features (substations, perimeter fences, generators).
* Physical site vulnerability and natural hazard exposure assessment.
* Admiralty-scored assessment (**A1**) based on verifiable geospatial satellite data and municipal property records.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT perform physical surveillance, trespass on private property, or monitor personal vehicles or private employees. The analysis is strictly focused on commercial and industrial campus infrastructure documented in public open maps.
