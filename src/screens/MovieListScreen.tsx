import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Platform,
    SafeAreaView
} from 'react-native';
import { Movie } from '../types/Movie';
import { useMovieListViewModel } from '../hooks';
import SearchBar from '../components/SearchBar';
import { LoadingState, CategorySelector, MovieGrid } from '../components/MovieList';

interface MovieListScreenProps {
    onMoviePress: (movie: Movie) => void;
}

const MovieListScreen: React.FC<MovieListScreenProps> = ({ onMoviePress }) => {
    const {
        movies,
        loading,
        searchQuery,
        currentCategory,
        hasMore,
        loadMovies,
        handleSearch,
        handleCategoryPress,
        handleLoadMore,
        setSearchQuery,
    } = useMovieListViewModel();

    // Android status bar height fallback
    const statusBarHeight = Platform.OS === 'android'
        ? StatusBar.currentHeight || 0
        : 0;

    useEffect(() => {
        loadMovies(true);
    }, [currentCategory, loadMovies]);

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#f8f9fa"
                translucent={false}
            />
            <SafeAreaView style={styles.container}>
                <View style={[styles.content, { paddingTop: statusBarHeight }]}>
                    <Text style={styles.header}>Movie Database</Text>

                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmit={handleSearch}
                    />

                    <CategorySelector
                        currentCategory={currentCategory}
                        onCategoryPress={handleCategoryPress}
                    />

                    {loading && movies.length === 0 ? (
                        <LoadingState message="Loading movies..." />
                    ) : (
                        <MovieGrid
                            movies={movies}
                            loading={loading}
                            hasMore={hasMore}
                            onMoviePress={onMoviePress}
                            onLoadMore={handleLoadMore}
                        />
                    )}
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    content: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        paddingVertical: 15,
    },
});

export default MovieListScreen;
