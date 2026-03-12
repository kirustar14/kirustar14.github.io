# BLEprint — Web App MVP

> Construction AR Documentation — Document as you build. See what's hidden when you need to drill.

## Live at GitHub Pages

This is a fully functional Progressive Web App (PWA) hosted on GitHub Pages. Workers visit the URL on their phone and use it like a native app.

---

## Files

```
bleprint/
├── index.html          ← Login / Sign Up screen
├── app.html            ← Main app (all screens)
├── styles.css          ← Design system / all styles
├── firebase-config.js  ← ⚠️ YOU MUST FILL THIS IN
├── favicon.png         ← Browser tab icon
├── icon.png            ← App icon (add to home screen)
└── README.md
```

---

## Setup (15 minutes)

### Step 1 — Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `bleprint`
3. Go to **Project Settings** → **Your apps** → click Web icon `</>`
4. Register app, copy the `firebaseConfig` object
5. Open `firebase-config.js` and paste your values

### Step 2 — Enable Firebase Services

In Firebase Console:

**Authentication:**
- Build → Authentication → Get started
- Enable **Email/Password**
- Enable **Google** (you'll need your Google OAuth client ID)
- Under Google provider, copy the **Web client ID** → paste into `firebase-config.js` as `GOOGLE_CLIENT_ID`

**Firestore Database:**
- Build → Firestore Database → Create database
- Start in **Production mode**
- Choose a region (us-central1 recommended)
- Go to **Rules** tab, paste:
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

**Storage:**
- Build → Storage → Get started → Production mode
- Go to **Rules** tab, paste:
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

**Firestore Indexes** (required for queries):
- Go to Firestore → Indexes → Add index:
  - Collection: `scenes` | Fields: `uid ASC`, `createdAt DESC`
  - Collection: `captures` | Fields: `sceneId ASC`, `createdAt DESC`

### Step 3 — GitHub Pages

1. Push all files to your GitHub repo (root of repo or `/docs` folder)
2. Go to repo **Settings** → **Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. Your app will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`

### Step 4 — Add to Home Screen (for workers)

On iPhone: Safari → Share → **Add to Home Screen**  
On Android: Chrome → Menu → **Add to Home Screen**

Workers get a native app-like experience.

---

## Features

| Feature | Status |
|---------|--------|
| Email/password auth | ✅ |
| Google OAuth login | ✅ |
| Create / edit / delete scenes | ✅ |
| Take photos with device camera | ✅ |
| Import from photo library | ✅ |
| Select anchor point (3×3 grid) | ✅ |
| Add notes to captures | ✅ |
| View all captures in scene | ✅ |
| AR overlay mode (live camera + overlay) | ✅ |
| Alignment score meter | ✅ |
| Adjustable overlay opacity | ✅ |
| Cloud sync via Firebase | ✅ |
| Cross-device access | ✅ |
| Export scene data as JSON | ✅ |
| Profile + usage stats | ✅ |

---

## Troubleshooting

**"Camera access denied"** — HTTPS is required. GitHub Pages is HTTPS by default. Don't test via `file://`.

**"Failed to save capture"** — Check Firebase Storage rules and that Storage is enabled.

**Images not loading in AR** — Make sure Firebase Storage CORS is configured. Add a `cors.json`:
```json
[{"origin":["*"],"method":["GET"],"maxAgeSeconds":3600}]
```
Then run: `gsutil cors set cors.json gs://YOUR-BUCKET-NAME`

**"Index not found" Firestore error** — Create the composite indexes listed in Step 2.

**Google login fails** — Add your GitHub Pages URL to Firebase Auth → Authorized domains.

---

## Architecture

- **No build step** — plain HTML/CSS/JS, works on GitHub Pages directly
- **Firebase SDK v10** loaded via CDN (ES modules)
- **Images stored** in Firebase Storage, URLs saved in Firestore
- **All data isolated** per user via Firestore security rules
