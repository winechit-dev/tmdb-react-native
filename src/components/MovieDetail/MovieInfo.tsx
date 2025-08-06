import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Movie, MovieDetails } from '../../types/Movie';

interface MovieInfoProps {
  movie: Movie;
  movieDetails: MovieDetails | null;
  posterUrl: string | null;
  formatRuntime: (minutes: number) => string;
}

const MovieInfo: React.FC<MovieInfoProps> = ({
  movie,
  movieDetails,
  posterUrl,
  formatRuntime,
}) => (
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
);

const styles = StyleSheet.create({
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
});

export default MovieInfo;
