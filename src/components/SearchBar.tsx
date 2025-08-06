import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Search movies...',
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.clearButton} onPress={() => onChangeText('')}>
        <View style={styles.clearIcon}>
          <View style={styles.clearLine1} />
          <View style={styles.clearLine2} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 5,
  },
  clearIcon: {
    width: 16,
    height: 16,
    position: 'relative',
  },
  clearLine1: {
    position: 'absolute',
    top: 7,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#999',
    transform: [{ rotate: '45deg' }],
  },
  clearLine2: {
    position: 'absolute',
    top: 7,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#999',
    transform: [{ rotate: '-45deg' }],
  },
});

export default SearchBar;
