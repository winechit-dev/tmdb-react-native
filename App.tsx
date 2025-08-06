/**
 * TMDB React Native Movie App
 * 
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, useColorScheme, Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Movie } from './src/types/Movie';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import ErrorBoundary from './src/components/ErrorBoundary';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMoviePress = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleBackPress = () => {
    setSelectedMovie(null);
  };

  const AppContent = () => (
    <ErrorBoundary>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={Platform.OS === 'android' ? '#f8f9fa' : 'transparent'}
        translucent={Platform.OS === 'ios'}
      />
      {selectedMovie ? (
        <MovieDetailScreen movie={selectedMovie} onBack={handleBackPress} />
      ) : (
        <MovieListScreen onMoviePress={handleMoviePress} />
      )}
    </ErrorBoundary>
  );

  // Use SafeAreaProvider only on iOS, regular View on Android
  if (Platform.OS === 'ios') {
    return (
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AppContent />
    </View>
  );
}

export default App;
