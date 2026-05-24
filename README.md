<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0b20cdd6-5cf9-475d-a4c7-c9a05b0c3e8a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `.env.example` or your own `.env` file.
3. Run the app locally for development:
   `npm run dev`

## Production build and run

1. Install dependencies:
   `npm install`
2. Build the app:
   `npm run build`
3. Start the production server:
   `npm start`
4. Open the app at `http://localhost:3000`

## CI / Build Validation

A GitHub Actions workflow has been added at `.github/workflows/ci-build.yml`.
It installs dependencies, runs linting, and builds the app.
