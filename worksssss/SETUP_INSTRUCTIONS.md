# BLEprint — Setup & Publishing Guide

## What you need
- Your GitHub repo (already cloned to desktop) ✅
- Your Firebase project (already have firebase config + Google OAuth link) ✅
- The bleprint.zip file ✅

---

## STEP 1 — Unzip & Add Your Assets

1. Unzip `bleprint.zip`
2. You'll get a `bleprint/` folder with 5 files:
   ```
   index.html
   app.html
   styles.css
   firebase-config.js
   README.md
   ```
3. Copy those 5 files into your cloned GitHub repo folder
4. Also copy your 4 image assets into the same folder:
   ```
   icon.png
   adaptive-icon.png
   favicon.png
   splash.png
   ```

Your repo folder should now look like:
```
your-repo/
├── index.html
├── app.html
├── styles.css
├── firebase-config.js
├── README.md
├── icon.png
├── adaptive-icon.png
├── favicon.png
└── splash.png
```

---

## STEP 2 — Fill In Firebase Config

Open `firebase-config.js` in any text editor (Notepad, VS Code, etc.)

Replace the placeholder values with your real Firebase values:

```js
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",           // from Firebase Console
  authDomain:        "your-app.firebaseapp.com",
  projectId:         "your-app-id",
  storageBucket:     "your-app-id.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123:web:abc123"
};

const GOOGLE_CLIENT_ID = "123456-abc.apps.googleusercontent.com"; // your OAuth link
```

**Where to find these:**
- Firebase Console → ⚙️ Project Settings → Your Apps → Web app → Config

Save the file.

---

## STEP 3 — Firebase Console Setup (10 min)

### 3a. Authentication
1. Firebase Console → **Build → Authentication → Get started**
2. **Sign-in method** tab → Enable **Email/Password** → Save
3. Enable **Google** → enter your project's support email → Save
4. Go to **Settings** tab → **Authorized domains** → **Add domain**
   - Add: `YOUR-USERNAME.github.io`

### 3b. Firestore Database
1. Firebase Console → **Build → Firestore Database → Create database**
2. Choose **Production mode** → pick region (us-central1) → Done
3. Click **Rules** tab → replace everything with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /scenes/{doc} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
    match /captures/{doc} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
  }
}
```

4. Click **Publish**

5. Click **Indexes** tab → **Add index** (do this TWICE):

   Index 1:
   - Collection ID: `scenes`
   - Field 1: `uid` — Ascending
   - Field 2: `createdAt` — Descending
   - Click Create

   Index 2:
   - Collection ID: `captures`
   - Field 1: `sceneId` — Ascending
   - Field 2: `createdAt` — Descending
   - Click Create

   ⏳ Indexes take 1-2 min to build — wait for the circle to turn green before testing.

### 3c. Storage
1. Firebase Console → **Build → Storage → Get started**
2. Choose **Production mode** → pick same region → Done
3. Click **Rules** tab → replace with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /captures/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Click **Publish**

---

## STEP 4 — Push to GitHub

Open Terminal (Mac) or Git Bash / Command Prompt (Windows) in your repo folder:

```bash
git add .
git commit -m "Add BLEprint web app"
git push
```

---

## STEP 5 — Enable GitHub Pages

1. Go to your repo on GitHub.com
2. Click **Settings** tab
3. Scroll to **Pages** in the left sidebar
4. Under **Source** → select **Deploy from a branch**
5. Branch: **main** (or master) → Folder: **/ (root)**
6. Click **Save**
7. Wait 1-2 minutes → your site will be live at:

   ```
   https://kirustar14.github.io/BLEprint-mvp/
   ```

---

## STEP 6 — Test It

1. Open the URL on your phone in Safari (iPhone) or Chrome (Android)
2. Create an account
3. Create a scene
4. Take a photo → select anchor point → save
5. Open AR mode → point camera at same area

**Add to Home Screen** for app-like experience:
- iPhone: Tap Share → "Add to Home Screen"
- Android: Tap ⋮ menu → "Add to Home Screen"

---

## Common Issues

| Problem | Fix |
|---------|-----|
| White screen / nothing loads | Check firebase-config.js values are correct |
| "Permission denied" saving photo | Firebase Storage rules not published yet |
| Login works but scenes won't load | Firestore indexes still building (wait 2 min) |
| Google login popup blocked | Allow popups for your GitHub Pages URL in browser |
| Camera won't start | Must be on HTTPS — GitHub Pages is HTTPS ✅ |
| Photos upload but AR is blank | Select a capture from the thumbnail row at the bottom of AR screen |

---

## Your Live URL
```
https://kirustar14.github.io/BLEprint-mvp/
```

