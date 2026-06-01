# Architecture Appendix — C4 Model

**System:** Underwriting & Insurance Portal Platform (Wonderland Inc.)
A layered C4 walkthrough — from the system in its environment (L1), down through its containers (L2), to a component zoom on the decision that defined the architecture: the isolated Admin & Security service (L3).

> Diagrams are Mermaid (diagrams-as-code) so they version with the codebase rather than going stale as exported images.

---

## Level 1 — System Context

Who uses the platform and what it talks to.

```mermaid
flowchart TB
    RU["Regular user<br/><i>underwriter / broker</i>"]
    PA["Portal admin<br/><i>Leads, BA</i>"]
    SA["Super admin<br/><i>PM, Senior DevOps, Lead</i>"]

    SYS["<b>Underwriting Portal Platform</b><br/>[Software System]<br/>risk submission → bound policy<br/>documents · billing · reporting"]

    BANK["Bank / billing provider<br/>[External system]"]
    LEG["Legacy system<br/>[External · migration source]"]

    RU --> SYS
    PA --> SYS
    SA --> SYS
    SYS -->|billing &amp; settlement| BANK
    LEG -.->|one-way data migration| SYS

    classDef person fill:#1f6feb,stroke:#0d419d,color:#fff;
    classDef sys fill:#16365C,stroke:#0F2742,color:#fff;
    classDef ext fill:#eef1f4,stroke:#6e7781,color:#24292f;
    class RU,PA,SA person;
    class SYS sys;
    class BANK,LEG ext;
```

**Read:** three personas with distinct authority levels; two external edges — settlement with the bank, and a one-directional migration from the legacy system being replaced.

---

## Level 2 — Containers

Zooming inside the system boundary. All application containers run on Kubernetes.

```mermaid
flowchart TB
    RU["Regular user<br/><i>underwriter / broker</i><br/>[Person]"]
    PA["Portal admin<br/><i>Leads, BA</i><br/>[Person]"]
    SAdm["Super admin<br/><i>PM, Senior DevOps, Lead</i><br/>[Person]"]

    subgraph BND["Underwriting Portal Platform — Kubernetes"]
        SPA["Web SPA<br/>[Container: TypeScript]<br/>portal UI · risk submission · dashboards"]
        API["Application / API service<br/>[Container: C# / .NET]<br/>risk workflow · pricing · decisions"]
        DOC["Document generation<br/>[Container: .NET]<br/>policy &amp; print documents"]
        BILL["Billing integration<br/>[Container: .NET]<br/>bank billing &amp; invoicing"]
        REP["Reporting<br/>[Container: .NET]<br/>reports &amp; analytics export"]
        SEC["Admin &amp; Security service<br/>[Container: ISOLATED · multi-env]<br/>roles · permissions · security settings"]
        DB[("Data store<br/>[Azure-managed SQL / storage]<br/>risk records · documents · secure data")]
    end

    BANK["Bank / billing provider<br/>[External system]"]
    LEG["Legacy system<br/>[External — migration source]"]

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

    classDef person fill:#1f6feb,stroke:#0d419d,color:#fff;
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

**Read:** the .NET application service is the hub; document generation, billing, and reporting are focused containers behind it. The **Admin & Security service (red) is deliberately isolated** — every API request runs an authorization check against it, and it owns its own security schema.

---

## Level 3 — Component zoom · Admin & Security service

The decision that defined the architecture. Breaking the isolated container into its components shows *how* access is governed across environments without other services touching the full database.

```mermaid
flowchart TB
    API["Application / API service<br/>[Container]"]
    SADM["Super admin<br/>[Person]"]

    subgraph SEC["Admin &amp; Security service — isolated container"]
        AUTHZ["Authorization API<br/>[Component: .NET]<br/>per-request permission checks"]
        ROLE["Role &amp; permission manager<br/>[Component: .NET]<br/>roles, permission sets, approval thresholds"]
        ENVR["Environment config resolver<br/>[Component: .NET]<br/>per-environment security settings"]
        AUDIT["Audit logger<br/>[Component: .NET]<br/>access &amp; change trail"]
        SSTORE[("Security schema<br/>[isolated store]<br/>roles · permissions · env config")]
    end

    API -->|"authz check (every request)"| AUTHZ
    SADM -->|manage roles &amp; env security| ROLE
    AUTHZ -->|resolve scope| ENVR
    AUTHZ -->|read permissions| SSTORE
    ROLE -->|read / write| SSTORE
    ENVR -->|read settings| SSTORE
    AUTHZ -->|log decision| AUDIT
    ROLE -->|log change| AUDIT

    classDef person fill:#1f6feb,stroke:#0d419d,color:#fff;
    classDef ext fill:#e8f0fe,stroke:#1f6feb,color:#0b2447;
    classDef comp fill:#fde7e9,stroke:#d1242f,color:#5c0011;
    classDef store fill:#fff8e1,stroke:#b08800,color:#5c4400;
    class SADM person;
    class API ext;
    class AUTHZ,ROLE,ENVR,AUDIT comp;
    class SSTORE store;
```

**Read:**
- **Authorization API** is the single entry point for every permission check — services never evaluate access themselves.
- **Role & permission manager** is the only writer of roles, permission sets, and approval thresholds; the super admin operates here.
- **Environment config resolver** applies per-environment security settings, which is what makes multi-environment governance possible without duplicating data.
- **Audit logger** keeps an access and change trail — important in a regulated insurance context.
- The **isolated security schema** is the boundary: it holds all access state, separate from the operational data the rest of the platform reads and writes.

**Why it matters (the decision):** centralizing authorization and giving security its own isolated store means access can be reasoned about, changed, and audited in one place, across every environment, **without granting other services reach into the full database** — a smaller attack surface and a smaller blast radius. _(Decision class: influenced/advocated during the define phase.)_

---

### Notes
- Component names in L3 are a clean, defensible decomposition; align them to the actual service names if you publish this for a specific reviewer.
- For an interview, L1 is your opening slide, L2 is the main discussion, and L3 is the "go deeper" you pull out when asked about security or multi-tenancy.
