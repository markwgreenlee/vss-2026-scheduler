# 📱 VSS 2026 Schedule Organizer - Complete Installation & Usage Guide

## Quickstart for Conference Attendees

**No account or setup needed.** Just install the free Expo Go app and scan this QR code:

![VSS 2026 Scheduler QR Code](vss-scheduler-qr.png)

**iPhone:**
1. Download **Expo Go** from the App Store
2. Open the **Camera app** and point it at the QR code
3. Tap the notification that appears — it opens the app in Expo Go automatically

**Android:**
1. Download **Expo Go** from the Google Play Store
2. Open Expo Go and tap **Scan QR Code**
3. Point the camera at the QR code — the app loads immediately

---

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Methods](#installation-methods)
3. [Running on Device](#running-on-device)
4. [Building Production Apps](#building-production-apps)
5. [Using the App](#using-the-app)
6. [Exporting to Calendar](#exporting-to-calendar)
7. [Troubleshooting](#troubleshooting)

---

## System Requirements

### For Development (Optional - Testing Only)
- **macOS, Windows, or Linux**
- **Node.js v16+** - [Download](https://nodejs.org)
- **npm v8+** (comes with Node.js)
- **Expo CLI** - Install with: `npm install -g expo-cli`

### For Running on Device (Required)
- **iOS:** iPhone with iOS 12+ or iPad with iPadOS 12+
- **Android:** Android 5.0+ (Android 6.0+ recommended)

### For Building Production Apps (Optional)
- **Android APK:** Expo Account (free)
- **iOS App:** Expo Account + Apple Developer Account ($99/year)

---

## Installation Methods

### Method 1: Easiest - Use Expo Go App (Recommended)

This is the fastest way to test the app on your phone immediately.

#### iOS Installation

1. **On Your iPhone:**
   - Open the App Store
   - Search for "Expo Go"
   - Download and install the free app
   - Open Expo Go

2. **On Your Mac (Computer):**
   ```bash
   # Clone or navigate to the project
   cd ~/vss-mobile
   npm install
   npm start
   ```
   
   A QR code will appear in your terminal.

3. **On Your iPhone:**
   - In Expo Go, tap "Scan QR Code"
   - Point camera at your Mac's terminal
   - The app loads automatically

#### Android Installation

1. **On Your Android Phone:**
   - Open Google Play Store
   - Search for "Expo Go"
   - Download and install the free app
   - Open Expo Go

2. **On Your Mac (Computer):**
   ```bash
   cd ~/vss-mobile
   npm install
   npm start
   ```
   
   A QR code will appear in your terminal.

3. **On Your Android Phone:**
   - In Expo Go, tap the QR code icon (bottom right)
   - Point camera at your Mac's terminal
   - The app loads automatically

---

### Method 2: Development Server with Emulator

#### iOS Simulator (Mac Only)

**Prerequisites:**
- Xcode installed: `xcode-select --install`

**Steps:**
```bash
cd ~/vss-mobile
npm install
npm run ios
```

The iOS Simulator will launch automatically with the app.

#### Android Emulator

**Prerequisites:**
- Android Studio installed
- Android Emulator created in Android Studio

**Steps:**
```bash
# Start your Android emulator first from Android Studio

# Then in terminal:
cd ~/vss-mobile
npm install
npm run android
```

The app will build and launch on your emulator.

---

### Method 3: Production Build (Standalone APK for Android)

Build an `.apk` file to install directly on Android devices.

**Prerequisites:**
- Expo Account (free at https://expo.dev)
- GitHub access to download from Expo

**Steps:**

1. **Create Expo Account:**
   ```bash
   expo login
   # Or visit https://expo.dev and sign up
   ```

2. **Build APK:**
   ```bash
   cd ~/vss-mobile
   npm run build-android
   ```

3. **Monitor Build:**
   - Expo will start building (takes 10-15 minutes)
   - You'll get a build URL on expo.dev
   - When complete, download the `.apk` file

4. **Install on Android Phone:**
   - Download the `.apk` file to your phone
   - Open file manager and tap the `.apk` file
   - Tap "Install"
   - Grant permissions when prompted
   - App appears on home screen

5. **Alternative: Attach Phone via USB**
   ```bash
   adb install ~/Downloads/vss-2026-scheduler.apk
   ```

---

### Method 4: iOS App Store (Advanced)

Requires Apple Developer Account ($99/year).

**Overview:**
```bash
cd ~/vss-mobile
npm run build-ios
```

Then follow Expo's instructions to submit to App Store. See [Expo iOS Distribution Guide](https://docs.expo.dev/distribution/app-stores/).

---

## Running on Device

### Quick Reference

| Method | iOS | Android | Setup Time | Best For |
|--------|-----|---------|------------|----------|
| **Expo Go App** | ✅ | ✅ | 2 min | Quick testing |
| **iOS Simulator** | ✅ | ❌ | 5 min | Development |
| **Android Emulator** | ❌ | ✅ | 10 min | Development |
| **APK File** | ❌ | ✅ | 15 min | Production |
| **App Store** | ✅ | ❌ | 1 week | Production |

### Recommended Path

1. **Day 1 (Quick Test):** Use Expo Go app (Method 1)
2. **For Conference (Permanent):** Build APK (Method 3)

---

## Using the App

### First Launch

1. **App Opens to Search Tab**
   - You'll see "Search presentations..." text box
   - Lists 1,190 presentations from VSS 2026

2. **Search for Presentations**
   - Type keywords: "attention", "motion", "memory", author names, etc.
   - Results appear instantly as you type

3. **Filter Results**
   - Select a **Day** (Thursday through Tuesday)
   - Select a **Session Type** (Talk, Poster, Symposium, etc.)
   - Results update automatically

### Tabs Explained

#### 🔍 Search Tab
**Purpose:** Find presentations

**How to use:**
1. Type search term in text box
2. Results show matching presentations
3. **Tap a card** to open the full detail view — title, authors, affiliations, and complete abstract
4. Tap **"Add to Schedule"** inside the detail view to save it
5. Blue checkmark on the card indicates it is already saved

**Search across:**
- Presentation title
- Author names
- Affiliations
- Abstract text
- Room location

#### 📌 Schedule Tab
**Purpose:** View and export your selected presentations

**What you see:**
- List of all selected presentations
- Time, room, and author for each
- Quick remove button

**Actions:**
- **Tap a card** to open the full detail view — read the abstract, then remove if needed
- Remove button (✕) on each card to unselect directly
- "Clear Schedule" to remove all

**Export Options:**
- **Google Calendar:** Opens browser, add to your Google Calendar
- **Apple Calendar:** Downloads `.ics` file

#### ⚙️ Settings Tab
**Purpose:** App information and help

**What's included:**
- App version info
- Feature list
- Data statistics
- Help guide
- Links to VSS website and GitHub

---

## Exporting to Calendar

### Exporting to Google Calendar

#### iOS Instructions

1. **In App:**
   - Go to **Schedule** tab
   - Make sure sessions are selected
   - Tap **"📅 Google Calendar"** button

2. **In Safari (Browser Opens):**
   - Google Calendar opens automatically
   - Each session opens as a new event
   - Tap **"Save"** to add to your calendar
   - Repeat for each session

3. **Check Calendar App:**
   - Open Calendar app
   - You should see all events
   - Events include: time, location, title, authors, abstract

#### Android Instructions

1. **In App:**
   - Go to **Schedule** tab
   - Make sure sessions are selected
   - Tap **"📅 Google Calendar"** button

2. **In Chrome (Browser Opens):**
   - Google Calendar opens automatically
   - Each session opens as a new event
   - Tap **"Save"** to add to your calendar
   - Repeat for each session

3. **Check Calendar App:**
   - Open Google Calendar or Calendar app
   - Verify all events are there
   - Events sync across all your devices

### Exporting to Apple Calendar

#### iOS Instructions (iPhone/iPad)

1. **In App:**
   - Go to **Schedule** tab
   - Make sure sessions are selected
   - Tap **"📱 Apple Calendar"** button

2. **File Download:**
   - `.ics` file downloads automatically
   - You'll see a download notification

3. **In Calendar App:**
   - Open **Mail** app or **Files** app
   - Find the downloaded `.ics` file
   - Tap the file
   - Tap **"Add to Calendar"**
   - Select which calendar to add to
   - Tap **"Add"**

4. **Verify Events:**
   - Open Calendar app
   - Look for VSS 2026 events
   - All presentations now in your calendar

#### macOS Instructions (Mac)

1. **In App:**
   - Go to **Schedule** tab
   - Tap **"📱 Apple Calendar"** button

2. **File Download:**
   - `.ics` file downloads to Downloads folder

3. **Import to Calendar:**
   - Finder → Downloads
   - Double-click the `.ics` file
   - Calendar app opens
   - Tap **"Add"**
   - Select calendar
   - Events appear in Calendar

#### Android Instructions

**Note:** Android doesn't have Apple Calendar, but you can import `.ics` files to:
- Google Calendar
- Samsung Calendar
- Microsoft Outlook
- Other calendar apps that support `.ics`

**Steps:**

1. **In App:**
   - Go to **Schedule** tab
   - Tap **"📱 Apple Calendar"** button

2. **File Downloads:**
   - `.ics` file downloads to Downloads folder

3. **Import to Your Calendar App:**
   - Open your calendar app
   - Look for Import option
   - Select the downloaded `.ics` file
   - Events are added to your calendar

---

## What's in Each Calendar Event

When you export presentations, each event includes:

✅ **Time**
- Exact start time (e.g., 4:15 PM)
- Exact end time (e.g., 5:45 PM)
- Automatically converts to your device's timezone

✅ **Location**
- Room or venue name (e.g., "Talk Room 1", "Poster Session Pavilion")
- Shows up in your calendar's location field

✅ **Title**
- Full presentation title
- Example: "VISUAL SEARCH IS DISRUPTED BY PERCEIVED LIGHTING CHANGES"

✅ **Description**
- All author names
- Full abstract (100+ words)
- Gives you context before the presentation

✅ **Conference Details**
- Marked as VSS 2026 event
- Shows presentation ID

---

## Troubleshooting

### "App Won't Start"

**If the app crashes on launch:**

1. **Force Close and Restart:**
   - iOS: Swipe up to force close
   - Android: Long-press app → Force Stop
   - Reopen the app

2. **Clear App Data:**
   - iOS: Settings → General → iPhone Storage → VSS App → Offload App → Reinstall
   - Android: Settings → Apps → VSS App → Storage → Clear Data

3. **Reinstall App:**
   - Delete the app
   - Reinstall from source

### "Can't Find Presentations"

**If search returns no results:**

1. **Check Search Term:**
   - Try simpler words: "motion" instead of "visual motion"
   - Try author last names: "Smith", "Johnson"
   - Try partial words: "percep" for "perception"

2. **Check Filters:**
   - Make sure Day filter is not too restrictive
   - Try "All Days" and "All Types"
   - Click search again

3. **Verify Data Loaded:**
   - Close and reopen app
   - Check that stats show "1,190 presentations available"

### "Calendar Export Not Working"

**Google Calendar:**
- Verify you have Google account
- Check internet connection
- Try different browser if using web version
- Check that cookies are enabled

**Apple Calendar:**
- Make sure `.ics` file downloaded (check Downloads folder)
- Try opening file with Calendar app directly
- Verify you have storage space on device

### "Expo Go App Won't Connect"

**On Your Phone:**
1. Make sure WiFi is ON
2. Make sure you're on the same WiFi network as your computer
3. Restart Expo Go app

**On Your Computer:**
1. Check that `npm start` is still running (should show QR code)
2. Restart the dev server: Press `q` to quit, then `npm start` again
3. Check internet connection

### "QR Code Won't Scan"

1. **Try Camera App First:**
   - Open Camera app
   - Point at QR code
   - Tap the notification that appears
   - Should open Expo Go

2. **Manual Connection:**
   - In Expo Go: tap "Enter URL manually"
   - On your computer terminal, look for URL starting with `exp://`
   - Copy and paste into Expo Go

### "APK Won't Install (Android)"

**Error: "App not installed"**
1. Check device storage (need at least 100 MB free)
2. Enable "Unknown Sources" in Settings → Security
3. Try installing via USB and `adb`

**Error: "Parse error"**
1. Delete the corrupted `.apk`
2. Download again from Expo
3. Ensure file downloaded completely

### "Calendar Events Show Wrong Time"

**Solution:**
1. Check your device's timezone
2. iPhone: Settings → General → Date & Time → Set Automatically
3. Android: Settings → System → Date & time → Automatic date/time
4. Events should update automatically

### "Storage Issues"

**If app says "Not enough storage":**
1. iPhone: Settings → General → iPhone Storage (delete unused apps)
2. Android: Settings → Storage (clear cache)
3. Free up at least 100 MB space

---

## Performance Tips

### Make App Faster

1. **Close Other Apps**
   - Especially other calendar apps while importing
   - Frees up memory

2. **Search Tips**
   - Shorter search terms are faster
   - "vision" instead of "visual neuroscience"
   - Narrow with filters first, then search

3. **Calendar Export**
   - Export in batches of 10-15 events
   - Don't try to export all sessions at once

### Battery Life

1. **Reduce Screen Time:**
   - App doesn't use GPS or location services
   - Low battery impact

2. **WiFi vs. Data:**
   - App works offline after first load
   - Turn off WiFi/Cellular after data loaded

---

## Advanced: Building from Source

### Clone from GitHub

```bash
git clone https://github.com/markwgreenlee/vss-2026-scheduler.git
cd vss-2026-scheduler
npm install
npm start
```

### Development Commands

```bash
# Start development server
npm start

# Run on iOS Simulator
npm run ios

# Run on Android Emulator
npm run android

# Build Android APK
npm run build-android

# Build iOS App
npm run build-ios

# Clear cache and restart
npm start -- --clear
```

---

## Getting Help

### Common Issues Checklist

- [ ] Node.js installed? `node --version`
- [ ] npm installed? `npm --version`
- [ ] Expo Go app installed?
- [ ] On same WiFi network?
- [ ] Phone and computer close to each other?
- [ ] Phone has 100+ MB storage?
- [ ] Latest iOS/Android version?

### Resources

- **Expo Documentation:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **Troubleshooting:** See this guide's Troubleshooting section
- **Report Bugs:** GitHub Issues at the project repository

---

## Next Steps

### Day 1: Test the App
1. Install Expo Go app
2. Run `npm start` in terminal
3. Scan QR code with phone
4. Try searching and selecting presentations

### Day 2: Build Production Version
1. Create Expo account
2. Run `npm run build-android` for permanent APK
3. Install on all your phones

### Day 3: Before Conference
1. Export all sessions you want to attend
2. Add to your calendar
3. Set up any notifications
4. Test that everything syncs

### At Conference
1. Use the app to find sessions
2. Check your calendar for reminders
3. Never miss a presentation!

---

## Summary

| Platform | Quick Test | Permanent Install | Requirements |
|----------|-----------|------------------|--------------|
| **iOS** | Expo Go | Apple App Store | Free / $99/yr |
| **Android** | Expo Go | APK File | Free |

**Recommended:** Use Expo Go for testing, then build APK for conference.

---

**Good luck at VSS 2026! 🎓**

Questions? Check the README.md or open an issue on GitHub.

---

## Note for Developers: Building a Standalone App

The app currently runs inside **Expo Go**, which requires users to install that wrapper app. A developer can build a fully self-contained standalone app (no Expo Go needed) using the GitHub source code:

```bash
git clone https://github.com/markwgreenlee/vss-2026-scheduler.git
cd vss-2026-scheduler
npm install
eas build --platform android   # produces a standalone .apk / .aab
eas build --platform ios       # produces a standalone .ipa
```

**Android** standalone build is straightforward — only a free Expo account is needed (at expo.dev). **iOS** standalone distribution requires an Apple Developer account ($99/year) to sign the app.

For a conference tool, Expo Go is the recommended approach: it requires no paid accounts and attendees can be up and running in under two minutes.
