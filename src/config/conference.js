/**
 * Conference configuration
 *
 * Everything that differs between the ECVP, VSS and IMRF builds of this app.
 * The modules under src/utils/ read from here and are otherwise identical
 * across the three repositories, so porting a fix means copying the utils
 * and editing only this file.
 */

const conference = {
  // --- Meeting identity ----------------------------------------------------
  // What the Home screen says above the fold. Kept here rather than in the
  // screen so that next year's build is a config edit, not a code edit.
  meetingName: 'VSS 2026',
  societyName: 'Vision Sciences Society',
  meetingNumber: '26th Annual Meeting',
  venueName: 'TradeWinds Island Resorts',
  cityLong: 'St. Pete Beach, FL',
  dateRange: 'May 15 – 19, 2026',
  // First and last programme dates, as ISO. Home counts down to the first and
  // switches to its closing state after the last; both are also how "Day 2" is
  // worked out. They are deliberately not derived from the data, so a build
  // with a partial programme still knows when the meeting runs.
  firstDate: '2026-05-15',
  lastDate: '2026-05-19',

  // --- Venue ---------------------------------------------------------------
  // Keys must match the `room` values in the data exactly — that field is an
  // identifier, so a room missing here simply shows without a location rather
  // than breaking. `label` is how the room reads in prose; `location` is the
  // part only the venue knows (ballroom name, floor) and is omitted from the
  // UI while empty.
  rooms: {
    'TALK ROOM 1': { label: 'Talk Room 1', location: '' },
    'TALK ROOM 2': { label: 'Talk Room 2', location: '' },
    'PAVILION': { label: 'Pavilion', location: '' },
    'BANYAN BREEZEWAY': { label: 'Banyan Breezeway', location: '' },
  },
  // Floor plans, in the order they should appear. Metro cannot resolve a
  // require() built at runtime, so each image is named here:
  //   { id: 'floor-3', name: 'Floor 3',
  //     image: require('../../assets/floors/floor-3.png') }
  // While this is empty the Venue screen shows the room directory instead.
  floors: [],
  // Late changes worth interrupting the Home screen for — a moved room, a
  // cancelled session. Shown as an amber banner, newest first:
  //   { id: 'room-change-1', title: 'Room change',
  //     body: 'Attention 2 has moved to Talk Room 2.' }
  announcements: [],

  // --- Sharing -------------------------------------------------------------
  // Tags a share link so a code from a sibling app is rejected with a message
  // rather than half-read. Must be unique across the three apps.
  shareTag: 'vss26',
  // Only used where there is no window.location to read (the native build).
  shareBaseUrl: 'https://markwgreenlee.github.io/vss-2026-scheduler/',

  // --- Time ----------------------------------------------------------------
  // Times in the data are wall-clock times in this zone. Everything the app
  // shows or exports is reckoned here rather than in the device's zone, so a
  // phone still on home time is not misled.
  timeZone: 'America/New_York',
  // Fallback only, for platforms whose Intl cannot do timezone-aware
  // formatting. Daylight saving makes this wrong half the year, so it is a
  // last resort: the offset in force during the conference itself.
  fallbackUtcOffsetMinutes: -240,
  // Defensive default for an entry with no date.
  fallbackDate: '2026-05-15',
  // Named in the live view, so nobody is told the clock is in another city.
  cityName: 'St. Pete Beach',

  // --- Programme shape -----------------------------------------------------
  // Order the filter chips appear in. Kinds present in the data but missing
  // here are appended alphabetically rather than hidden.
  kindOrder: ['symposium', 'talk', 'poster'],
  // Irregular plurals and anything that should not read as its raw field
  // value. Unlisted kinds are humanised automatically ('symposium_overview'
  // becomes 'Symposium overview' / 'Symposium overviews').
  kindLabels: {
    symposium: { one: 'Symposium', many: 'Symposia' },
    talk: { one: 'Talk', many: 'Talks' },
    poster: { one: 'Poster', many: 'Posters' },
  },
  // Kinds whose calendar event spans the whole advertised block instead of a
  // single presentation slot.
  fullBlockKinds: [],
  // Length of one presentation slot, used to close a session block when the
  // data gives no session_end.
  talkMinutes: 15,
  // VSS poster titles are bare topics with no session prefix, and two halls run
  // at the same hour. Returning a constant groups each hall's posters into one
  // block (the room is part of the block key), rather than one block per topic.
  posterSessionName: () => 'Poster session',
  // Kinds that are really part of another kind. An aliased kind gets no filter
  // chip of its own and is matched by its target's chip, and its entries join
  // the target's session block. Cards keep their own badge.
  kindAlias: {},

  // --- Calendar export -----------------------------------------------------
  icsFileName: 'vss-2026-schedule.ics',
  scheduleFileName: 'vss-2026-my-schedule.json',
  icsProductId: '-//VSS 2026 Schedule Organizer//EN',
  // Makes event UIDs stable and unique, so re-importing updates events rather
  // than duplicating them, and two apps' events never collide.
  uidDomain: 'vss-2026-scheduler',

  // --- Local storage -------------------------------------------------------
  // All three apps are served from markwgreenlee.github.io, so they share one
  // localStorage. Without a prefix they overwrite each other's schedules.
  storagePrefix: 'vss-2026',
};

export default conference;
