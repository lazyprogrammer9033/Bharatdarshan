# Turning on sign-in (Google, Apple, phone)

The app has a sign-in screen built in. It stays switched off until the Firebase config at the top of `index.html` is filled in, so the live site works as before until then.

All of this can be done from a phone browser at https://console.firebase.google.com (tap "Desktop site" in the browser menu if a page looks cramped).

## 1. Create the Firebase project (free)
1. Add project, name it (for example "RE Bharat Darshan"). Google Analytics is optional.
2. On the project home, tap the web icon `</>` to add a Web app. Any nickname. Skip Firebase Hosting.
3. It shows a `firebaseConfig` with apiKey, authDomain, projectId, storageBucket, messagingSenderId and appId. Copy it. It is safe to put in a public website; access is protected by the rules in step 4.

## 2. Turn on sign-in methods
Build > Authentication > Get started > Sign-in method:
- **Google**: Enable, pick a support email, Save.
- **Phone**: Enable, Save. Under "SMS region policy" allow India and Canada. Add a test number (for example +91 99999 00000 with code 123456) to try it without real texts. Real texts need the pay-as-you-go Blaze plan if Firebase asks for it; each SMS costs a few cents.
- **Apple**: needs a paid Apple Developer account ($99 USD a year, also needed for the App Store). In the Apple Developer site create a Services ID, a Sign in with Apple key, and set the return URL that Firebase shows on the Apple settings screen. Then paste the Services ID, Team ID, Key ID and key into Firebase. Until this is done the Apple button shows "This sign-in method isn't switched on yet".

Authentication > Settings > Authorized domains > Add domain: `lazyprogrammer9033.github.io`

## 3. Create the database
Build > Firestore Database > Create database. Location: `asia-south1 (Mumbai)`. Start in production mode.

## 4. Set the security rules
Firestore Database > Rules: replace everything with the contents of `firestore.rules` in this repo, then Publish.

## 5. Paste the config
Replace the empty `window.REBD_FIREBASE={...}` line near the top of `index.html` with your values (or send the config to Claude to do it).

## How it behaves
- Everyone must sign in before using the app. Returning riders stay signed in.
- Trips you've marked done, your own trips, My Trip progress, the active trip, budget and Ride Safe settings sync to the account. Live ride state (GPS, fuel left, weather) stays on the phone doing the riding.
- Everything saves on the phone first and works offline; it backs up when online. The newest change wins if two phones edit the same thing.
- If a different person signs in on the same phone, the previous rider's data is cleared from that phone first.
- The account button (top right) shows who is signed in, with Sign out and Delete my account. In-app account deletion is required by Apple's App Store rules.
- Subscription status will live at `users/{uid}/billing/...`, writable only by a server (for example RevenueCat or store webhooks), never by the app.

## Later, in the iOS and Android apps
Web pop-up sign-in doesn't work well inside a Capacitor app. When the app is wrapped, switch to native sign-in (the `@capacitor-firebase/authentication` plugin) and keep the same Firebase project, so existing accounts carry over.
