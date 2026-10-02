# One process, five kinds of partner

**Architect and sole engineer to delivery · Seezy · NomadEngenuity · 2024–2025**

Getting a client new glasses under an eye-care plan touches five parties: the partner who sells the plan, the optical store that runs the exam, the lab that makes the lenses, the insurer, and the administrators who approve each step. Seezy put all of them on one platform and one shared process, from the first lead to the client collecting their glasses. I co-designed its architecture, then took over the whole system and carried it, front end to back end, to delivery.

**At a glance**

- **About ten NestJS microservices** behind Azure API Management, running on Azure Container Apps.
- **One orchestrator owns a 21-state process**, from lead created to delivered to the client.
- **Two human approval gates:** administrators approve pre-eligibility and final eligibility before vouchers, insurance and lab orders go out.
- **Multi-tenant partner access:** each partner organisation runs its own admins, managers, users and branches.

## My responsibility

I started with two colleagues. One of them and I designed the full architecture and the backend between us, while the other began building backend services. About a month in, I took over everything, front end and back end, and carried it alone to delivery to the stakeholder.

I left the company right after that delivery, so I cannot speak to how the platform was used afterwards.

**TypeScript · Next.js · NestJS · Azure API Management · Azure Container Apps · MongoDB / Cosmos DB · Auth0 · GitHub Actions**

## One owner for the state of every process

A care plan moves through many services: client and lead data, plan and pack selection, voucher, eye exam, eligibility checks, health and breakage insurance, the lab order, and finally pickup. If each service called the next one directly, no single place would know where a given client stood, and every new step would mean rewiring its neighbours.

Instead, one Orchestrator service owns the process state. Every other service does its own job and reports the change back: lead created, voucher validated, exam completed, lab order placed. The orchestrator keeps the 21-state record and decides what happens next, such as generating a voucher once pre-eligibility is approved. Partners and administrators can then search any process and see its full history, step by step.

**Tradeoff:** the orchestrator becomes the one service every step depends on. A central owner makes the process easy to reason about and to audit, but it also has to be the most reliable service in the system.

## People approve the steps that matter

Two decisions are deliberately left to a person. After the sales partner submits a client, an administrator reviews the information and approves pre-eligibility, which issues the client’s voucher. After the optical store records the exam and the lenses, an administrator approves final eligibility, which releases the health and breakage insurance and the lab’s manufacturing order. A rejection at either gate notifies the partner instead of moving the process on.

## Partners who run their own teams

Each partner organisation needed to manage itself without seeing anyone else’s data. Registering a partner creates the organisation record in the Partners service and its first administrator in the Auth service, backed by Auth0. That administrator then creates managers and users, organises branches and assigns roles, all scoped to their own organisation.

Registration spans two services, so it can half-succeed. If the partner record is created but the administrator account fails, the Auth service deletes the partner record again; if the partner record fails, nothing else is created. There is no distributed transaction, only an explicit compensating step.

**Tradeoff:** compensation keeps the services independent, but a failure during the rollback itself would leave an orphaned record to clean up by hand.

## Shipping it, and what on-premises would cost

Code went from a GitHub monorepo through GitHub Actions, which built and tested each service, pushed images to the GitHub container registry and deployed them to Azure Container Apps. Notifications went out by email and by SMS.

When the question of running on-premises came up, I wrote the migration plan: a Kubernetes cluster, a self-hosted registry, an API gateway in place of Azure API Management, a MongoDB cluster, Keycloak in place of Auth0, and a full observability stack. The plan’s conclusion was that it was achievable, but that it would trade managed services for a much higher total cost of ownership and a team able to run all of it.

## Result

I delivered the platform to the stakeholder with the commercial, optical, administrative and lab journeys implemented, and the partner access system, notifications and appointment handling in place. The documentation I wrote records what was implemented and what remained pending, including a client-facing dashboard.

## What I would improve next

I would make the orchestrator’s state changes event-driven and idempotent, so a repeated or delayed report from a service could never move a process twice. I would also add contract tests between the orchestrator and each service, because in an orchestrated design the shape of those messages is the real interface.
