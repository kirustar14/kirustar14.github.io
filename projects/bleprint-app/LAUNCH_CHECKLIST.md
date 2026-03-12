# 🚀 BLEprint Launch Checklist

## Phase 1: Setup & Configuration (1-2 hours)

### Step 1: Clone Repository
```bash
cd /path/to/your/projects
git clone <your-github-repo-url>
cd bleprint-app
npm install
```
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] No installation errors

---

### Step 2: Firebase Setup (30 minutes)

**Follow SETUP.md section "Firebase Setup"**

- [ ] Firebase project created
- [ ] Web app registered
- [ ] Email/Password auth enabled
- [ ] Google auth enabled
- [ ] Firestore database created
- [ ] Firestore security rules published
- [ ] Storage enabled
- [ ] Storage security rules published
- [ ] Firebase config copied

---

### Step 3: Configure App (10 minutes)

1. **Update Firebase config:**
   ```javascript
   // src/config/firebase.js
   const firebaseConfig = {
     apiKey: "YOUR_ACTUAL_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     // ... rest of config
   };
   ```
   - [ ] Config updated

2. **Update Google Sign-In:**
   ```javascript
   // src/services/authService.js
   GoogleSignin.configure({
     webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
   });
   ```
   - [ ] Web Client ID updated

3. **Optional - Update branding:**
   - [ ] App name in app.json
   - [ ] Bundle identifiers
   - [ ] Replace assets (icons, splash)

---

## Phase 2: Testing (2-3 hours)

### Step 1: Run Development Build

```bash
npm start
# or
expo start
```
- [ ] Dev server starts
- [ ] QR code appears
- [ ] Can scan with Expo Go

---

### Step 2: Test All Features

#### Authentication
- [ ] Can create account with email
- [ ] Can sign in with email
- [ ] Can sign in with Google
- [ ] Can sign out
- [ ] Session persists after app restart

#### Scenes
- [ ] Can create new scene
- [ ] Scene appears in list
- [ ] Can open scene
- [ ] Can delete scene (long press)
- [ ] Deleted scene removes all captures

#### Photo Capture
- [ ] Camera permission granted
- [ ] Can take photo
- [ ] Can select from library
- [ ] Anchor points appear
- [ ] Can select anchor point
- [ ] Can add notes
- [ ] Capture saves successfully
- [ ] Capture appears in scene

#### AR View
- [ ] Can access AR view (with 1+ captures)
- [ ] Camera works in AR mode
- [ ] Can select reference capture
- [ ] Can take snapshot
- [ ] Anchor points appear
- [ ] Overlay displays correctly
- [ ] Alignment indicator shows

#### Data Persistence
- [ ] Close and reopen app
- [ ] All scenes still there
- [ ] All captures still there
- [ ] Sign out and sign in
- [ ] Data persists across sessions

---

### Step 3: Device Testing

**Test on multiple devices:**
- [ ] iPhone (if available)
- [ ] Android phone
- [ ] Different screen sizes
- [ ] Older devices (if available)

**Test in different conditions:**
- [ ] Good WiFi
- [ ] Mobile data
- [ ] Poor connection
- [ ] Offline (should gracefully fail)
- [ ] Good lighting
- [ ] Dark/indoor lighting

---

## Phase 3: Deployment Preparation (1 hour)

### Choose Deployment Method

**Option A: Expo Go (Recommended for MVP)**
- [ ] Account created at expo.dev
- [ ] Logged in locally: `expo login`
- [ ] Ready to publish

**Option B: Standalone APK**
- [ ] Expo account ready
- [ ] Android SDK configured (if needed)
- [ ] Ready to build

**Option C: App Stores**
- [ ] Developer accounts created
- [ ] Certificates configured
- [ ] Ready for submission

---

### Prepare Support Materials

- [ ] Print Quick Reference Cards
- [ ] Prepare installation instructions
- [ ] Set up support phone/email
- [ ] Create feedback form
- [ ] Plan check-in schedule

---

## Phase 4: Deploy to Testers (30 minutes)

### If using Expo Go:

```bash
expo publish
```

1. **Share with testers:**
   - [ ] Send Expo link
   - [ ] Send installation instructions
   - [ ] Send Quick Reference Card

2. **Support setup:**
   - [ ] Create support group chat
   - [ ] Share support contact info
   - [ ] Be available for first day

---

### If using APK:

```bash
expo build:android -t apk
```

1. **Download and distribute:**
   - [ ] Wait for build to complete
   - [ ] Download APK from Expo
   - [ ] Upload to Google Drive/Dropbox
   - [ ] Share download link
   - [ ] Send installation instructions

---

## Phase 5: First Day Support (Day 1)

### Morning (7am-12pm)
- [ ] Available for immediate support
- [ ] Monitor for critical issues
- [ ] Answer installation questions
- [ ] Track number of sign-ups

### Afternoon (12pm-6pm)
- [ ] Check in with each tester
- [ ] Verify they took first capture
- [ ] Address any confusion
- [ ] Note feature requests

### Evening (After 6pm)
- [ ] Review crash reports (if any)
- [ ] Document issues
- [ ] Plan fixes for critical bugs
- [ ] Prepare for day 2

---

## Phase 6: Week 1 Monitoring

### Daily Tasks
- [ ] Check Firebase console for activity
- [ ] Monitor support messages
- [ ] Track usage metrics:
  - Sign-ups: _____
  - Scenes created: _____
  - Captures taken: _____
  - Active users: _____

### Weekly Tasks
- [ ] Compile feedback report
- [ ] Prioritize bug fixes
- [ ] Plan feature improvements
- [ ] Prepare week 2 check-in

---

## Phase 7: Iteration (Week 2-4)

### Week 2
- [ ] Fix critical bugs
- [ ] Deploy v1.0.1 update
- [ ] Gather more feedback
- [ ] Expand to more testers (if going well)

### Week 3
- [ ] Implement top requests
- [ ] Improve confusing UX
- [ ] Deploy v1.1 update
- [ ] Prepare satisfaction survey

### Week 4
- [ ] Final feedback collection
- [ ] Measure success metrics
- [ ] Decide: Continue to production?
- [ ] Plan v2.0 features

---

## Success Criteria

### Minimum Success (MVP Validated)
- [ ] 5+ active daily users
- [ ] 50+ total captures
- [ ] No critical bugs
- [ ] Average satisfaction 6+/10
- [ ] At least 1 utility strike prevented

### Good Success (Production Ready)
- [ ] 15+ active daily users
- [ ] 200+ total captures
- [ ] < 3 bugs per week
- [ ] Average satisfaction 7+/10
- [ ] 3+ utility strikes prevented

### Excellent Success (Scale Up)
- [ ] 30+ active daily users
- [ ] 500+ total captures
- [ ] No critical bugs
- [ ] Average satisfaction 8+/10
- [ ] 5+ utility strikes prevented
- [ ] Workers requesting more features

---

## Emergency Procedures

### Critical Bug Found
1. **Document immediately:**
   - What causes it
   - How to reproduce
   - Impact on users
   - Workaround (if any)

2. **Notify users:**
   - Send message to all testers
   - Provide workaround
   - ETA for fix

3. **Fix and deploy:**
   - Fix the bug
   - Test thoroughly
   - Push update
   - Verify fix with users

---

### Data Loss Incident
1. **Check Firebase console immediately**
2. **Verify backup/recovery options**
3. **Notify affected users**
4. **Implement prevention measures**
5. **Document for future**

---

## Post-Launch (After Week 4)

### If Successful
- [ ] Plan app store submission
- [ ] Prepare marketing materials
- [ ] Set up billing (if paid)
- [ ] Scale to more sites
- [ ] Hire support team (if needed)

### If Needs Work
- [ ] Analyze what didn't work
- [ ] Major feature redesign?
- [ ] Different use case?
- [ ] Continue development or pivot?

---

## Contact Information Template

**Update these and share with testers:**

```
BLEprint Support Contacts
========================

Primary Support:
- Name: [YOUR_NAME]
- Phone: [YOUR_PHONE]
- Email: [YOUR_EMAIL]
- Hours: M-F, 7am-6pm PST

Emergency Contact:
- Phone: [EMERGENCY_PHONE]
- Available: Anytime for critical issues

Feedback:
- Form: [GOOGLE_FORM_LINK]
- Email: [FEEDBACK_EMAIL]

Social:
- Website: [WEBSITE]
- GitHub: [REPO_URL]
```

---

## Final Checklist Before Launch

### Code
- [ ] All placeholder configs updated
- [ ] Firebase properly configured
- [ ] Google Sign-In working
- [ ] No console errors
- [ ] No warning messages
- [ ] All features tested

### Documentation
- [ ] README.md complete
- [ ] SETUP.md accurate
- [ ] Quick Reference printed
- [ ] FAQ prepared
- [ ] Testing Guide ready

### Support
- [ ] Support contacts set up
- [ ] Feedback system ready
- [ ] Issue tracking configured
- [ ] Response plan prepared

### Deployment
- [ ] Method chosen (Expo/APK/Stores)
- [ ] Build tested
- [ ] Distribution ready
- [ ] Testers identified
- [ ] Schedule set

---

## You're Ready! 🎉

**When all checklists are complete:**

1. Take a deep breath
2. Press "Deploy"
3. Support your testers
4. Gather feedback
5. Iterate quickly
6. Prevent those $56K utility strikes!

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Start development
npm start

# Publish to Expo
expo publish

# Build APK
expo build:android -t apk

# Build iOS
expo build:ios

# Clear cache
expo start -c

# Check logs
expo logs
```

---

**Good luck with your launch! You've got this! 🚀**

*Questions? Check FAQ.md or contact support.*

---

**Tracking:**
- Launch Date: ___________
- Version: v1.0.0
- Testers: ___________
- Sites: ___________
