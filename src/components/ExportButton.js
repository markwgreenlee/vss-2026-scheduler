import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Calendar from 'expo-calendar';

const ExportButton = ({ sessions }) => {
  const getDateForDay = (day) => {
    const dayMap = {
      'Thursday': '20260514',
      'Friday': '20260515',
      'Saturday': '20260516',
      'Sunday': '20260517',
      'Monday': '20260518',
      'Tuesday': '20260519'
    };
    return dayMap[day] || '20260515';
  };

  const convertTo24Hour = (timeStr) => {
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);
    if (!match) return '1000';
    
    let hours = parseInt(match[1]);
    const minutes = match[2];
    const period = match[3].toLowerCase();
    
    if (period === 'pm' && hours !== 12) hours += 12;
    if (period === 'am' && hours === 12) hours = 0;
    
    return `${String(hours).padStart(2, '0')}${minutes}`;
  };

  const parseTime = (timeStr) => {
    const times = timeStr.split('-').map(t => t.trim());
    const startTime = convertTo24Hour(times[0]);
    const endTime = convertTo24Hour(times[1]);
    return [startTime, endTime];
  };

  const exportToGoogle = () => {
    if (sessions.length === 0) {
      Alert.alert('No Sessions', 'Please select sessions to export');
      return;
    }

    try {
      sessions.slice(0, 1).forEach((session, idx) => {
        const date = getDateForDay(session.day);
        const [startTime, endTime] = parseTime(session.time);
        const startDateTime = `${date}T${startTime}`;
        const endDateTime = `${date}T${endTime}`;
        
        const eventParams = new URLSearchParams({
          text: `${session.title} - ${session.authors}`,
          dates: `${startDateTime}/Z${endDateTime}/Z`,
          location: session.room,
          details: `Authors: ${session.authors}\n\nAbstract: ${session.abstract}`
        });
        
        const url = `https://calendar.google.com/calendar/r/eventedit?${eventParams.toString()}`;
        Linking.openURL(url).catch(() => {
          Alert.alert('Error', 'Could not open Google Calendar');
        });
      });

      Alert.alert(
        'Google Calendar',
        `Opening Google Calendar in browser.\n\nYou have ${sessions.length} session${sessions.length !== 1 ? 's' : ''} to add. Add them one at a time.`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to export to Google Calendar');
    }
  };

  const exportToApple = async () => {
    if (sessions.length === 0) {
      Alert.alert('No Sessions', 'Please select sessions to export');
      return;
    }

    try {
      let ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VSS 2026//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:VSS 2026 Schedule
X-WR-TIMEZONE:America/New_York
BEGIN:VTIMEZONE
TZID:America/New_York
BEGIN:STANDARD
DTSTART:20261102T020000
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
TZNAME:EST
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:20260308T020000
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
TZNAME:EDT
END:DAYLIGHT
END:VTIMEZONE
`;

      sessions.forEach((session, idx) => {
        const date = getDateForDay(session.day);
        const [startTime, endTime] = parseTime(session.time);
        const startDateTime = `${date}T${startTime}00`;
        const endDateTime = `${date}T${endTime}00`;

        const sanitizedTitle = session.title.replace(/[\n\r]/g, ' ').substring(0, 100);
        const sanitizedAuthors = session.authors.replace(/[\n\r]/g, ' ').substring(0, 200);
        const sanitizedAbstract = session.abstract.replace(/[\n\r]/g, ' ').substring(0, 500);
        const sanitizedRoom = session.room.replace(/[\n\r]/g, ' ').substring(0, 100);

        ical += `BEGIN:VEVENT
UID:vss-${idx}-${Date.now()}@vss2026.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART;TZID=America/New_York:${startDateTime}
DTEND;TZID=America/New_York:${endDateTime}
SUMMARY:${sanitizedTitle}
DESCRIPTION:Authors: ${sanitizedAuthors}\\n\\nAbstract: ${sanitizedAbstract}
LOCATION:${sanitizedRoom}
END:VEVENT
`;
      });

      ical += `END:VCALENDAR`;

      const fileName = 'vss-2026-schedule.ics';
      const filePath = `${FileSystem.DocumentDirectoryPath}/${fileName}`;
      
      await FileSystem.writeAsStringAsync(filePath, ical, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(filePath, {
          mimeType: 'text/calendar',
          dialogTitle: 'Export VSS 2026 Schedule',
        });
      } else {
        Alert.alert('Success', 'iCal file created. Check your Downloads folder.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to export to Apple Calendar: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={exportToGoogle}
      >
        <Icon name="calendar" size={18} color="#fff" />
        <Text style={styles.buttonText}>Google Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.appleButton]}
        onPress={exportToApple}
      >
        <Icon name="apple" size={18} color="#fff" />
        <Text style={styles.buttonText}>Apple Calendar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  googleButton: {
    backgroundColor: '#4285f4',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ExportButton;
