% VSS 2026 Scheduler — Email to Colleagues

**Subject:** VSS 2026 Scheduler app — built with AI, free for all attendees

Dear colleagues,

I'd like to share a small tool I put together for VSS 2026: a mobile app that lets you search all 1,191 presentations — including the full text of all 34 symposium talks — build a personal schedule, and export selected sessions directly to Apple or Google Calendar.

**No installation required — use the web version:**

Open in any phone browser: **https://markwgreenlee.github.io/vss-2026-scheduler**

Or scan the QR code in the attached guide. Works on any iPhone or Android — no app, no account, no setup. Google Calendar export included.

> **Tip: load the app before arriving at the venue** so it is cached and works even on slow conference WiFi.

*Optional — add to your home screen for quick access:*
- **iPhone (Safari):** tap the Share button → **Add to Home Screen**
- **iPhone (Chrome):** tap the three-dot menu → **Add to Home Screen**
- **Android (Chrome):** tap the three-dot menu → **Add to Home Screen**

**Alternative — Expo Go app (Apple Calendar support):**

If you want direct Apple Calendar export, you can use the app via Expo Go — but you must be signed into Expo Go with a free Expo account:

1. Create a free account at https://expo.dev if you don't have one
2. Sign into Expo Go with your Expo account
3. Scan the Expo Go QR code in the attached guide — the app opens automatically

Note: as of May 12, 2026, Expo requires a signed-in account to load projects in Expo Go. The web version above requires no account.

---

**How it was built — and why I'm telling you**

I want to be transparent: I am not a software developer. I built this app over two days by working interactively with **Claude Code**, an AI coding assistant made by Anthropic. I described what I wanted, Claude wrote the code, and when things broke (and they did), we debugged together. The conversation went back and forth much like pair programming with a knowledgeable colleague — one who happens to know React Native, Expo, and Apple Calendar APIs.

I know many of us are skeptical about AI tools, and understandably so. But this project is a concrete example of what becomes possible when AI handles the technical implementation and you focus on the problem you actually want to solve. The app pulls from the official VSS 2026 Abstracts PDF, and was inspired by MiYoung Kwon's HTML conference scheduler. Known extraction errors have been corrected, but this is a beta release — if you spot something wrong, feedback is welcome via GitHub or email. I couldn't have built this alone — or at least not in two days.

---

**For developers**

If you'd like to build a standalone version (no Expo Go required) or adapt this for a future conference, the full source code is on GitHub:

https://github.com/markwgreenlee/vss-2026-scheduler

A standalone Android APK can be built with a free Expo account. A standalone iOS app requires an Apple Developer account ($99/year). The attached guide includes step-by-step instructions.

I hope this makes it a little easier to navigate the program this year. See you in St. Petersburg Beach!

Best,
Mark
