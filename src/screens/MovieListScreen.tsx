import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ScrollView,
    StatusBar,
    Platform,
    SafeAreaView
} from 'react-native';
import { Movie, MovieResponse } from '../types/Movie';
import { movieService } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Chip from '../components/Chip';

interface MovieListScreenProps {
    onMoviePress: (movie: Movie) => void;
}

const MovieListScreen: React.FC<MovieListScreenProps> = ({ onMoviePress }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentCategory, setCurrentCategory] = useState<'popular' | 'top_rated' | 'now_playing' | 'search'>('popular');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Android status bar height fallback
    const statusBarHeight = Platform.OS === 'android'
        ? StatusBar.currentHeight || 0
        : 0;

    const categories = [
        { key: 'popular', title: 'Popular' },
        { key: 'top_rated', title: 'Top Rated' },
        { key: 'now_playing', title: 'Now Playing' },
    ] as const;

    useEffect(() => {
        loadMovies(true);
    }, [currentCategory]);

    const loadMovies = async (reset: boolean = false) => {
        if (loading) return;

        setLoading(true);
        try {
            const currentPage = reset ? 1 : page;
            let response: MovieResponse;

            if (currentCategory === 'search' && searchQuery) {
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

            if (reset) {
                setMovies(response.results);
                setPage(2);
            } else {
                setMovies(prev => [...prev, ...response.results]);
                setPage(prev => prev + 1);
            }

            setHasMore(currentPage < response.total_pages);
        } catch (error) {
            console.error('Error loading movies:', error);
            Alert.alert('Error', 'Failed to load movies. Please check your internet connection and API key.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setCurrentCategory('search');
            setPage(1);
            loadMovies(true);
        }
    };

    const handleCategoryPress = (category: 'popular' | 'top_rated' | 'now_playing') => {
        setCurrentCategory(category);
        setSearchQuery('');
        setPage(1);
    };

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

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            loadMovies();
        }
    };

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

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoriesContainer}
                        contentContainerStyle={styles.categoriesContent}
                    >
                        {categories.map((category) => (
                            <Chip
                                key={category.key}
                                title={category.title}
                                isSelected={currentCategory === category.key}
                                onPress={() => handleCategoryPress(category.key)}
                            />
                        ))}
                    </ScrollView>

                    {loading && movies.length === 0 ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#007AFF" />
                            <Text style={styles.loadingText}>Loading movies...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={movies}
                            renderItem={renderMovieItem}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            columnWrapperStyle={styles.row}
                            contentContainerStyle={styles.listContainer}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={renderFooter}
                            showsVerticalScrollIndicator={false}
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
    categoriesContainer: {
        minHeight: 50,
    },
    categoriesContent: {
        paddingHorizontal: 15,
    },
    listContainer: {
        padding: 15,
        paddingTop: 10,
    },
    row: {
        justifyContent: 'space-between',
        gap: 10,
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
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
});

export default MovieListScreen;
