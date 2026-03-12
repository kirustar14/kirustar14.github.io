# BLEprint Mobile App - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Firebase Setup](#firebase-setup)
3. [Google Sign-In Setup](#google-sign-in-setup)
4. [Project Installation](#project-installation)
5. [Running the App](#running-the-app)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later): [Download here](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- **Expo Go App**: Download on your phone from App Store (iOS) or Google Play (Android)
- **Git**: [Download here](https://git-scm.com/)

### Optional (for full native builds):
- **Android Studio**: For Android development
- **Xcode**: For iOS development (Mac only)

---

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `bleprint-app` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### 2. Register Your App

1. In Firebase Console, click the **Web icon** (</>) to add a web app
2. Enter app nickname: `BLEprint Web`
3. Check **"Also set up Firebase Hosting"** (optional)
4. Click **"Register app"**
5. **IMPORTANT**: Copy the `firebaseConfig` object - you'll need it soon

### 3. Enable Authentication

1. In Firebase Console, go to **Authentication** → **Get Started**
2. Click **"Sign-in method"** tab
3. Enable **Email/Password**:
   - Click "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. Enable **Google**:
   - Click "Google"
   - Toggle "Enable"
   - Enter project support email
   - Click "Save"

### 4. Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll add security rules later)
4. Select your preferred location (choose closest to your users)
5. Click **"Enable"**

### 5. Set Up Firestore Security Rules

1. In Firestore Database, go to **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Scenes: Users can only read/write their own scenes
    match /scenes/{sceneId} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                    request.auth.uid == request.resource.data.userId;
    }
    
    // Captures: Users can only access captures for scenes they own
    match /captures/{captureId} {
      allow read, write: if request.auth != null && 
                          exists(/databases/$(database)/documents/scenes/$(resource.data.sceneId)) &&
                          get(/databases/$(database)/documents/scenes/$(resource.data.sceneId)).data.userId == request.auth.uid;
      allow create: if request.auth != null &&
                    exists(/databases/$(database)/documents/scenes/$(request.resource.data.sceneId)) &&
                    get(/databases/$(database)/documents/scenes/$(request.resource.data.sceneId)).data.userId == request.auth.uid;
    }
  }
}
```

3. Click **"Publish"**

### 6. Set Up Firebase Storage

1. In Firebase Console, go to **Storage**
2. Click **"Get Started"**
3. Choose **"Start in production mode"**
4. Select same location as Firestore
5. Click **"Done"**

### 7. Set Storage Security Rules

1. In Storage, go to **"Rules"** tab
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /scenes/{sceneId}/{allPaths=**} {
      // Allow read if authenticated
      allow read: if request.auth != null;
      
      // Allow write only for scene owner
      allow write: if request.auth != null &&
                   exists(/databases/$(database)/documents/scenes/$(sceneId)) &&
                   get(/databases/$(database)/documents/scenes/$(sceneId)).data.userId == request.auth.uid;
    }
  }
}
```

3. Click **"Publish"**

---

## Google Sign-In Setup

### 1. Get OAuth 2.0 Client IDs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project from the dropdown
3. Go to **APIs & Services** → **Credentials**
4. You should see OAuth 2.0 Client IDs already created by Firebase

### 2. Find Your Web Client ID

1. In the Credentials page, look for **"Web client (auto created by Google Service)"**
2. Click on it
3. Copy the **Client ID** - it looks like: `123456789-abcdefg.apps.googleusercontent.com`
4. You'll need this for the app configuration

### 3. Add SHA-1 for Android (if building native Android app)

1. Generate SHA-1 certificate:
   ```bash
   # For debug keystore (development)
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```

2. Copy the SHA-1 fingerprint
3. In Firebase Console, go to **Project Settings**
4. Scroll to **"Your apps"**
5. Click on your Android app (or add one if not exists)
6. Click **"Add fingerprint"**
7. Paste the SHA-1 and save

---

## Project Installation

### 1. Clone or Initialize Repository

If starting from scratch:
```bash
# Navigate to your project directory
cd path/to/your/github/repo

# Copy all files from bleprint-app into your repo
```

### 2. Install Dependencies

```bash
npm install

# Or if using yarn:
yarn install
```

### 3. Configure Firebase

1. Open `src/config/firebase.js`
2. Replace the placeholder config with your Firebase config from step 2.5 above:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Configure Google Sign-In

1. Open `src/services/authService.js`
2. Replace the Web Client ID:

```javascript
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID_HERE.apps.googleusercontent.com',
});
```

### 5. Update app.json (Optional)

Update bundle identifiers if needed:
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.bleprint"
    },
    "android": {
      "package": "com.yourcompany.bleprint"
    }
  }
}
```

---

## Running the App

### Development Mode (Expo Go)

1. **Start the development server:**
   ```bash
   npm start
   # Or: expo start
   ```

2. **Run on your device:**
   - Open **Expo Go** app on your phone
   - Scan the QR code from the terminal
   - Or press `a` for Android emulator, `i` for iOS simulator

### Testing Features

1. **Test Authentication:**
   - Create an account with email/password
   - Try Google Sign-In
   - Sign out and sign back in

2. **Test Scene Creation:**
   - Create a new scene (tap + button)
   - Name it (e.g., "North Wall")

3. **Test Photo Capture:**
   - Open a scene
   - Tap "New Capture"
   - Take a photo or select from gallery
   - Select an anchor point (corner or edge)
   - Save the capture

4. **Test AR Overlay:**
   - Take 2-3 captures of the same wall
   - Tap "View AR"
   - Take a snapshot
   - Select matching anchor point
   - View overlay

---

## Deployment

### Deploy to Expo (Easiest)

1. **Create Expo account:**
   - Sign up at [expo.dev](https://expo.dev)

2. **Login to Expo:**
   ```bash
   expo login
   ```

3. **Publish your app:**
   ```bash
   expo publish
   ```

4. **Share the link** with your construction workers

### Build Standalone Apps

#### Build for Android (APK)

```bash
expo build:android -t apk
```

#### Build for iOS (requires Apple Developer account)

```bash
expo build:ios
```

### Submit to App Stores

See [Expo documentation](https://docs.expo.dev/distribution/introduction/) for detailed store submission guides.

---

## Troubleshooting

### Common Issues

#### 1. "Firebase not configured"
- Check that you replaced the placeholder config in `src/config/firebase.js`
- Ensure you copied the ENTIRE config object from Firebase Console

#### 2. "Google Sign-In not working"
- Verify Web Client ID in `src/services/authService.js`
- Make sure Google authentication is enabled in Firebase Console
- For Android: Add SHA-1 fingerprint

#### 3. "Permission denied" errors in Firestore
- Check that security rules are published
- Verify user is authenticated before accessing data
- Check that userId fields match authenticated user

#### 4. "Cannot upload images"
- Verify Storage rules are published
- Check that Storage is enabled in Firebase Console
- Ensure camera/photo library permissions are granted

#### 5. Camera not working
- Grant camera permissions when prompted
- Check `app.json` has correct permission configurations
- Restart the app after granting permissions

#### 6. "Module not found" errors
- Run `npm install` or `yarn install`
- Clear cache: `expo start -c`
- Delete `node_modules` and reinstall

### Getting Help

- **Expo Issues**: [Expo Forums](https://forums.expo.dev/)
- **Firebase Issues**: [Firebase Support](https://firebase.google.com/support)
- **App Issues**: Create an issue in your GitHub repository

---

## Next Steps

After successful setup:

1. ✅ Test all features thoroughly
2. ✅ Add your company branding (colors, logo)
3. ✅ Customize scene templates for your use cases
4. ✅ Train workers on how to use the app
5. ✅ Deploy to test users at construction sites
6. ✅ Gather feedback and iterate

---

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [React Native](https://reactnative.dev/)

---

## Support

For technical support or questions:
- Email: [your-support-email]
- Documentation: [your-docs-url]
- Issues: [your-github-repo]/issues

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Maintained by:** BLEprint Team
