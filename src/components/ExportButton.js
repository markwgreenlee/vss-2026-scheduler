import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Linking } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as Calendar from 'expo-calendar';

const toTitleCase = (str) =>
  str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

const ExportButton = ({ sessions }) => {
  const authorsString = (session) =>
    Array.isArray(session.authors)
      ? session.authors.join(', ')
      : (session.authors || '');

  const getStartEnd = (session) => {
    const date = (session.date || '').replace(/-/g, '');
    const start = (session.time || session.session_start || '09:00').replace(':', '');
    const end = (session.session_end || '').replace(':', '');
    const endTime = end || String(parseInt(start) + 15).padStart(4, '0');
    return [`${date}T${start}00`, `${date}T${endTime}00`];
  };

  const exportToGoogle = () => {
    if (sessions.length === 0) {
      Alert.alert('No Sessions', 'Please select sessions to export');
      return;
    }

    try {
      const session = sessions[0];
      const authors = authorsString(session);
      const [startDateTime, endDateTime] = getStartEnd(session);

      const eventParams = new URLSearchParams({
        text: session.room ? `[${toTitleCase(session.room)}] ${session.title}` : session.title,
        dates: `${startDateTime}/${endDateTime}`,
        location: session.room || '',
        details: `Authors: ${authors}\n\nAbstract: ${session.abstract || ''}`,
      });

      const url = `https://calendar.google.com/calendar/r/eventedit?${eventParams.toString()}`;
      Linking.openURL(url).catch(() => {
        Alert.alert('Error', 'Could not open Google Calendar');
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
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow calendar access in Settings to export events.');
        return;
      }

      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCal = calendars.find(c => c.allowsModifications && c.source?.name === 'iCloud')
        || calendars.find(c => c.allowsModifications && c.source?.name === 'Default')
        || calendars.find(c => c.allowsModifications);

      if (!defaultCal) {
        Alert.alert('Error', 'No writable calendar found on this device.');
        return;
      }

      let created = 0;
      for (const session of sessions) {
        const authors = authorsString(session);
        const date = session.date || '2026-05-15';
        const startTime = session.time || session.session_start || '09:00';
        const endTime = session.session_end || '';

        const [startH, startM] = startTime.split(':').map(Number);
        const [endH, endM] = endTime ? endTime.split(':').map(Number) : [startH, startM + 15];

        const startDate = new Date(`${date}T${String(startH).padStart(2,'0')}:${String(startM).padStart(2,'0')}:00`);
        const endDate = new Date(`${date}T${String(endH).padStart(2,'0')}:${String(endM).padStart(2,'0')}:00`);

        await Calendar.createEventAsync(defaultCal.id, {
          title: session.room ? `[${toTitleCase(session.room)}] ${session.title}` : session.title,
          startDate,
          endDate,
          location: session.room || '',
          notes: `Authors: ${authors}\n\nSession: ${session.session_title || ''}\n\nAbstract: ${session.abstract || ''}`,
          timeZone: 'America/New_York',
        });
        created++;
      }

      Alert.alert('Success', `${created} event${created !== 1 ? 's' : ''} added to Apple Calendar.`);
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
