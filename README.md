# 🎓 VSS 2026 Schedule Organizer - Mobile App

A React Native mobile application for iOS and Android to search and organize your Vision Sciences Society conference schedule for May 15-19, 2026.

## Features

✅ **190 Presentations** from the VSS abstract book  
✅ **Full-text Search** by topic, author, title, or abstract  
✅ **Filter by Day & Session Type** (Talk, Poster, Symposium, etc.)  
✅ **Build Personal Schedule** - tap to select/deselect  
✅ **Calendar Integration**:
   - Export to Google Calendar (open in browser)
   - Export to Apple Calendar (iCal format)  
✅ **Native Mobile UI** - optimized for iOS and Android  
✅ **Offline Support** - works without internet connection  

## Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org)
- **Expo CLI** - Install with: `npm install -g expo-cli`
- **Physical Device or Emulator**:
  - **iOS**: Xcode + iOS Simulator or physical iPhone with Expo Go app
  - **Android**: Android Studio + Android Emulator or physical Android with Expo Go app

## Quick Start

### 1. Install Dependencies

```bash
cd vss-mobile
npm install
```

### 2. Start the Development Server

```bash
npm start
```

This will open the Expo CLI. You'll see a QR code in the terminal.

### 3. Run on Device or Emulator

**Option A: Physical Device (Easiest)**
- Download the free "Expo Go" app from App Store (iOS) or Google Play (Android)
- Scan the QR code from terminal with your phone camera
- App opens automatically in Expo Go

**Option B: Android Emulator**
```bash
npm run android
```

**Option C: iOS Simulator (Mac only)**
```bash
npm run ios
```

## Building for Production

### Android APK

```bash
npm run build-android
```

This creates an `.apk` file you can install directly on Android devices.

**Requirements**: Requires Expo Account (free at https://expo.dev)

Steps:
1. Create Expo account: `expo login`
2. Build APK: `npm run build-android`
3. Download APK from Expo dashboard
4. Install on Android device (adb or file transfer)

### iOS App

```bash
npm run build-ios
```

**Requirements**: 
- Expo Account (free)
- Apple Developer Account ($99/year) - for production builds only
- Xcode installed on Mac

**Note**: For testing on your own iPhone, use Expo Go (free) instead of building.

## Project Structure

```
vss-mobile/
├── App.js                          # Main app entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── assets/
│   └── vss-data.json              # 190 presentations data
├── src/
│   ├── screens/
│   │   ├── SearchScreen.js        # Search & filter presentations
│   │   ├── ScheduleScreen.js      # My schedule & export
│   │   └── SettingsScreen.js      # App info & help
│   ├── components/
│   │   ├── SessionCard.js         # Presentation card
│   │   ├── SelectedSessionCard.js # Selected item card
│   │   └── ExportButton.js        # Calendar export buttons
│   ├── context/
│   │   └── DataContext.js         # Global data state management
│   └── utils/
│       └── (helper functions)
└── README.md
```

## How to Use

### Search & Browse

1. **Search Tab**: Type keywords to find presentations
   - Search by topic: "attention", "motion", "memory"
   - Search by author: "Smith", "Johnson"
   - Search by title: "visual", "perception"

2. **Filter Results**:
   - Select a **Day**: Thursday through Tuesday
   - Select a **Session Type**: Talk, Poster, Symposium, Workshop, etc.

3. **View Details**: Each card shows:
   - Time and room location
   - Presentation title
   - Authors
   - Abstract preview

### Build Your Schedule

1. **Select Sessions**: Tap any presentation to add to schedule
2. **View Selection**: Blue checkmark indicates selected items
3. **Review Schedule Tab**: See all selected sessions organized
4. **Remove Items**: Tap remove button on selected items

### Export to Calendar

#### Google Calendar
1. Go to **Schedule** tab
2. Tap **"📅 Google Calendar"** button
3. Browser opens Google Calendar
4. Add events one by one to your calendar

#### Apple Calendar (iPhone/iPad/Mac)
1. Go to **Schedule** tab  
2. Tap **"📱 Apple Calendar"** button
3. File downloads (`.ics` format)
4. Open the file → Tap **"Add to Calendar"**
5. Events appear in your Calendar app

## Each Calendar Event Includes

- ⏰ **Exact Time** - Start and end time
- 📍 **Location** - Room/venue name
- 📝 **Title** - Presentation title
- 👥 **Authors** - All author names
- 📋 **Abstract** - Full presentation abstract

## Troubleshooting

### App Won't Start
```bash
npm install
npm start
```

### Can't connect to development server
- Make sure you're on the same WiFi network
- Try restarting the Expo server
- Check that Node.js is installed: `node --version`

### Data not loading
- Check that `vss-data.json` exists in `assets/` folder
- Verify the JSON file is valid: use a JSON validator

### Calendar export not working
- **Google Calendar**: Check browser can access google.com
- **Apple Calendar**: Ensure iOS 12+ (for iCal support)
- Try closing and reopening the app

### Build fails
- Delete `node_modules` and run `npm install` again
- Clear Expo cache: `expo doctor` then `npm start -- --clear`
- Update Node.js to latest version

## Performance Tips

- The app caches selected sessions in device storage
- Search is optimized for quick filtering of 190 presentations
- All data is stored locally - no internet required after first load

## Version History

**v1.0.0** (2026-05-08)
- Initial release
- 190 presentations
- Full search functionality
- Calendar export (Google & Apple)

## Credits

Built with:
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform
- **React Navigation** - Tab navigation
- **AsyncStorage** - Local data persistence

## License

MIT - See LICENSE file for details

## Support

- **Website**: https://www.visionsciences.org
- **GitHub**: https://github.com/markwgreenlee/vss-2026-scheduler
- **Questions**: Open an issue on GitHub

---

**Have a great conference! 🎉**

VSS 2026 | May 15-19, 2026 | Fort Lauderdale, FL
