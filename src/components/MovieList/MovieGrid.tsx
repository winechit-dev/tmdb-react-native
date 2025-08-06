import React from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Movie } from '../../types/Movie';
import MovieCard from '../MovieCard';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  hasMore: boolean;
  onMoviePress: (movie: Movie) => void;
  onLoadMore: () => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  loading,
  hasMore,
  onMoviePress,
  onLoadMore,
}) => {
  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={onMoviePress} />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  const handleEndReached = () => {
    console.log('FlatList onEndReached triggered');
    onLoadMore();
  };

  return (
    <FlatList
      data={movies}
      renderItem={renderMovieItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
    gap: 10,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default MovieGrid;
