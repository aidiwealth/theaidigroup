# Deployment guide

## ⚠️ If your DigitalOcean build is failing with "Cannot find native binding"

You committed `node_modules/` to your Git repository. That folder must **never** be in Git — it contains platform-specific compiled binaries (e.g. macOS / Apple Silicon native modules) that won't work on the Linux build server.

The fix takes 30 seconds:

```bash
# 1. From inside your repo root, run:
git rm -r --cached node_modules
git rm --cached package-lock.json  # also gets out the lockfile so npm regenerates it cleanly
git commit -m "Remove node_modules and package-lock.json from repo"
git push

# 2. (Optional but recommended) Delete them locally too and reinstall fresh:
rm -rf node_modules package-lock.json
npm install
```

Then re-trigger the deploy. The build server will run `npm ci` (or `npm install`) on a clean tree, pull the correct Linux native binaries, and the build will succeed.

**Why this happened**: when you ran `npm install` locally to test, npm created `node_modules/` with macOS / Windows native bindings inside. If you then `git add .` everything, that folder got committed. The included `.gitignore` excludes it for future changes, but anything already tracked stays tracked until you explicitly `git rm --cached` it.

---

## Deploy to DigitalOcean App Platform (static site)

This is the cleanest deployment path for this project.

### One-time setup

1. **Push the repo to GitHub** (without `node_modules` — see above)

2. **In DigitalOcean App Platform**:
   - Click "Create App"
   - Connect your GitHub repo
   - Select the branch (e.g. `main`)
   - **Resource type**: choose **"Static Site"** (not "Web Service")
   - **Source directory**: leave as root `/`

3. **Configure build settings**:
   - **Build command**: `npm ci && npm run generate`
   - **Output directory**: `.output/public`
   - **Environment**: Node.js
   - The `engines.node` field in `package.json` will pin Node to 20.x (also the `.node-version` file)

4. **Click Deploy**.

The first build takes ~2–3 minutes. Subsequent deploys are faster (~60s).

### What gets deployed

The static site in `.output/public/` — a fully-rendered HTML + CSS + JS bundle. No server runtime needed. DigitalOcean hosts this on its CDN.

### Custom domain

In the App Platform dashboard → Settings → Domains → add `telroi.com` (or whatever your domain is). They'll give you DNS records to point at their nameservers.

---

## Alternative deployment targets

The build output (`.output/public/`) is a plain static site. It deploys to anything:

### Vercel

```bash
# Connect repo at vercel.com — they auto-detect Nuxt
# Or use the CLI:
npx vercel --prod
```

### Netlify

```bash
# Build command: npm run generate
# Publish directory: .output/public
```

### Cloudflare Pages

```bash
# Build command: npm run generate
# Build output directory: .output/public
# Root directory: (leave empty)
```

### Plain web server (S3, nginx, Apache)

Build locally, upload the contents of `.output/public/` to your web root:

```bash
npm install
npm run generate
# Upload everything inside .output/public/ to your server's web root
```

---

## Already-built `dist/` folder

The repo includes a prebuilt `dist/` folder containing the static site output. If you don't want to set up a build pipeline at all, you can:

1. Delete `dist/` from `.gitignore` (it's already not ignored)
2. Commit the `dist/` folder
3. Configure your host to serve from `dist/` directly without any build step

This works on any static host. It's also useful for emergency deploys when the build pipeline is broken.

To regenerate `dist/` after editing source:
```bash
npm install            # if you haven't yet
npm run generate
rm -rf dist
cp -r .output/public dist
```

---

## What should be in your `.gitignore`

The included `.gitignore` already covers all of this — but verify it's in your repo and being respected:

```gitignore
node_modules
.nuxt
.output
.data
.env
*.log
.DS_Store
```

The lockfile (`package-lock.json`) **should** be committed — it pins exact dependency versions for reproducible builds. Only `node_modules/` itself is excluded.

---

## Troubleshooting

### "Build failed: Cannot find module"
You're missing a dependency. Add it to `package.json` → `dependencies` (not `devDependencies` if it's needed at build time).

### "Out of memory during build"
Increase the build container size in DigitalOcean App Platform settings, or split the build:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run generate
```

### Build succeeds but site shows 404 / missing assets
Output directory mismatch. Make sure DigitalOcean's "Output Directory" is set to `.output/public` (not `dist` unless you're using the prebuilt approach).

### Local dev works but deploy fails
99% of the time it's `node_modules` committed to the repo. See the top of this doc.
