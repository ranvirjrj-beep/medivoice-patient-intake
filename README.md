# 🩺 MediVoice — AI Patient Intake Voice Agent

> **AssemblyAI Voice Agent Hackathon 2026**

MediVoice is a browser-based patient intake prototype that turns spoken patient descriptions into a structured clinician-facing intake report. It uses **AssemblyAI Universal-3.5 Pro Realtime** for live speech-to-text, then structures key intake fields in the browser with no second paid AI API required.

## ✅ Verified live on 23 Sep 2026

The real API-key end-to-end test passed:

- Browser microphone capture
- Secure short-lived AssemblyAI token flow
- AssemblyAI v3 Streaming API
- Live transcript rendering
- Chief complaint / duration / pain / location extraction
- Symptom extraction
- Medication + allergy extraction
- Clinical note generation
- Doctor intake report generation
- Report auto-scroll / visible completion feedback
- Offline demo simulation fallback

## Architecture

```text
Browser microphone
    ↓
PCM16 mono audio @ 16 kHz
    ↓
AssemblyAI v3 Streaming API
(universal-3-5-pro + medical-v1)
    ↓
Live transcript turns
    ↓
MediVoice client-side intake structuring
    ↓
Clinician-facing intake report
```

The browser never receives the permanent AssemblyAI API key. A tiny dependency-free Node server mints a short-lived streaming token and returns only that token to the browser.

## Run locally

### Requirements

- Node.js 18+
- A free AssemblyAI API key

No npm packages are required.

### Windows

Open PowerShell in the project folder and run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\run-medivoice.ps1
```

If the browser does not open automatically, keep the PowerShell window running and open:

```text
http://localhost:3000/voice-intake-agent.html
```

Then choose **Enable Live AssemblyAI**, allow microphone access, click the mic and speak.

### macOS/Linux

```bash
export ASSEMBLYAI_API_KEY="your_key_here"
npm start
```

Then open:

```text
http://localhost:3000/voice-intake-agent.html
```

Never commit the real key. `.env` files are ignored by Git.

## Demo mode

If a live connection is unavailable during a presentation, choose **Use Demo Simulation**. The simulation exercises the same transcript → extraction → report UI without an API key.

## AssemblyAI streaming configuration

MediVoice uses:

```text
wss://streaming.assemblyai.com/v3/ws
speech_model=universal-3-5-pro
sample_rate=16000
domain=medical-v1
mode=balanced
```

Audio is sent as 16-bit mono PCM frames, and the browser reads AssemblyAI `Turn` events for partial/final text.

## Files

```text
medivoice-patient-intake/
├── voice-intake-agent.html   # App UI + mic + live transcript + intake logic
├── server.js                 # Static server + secure temporary token endpoint
├── package.json              # Node start command
├── run-medivoice.ps1         # Windows secure launcher
├── .env.example              # Key-name example only — no secrets
├── .gitignore                # Prevents local secrets from being committed
└── README.md
```

## Safety / scope

MediVoice is a **hackathon prototype**, not a medical device. It structures patient-reported information and surfaces a demo urgency signal; it does not diagnose, prescribe, or replace clinician judgment.

## Submission checklist

- [x] Public GitHub project
- [x] Core UI and intake workflow
- [x] AssemblyAI v3 live-stream integration
- [x] Secure temporary-token architecture
- [x] Real API-key end-to-end mic test
- [x] Doctor Summary hotfix verified
- [ ] ~2 minute demo video
- [ ] Final lablab.ai submission
- [ ] Reopen submission page and verify links/files

## Built by

**Ranvir Jat** — AssemblyAI Voice Agent Hackathon 2026
