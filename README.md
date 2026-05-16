# VSS 2026 Schedule Organizer

A React Native mobile app for iOS and Android to search and organize your Vision Sciences Society conference schedule, May 15–19, 2026, St. Petersburg Beach, FL.

## For Conference Attendees

### Use the web version — no installation required

Open in any phone browser by scanning this QR code:

![VSS 2026 Scheduler Web QR Code](vss-web-qr.png)

Or go directly to: **https://markwgreenlee.github.io/vss-2026-scheduler**

Works on any iPhone or Android. No app, no account, no setup. Google Calendar export works.

> **Tip: load the app before you arrive at the venue.** Open the link at home or on cellular so the app is cached on your phone. It will then continue to work even on slow or unreliable conference WiFi.

### Save to your home screen for the best experience

The app installs as a Progressive Web App (PWA) — it opens full-screen like a native app and **works offline** after the first load. No App Store required.

> **Note:** Use Safari on iPhone and Chrome on Android. Other browsers may not offer the Add to Home Screen option.

**iPhone (Safari):**
1. Open the URL in Safari
2. Tap the Share button (box with arrow pointing up) at the bottom of the screen
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add** — the app icon appears on your home screen

**Android (Chrome):**
1. Open the URL in Chrome
2. Tap the three-dot menu (⋮) in the top right corner
3. Tap **Add to Home Screen** (or **Install app**)
4. Tap **Add** — the app icon appears on your home screen

> **Beta:** This is a community-built tool. Data is sourced from the official VSS 2026 Abstracts PDF; known extraction errors have been corrected, but some inaccuracies may remain. Feedback and corrections welcome — open a [GitHub issue](https://github.com/markwgreenlee/vss-2026-scheduler/issues) or email markwgreenlee@gmail.com.

---

## Troubleshooting

### Web version won't load

- Make sure you have an internet connection
- Try refreshing the page
- If on slow conference WiFi, switch to cellular data for the initial load, then switch back

### Calendar times are wrong

Check that automatic timezone is enabled on your phone:
- **iPhone:** Settings → General → Date & Time → "Set Automatically" ON
- **Android:** Settings → System → Date & Time → "Automatic date/time" ON

Then close and reopen the Calendar app.

### Can't find presentations

- Try shorter search terms (e.g., "vision" instead of "visual neuroscience")
- Search by author last name (e.g., "Smith", "Jones")
- Check that day and type filters are set to "All"
- Refresh the page to verify all 1,191 presentations loaded

---

## Features

- **1,191 presentations** from the official VSS 2026 Abstracts PDF
- Full-text search by title, author, abstract, and affiliation
- Filter by day (Fri–Tue) and type (Talk / Poster / Symposium)
- **Tap any card** to read the full abstract, authors, and session details in a pop-up sheet
- Build a personal schedule — add/remove directly from the detail sheet
- Export to **Google Calendar** (opens in browser) or **Apple Calendar** (adds events directly, no alarms set) — each event is 15 minutes (individual presentation duration, not full session)
- **Google Calendar users:** disable default reminders in Google Calendar settings to avoid repeated alerts during the conference
- Persistent schedule — survives app restarts
- Works offline after first load

---

## For Developers

### Quick Start

```bash
git clone https://github.com/markwgreenlee/vss-2026-scheduler.git
cd vss-2026-scheduler
npm install
npx expo start
```

Scan the QR code from the terminal with your phone (same iOS/Android instructions as above).

### Building a Standalone App

To distribute without requiring Expo Go:

```bash
eas build --platform android   # produces .apk / .aab — requires free Expo account
eas build --platform ios       # produces .ipa — requires Apple Developer account ($99/yr)
```

### Project Structure

```
vss-mobile/
├── App.js                          # Entry point, tab navigation
├── app.json                        # Expo / EAS configuration
├── assets/
│   └── vss-data.json               # 1,191 presentations
├── src/
│   ├── screens/
│   │   ├── SearchScreen.js         # Search & filter
│   │   ├── ScheduleScreen.js       # My schedule & export
│   │   └── SettingsScreen.js       # App info & attribution
│   ├── components/
│   │   ├── SessionCard.js          # Presentation card
│   │   ├── SelectedSessionCard.js  # Selected item card
│   │   ├── SessionDetailModal.js   # Full abstract / detail sheet
│   │   └── ExportButton.js         # Calendar export buttons
│   └── context/
│       └── DataContext.js          # Global state & search logic
```

### Tech Stack

- React Native 0.76 / React 19
- Expo SDK 54
- expo-calendar (direct Apple Calendar event creation)
- AsyncStorage (persistent schedule)
- EAS Update (OTA publishing via Expo Go)

### Environment Variables

This project follows Expo best practices for environment variable visibility:

**Public variables** (prefixed with `EXPO_PUBLIC_`) are safe to expose in client code:
```
EXPO_PUBLIC_APP_NAME=VSS 2026 Schedule Organizer
EXPO_PUBLIC_VSS_YEAR=2026
EXPO_PUBLIC_TOTAL_PRESENTATIONS=1191
```

**Secret variables** (no prefix) are kept private and only available on EAS servers:
- API keys, authentication tokens, and other sensitive data should use secret visibility
- Not readable locally or in JavaScript code

**For local development:**
1. Copy or create `.env.local` with public variables
2. Access via `src/config/environment.js`
3. Secret env variables can be set in your [Expo Dashboard](https://expo.dev)

---

## Version History

**v1.7.0** (2026-05-16)
- Progressive Web App (PWA) support added — the web version now installs to the home screen and works fully offline after first load
- PWA suggested by Expo support as the recommended path for event-specific apps that don't need deep native API access
- Service worker switched to network-first caching — updates are visible on the first reload without clearing the cache
- Web app manifest updated with standalone display mode, theme color, and start URL
- Active filter chips (day and session type) now highlight in light blue when selected, making it clear which filters are applied
- Expo Go removed from all attendee-facing documentation — org-level invites required per user make it impractical for large conferences
- Step-by-step home screen installation instructions added for iPhone (Safari) and Android (Chrome)

**v1.6.0** (2026-05-15)
- Web version is now the sole recommended distribution method for conference attendees
- Expo changed its policy on May 12, 2026 so that Expo Go can only load projects owned by the signed-in user — the Expo Go QR code no longer works for general attendees
- README and all guides updated to reflect web-only distribution

**v1.5.0** (2026-05-15)
- Web version launched at https://markwgreenlee.github.io/vss-2026-scheduler — works in any phone browser, no installation required
- Google Calendar export available in web version; Apple Calendar export requires the Expo Go app
- Deployed via GitHub Pages

**v1.4.0** (2026-05-14)
- Calendar export for **talks** now uses 15-minute presentation duration instead of full session duration — fixes overlap issues when multiple talks from the same session are added to the calendar
- **Talks** appear with accurate 15-minute duration across Google Calendar and Apple Calendar (posters and symposia retain full session duration since individual presentation times are not specified in the VSS program)
- Resolves iOS Calendar display issue where overlapping talk events were difficult to interact with

**v1.3.0** (2026-05-13)
- Poster number (e.g. 26.401) shown before title in all cards and detail sheet — essential for locating a poster board
- Removing a presentation now offers to also delete the matching Apple Calendar event
- Apple Calendar export detects duplicate presentations before creating events — skip, add anyway, or cancel
- Calendar export timezone fixed: all events anchor to Eastern Daylight Time (Florida) regardless of where the user is located

**v1.2.0** (2026-05-13)
- Dataset grown to 1,191 presentations with 150+ data quality corrections (abstracts, authors, affiliations)
- Author affiliation superscripts now displayed in the detail sheet
- Data source updated to official VSS 2026 Abstracts PDF; MiYoung Kwon's HTML scheduler credited as inspiration
- Personal data removed from dataset; beta disclaimer added

**v1.1.0** (2026-05-10)
- Replaced 190-record dataset with full 1,156 presentations
- Chip-style day/type filters replacing picker wheels
- Apple Calendar export now adds events directly (no .ics file)
- Published via EAS Update — scannable QR code, no dev server needed

**v1.0.0** (2026-05-08)
- Initial release

---

## Data Source & Attribution

Presentation data is sourced from the **official VSS 2026 Abstracts PDF** published by the Vision Sciences Society. This app was inspired by [MiYoung Kwon's](https://kwonlab.psych.umn.edu) HTML conference scheduler, which she generously shared with the community.

## Support

- **VSS website:** https://www.visionsciences.org
- **GitHub:** https://github.com/markwgreenlee/vss-2026-scheduler
- **Issues:** Open a GitHub issue

---

VSS 2026 | May 15–19, 2026 | St. Petersburg Beach, FL
