# Firebase setup

## Services

This site uses Firebase Authentication and Cloud Firestore. Activity photos and
videos are normal files deployed with the website; they are not uploaded to
Firebase Storage.

1. In Firebase Console for project `nova-ai-a3a51`, create Cloud Firestore in
   production mode if it does not already exist.
2. Enable **Email/Password** in Authentication > Sign-in method.
3. Create and verify the administrator account `univtam11info@gmail.com`.
4. Publish the rules from `firestore.rules` in Firestore Database > Rules.
5. Enable Firebase Hosting for the project from the Firebase Console.

Collections appear on the first successful submission:

| Collection | Purpose | Public access |
| --- | --- | --- |
| `courseRegistrations` | Course registration requests | Create only |
| `workshopRequests` | Interest in future workshops | Create only |
| `competitionRequests` | Hackathon and competition enquiries | Create only |
| `contactMessages` | General contact messages | Create only |
| `activities` | Published activity gallery entries | Read published entries only |

The verified administrator can read requests and update their status from
`dach.html`. Select a request type to load its latest 50 entries; the dashboard
does not delete requests. The same account can publish activities. Older
activity records with Firebase Storage URLs may not load if that bucket is
unavailable.

## Publish website and activity media

The Firebase Storage service is intentionally not used: Firebase Storage
requires the Blaze billing plan. Hosting and Firestore have free-tier quotas;
review current quotas and stop deployments if usage approaches those limits.

To add media to an activity:

1. Copy image/video files into `images/activities/`.
2. Use simple English filenames containing only letters, digits, `_` or `-`.
   Supported image extensions: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`.
   Supported video extensions: `.mp4`, `.webm`. Keep each asset under 20 MB.
3. Deploy the website. The Firebase Hosting configuration in `firebase.json`
   serves the project files while excluding rules and setup notes.
4. In `dach.html`, enter each deployed asset path, one per line, such as
   `images/activities/workshop-2026.jpg`.
5. Publish the activity to Firestore. The dashboard checks that each asset is
   already reachable from the current website before saving the post.

Every time you add new media, deploy the website again before publishing an
activity that references it.

The activity document stores each media path and its type as values in
Firestore; the image and video files remain website assets and are not encoded
into database documents.

## Deploy

Install Firebase CLI, then run these commands from the project folder:

```powershell
npm install -g firebase-tools
firebase login
firebase use nova-ai-a3a51
firebase deploy --only firestore:rules,hosting
```

First activate Firebase Hosting in the Firebase Console. If the CLI reports
that Hosting is not initialized, run `firebase init hosting`, select the
existing `nova-ai-a3a51` project and current directory (`.`) as the public
directory, keep single-page-app rewrites disabled, and keep the existing
`firebase.json` configuration. The Google account used by `firebase login`
needs permission to deploy to the project. Add the deployed Hosting domain to
Authentication > Settings > Authorized domains. Serve the project over HTTP;
opening its files using `file://` does not support Firebase modules reliably.

The Firebase Web API key in `firebase.js` identifies the web app; it is not a
server credential. Never add service-account keys or private credentials to
this website. Public forms can still receive spam. Configure Firebase App Check
before enabling its enforcement.
