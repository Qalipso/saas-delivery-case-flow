workspace "Underwriting Portal Platform" "C4 model — Wonderland Inc. (anonymized). Risk submission to bound policy; documents, billing, reporting; isolated security." {

  model {
    ru = person "Regular user" "Underwriter / broker. Submits and views own risk records."
    pa = person "Portal admin" "Leads, BA. Approves referrals and high-value risks; configures workflow."
    sa = person "Super admin" "PM, Senior DevOps, Lead. Cross-portal config, security, environments."

    bank = softwareSystem "Bank / billing provider" "Settlement and invoicing." "External"
    legacy = softwareSystem "Legacy system" "Monolith being replaced; one-way migration source." "External"

    platform = softwareSystem "Underwriting Portal Platform" "B2B underwriting portal. Runs on Kubernetes." {
      spa = container "Web SPA" "Portal UI, risk submission, dashboards." "TypeScript"
      api = container "Application / API service" "Risk workflow, pricing, decisions. The hub." "C# / .NET"
      doc = container "Document generation" "Policy and print documents." ".NET"
      bill = container "Billing integration" "Bank billing and invoicing." ".NET"
      rep = container "Reporting" "Reports and analytics export." ".NET"
      db = container "Data store" "Risk records, documents, secure operational data." "Azure-managed SQL / storage" "Database"

      sec = container "Admin & Security service" "Isolated, multi-environment. Roles, permissions, security settings." ".NET" "Security" {
        authz = component "Authorization API" "Per-request permission checks. Single entry point; services never evaluate access themselves." ".NET"
        role = component "Role & permission manager" "Roles, permission sets, approval thresholds. Only writer." ".NET"
        envr = component "Environment config resolver" "Per-environment security settings; enables multi-env governance." ".NET"
        audit = component "Audit logger" "Access and change trail." ".NET"
        sstore = component "Security schema" "Isolated store: roles, permissions, env config. Separate from operational data." "isolated store" "Database"
      }
    }

    # context / container relationships
    ru -> spa "Uses" "HTTPS"
    pa -> spa "Uses" "HTTPS"
    sa -> sec "Manages roles & env security"
    spa -> api "Calls" "JSON / HTTPS"
    api -> sec "Authorization check (every request)"
    api -> db "Reads / writes risk records"
    api -> doc "Generates documents"
    api -> bill "Triggers billing"
    api -> rep "Builds reports"
    sec -> db "Owns isolated security schema"
    bill -> bank "Settlement / invoicing"
    legacy -> api "One-way data migration"

    # component relationships (inside Admin & Security service)
    api -> authz "authz check (every request)"
    sa -> role "Manage roles & env security"
    authz -> envr "Resolve scope"
    authz -> sstore "Read permissions"
    role -> sstore "Read / write"
    envr -> sstore "Read settings"
    authz -> audit "Log decision"
    role -> audit "Log change"
  }

  views {
    systemContext platform "L1_Context" "Level 1 — System Context" {
      include *
      autolayout lr
    }

    container platform "L2_Containers" "Level 2 — Containers (Kubernetes)" {
      include *
      autolayout lr
    }

    component sec "L3_Security" "Level 3 — Admin & Security service components" {
      include *
      autolayout lr
    }

    styles {
      element "Person" {
        background "#1f6feb"
        color "#ffffff"
        shape person
      }
      element "Software System" {
        background "#16365c"
        color "#ffffff"
      }
      element "External" {
        background "#6e7781"
        color "#ffffff"
      }
      element "Container" {
        background "#1f6feb"
        color "#ffffff"
      }
      element "Security" {
        background "#d1242f"
        color "#ffffff"
      }
      element "Database" {
        shape cylinder
        background "#b08800"
        color "#ffffff"
      }
      element "Component" {
        background "#3b82f6"
        color "#ffffff"
      }
    }

    theme default
  }
}
