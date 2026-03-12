# Deployment Checklist for Construction Site Testing

## Pre-Deployment Setup

### 1. Firebase Configuration ✓
- [ ] Firebase project created
- [ ] Email/Password authentication enabled
- [ ] Google authentication enabled
- [ ] Firestore database created with security rules
- [ ] Firebase Storage enabled with security rules
- [ ] All configuration values updated in code

### 2. App Configuration ✓
- [ ] `firebase.js` updated with your Firebase config
- [ ] `authService.js` updated with Google Web Client ID
- [ ] `app.json` bundle identifiers updated (optional)
- [ ] Assets replaced with your branding (optional)

### 3. Testing ✓
- [ ] App runs in Expo Go
- [ ] User can sign up
- [ ] User can sign in
- [ ] User can create scenes
- [ ] User can capture photos
- [ ] User can select anchor points
- [ ] Captures save successfully
- [ ] AR view works
- [ ] Data persists after restart

## Deployment Options

### Option 1: Expo Go (Fastest - Recommended for MVP Testing)

**Pros:**
- No build process needed
- Instant updates
- Easy to distribute
- Free

**Cons:**
- Requires Expo Go app
- Limited offline capabilities
- Cannot publish to app stores

**Steps:**
1. Run `expo publish`
2. Share the Expo link with workers
3. Workers install Expo Go and scan QR code

**Best for:** Initial field testing, quick iterations

---

### Option 2: Standalone APK (Android Only)

**Pros:**
- Works without Expo Go
- Can install on any Android device
- Professional appearance

**Cons:**
- Requires build process (~15-20 mins)
- Updates require new build

**Steps:**
1. Run `expo build:android -t apk`
2. Wait for build to complete
3. Download APK from Expo dashboard
4. Share APK file with workers
5. Workers enable "Install from Unknown Sources"
6. Workers install APK

**Best for:** Android-only deployments, professional testing

---

### Option 3: Full App Store Deployment

**Pros:**
- Most professional
- Easy updates
- Automatic installation

**Cons:**
- Requires developer accounts ($99/year iOS, $25 one-time Android)
- App store review process
- Takes several days

**Steps:**
See [Expo documentation](https://docs.expo.dev/distribution/app-stores/)

**Best for:** Production launch

---

## Recommended Deployment for Construction Site Testing

### Phase 1: Initial Testing (Week 1)
**Use Expo Go**

1. Publish the app:
   ```bash
   expo publish
   ```

2. Create a simple instruction sheet:
   - Download Expo Go from App Store/Google Play
   - Open this link: [your-expo-link]
   - Sign up with your email
   - Start testing!

3. Gather feedback

### Phase 2: Extended Testing (Week 2-4)
**Use Standalone APK (Android)**

1. Build APK:
   ```bash
   expo build:android -t apk
   ```

2. Distribute to testers:
   - Upload to Google Drive or Dropbox
   - Share download link
   - Provide installation instructions

3. Gather more feedback

### Phase 3: Production (After Testing)
**Submit to App Stores**

1. Address all feedback
2. Polish UI/UX
3. Submit to both stores
4. Launch!

---

## Field Testing Instructions for Workers

### Quick Start Card (Print This)

```
┌─────────────────────────────────────────────┐
│          BLEprint Quick Start               │
│                                             │
│  1. Download "Expo Go" from app store       │
│  2. Open this link in Expo Go:              │
│     [YOUR_EXPO_LINK_HERE]                   │
│  3. Create account with your email          │
│  4. Start documenting!                      │
│                                             │
│  Need help? Text: [YOUR_PHONE]              │
│  Email: [YOUR_EMAIL]                        │
└─────────────────────────────────────────────┘
```

### Installation Instructions (APK)

**For Workers:**

1. **Download the app:**
   - Open this link on your phone: [GOOGLE_DRIVE_LINK]
   - Tap "Download"

2. **Enable installation:**
   - Settings → Security → Enable "Unknown Sources"
   - Or follow prompt when installing

3. **Install:**
   - Open the downloaded APK file
   - Tap "Install"
   - Wait for installation to complete

4. **Open and sign up:**
   - Open BLEprint app
   - Create account with your email
   - Start using!

---

## Support During Testing

### Set Up Support Channel

1. **Create a group chat** (WhatsApp, Slack, etc.)
2. **Be available** during first week
3. **Respond quickly** to issues
4. **Collect feedback** systematically

### Common First-Day Issues

| Issue | Solution |
|-------|----------|
| "Can't download Expo Go" | Send direct App Store/Play Store link |
| "App won't open" | Restart phone, try again |
| "Camera not working" | Grant permissions in Settings |
| "Can't see my photos" | Check internet connection |
| "Forgot password" | Use "Forgot Password" feature |

### Feedback Collection

Create a simple form:
- What worked well?
- What was confusing?
- What features are missing?
- Any bugs or crashes?
- How likely are you to use this daily? (1-10)

---

## Post-Deployment Monitoring

### Week 1 Checklist
- [ ] Monitor crash reports
- [ ] Check user signups
- [ ] Review support requests
- [ ] Track feature usage
- [ ] Collect feedback

### Week 2-4 Actions
- [ ] Fix critical bugs
- [ ] Improve confusing UX
- [ ] Add requested features
- [ ] Optimize performance
- [ ] Plan next iteration

---

## Emergency Contacts

**During Field Testing:**
- Your Name: [PHONE_NUMBER]
- Technical Support: [EMAIL]
- Emergency: [PHONE_NUMBER]

---

## Success Metrics

Track these during testing:

- **Adoption**: How many workers signed up?
- **Engagement**: How many captures per day?
- **Retention**: Do workers keep using it?
- **Feedback**: What's the average satisfaction score?
- **Impact**: Any utility strikes prevented?

---

## Next Steps After Successful Testing

1. ✅ Gather all feedback
2. ✅ Prioritize improvements
3. ✅ Build v2.0
4. ✅ Prepare for app store submission
5. ✅ Plan marketing/rollout
6. ✅ Train additional users
7. ✅ Scale to more sites

---

**Good luck with your deployment! 🚀**

*Remember: The goal is to prevent the next $56K utility strike.*
