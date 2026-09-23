# MediVoice — Submission Package

## Project name
MediVoice — AI Patient Intake Voice Agent

## One-line pitch
A real-time patient intake voice agent that turns spoken symptoms into a structured clinician-facing intake report using AssemblyAI Universal-3.5 Pro streaming.

## Short description
MediVoice lets a patient speak naturally instead of filling out a long intake form. AssemblyAI transcribes the conversation live, while MediVoice structures the chief complaint, duration, pain level, symptoms, location, medications and allergies into a concise clinician-facing handoff.

## Long description
### Problem
Patient intake is often repetitive and form-heavy. Patients describe symptoms once, then the same information is re-entered or reorganized before a clinician can use it.

### Solution
MediVoice turns a spoken patient description into a structured intake summary in real time.

The prototype:
- captures microphone audio in the browser;
- streams PCM16 audio to AssemblyAI Universal-3.5 Pro using the v3 Streaming API;
- uses AssemblyAI's medical-domain configuration for transcription;
- renders the live transcript;
- extracts chief complaint, duration, pain level, location, symptoms, medications and allergies;
- creates a concise clinical note;
- generates a structured doctor intake report;
- provides a clearly labeled demo urgency signal without presenting itself as a diagnostic system.

### Architecture
The permanent AssemblyAI API key never appears in the browser. A small dependency-free Node server mints a short-lived AssemblyAI streaming token. The browser then connects directly to AssemblyAI using that temporary token.

### Why it matters
The goal is not to replace clinicians. MediVoice is designed to reduce intake friction and turn unstructured patient speech into a cleaner handoff that a clinician can review quickly.

### Safety
MediVoice is a hackathon prototype, not a medical device. It does not diagnose, prescribe, or replace clinical judgment.

## Tech stack
- AssemblyAI Universal-3.5 Pro
- AssemblyAI v3 Streaming API
- medical-v1 streaming domain
- JavaScript
- HTML / CSS
- Web Audio API
- WebSocket
- Node.js

## GitHub
https://github.com/ranvirjrj-beep/medivoice-patient-intake

## Live test status
Verified end to end on 23 Sep 2026 with a real AssemblyAI API key:
microphone → live transcript → structured fields → clinical note → doctor intake report.

## Demo sequence
1. Show the MediVoice interface.
2. Click Enable Live AssemblyAI.
3. Click the microphone.
4. Say a short patient example.
5. Show the live transcript and extracted fields.
6. Stop recording.
7. Show the clinical note.
8. Click Generate Doctor Summary.
9. Show the structured intake report.

## Suggested 60–75 second narration
Meet MediVoice, a real-time patient intake voice agent built for the AssemblyAI Voice Agent Hackathon.

Instead of filling out long forms, a patient simply speaks. AssemblyAI Universal-3.5 Pro transcribes the conversation live, while MediVoice structures the important intake details: chief complaint, duration, pain level, symptoms, medications, allergies and location.

After the recording stops, MediVoice creates a concise clinical note and a structured doctor intake report. The prototype also surfaces a clearly labeled urgency signal for clinician review, while explicitly avoiding diagnosis.

The permanent AssemblyAI API key never appears in the browser. A small local backend mints a short-lived streaming token, and the browser streams microphone audio directly to AssemblyAI.

In our live test, the complete microphone-to-transcript-to-report flow worked end to end.

MediVoice turns spoken patient context into a cleaner, faster intake handoff for clinicians.

## Final checklist
- [x] Real AssemblyAI live test passed
- [x] GitHub main branch contains verified v3 code
- [x] Doctor Summary hotfix verified
- [ ] Record/upload final demo video
- [ ] Add project cover image if requested by lablab
- [ ] Complete lablab submission form
- [ ] Reopen final submission and verify all links
