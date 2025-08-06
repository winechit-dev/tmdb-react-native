import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ChipProps {
  title: string;
  isSelected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  selectedStyle?: ViewStyle;
  selectedTextStyle?: TextStyle;
}

const Chip: React.FC<ChipProps> = ({
  title,
  isSelected = false,
  onPress,
  style,
  textStyle,
  selectedStyle,
  selectedTextStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        style,
        isSelected && styles.selectedChip,
        isSelected && selectedStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.chipText,
          textStyle,
          isSelected && styles.selectedChipText,
          isSelected && selectedTextStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: '#f1f3f4',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 60,
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedChip: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  chipText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  selectedChipText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Chip;
