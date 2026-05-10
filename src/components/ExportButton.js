import React, { useState } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet, Alert, Linking,
  Modal, SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import * as Calendar from 'expo-calendar';

const toTitleCase = (str) =>
  str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

const ExportButton = ({ sessions }) => {
  const [googleIndex, setGoogleIndex] = useState(null); // null = modal hidden

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

  const openGoogleSession = (index) => {
    const session = sessions[index];
    const authors = authorsString(session);
    const [startDateTime, endDateTime] = getStartEnd(session);
    const eventParams = new URLSearchParams({
      text: session.room ? `[${toTitleCase(session.room)}] ${session.title}` : session.title,
      dates: `${startDateTime}/${endDateTime}`,
      location: session.room || '',
      details: `Authors: ${authors}\n\nAbstract: ${session.abstract || ''}`,
    });
    const url = `https://calendar.google.com/calendar/r/eventedit?${eventParams.toString()}`;
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'Could not open Google Calendar')
    );
  };

  const exportToGoogle = () => {
    if (sessions.length === 0) {
      Alert.alert('No Sessions', 'Please select sessions to export');
      return;
    }
    setGoogleIndex(0);
    openGoogleSession(0);
  };

  const handleGoogleNext = () => {
    const next = googleIndex + 1;
    if (next >= sessions.length) {
      setGoogleIndex(null);
      Alert.alert('All Done', `All ${sessions.length} session${sessions.length !== 1 ? 's' : ''} added to Google Calendar.`);
    } else {
      setGoogleIndex(next);
      openGoogleSession(next);
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
      const defaultCal =
        calendars.find(c => c.allowsModifications && c.source?.name === 'iCloud') ||
        calendars.find(c => c.allowsModifications && c.source?.name === 'Default') ||
        calendars.find(c => c.allowsModifications);
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
        const endDate   = new Date(`${date}T${String(endH).padStart(2,'0')}:${String(endM).padStart(2,'0')}:00`);
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

  const isLast = googleIndex !== null && googleIndex === sessions.length - 1;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={exportToGoogle}>
        <Icon name="calendar" size={18} color="#fff" />
        <Text style={styles.buttonText}>Google Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.appleButton]} onPress={exportToApple}>
        <Icon name="apple" size={18} color="#fff" />
        <Text style={styles.buttonText}>Apple Calendar</Text>
      </TouchableOpacity>

      {/* Persistent modal so Android doesn't lose it when app backgrounds */}
      <Modal
        visible={googleIndex !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setGoogleIndex(null)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Session {googleIndex !== null ? googleIndex + 1 : ''} of {sessions.length}
            </Text>
            <Text style={styles.modalBody}>
              {isLast
                ? 'Last session — save it in Google Calendar and you\'re done!'
                : 'Save this event in Google Calendar, then come back here and tap Next.'}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.stopBtn}
                onPress={() => setGoogleIndex(null)}
              >
                <Text style={styles.stopText}>Stop</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextBtn}
                onPress={handleGoogleNext}
              >
                <Text style={styles.nextText}>{isLast ? 'Done' : 'Next →'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 10 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  googleButton: { backgroundColor: '#4285f4' },
  appleButton:  { backgroundColor: '#000' },
  buttonText:   { color: '#fff', fontWeight: '600', fontSize: 14 },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 24,
    width: '100%',
    maxWidth: 360,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  stopBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  stopText: { color: '#666', fontWeight: '600' },
  nextBtn: {
    flex: 2,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#4285f4',
    alignItems: 'center',
  },
  nextText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

export default ExportButton;
