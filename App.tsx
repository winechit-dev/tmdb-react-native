/**
 * TMDB React Native Movie App
 * 
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme, Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import ErrorBoundary from './src/components/ErrorBoundary';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';


const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const AppContent = () => (
    <ErrorBoundary>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Platform.OS === 'android' ? '#f8f9fa' : 'transparent'}
        translucent={Platform.OS === 'ios'}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MovieList"
            component={MovieListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MovieDetail"
            component={MovieDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
