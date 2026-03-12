# BLEprint - Construction AR Documentation App

![BLEprint Logo](https://kirustar14.github.io/BLEprint/)

> **X-Ray Vision for Construction Sites** - Document as you build. See what's hidden when you need to drill.

## 🎯 Overview

BLEprint is a mobile application that helps construction workers document MEP (Mechanical, Electrical, Plumbing) systems during construction and visualize them later using augmented reality. This prevents costly utility strikes and accidents.

### The Problem
- Workers operate semi-blind with unreliable tools
- Every utility strike costs $56,000 on average
- Industry loses $30B annually from infrastructure damage

### The Solution
- **Capture**: Take photos of exposed MEP systems before they're hidden
- **Tag**: Mark stable anchor points for accurate positioning
- **Overlay**: View hidden infrastructure through AR when you need to drill

## ✨ Features

- 📸 **Photo Capture**: Document construction progress with your phone camera
- 📍 **Anchor Points**: Select stable reference points for accurate AR alignment
- 🗂️ **Multiple Scenes**: Track different walls/areas separately
- 🔍 **AR Overlay**: See through walls to avoid hitting critical infrastructure
- 👥 **User Accounts**: Secure authentication with email or Google sign-in
- ☁️ **Cloud Sync**: All data backed up to Firebase
- 📱 **Mobile First**: Built with React Native/Expo for iOS and Android

## 🏗️ Architecture

```
bleprint-app/
├── src/
│   ├── config/
│   │   └── firebase.js          # Firebase configuration
│   ├── services/
│   │   ├── authService.js       # Authentication logic
│   │   ├── databaseService.js   # Firestore operations
│   │   └── arService.js         # AR calculations
│   └── screens/
│       ├── LoginScreen.js       # User login
│       ├── SignUpScreen.js      # User registration
│       ├── ScenesScreen.js      # List of all scenes
│       ├── SceneDetailScreen.js # Scene captures
│       ├── CameraScreen.js      # Photo capture
│       └── ARViewScreen.js      # AR overlay view
├── App.js                       # Main app entry
├── package.json                 # Dependencies
└── app.json                     # Expo configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Expo Go app (for testing)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/bleprint-app.git
   cd bleprint-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project
   - Enable Authentication (Email/Password + Google)
   - Create Firestore database
   - Enable Storage
   - See [SETUP.md](./SETUP.md) for detailed instructions

4. **Configure the app:**
   - Update `src/config/firebase.js` with your Firebase config
   - Update `src/services/authService.js` with Google Web Client ID

5. **Run the app:**
   ```bash
   npm start
   ```
   Then scan the QR code with Expo Go app

## 📖 User Guide

### For Construction Workers

#### 1. Create an Account
- Open the app
- Sign up with email or Google account
- You're ready to start documenting!

#### 2. Create a Scene
- Tap the **+** button
- Name your scene (e.g., "North Wall - Floor 3")
- This represents one wall or area you're tracking

#### 3. Capture Photos
- Open a scene
- Tap **"New Capture"**
- Take a photo of exposed MEP systems
- **Select an anchor point** - choose a stable feature like:
  - Corner of a wall
  - Edge of a fixture
  - Structural element that won't move
- Add optional notes
- Save

#### 4. View AR Overlay
- Take multiple captures of the same area over time
- Tap **"View AR"**
- Point camera at the wall
- Take a snapshot
- Select the same anchor point you used before
- See the overlay showing hidden infrastructure!

### Safety Tips
- ✅ Always use edge/corner anchor points
- ✅ Take photos from consistent angles
- ✅ Document before drywall installation
- ✅ Add notes about what's visible
- ❌ Don't rely solely on AR - verify with plans
- ❌ Don't drill without proper authorization

## 🔒 Security

- **Authentication**: Firebase Auth with email/password and Google OAuth
- **Database Rules**: Users can only access their own data
- **Storage Rules**: Secure image upload/download
- **Data Privacy**: All data encrypted in transit and at rest

## 🧪 Testing

### Manual Testing Checklist

- [ ] Sign up with email
- [ ] Sign in with Google
- [ ] Create a scene
- [ ] Take a photo
- [ ] Select anchor point
- [ ] Save capture
- [ ] View captures list
- [ ] Delete a capture
- [ ] View AR overlay
- [ ] Sign out
- [ ] Data persists after sign in

## 📊 Tech Stack

- **Frontend**: React Native (Expo)
- **Navigation**: React Navigation
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Storage**: Firebase Storage
- **Camera**: Expo Camera
- **AR**: Custom AR overlay logic

## 🛠️ Development

### Project Structure

- `src/config/` - Configuration files
- `src/services/` - Business logic and Firebase integration
- `src/screens/` - UI screens/components
- `App.js` - Main app with navigation

### Key Services

**authService.js**
- Email/password signup and signin
- Google OAuth integration
- Session management

**databaseService.js**
- Scene CRUD operations
- Capture CRUD operations
- Image upload/download

**arService.js**
- Anchor point generation
- Overlay transformation calculations
- Alignment scoring

## 📱 Deployment

### Expo Publish (Easiest)
```bash
expo publish
```

### Build Standalone Apps
```bash
# Android APK
expo build:android -t apk

# iOS App
expo build:ios
```

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## 🐛 Troubleshooting

Common issues and solutions:

| Issue | Solution |
|-------|----------|
| Firebase errors | Check config in `firebase.js` |
| Google sign-in fails | Verify Web Client ID |
| Camera not working | Grant permissions in settings |
| Images not uploading | Check Storage rules |
| Data not syncing | Verify Firestore rules |

See [SETUP.md](./SETUP.md) for more troubleshooting help.

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Kiruthika Marikumaran** - Co-Founder
- **Mustahsin Zarif** - Co-Founder

## 📞 Contact

- **Website**: [https://kirustar14.github.io/BLEprint/](https://kirustar14.github.io/BLEprint/)
- **Email**: kiruthika.star14@gmail.com
- **Demo**: [Watch on YouTube](https://www.youtube.com/watch?v=a1c7LX9IbKo)

## 🙏 Acknowledgments

- Expo team for the amazing framework
- Firebase for backend infrastructure
- Construction workers who provided invaluable feedback

---

**Built with ❤️ for construction safety**

*Preventing the next $56K mistake, one capture at a time.*
