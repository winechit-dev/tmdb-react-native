import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const errorHandler = (error: any) => {
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        setHasError(true);
      }
    };

    // This is a simple error detection - in a real app you'd use a proper error boundary
    const originalConsoleError = console.error;
    console.error = (...args) => {
      originalConsoleError(...args);
      if (args[0]?.toString().includes('401') || args[0]?.toString().includes('API key')) {
        setHasError(true);
      }
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  if (hasError) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🔑 API Key Required</Text>
        <Text style={styles.message}>
          To use this app, you need to set up your TMDB API key.
        </Text>
        <Text style={styles.steps}>
          1. Get your free API key from TMDB{'\n'}
          2. Open src/config.ts{'\n'}
          3. Replace 'YOUR_API_KEY_HERE' with your key{'\n'}
          4. Restart the app
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL('https://www.themoviedb.org/settings/api')}
        >
          <Text style={styles.buttonText}>Get API Key</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.retryButton]}
          onPress={() => setHasError(false)}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  steps: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 30,
    color: '#666',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ErrorBoundary;
