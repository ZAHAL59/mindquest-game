# MindQuest — Vercel Deployment

## Deploy in 3 steps

### Step 1 — Upload to GitHub
1. Create a new GitHub repository (e.g. `mindquest-game`)
2. Upload all files from this folder:
   ```
   mindquest-vercel/
   ├── api/
   │   ├── gemini.js      ← Gemini AI proxy (keeps key secure)
   │   └── models.js      ← Model list proxy
   ├── public/
   │   └── index.html     ← The game
   ├── vercel.json        ← Routing config
   └── README.md
   ```

### Step 2 — Deploy on Vercel
1. Go to **vercel.com** → Sign in with GitHub
2. Click **"Add New Project"**
3. Import your `mindquest-game` repository
4. Click **Deploy** (no build settings needed)

### Step 3 — Add your Gemini API Key
1. In Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `AIza...` (your key from aistudio.google.com)
   - **Environment:** Production, Preview, Development ✓ (check all three)
3. Click **Save**
4. Go to **Deployments** → **Redeploy** (so the env var takes effect)

### Done!
Share the Vercel URL with your manager. No API key entry, no setup — just open and play.

---

## How it works
- The game (`public/index.html`) calls `/api/gemini` instead of Google directly
- `/api/gemini` is a Vercel serverless function that adds your API key server-side
- Your key is **never exposed** in the browser — it only exists as a Vercel env var
- Students and managers see no API key prompt — the game just works

## Get a free Gemini API key
1. Go to **aistudio.google.com**
2. Sign in with Google
3. Click **"Get API key"** → **"Create API key"**
4. Copy the key (starts with `AIza...`)
