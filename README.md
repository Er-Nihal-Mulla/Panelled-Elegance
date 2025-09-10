# Panelled Elegance - B4 – The Panelling Experts

Welcome to your new Next.js application for "B4 – The Panelling Experts". This project is a visually stunning, professionally designed website tailored for your interior design shop.

## ✨ Features

*   **Project Showcase**: A beautiful gallery to display your portfolio of paneling projects.
*   **AI Idea Generator**: A generative AI-powered tool to provide users with unique paneling ideas based on their preferences.
*   **Style Quiz**: An interactive quiz to guide users toward their perfect paneling style.
*   **Contact Form**: A secure contact form that uses AI to sanitize inquiries before saving them.
*   **Firebase Integrated**: Pre-configured for Firebase Hosting, Firestore, and Storage.

## 🎨 Branding

*   **Theme**: A luxurious and sophisticated dark theme.
*   **Colors**: Rich Gold (`#D4AF37`), Dark Charcoal (`#333333`), and soft Beige (`#F5F5DC`).
*   **Typography**: Elegant 'Playfair Display' for headlines and readable 'PT Sans' for body text.

---

## 🚀 Getting Started

### 1. Install Dependencies

First, install the necessary packages:

```bash
npm install
```

### 2. Set Up Firebase

This project is configured to use Firebase for the backend (database, storage, and hosting).

**Step 1: Create a `.env.local` file**

Create a file named `.env.local` in the root of your project. Copy the contents of `.env.local.example` into it.

```
# .env.local

# Firebase Public Config
# These are safe to expose to the client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Genkit/Google AI API Key
# This is a server-side only key
GOOGLE_API_KEY=
```

**Step 2: Get Firebase Configuration**

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new Firebase project or select an existing one.
3.  In the Project Overview, click the **Web** icon (`</>`) to add a new web app to your project.
4.  Register your app. You don't need to add the SDKs via script tags.
5.  After registering, you'll see a `firebaseConfig` object. Copy the values from this object into your `.env.local` file.

**Step 3: Enable Firebase Services**

In the Firebase Console, enable the following services:

1.  **Firestore Database**:
    *   Go to the `Firestore Database` section.
    *   Click `Create database`.
    *   Start in **test mode** for now. This will allow all reads and writes. For production, you will need to set up security rules.
    *   Choose a location for your database.
    *   You will need two collections: `enquiries` and `portfolio`. The application will create these automatically when you first submit the contact form or if you manually add data to the `portfolio`.

2.  **Cloud Storage**:
    *   Go to the `Storage` section.
    *   Click `Get started`.
    *   Follow the prompts to set up Storage with test rules.

**Step 4: Get Google AI API Key**
The GenAI features use a Google AI model via Genkit.
1.  Go to [Google AI Studio](https://aistudio.google.com/).
2.  Click `Get API Key` and create a new API key.
3.  Copy this key and paste it into the `GOOGLE_API_KEY` field in your `.env.local` file.

### 3. Run the Development Server

Now that your environment variables are set up, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

**Note:** If you run the app without setting up Firebase, the Project Showcase will display mock data, and the contact form will simulate a successful submission without writing to the database.

---

## ☁️ Deploying to Firebase Hosting

This project is set up for deployment with Firebase App Hosting.

**Step 1: Install Firebase CLI**

If you don't have it, install the Firebase command-line tools:

```bash
npm install -g firebase-tools
```

**Step 2: Log in to Firebase**

```bash
firebase login
```

**Step 3: Initialize Firebase**

If you haven't already, run `firebase init` in your project root to link it to your Firebase project. Select `App Hosting` when prompted.

**Step 4: Deploy**

To deploy your site, run the following command:

```bash
firebase deploy --only hosting
```

This will build your Next.js application and deploy it to Firebase Hosting. After a few moments, your site will be live!
