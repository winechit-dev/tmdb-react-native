/**
 * TMDB React Native Movie App
 * 
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
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

  return (
    <ErrorBoundary>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {selectedMovie ? (
        <MovieDetailScreen movie={selectedMovie} onBack={handleBackPress} />
      ) : (
        <MovieListScreen onMoviePress={handleMoviePress} />
      )}
    </ErrorBoundary>
  );
}

export default App;
