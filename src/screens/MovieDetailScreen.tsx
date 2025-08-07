import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { Movie } from '../types/Movie';
import { useMovieDetailViewModel } from '../hooks';
import { BackdropHeader, MovieInfo, BoxOfficeInfo } from '../components/MovieDetail';
import { LoadingState } from '../components/MovieList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type MovieDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({ route, navigation }) => {
    const { movie } = route.params;
    const {
        movieDetails,
        loading,
        getImageUrl,
        formatRuntime,
        formatCurrency,
    } = useMovieDetailViewModel(movie);

    const backdropUrl = getImageUrl(movie.backdrop_path, 'w780');
    const posterUrl = getImageUrl(movie.poster_path, 'w342');

    const handleBack = () => {
        navigation.goBack();
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>
                <LoadingState message="Loading movie details..." />
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <BackdropHeader backdropUrl={backdropUrl} onBack={handleBack} />

                <View style={styles.content}>
                    <MovieInfo
                        movie={movie}
                        movieDetails={movieDetails}
                        posterUrl={posterUrl}
                        formatRuntime={formatRuntime}
                    />

                    <View style={styles.overviewContainer}>
                        <Text style={styles.sectionTitle}>Overview</Text>
                        <Text style={styles.overview}>
                            {movie.overview || 'No overview available.'}
                        </Text>
                    </View>

                    {movieDetails && (
                        <>
                            <BoxOfficeInfo
                                movieDetails={movieDetails}
                                formatCurrency={formatCurrency}
                            />

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
        </View>
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
    backButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
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
    productionContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    productionCompany: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
});

export default MovieDetailScreen;
