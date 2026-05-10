import React, { useContext } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { DataContext } from '../context/DataContext';
import SelectedSessionCard from '../components/SelectedSessionCard';
import ExportButton from '../components/ExportButton';

const ScheduleScreen = () => {
  const { selectedSessions, removeSession, clearAll } = useContext(DataContext);

  const handleClearAll = () => {
    Alert.alert(
      'Clear Schedule',
      'Are you sure you want to clear all selected sessions?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: clearAll,
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Schedule</Text>
        <Text style={styles.count}>{selectedSessions.length} session{selectedSessions.length !== 1 ? 's' : ''}</Text>
      </View>

      {selectedSessions.length === 0 ? (
        <ScrollView contentContainerStyle={styles.emptyContainer}>
          <View style={styles.emptyBox}>
            <Icon name="calendar-blank" size={48} color="#ddd" />
            <Text style={styles.emptyText}>No sessions selected yet</Text>
            <Text style={styles.emptySubtext}>
              Go to Search and click on presentations to add them to your schedule
            </Text>
          </View>
        </ScrollView>
      ) : (
        <>
          <FlatList
            data={selectedSessions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <SelectedSessionCard
                session={item}
                onRemove={() => removeSession(item.id)}
              />
            )}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            nestedScrollEnabled={true}
          />

          <View style={styles.exportSection}>
            <ExportButton sessions={selectedSessions} />
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearAll}
            >
              <Icon name="delete" size={18} color="#fff" />
              <Text style={styles.clearText}>Clear Schedule</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  count: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
  list: {
    padding: 12,
    gap: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 6,
    textAlign: 'center',
  },
  exportSection: {
    padding: 12,
    gap: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  clearButton: {
    flexDirection: 'row',
    backgroundColor: '#999',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  clearText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ScheduleScreen;
