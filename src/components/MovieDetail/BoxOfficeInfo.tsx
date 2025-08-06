import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MovieDetails } from '../../types/Movie';

interface BoxOfficeInfoProps {
  movieDetails: MovieDetails;
  formatCurrency: (amount: number) => string;
}

const BoxOfficeInfo: React.FC<BoxOfficeInfoProps> = ({ movieDetails, formatCurrency }) => {
  if (movieDetails.budget <= 0 && movieDetails.revenue <= 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Box Office</Text>
      {movieDetails.budget > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Budget:</Text>
          <Text style={styles.value}>{formatCurrency(movieDetails.budget)}</Text>
        </View>
      )}
      {movieDetails.revenue > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Revenue:</Text>
          <Text style={styles.value}>{formatCurrency(movieDetails.revenue)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default BoxOfficeInfo;
