# Trigger Map: fluyo-school

> Visual overview connecting Fluyo School's business goals to user psychology

**Created:** 2026-06-25  
**Author:** king  
**Methodology:** Based on Effect Mapping by Mijo Balic & Ingrid Domingues, adapted for the WDS framework  

---

## Vision

Fluyo School should become the trusted, premium-feeling first step for Ukrainian learners and parents who want English to feel natural, practical, and supported by real teachers.

The landing page should turn interest into paid trial lesson bookings by making each visitor quickly feel: "This is the right school for my goal, I understand the first step, and I trust the people behind it."

---

## Trigger Map Visualization

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'fontFamily':'Inter, system-ui, sans-serif', 'fontSize':'14px'}}}%%
flowchart LR
    %% Business Goals (Left)
    BG0["<br/>🎯 PAID TRIAL BOOKINGS<br/><br/>Telegram trial CTA<br/>Paid trial conversion<br/>Qualified inquiries<br/><br/>"]
    BG1["<br/>⭐ TRUST BEFORE PRICE<br/><br/>Teacher credibility<br/>Proof assets visible<br/>Results and testimonials<br/><br/>"]
    BG2["<br/>🚀 AUDIENCE RECOGNITION<br/><br/>Exam path clarity<br/>Kids parent reassurance<br/>Adult speaking confidence<br/><br/>"]

    %% Central Platform
    PLATFORM["<br/>📚 FLUYO SCHOOL<br/><br/>Teacher-led online English school<br/><br/>From scattered interest<br/>to trusted paid trial booking<br/>with the right teacher path<br/><br/>"]

    %% Target Groups (Right)
    TG0["<br/>🎯 DANYLO THE EXAM STUDENT<br/>PRIMARY TARGET<br/><br/>Deadline-driven<br/>Needs exam structure<br/>Proof-sensitive<br/>Ready to act<br/><br/>"]
    TG1["<br/>👥 OLENA THE OBSERVANT PARENT<br/>SECONDARY TARGET<br/><br/>Protective buyer<br/>Needs teacher trust<br/>Wants child progress<br/>Checks practical details<br/><br/>"]
    TG2["<br/>💬 MARTA THE ADULT LEARNER<br/>TERTIARY TARGET<br/><br/>Speaking-anxious<br/>Wants practical English<br/>Needs flexible rhythm<br/>Restarting carefully<br/><br/>"]

    %% Driving Forces (Far Right)
    DF0["<br/>🎯 DANYLO'S DRIVERS<br/><br/>WANTS<br/>✅ Clear score path<br/>✅ Exact exam guidance<br/>✅ Organized study rhythm<br/><br/>FEARS<br/>❌ Generic lessons<br/>❌ Late level discovery<br/>❌ No feedback direction<br/><br/>"]
    DF1["<br/>👥 OLENA'S DRIVERS<br/><br/>WANTS<br/>✅ Safe warm teacher<br/>✅ Engaging child lesson<br/>✅ Visible progress<br/><br/>FEARS<br/>❌ Child dislikes lessons<br/>❌ Weak online quality<br/>❌ Wrong teacher fit<br/><br/>"]
    DF2["<br/>💬 MARTA'S DRIVERS<br/><br/>WANTS<br/>✅ Speak without judgment<br/>✅ Real-life English use<br/>✅ Flexible rhythm<br/><br/>FEARS<br/>❌ Freezing live<br/>❌ Failing again<br/>❌ Knowledge not speech<br/><br/>"]

    %% Connections
    BG0 --> PLATFORM
    BG1 --> PLATFORM
    BG2 --> PLATFORM
    PLATFORM --> TG0
    PLATFORM --> TG1
    PLATFORM --> TG2
    TG0 --> DF0
    TG1 --> DF1
    TG2 --> DF2

    %% Styling
    classDef businessGoal fill:#f3f4f6,color:#1f2937,stroke:#d1d5db,stroke-width:2px
    classDef platform fill:#e5e7eb,color:#111827,stroke:#9ca3af,stroke-width:3px
    classDef targetGroup fill:#f9fafb,color:#1f2937,stroke:#d1d5db,stroke-width:2px
    classDef drivingForces fill:#f3f4f6,color:#1f2937,stroke:#d1d5db,stroke-width:2px
    class BG0,BG1,BG2 businessGoal
    class PLATFORM platform
    class TG0,TG1,TG2 targetGroup
    class DF0,DF1,DF2 drivingForces
```

---

## Strategic Summary

**Primary Target:** Danylo the Deadline-Driven Exam Student.

**Key Transformation:** from "I am interested, but I need proof and clarity before I pay for a trial" into "I understand my path, I trust the teachers, I know what the trial does, and I am ready to message Fluyo on Telegram."

### The Flywheel

1. **Paid trial bookings:** qualified visitors message Fluyo through Telegram.
2. **Good-fit trial lessons:** trial conversations clarify goal, level, teacher fit, and format.
3. **Regular learners:** successful trials become ongoing students.
4. **Visible proof:** testimonials, results, screenshots, and teacher credibility strengthen trust.
5. **Better future conversion:** new visitors see stronger proof and need less persuasion.

---

## Detailed Documentation

### Business Strategy

**Document:** [01-Business-Goals.md](01-Business-Goals.md)

**Priority goals:**

- **Turn Qualified Interest Into Paid Trial Bookings:** primary engine for the landing page.
- **Build Trust Before The Visitor Compares Price:** proof must make a paid first step feel justified.
- **Make Each Launch Audience Feel Immediately Recognized:** exams, kids/parents, and adults need clear paths.

**Top objective:** Telegram trial inquiries that become paid trial bookings, not raw CTA clicks alone.

### Target Users

**Document:** [02-Target-Groups.md](02-Target-Groups.md)

**Persona documents:**

- [Danylo the Exam Student](02-Danylo-the-Exam-Student.md)
- [Olena the Observant Parent](03-Olena-the-Observant-Parent.md)
- [Marta the Adult Learner](04-Marta-the-Adult-Learner.md)

**Primary:** Danylo the Deadline-Driven Exam Student

- Needs exam-specific structure and proof.
- Has high urgency and clear conversion intent.
- Rejects vague "English for all levels" messaging.

**Secondary:** Olena the Observant Parent

- Needs emotional safety, teacher warmth, and parent-visible progress.
- Compares lesson quality, format, and fit before booking.
- Can create retention and parent referrals if trust is earned.

**Tertiary:** Marta the Momentum-Seeking Adult

- Needs practical speaking confidence without shame.
- Wants flexible formats and real-life English.
- Expresses the "English in flow" brand promise.

### Driving Forces

**Document:** [03-Driving-Forces.md](03-Driving-Forces.md)

**Danylo must believe:** Fluyo can diagnose his current level, guide his exact exam preparation, and avoid wasting weeks.

**Olena must believe:** her child will be safe, engaged, properly matched, and visibly progressing.

**Marta must believe:** she can start speaking again without judgment and finally turn knowledge into usable speech.

### Prioritization

**Document:** [04-Prioritization.md](04-Prioritization.md)

**Must Address:**

- Paid trial clarity.
- Exam-specific credibility.
- Teacher trust.
- Path-specific proof.
- Transparent pricing and formats.

**Should Address:**

- Parent progress visibility.
- Lesson screenshots and material examples.
- Adult real-life topic examples.
- Level and format matching.
- Native UA/EN content quality.

### Feature Impact

**Document:** [feature-impact-analysis.md](feature-impact-analysis.md)

**Checklist alias:** [06-Feature-Impact.md](06-Feature-Impact.md)

**Highest-scoring feature priorities:**

- Audience path routing.
- How learning works sequence.
- Teacher proof section.
- Programs and pricing section.
- Context-aware Telegram booking flow.
- Final CTA section.
- Bilingual UA/EN support.

---

## Design Focus Statement

Design the Fluyo School landing page primarily for **Danylo the Deadline-Driven Exam Student**, while strongly supporting **Olena the Observant Parent** and keeping **Marta the Momentum-Seeking Adult** visible as the broad confidence path.

The page must route visitors quickly, prove teacher-led trust, show the trial's value, make pricing understandable, and make Telegram the obvious next step.

---

## How To Read This Map

Read the diagram left to right:

- **Business Goals:** what the page must achieve for Fluyo.
- **Fluyo School:** the central product experience connecting business intent to user psychology.
- **Target Groups:** the people whose decisions drive those goals.
- **Driving Forces:** what each persona wants and fears in the landing-page decision context.

Read priority from top to bottom:

- Danylo receives the most design attention.
- Olena receives strong secondary support.
- Marta remains visible as the broad adult confidence path.

Read driver symbols:

- `✅` marks positive drivers: what pulls the visitor forward.
- `❌` marks negative drivers: what risk, pain, or uncertainty the page must reduce.

---

## Next Use

Use this map to guide:

- **Phase 3: UX Scenarios:** start with paid trial booking and exam-prep path scenarios.
- **Phase 4: UX Design:** prioritize top-scoring feature-impact areas.
- **Implementation:** protect proof, pricing clarity, bilingual content, and Telegram flow from being treated as optional polish.

---

_Generated with Whiteport Design Studio framework_  
_Trigger Mapping methodology credits: Effect Mapping by Mijo Balic & Ingrid Domingues, adapted with negative driving forces_
