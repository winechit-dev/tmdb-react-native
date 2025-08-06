import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { Movie, MovieDetails } from '../types/Movie';
import { movieService } from '../services/movieService';

export interface MovieDetailState {
  movieDetails: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

export interface MovieDetailActions {
  loadMovieDetails: (movieId: number) => Promise<void>;
  clearError: () => void;
  getImageUrl: (path: string | null, size: string) => string | null;
  formatRuntime: (minutes: number) => string;
  formatCurrency: (amount: number) => string;
}

export const useMovieDetailViewModel = (movie: Movie): MovieDetailState & MovieDetailActions => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovieDetails = useCallback(async (movieId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const details = await movieService.getMovieDetails(movieId);
      setMovieDetails(details);
    } catch (error) {
      const errorMessage = 'Failed to load movie details.';
      setError(errorMessage);
      console.error('Error loading movie details:', error);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getImageUrl = useCallback((path: string | null, size: string): string | null => {
    return movieService.getImageUrl(path, size);
  }, []);

  const formatRuntime = useCallback((minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }, []);

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  // Auto-load movie details when component mounts or movie changes
  useEffect(() => {
    if (movie?.id) {
      loadMovieDetails(movie.id);
    }
  }, [movie?.id, loadMovieDetails]);

  return {
    // State
    movieDetails,
    loading,
    error,
    // Actions
    loadMovieDetails,
    clearError,
    getImageUrl,
    formatRuntime,
    formatCurrency,
  };
};
