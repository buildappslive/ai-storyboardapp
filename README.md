# AI Storyboard Generator

An intelligent application that turns your script into visual storyboards using Google's Gemini API.

## Features

- **AI-Powered Generation**: Instantly converts text scripts into visual panels.
- **Theme Support**: Includes Light and Dark modes (defaulting to Dark).
- **History Dashboard**: Automatically saves generated storyboards to a local database (IndexedDB).
- **Export**: Download your storyboard panels as a ZIP archive.
- **Customizable**: Choose between 16:9 and 1:1 (Instagram) aspect ratios.

## Run Locally

**Prerequisites:** Node.js (v18+)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open the app** (usually `http://localhost:5173`) and navigate to **Settings** to enter your Google Gemini API Key. 
   *(Your key is stored locally in your browser and never sent to our servers).*

## Configuration

You can optionally set a default API key for development validation in a `.env` file (which is git-ignored):
```
VITE_GEMINI_API_KEY=your_key_here
```
However, using the **Settings** page in the UI is recommended.
