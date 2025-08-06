import { useState, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { Movie, MovieResponse } from '../types/Movie';
import { movieService } from '../services/movieService';

export type MovieCategory = 'popular' | 'top_rated' | 'now_playing' | 'search';

export interface MovieListState {
  movies: Movie[];
  loading: boolean;
  searchQuery: string;
  currentCategory: MovieCategory;
  page: number;
  hasMore: boolean;
  error: string | null;
}

export interface MovieListActions {
  loadMovies: (reset?: boolean) => Promise<void>;
  handleSearch: () => void;
  handleCategoryPress: (category: Exclude<MovieCategory, 'search'>) => void;
  handleLoadMore: () => void;
  setSearchQuery: (query: string) => void;
  clearError: () => void;
}

export const useMovieListViewModel = (): MovieListState & MovieListActions => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState<MovieCategory>('popular');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = useCallback(async (reset: boolean = false, pageToLoad?: number) => {
    if (loading) {
      console.log('Load movies called but already loading');
      return;
    }

    setLoading(true);
    setError(null);
    
    const currentPage = reset ? 1 : (pageToLoad || page);
    
    console.log('Loading movies:', { reset, currentPage, currentCategory, searchQuery });
    
    try {
      let response: MovieResponse;

      if (currentCategory === 'search' && searchQuery.trim()) {
        response = await movieService.searchMovies(searchQuery, currentPage);
      } else {
        switch (currentCategory) {
          case 'popular':
            response = await movieService.getPopularMovies(currentPage);
            break;
          case 'top_rated':
            response = await movieService.getTopRatedMovies(currentPage);
            break;
          case 'now_playing':
            response = await movieService.getNowPlayingMovies(currentPage);
            break;
          default:
            return;
        }
      }

      console.log('Movies loaded:', { 
        resultsCount: response.results.length, 
        currentPage, 
        totalPages: response.total_pages 
      });

      if (reset) {
        setMovies(response.results);
        setPage(2);
      } else {
        setMovies(prev => [...prev, ...response.results]);
        const nextPage = currentPage + 1;
        setPage(nextPage);
      }

      setHasMore(currentPage < response.total_pages);
    } catch (error) {
      const errorMessage = 'Failed to load movies. Please check your internet connection and API key.';
      setError(errorMessage);
      console.error('Error loading movies:', error);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loading, page, currentCategory, searchQuery]);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      setCurrentCategory('search');
      setPage(1);
      setHasMore(true);
      loadMovies(true);
    }
  }, [searchQuery, loadMovies]);

  const handleCategoryPress = useCallback((category: Exclude<MovieCategory, 'search'>) => {
    setCurrentCategory(category);
    setSearchQuery('');
    setPage(1);
    setError(null);
    // Reset hasMore when changing categories
    setHasMore(true);
  }, []);

  const handleLoadMore = useCallback(() => {
    console.log('Load more triggered:', { hasMore, loading, page });
    if (hasMore && !loading) {
      loadMovies(false, page);
    }
  }, [hasMore, loading, loadMovies, page]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    movies,
    loading,
    searchQuery,
    currentCategory,
    page,
    hasMore,
    error,
    // Actions
    loadMovies,
    handleSearch,
    handleCategoryPress,
    handleLoadMore,
    setSearchQuery,
    clearError,
  };
};
