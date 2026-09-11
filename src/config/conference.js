/**
 * Conference configuration
 *
 * Everything that differs between the ECVP, VSS and IMRF builds of this app.
 * The modules under src/utils/ read from here and are otherwise identical
 * across the three repositories, so porting a fix means copying the utils
 * and editing only this file.
 */

const conference = {
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
