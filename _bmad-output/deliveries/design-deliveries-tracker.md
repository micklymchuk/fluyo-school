# Design Deliveries Tracker

## DD-001: Fluyo School Production Four-Page Site

- Status: In Development / BMad handoff issued
- Handed off: 2026-07-08T21:15:52+0300
- Assigned: BMad Architect
- Product owner confirmation: king
- Direct architect acknowledgement: tracked outside this chat
- Delivery: `_bmad-output/deliveries/DD-001-fluyo-production-site.yaml`
- Test Scenario: `_bmad-output/test-scenarios/TS-001-fluyo-production-site.yaml`
- Handoff Log: `_bmad-output/deliveries/DD-001-handoff-log.md`
- Official Notification: `_bmad-output/deliveries/DD-001-official-handoff.md`
- Implementation Stories: `_bmad-output/implementation-artifacts/DD-001-fluyo-production-site/IMPLEMENTATION-STORIES.md`
- Expected implementation approach: Epic 0 UI foundation, Epic 1 contracts, Epic 2 Home/Programs, Epic 3 Teachers/Pricing, Epic 4 quality gates
- Next: Start `DD-001.0.1` UI tokens and global styles, then continue the story sequence.

## Next Up

### Content Readiness: Launch-Sensitive Content Replacement

- Status: Approval matrix created; production inputs tracked
- Phase: Content/spec readiness while DD-001 enters implementation planning
- Reason: Public launch is blocked until exact prices, trial duration, teacher bios/assets, testimonials, results, lesson screenshots, proof assets, policy-sensitive FAQ answers, and Telegram prepared messages are approved or hidden.
- Artifact: `_bmad-output/E-Assets/content/launch-content-approval-matrix.md`
- Next: Fill approved final content or mark sections hidden before public launch.

### Validation: DD-001 Implementation

- Status: Waiting for implementation
- Phase: TS-001 validation after BMad/dev marks the route build ready
- Reason: Acceptance testing is not useful until Epic 0-4 implementation has a running build.

### Design System

- Status: Folded into DD-001 implementation
- Phase: Epic 0 in-code UI foundation
- Reason: Standalone design-system generation is intentionally deferred; tokens and components are extracted during real page development.
