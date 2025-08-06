# Environment Setup for TMDB Movie App

## IMPORTANT: API Key Setup Required

This app requires a TMDB (The Movie Database) API key to function properly. Follow these steps:

### 1. Get Your TMDB API Key

1. Go to [The Movie Database](https://www.themoviedb.org/)
2. Create a free account
3. Log in to your account
4. Navigate to: **Settings** → **API**
5. Request a new API key (choose "Developer" option)
6. Fill out the required information
7. You'll receive your API key (v3 auth)

### 2. Configure the API Key

Open `src/config.ts` and replace `YOUR_API_KEY_HERE` with your actual API key:

```typescript
export const config = {
  TMDB_API_KEY: 'your_actual_api_key_here', // Replace this
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
};
```

### 3. Test the App

After setting up your API key:

```bash
# Start Metro bundler
npm start

# Run on iOS (in a new terminal)
npm run ios

# Or run on Android (in a new terminal)
npm run android
```

### Troubleshooting

- **Error 401 (Unauthorized)**: Check that your API key is correct
- **Network errors**: Ensure you have internet connection
- **No movies showing**: Verify your API key is active and valid

### Features You'll See

Once properly configured, the app will show:
- Popular movies on the home screen
- Ability to browse top-rated and now-playing movies
- Search functionality
- Detailed movie information when tapping on a movie

Enjoy exploring movies! 🎬
