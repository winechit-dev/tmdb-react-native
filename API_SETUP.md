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

### 2. Configure the Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace `your_api_key_here` with your actual API key:
   ```bash
   TMDB_API_KEY=your_actual_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3
   TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

**Important**: Never commit your `.env` file to version control. It's already added to `.gitignore`.

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
