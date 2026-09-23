# MediVoice — Final Hackathon Submission Package

## Project name
MediVoice — Evidence-First Patient Intake Voice Agent

## Tagline
**One voice. Structured intake. Zero forms.**

## One-line pitch
MediVoice turns one natural patient narration into a structured, clinician-facing intake report using AssemblyAI Universal-3.5 Pro Realtime in Medical Mode — without pretending to diagnose or replace a clinician.

## Short description
A patient simply speaks. AssemblyAI transcribes the narration live in Medical Mode, while MediVoice structures the chief complaint, duration, pain, location, symptoms, medications and allergies into a reviewable clinician handoff. The source transcript remains visible, and the product deliberately stops short of autonomous diagnosis.

## Why this exists
The intake problem is not that patients cannot describe what is wrong. It is that natural speech arrives unstructured, while clinical workflows need concise, reviewable fields.

Documentation burden is already substantial: a national study of US office-based physicians reported a mean 1.77 hours per day spent documenting outside office hours. MediVoice starts earlier in the workflow by converting patient speech into usable intake structure before the clinician has to reorganize it.

Source:
https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2790396

## What the working prototype does
1. Captures microphone audio in the browser.
2. Streams PCM16 mono audio at 16 kHz to AssemblyAI v3 Streaming.
3. Uses Universal-3.5 Pro Realtime with `medical-v1`.
4. Renders partial and final speech live.
5. Structures:
   - chief complaint
   - duration
   - pain level
   - location
   - symptoms
   - medications
   - allergies
   - tone / distress
   - clearly labeled demo urgency signal
6. Produces a concise clinical note.
7. Generates a structured clinician-facing intake report.
8. Keeps the source transcript visible for review.
9. Offers a deterministic demo simulation if a live endpoint is unavailable during judging.

## What makes MediVoice different
### 1. One-pass intake
The core workflow does not force the patient through a scripted question tree. The patient narrates once; MediVoice structures the result.

### 2. Evidence-first, not autonomy-first
The transcript remains visible beside the structured fields. The product is designed as a reviewable speech-to-structure layer, not an opaque autonomous decision-maker.

### 3. Safety is a product feature
MediVoice does not diagnose, prescribe, or present itself as an autonomous nurse. The urgency indicator is explicitly labeled as a demo signal for clinician review.

### 4. AssemblyAI is the core live layer
This is not a generic chatbot with speech bolted on. The live product depends on:
- AssemblyAI Universal-3.5 Pro Realtime
- v3 Streaming WebSocket
- Medical Mode (`medical-v1`)
- temporary browser token authentication
- live partial/final turns

## Architecture
```text
Browser microphone
    ↓
PCM16 mono audio @ 16 kHz
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

The permanent AssemblyAI API key never reaches the browser. A small dependency-free Node server mints a short-lived streaming token and returns only that token to the client.

## Real test evidence
Verified live on **23 Sep 2026** with a real AssemblyAI API key:

**microphone → AssemblyAI live transcript → structured fields → clinical note → doctor summary**

The final Doctor Summary UX hotfix was also verified in a second real screen recording before the tested branch was merged to `main`.

## Business value
**Initial users:** outpatient clinics, urgent care, high-throughput front desks, and digital-health intake teams.

**Buyer:** clinic / care-network operations or digital-health teams.

**Business model:** B2B SaaS plus usage-based voice processing.

**Value hypothesis:** reduce repetitive intake work, improve the consistency of structured handoffs, and provide a voice-first option for patients who struggle with long forms.

**Pilot plan:** start with one clinic and measure:
- intake completion time
- correction rate
- clinician acceptance of structured fields
- percentage of visits needing manual re-entry

## Tech stack
- AssemblyAI Universal-3.5 Pro Realtime
- AssemblyAI v3 Streaming API
- Medical Mode (`medical-v1`)
- JavaScript
- HTML / CSS
- Web Audio API
- WebSocket
- Node.js

## GitHub
https://github.com/ranvirjrj-beep/medivoice-patient-intake

## Final demo flow
1. Open MediVoice.
2. Show “Live AssemblyAI ready”.
3. Start the microphone.
4. Speak a natural patient example.
5. Show live transcript and structured fields.
6. Stop recording.
7. Show the clinical note.
8. Click **Generate Doctor Summary**.
9. Show the full clinician-facing report.
10. Close on the architecture and safety message.

## Suggested final submission copy
### Problem
Natural patient speech contains useful clinical intake information, but it arrives unstructured. Traditional intake forms make patients translate their own story into rigid fields before a clinician can use it.

### Solution
MediVoice lets the patient speak once. AssemblyAI Universal-3.5 Pro Realtime transcribes the narration live in Medical Mode, and MediVoice converts that transcript into a structured, reviewable intake handoff.

### Why now
Real-time medical speech recognition is accurate and low-latency enough to move beyond passive transcripts. The opportunity is to make speech operationally useful without turning the product into an autonomous clinical decision-maker.

### Why MediVoice
MediVoice is intentionally restrained. It does not diagnose. It does not hide the transcript. It does not make irreversible clinical decisions. It converts natural speech into structured evidence that a clinician can review.

## Presentation assets
- Final judge-cut video: `MediVoice_Judge_Cut.mp4`
- Pitch deck: `MediVoice_Pitch_Deck.pdf`

## Final checklist
- [x] Public GitHub project
- [x] Real AssemblyAI v3 live-stream integration
- [x] Medical Mode
- [x] Secure temporary-token architecture
- [x] Real API-key end-to-end mic test
- [x] Doctor Summary hotfix verified
- [x] Tested branch merged to main
- [x] Judge-cut video prepared
- [x] Pitch deck prepared
- [ ] Upload demo video to a public link accepted by lablab
- [ ] Upload / link pitch deck
- [ ] Complete lablab submission form
- [ ] Reopen the final submission and verify every link
