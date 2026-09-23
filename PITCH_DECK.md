# MediVoice — Pitch Deck

> **One voice. Structured intake. Zero forms.**

**AssemblyAI Voice Agent Hackathon 2026**  
Built solo by **Ranvir Jat**

---

## 1 — The problem

### Speech is natural. Intake workflows are not.

Patients already know how to describe what they feel. The friction starts when natural speech must be translated into rigid intake fields before a clinician can use it.

Documentation burden is substantial: a national study of US office-based physicians reported a mean **1.77 hours per day** spent documenting outside office hours.

Source: JAMA Internal Medicine  
https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2790396

**MediVoice starts earlier — at intake.**

- Patient speaks once, naturally.
- Important facts become structured fields.
- Clinician receives a readable handoff, not just a transcript.

---

## 2 — The product

### The demo is the argument.

MediVoice was live-tested end to end on **23 Sep 2026** with a real AssemblyAI API key.

**Verified flow:**

```text
Microphone
  → live AssemblyAI transcript
  → chief complaint
  → duration
  → pain
  → location
  → symptoms
  → medications / allergies
  → clinical note
  → clinician-facing intake report
```

No simulated product UI is needed to prove the workflow.

---

## 3 — Application of technology

### AssemblyAI is the core live layer.

```text
Browser microphone
    ↓
PCM16 mono @ 16 kHz
    ↓
AssemblyAI v3 Streaming
Universal-3.5 Pro + medical-v1
    ↓
Live transcript
    ↓
Deterministic intake structuring
    ↓
Clinician-facing report
```

**Privacy architecture:** the permanent AssemblyAI API key never reaches the browser. The backend mints a short-lived token for the live session.

---

## 4 — Originality

### Safety is the feature.

MediVoice is deliberately **not** an autonomous nurse, diagnosis engine, or generic chatbot wrapper.

**One-pass intake**  
A patient narrates once. The core workflow does not require a scripted question tree.

**Evidence-first**  
The source transcript remains visible beside the structured output so a clinician can review what the patient actually said.

**Clinician in control**  
The urgency indicator is explicitly labeled as a demo signal. MediVoice does not diagnose or prescribe.

**Zero-form UX**  
The value is conversion from natural speech into usable intake structure.

---

## 5 — Business value

### Start where intake friction is obvious.

**Initial users**
- outpatient clinics
- urgent care
- high-throughput front desks
- digital-health intake teams

**Buyer**
Clinic / care-network operations or digital-health teams.

**Business model**
B2B SaaS plus usage-based voice processing.

**Pilot metrics**
- intake completion time
- correction rate
- clinician acceptance of structured fields
- percentage of visits requiring manual re-entry

---

## 6 — Proof, not promise

- ✅ Public GitHub repository
- ✅ AssemblyAI v3 live streaming
- ✅ Universal-3.5 Pro Realtime
- ✅ Medical Mode
- ✅ Secure temporary-token architecture
- ✅ Real microphone/API-key test passed
- ✅ Doctor Summary hotfix passed
- ✅ Tested code merged to `main`
- ✅ Final judge-cut prepared
- ✅ Submission package prepared

### Repository
https://github.com/ranvirjrj-beep/medivoice-patient-intake

### Final principle
> **MediVoice does not try to replace clinical judgment. It makes patient speech easier to review and act on.**
