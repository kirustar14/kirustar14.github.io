# Frequently Asked Questions & Troubleshooting

## 📱 App Installation & Setup

### Q: Which app do I need to download?

**For Development/Testing:**
- Download **Expo Go** from App Store (iOS) or Google Play (Android)
- It's free and required to run the test version

**For Production (after app is published):**
- Download **BLEprint** directly from App Store or Google Play
- No Expo Go needed

---

### Q: Why do I need Expo Go?

Expo Go is a development tool that lets you test the app before it's officially published to app stores. Think of it as a "preview app" that lets you try BLEprint instantly without waiting for app store approval.

---

### Q: How do I install the APK version?

1. **Download APK** from the shared link
2. **Enable Unknown Sources:**
   - Go to Settings → Security
   - Turn on "Install from Unknown Sources" or "Unknown Sources"
3. **Install:**
   - Open Downloads folder
   - Tap the BLEprint.apk file
   - Tap "Install"
4. **Open app** and create account

---

## 🔐 Account & Authentication

### Q: I forgot my password, what do I do?

1. On login screen, tap "Forgot Password" (coming in v1.1)
2. Enter your email
3. Check email for reset link
4. Click link and create new password

**Temporary workaround:**
- Contact support to reset manually
- Or create new account with different email

---

### Q: Can I use the same account on multiple devices?

Yes! Sign in with your email and password on any device. All your scenes and captures will sync automatically.

---

### Q: Why isn't Google Sign-In working?

**Check these:**
1. Make sure you have a Google account
2. Check internet connection
3. Try email/password instead
4. Contact support if issue persists

**Common issues:**
- Phone doesn't have Google services (rare)
- Network firewall blocking Google
- Wrong configuration (contact developer)

---

## 📸 Camera & Photos

### Q: Why can't I take photos?

**Solutions:**
1. **Grant camera permission:**
   - Settings → Apps → BLEprint → Permissions → Camera → Allow
2. **Restart the app**
3. **Check if camera works in other apps**
4. **Try selecting from photo library instead**

---

### Q: Photos are blurry/dark, how do I fix this?

**Tips for better photos:**
- Use good lighting (natural light best)
- Hold phone steady
- Clean camera lens
- Get closer to subject
- Avoid backlight
- Use flash in dark areas

---

### Q: Can I use photos from my camera roll?

Yes! When taking a capture, look for the folder icon 📁 at the bottom. This lets you select existing photos from your gallery.

---

### Q: How much storage does this use?

**On your phone:**
- App: ~50MB
- Each photo: ~2-3MB
- 100 photos ≈ 250MB

**In the cloud:**
- Firebase free tier: 5GB storage
- Enough for ~1,600 photos
- After that: upgrade or delete old captures

---

## 🎯 Anchor Points & AR

### Q: What is an anchor point?

An anchor point is a permanent feature you select in your photo that will still be there when the wall is finished. It's like a GPS coordinate for the AR overlay.

**Good examples:**
- Corner of wall
- Edge of window frame
- Corner of door
- Structural column
- Permanent fixture

**Bad examples:**
- Temporary markings
- Center of blank wall
- Movable objects
- Areas that will change

---

### Q: Why is AR alignment off?

**Common causes:**
1. **Different anchor points:** Make sure you select the SAME anchor point every time
2. **Camera angle changed:** Try to take photos from similar angle
3. **Phone moved:** Hold phone steady
4. **Wrong reference capture selected:** Choose the right capture from the list

**How to improve:**
- Use corner/edge anchor points
- Take multiple captures from same position
- Add reference notes about camera position
- Practice makes perfect!

---

### Q: Can I change the anchor point after saving?

Not in v1.0, but this is a planned feature! For now:
- Delete the capture and retake
- Or take a new capture with correct anchor point

---

## 💾 Data & Syncing

### Q: Where is my data stored?

**Two places:**
1. **On your phone:** Temporary cache for quick access
2. **In the cloud (Firebase):** Permanent storage, accessible anywhere

All data automatically syncs to cloud when you have internet.

---

### Q: What if I don't have internet at the construction site?

**Offline mode (limited):**
- You CAN take photos
- You CANNOT save to cloud
- Photos stored locally
- Auto-upload when internet returns

**Best practice:**
- Save important captures while on WiFi
- Or use mobile hotspot
- Check sync status before leaving site

---

### Q: Will I lose my data if I delete the app?

**No!** All data is saved in the cloud. Just:
1. Reinstall the app
2. Sign in with same account
3. All your scenes and captures return

---

### Q: Can I export/backup my data?

Coming in v2.0! For now:
- All data backed up in Firebase
- You can screenshot important info
- Contact support for manual export

---

## 🔧 Technical Issues

### Q: App keeps crashing, what should I do?

**Try these in order:**
1. **Restart app** - Close and reopen
2. **Restart phone** - Turn off and on
3. **Clear app cache:**
   - Settings → Apps → BLEprint → Storage → Clear Cache
4. **Update app** - Check for latest version
5. **Reinstall app** - Delete and reinstall
6. **Contact support** - Still not working? We'll help!

---

### Q: "Network Error" message appears

**Solutions:**
1. **Check internet:**
   - Open browser, visit google.com
   - Try WiFi and mobile data
2. **Toggle airplane mode:**
   - Turn on for 10 seconds
   - Turn off
3. **Restart phone**
4. **Check Firebase status** (for developers)

---

### Q: Images won't upload

**Check:**
1. Internet connection
2. Storage space on phone
3. Firebase storage not full
4. File size not too large (max 5MB per photo)

**Fix:**
- Compress photos if too large
- Delete old captures
- Check Firebase console (developers)

---

### Q: App is slow/laggy

**Performance tips:**
1. **Close other apps** - Free up RAM
2. **Restart phone** - Clear memory
3. **Delete old captures** - Reduce data load
4. **Update app** - Performance improvements
5. **Check phone storage** - Need 1GB+ free

---

## 👥 Multi-User & Teams

### Q: Can my team share scenes?

**Not yet!** Currently:
- Each user has private scenes
- No sharing between accounts

**Coming in v2.0:**
- Team workspaces
- Shared scenes
- Collaboration features

**Workaround:**
- Use same account for whole team
- Or take photos and share via other apps

---

### Q: Can I see what other workers capture?

No, all data is private to your account. This is for security and to keep data organized.

---

## 🆘 Error Messages

### "Permission Denied"
**Cause:** Camera or storage permission not granted  
**Fix:** Settings → Apps → BLEprint → Permissions → Allow all

### "Authentication Failed"
**Cause:** Wrong email/password or network issue  
**Fix:** Check credentials, verify internet, reset password

### "Scene Not Found"
**Cause:** Scene was deleted or sync issue  
**Fix:** Refresh the scenes list, check internet

### "Upload Failed"
**Cause:** Network error or file too large  
**Fix:** Check internet, reduce photo size, try again

### "Storage Full"
**Cause:** Firebase storage limit reached  
**Fix:** Delete old captures or contact support for upgrade

---

## 📊 Features & Limitations

### Q: What are the current limitations?

**v1.0 MVP Limitations:**
- No offline mode (requires internet to save)
- No team collaboration
- No export/backup
- No advanced search
- Basic AR (no ML/AI enhancement)
- No measurement tools

**All planned for future versions!**

---

### Q: What features are coming next?

**v1.1 (Next Month):**
- Offline mode
- Password reset
- Better camera controls
- Performance improvements

**v2.0 (Q2 2026):**
- Team collaboration
- Advanced AR with measurements
- AI-powered MEP detection
- Export to PDF
- Integration with BIM tools

---

## 🔒 Security & Privacy

### Q: Is my data secure?

**Yes!**
- All data encrypted in transit (HTTPS)
- Passwords hashed (not stored plain text)
- Firestore security rules prevent unauthorized access
- Only you can access your scenes

---

### Q: Can my boss see my captures?

**Not unless:**
- You share your account credentials
- You're using company-shared account
- Future team features enabled

**Your data is private to your account.**

---

### Q: What if I accidentally delete something?

**Unfortunately:**
- Deleted captures are permanently removed
- No "undo" or trash bin yet

**Coming in v2.0:**
- 30-day trash/recovery
- Confirmation prompts
- Backup system

**Prevention:**
- Be careful with long-press delete
- Regularly review important captures

---

## 💰 Pricing & Costs

### Q: Is the app free?

**During beta testing:** FREE  
**After launch:** TBD

Potential pricing models:
- Free tier with limits
- Premium features subscription
- One-time purchase
- Enterprise licensing

**Your feedback helps us decide!**

---

## 📞 Getting Support

### Q: How do I report a bug?

**Best methods:**
1. **In-app:** (coming soon)
2. **Email:** [SUPPORT_EMAIL]
3. **Text:** [SUPPORT_PHONE]
4. **GitHub:** Open issue at [REPO_URL]

**Include:**
- What you were doing
- What happened
- Screenshot if possible
- Phone model/OS version

---

### Q: How do I request a feature?

Same as bug reports! We love feature ideas.

**Tell us:**
- What feature you want
- Why it would help
- How you'd use it
- How urgent it is

---

### Q: When will my issue be fixed?

**Priority levels:**
1. **Critical (crashes, data loss):** 24-48 hours
2. **High (blocking work):** 3-5 days
3. **Medium (annoyances):** 1-2 weeks
4. **Low (nice-to-haves):** Next version

---

## 🎓 Learning & Training

### Q: Is there a tutorial?

**Currently:**
- This FAQ
- Quick Reference Card
- Testing Guide
- Setup documentation

**Coming soon:**
- In-app tutorial
- Video walkthroughs
- Interactive guide

---

### Q: How do I train new workers?

**Recommended process:**
1. Show them Quick Reference Card
2. Walk through one capture together
3. Let them try on their own
4. Check in after first day
5. Answer questions as they come

**Average learning time:** 15-30 minutes

---

## 📈 Performance & Best Practices

### Q: How many captures can I take?

**Technical limit:** Unlimited  
**Practical limit:** As many as needed

**Recommendations:**
- 3-5 captures per wall
- Different angles
- Before/during/after drywall
- Important connections

---

### Q: How often should I sync/backup?

**Auto-sync:** After each capture (if online)  
**Manual check:** End of each day

**Best practice:**
- Connect to WiFi at end of day
- Let all photos upload
- Verify in app before leaving

---

## 🌐 System Requirements

### Q: What phones does this work on?

**iOS:**
- iPhone 8 or newer
- iOS 13 or later
- ~1GB free storage

**Android:**
- Android 8.0 or later
- 2GB+ RAM recommended
- ~1GB free storage

---

### Q: Do I need the latest phone?

No! Any phone from 2017 or newer should work fine. Older phones may be slower but will still function.

---

## Still have questions?

**Contact us:**
- 📧 Email: [SUPPORT_EMAIL]
- 📱 Text: [SUPPORT_PHONE]
- 🌐 Website: [WEBSITE_URL]
- 💬 Support hours: M-F, 7am-6pm PST

**We're here to help!** 🚀
