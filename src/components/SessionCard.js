import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SessionCard = ({ session, isSelected }) => {
  return (
    <View style={[styles.card, isSelected && styles.selectedCard]}>
      <View style={styles.header}>
        <View style={styles.timeRoom}>
          <Text style={styles.time}>{session.time}</Text>
          <Text style={styles.room}>📍 {session.room}</Text>
        </View>
        {isSelected && (
          <Icon name="check-circle" size={24} color="#667eea" />
        )}
      </View>

      <Text style={styles.title} numberOfLines={2}>{session.title}</Text>

      {session.authors && (
        <Text style={styles.authors} numberOfLines={1}>
          {session.authors}
        </Text>
      )}

      {session.abstract && (
        <Text style={styles.abstract} numberOfLines={2}>
          {session.abstract}
        </Text>
      )}

      <View style={styles.footer}>
        <Text style={styles.day}>{session.day}</Text>
        <Text style={styles.type}>{session.type}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 0,
  },
  selectedCard: {
    borderColor: '#667eea',
    backgroundColor: '#f0f4ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  timeRoom: {
    flex: 1,
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    color: '#667eea',
    marginBottom: 2,
  },
  room: {
    fontSize: 11,
    color: '#666',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  authors: {
    fontSize: 11,
    color: '#666',
    marginBottom: 6,
  },
  abstract: {
    fontSize: 11,
    color: '#999',
    marginBottom: 8,
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
  },
  day: {
    fontSize: 10,
    color: '#fff',
    backgroundColor: '#667eea',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  type: {
    fontSize: 10,
    color: '#fff',
    backgroundColor: '#999',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default SessionCard;
