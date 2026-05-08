import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { DataContext } from '../context/DataContext';
import SessionCard from '../components/SessionCard';

const DAYS = ['', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'];
const TYPES = ['', 'Talk', 'Talk Session', 'Poster Session', 'Symposium', 'Workshop', 'Satellite'];

const SearchScreen = () => {
  const { allSessions, selectedSessions, isLoading, toggleSession, searchSessions } = useContext(DataContext);
  const [query, setQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const results = useMemo(() => {
    return searchSessions(query, selectedDay, selectedType);
  }, [query, selectedDay, selectedType, searchSessions]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search by topic, author, or title..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.filters}>
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Day:</Text>
          <Picker
            selectedValue={selectedDay}
            onValueChange={setSelectedDay}
            style={styles.picker}
          >
            {DAYS.map(day => (
              <Picker.Item key={day || 'all'} label={day || 'All Days'} value={day} />
            ))}
          </Picker>
        </View>

        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Type:</Text>
          <Picker
            selectedValue={selectedType}
            onValueChange={setSelectedType}
            style={styles.picker}
          >
            {TYPES.map(type => (
              <Picker.Item key={type || 'all'} label={type || 'All Types'} value={type} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statsText}>
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {results.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No presentations found</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const isSelected = selectedSessions.some(s => s.id === item.id);
            return (
              <TouchableOpacity onPress={() => toggleSession(item)}>
                <SessionCard session={item} isSelected={isSelected} />
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  searchBox: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    fontSize: 14,
  },
  filters: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  filterGroup: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  statsBox: {
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  statsText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    gap: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
});

export default SearchScreen;
