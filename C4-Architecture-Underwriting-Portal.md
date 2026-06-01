# C4 — Container Diagram (Level 2)

**System:** Underwriting & Insurance Portal Platform (Wonderland Inc.)
**Runtime:** all application containers run on **Kubernetes**.

```mermaid
flowchart TB
    %% ---------- People ----------
    RU["Regular user<br/><i>underwriter / broker</i><br/>[Person]"]
    PA["Portal admin<br/><i>Leads, BA</i><br/>[Person]"]
    SAdm["Super admin<br/><i>PM, Senior DevOps, Lead</i><br/>[Person]"]

    %% ---------- System boundary ----------
    subgraph BND["Underwriting Portal Platform — Kubernetes"]
        SPA["Web SPA<br/>[Container: TypeScript]<br/>portal UI · risk submission · dashboards"]
        API["Application / API service<br/>[Container: C# / .NET]<br/>risk workflow · pricing · decisions"]
        DOC["Document generation<br/>[Container: .NET]<br/>policy &amp; print documents"]
        BILL["Billing integration<br/>[Container: .NET]<br/>bank billing &amp; invoicing"]
        REP["Reporting<br/>[Container: .NET]<br/>reports &amp; analytics export"]
        SEC["Admin &amp; Security service<br/>[Container: ISOLATED · multi-env]<br/>roles · permissions · security settings"]
        DB[("Data store<br/>[Azure-managed SQL / storage]<br/>risk records · documents · secure data")]
    end

    %% ---------- External ----------
    BANK["Bank / billing provider<br/>[External system]"]
    LEG["Legacy system<br/>[External — migration source]"]

    %% ---------- Relationships ----------
    RU -->|HTTPS| SPA
    PA -->|HTTPS| SPA
    SAdm -->|manage roles &amp; env security| SEC
    SPA -->|JSON / HTTPS| API
    API -->|authorization check| SEC
    API -->|read / write risk records| DB
    API -->|generate docs| DOC
    API -->|trigger billing| BILL
    API -->|build reports| REP
    SEC -->|owns isolated security schema| DB
    BILL -->|settlement / invoicing| BANK
    LEG -.->|data migration| API

    %% ---------- Styles ----------
    classDef person fill:#1f6feb,stroke:#0d419d,color:#ffffff;
    classDef container fill:#e8f0fe,stroke:#1f6feb,color:#0b2447;
    classDef secure fill:#fde7e9,stroke:#d1242f,color:#5c0011,stroke-width:2px;
    classDef store fill:#fff8e1,stroke:#b08800,color:#5c4400;
    classDef ext fill:#eef1f4,stroke:#6e7781,color:#24292f;

    class RU,PA,SAdm person;
    class SPA,API,DOC,BILL,REP container;
    class SEC secure;
    class DB store;
    class BANK,LEG ext;
```

## Reading the diagram

- **Three personas, three authority levels.** Regular users and portal admins reach the platform through the Web SPA; the super admin operates directly against the security service.
- **The Admin & Security service is deliberately isolated** (highlighted in red). Every request the API serves runs an authorization check against it, and it owns its **own security schema** inside the data store. This is the key architectural decision: roles, permissions, and security settings can be managed **across multiple environments without any other service touching the full database**, which shrinks the blast radius and hardens multi-environment governance.
- **The .NET application service is the hub** — it orchestrates the risk workflow and delegates to focused containers for document generation, billing, and reporting.
- **External edges** are the bank/billing provider (settlement) and the legacy system (one-directional migration source).

## Notes for the case study
- This is **Level 2 (Containers)**. A **Level 1 (System Context)** view would collapse the boundary into a single box with the three personas and two external systems — useful as the opening slide.
- A **Level 3 (Component)** zoom into the API or the Security service is where you'd show the role/permission model in detail, if a reviewer asks to go deeper.
- Swap the placeholder data-store technology for the exact Azure services you used (e.g. Azure SQL, Blob Storage) when you confirm them.
