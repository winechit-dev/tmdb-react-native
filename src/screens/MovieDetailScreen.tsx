import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Movie, MovieDetails } from '../types/Movie';
import { movieService } from '../services/movieService';

interface MovieDetailScreenProps {
  movie: Movie;
  onBack: () => void;
}

const { width, height } = Dimensions.get('window');

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({ movie, onBack }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovieDetails();
  }, [movie.id]);

  const loadMovieDetails = async () => {
    setLoading(true);
    try {
      const details = await movieService.getMovieDetails(movie.id);
      setMovieDetails(details);
    } catch (error) {
      console.error('Error loading movie details:', error);
      Alert.alert('Error', 'Failed to load movie details.');
    } finally {
      setLoading(false);
    }
  };

  const backdropUrl = movieService.getImageUrl(movie.backdrop_path, 'w780');
  const posterUrl = movieService.getImageUrl(movie.poster_path, 'w342');

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading movie details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.movieInfo}>
            <View style={styles.posterContainer}>
              {posterUrl ? (
                <Image source={{ uri: posterUrl }} style={styles.poster} />
              ) : (
                <View style={styles.posterPlaceholder}>
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
              )}
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.releaseDate}>
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </Text>
              
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
                <Text style={styles.voteCount}>({movie.vote_count} votes)</Text>
              </View>

              {movieDetails && (
                <>
                  {movieDetails.runtime > 0 && (
                    <Text style={styles.runtime}>{formatRuntime(movieDetails.runtime)}</Text>
                  )}
                  
                  {movieDetails.genres.length > 0 && (
                    <View style={styles.genresContainer}>
                      {movieDetails.genres.map((genre) => (
                        <View key={genre.id} style={styles.genreTag}>
                          <Text style={styles.genreText}>{genre.name}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </>
              )}
            </View>
          </View>

          <View style={styles.overviewContainer}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>
              {movie.overview || 'No overview available.'}
            </Text>
          </View>

          {movieDetails && (
            <>
              {(movieDetails.budget > 0 || movieDetails.revenue > 0) && (
                <View style={styles.financialsContainer}>
                  <Text style={styles.sectionTitle}>Box Office</Text>
                  {movieDetails.budget > 0 && (
                    <View style={styles.financialRow}>
                      <Text style={styles.financialLabel}>Budget:</Text>
                      <Text style={styles.financialValue}>
                        {formatCurrency(movieDetails.budget)}
                      </Text>
                    </View>
                  )}
                  {movieDetails.revenue > 0 && (
                    <View style={styles.financialRow}>
                      <Text style={styles.financialLabel}>Revenue:</Text>
                      <Text style={styles.financialValue}>
                        {formatCurrency(movieDetails.revenue)}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {movieDetails.production_companies.length > 0 && (
                <View style={styles.productionContainer}>
                  <Text style={styles.sectionTitle}>Production Companies</Text>
                  {movieDetails.production_companies.map((company) => (
                    <Text key={company.id} style={styles.productionCompany}>
                      • {company.name}
                    </Text>
                  ))}
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 50,
    paddingHorizontal: 15,
  },
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
  content: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  movieInfo: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  posterContainer: {
    marginRight: 15,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  posterPlaceholder: {
    width: 120,
    height: 180,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 12,
  },
  detailsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  voteCount: {
    fontSize: 14,
    color: '#666',
  },
  runtime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  genreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  overviewContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  financialsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  financialLabel: {
    fontSize: 16,
    color: '#666',
  },
  financialValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  productionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productionCompany: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default MovieDetailScreen;
