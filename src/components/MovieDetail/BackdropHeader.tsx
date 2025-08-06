import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface BackdropHeaderProps {
  backdropUrl: string | null;
  onBack: () => void;
}

const { height } = Dimensions.get('window');

const BackdropHeader: React.FC<BackdropHeaderProps> = ({ backdropUrl, onBack }) => (
  <View style={styles.backdropContainer}>
    {backdropUrl ? (
      <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
    ) : (
      <View style={styles.backdropPlaceholder}>
        <Text style={styles.placeholderText}>No Image</Text>
      </View>
    )}
    <View style={styles.backdropOverlay} />
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  backdropContainer: {
    position: 'relative',
    height: height * 0.3,
  },
  backdrop: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backdropPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  placeholderText: {
    color: '#666',
    fontSize: 12,
  },
});

export default BackdropHeader;
