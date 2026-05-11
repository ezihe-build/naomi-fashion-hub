# Render Deployment Guide

## Quick Deploy (5 minutes)

### 1. Prepare Repository
```bash
cd naomi-fashion-hub
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

Create a new repository on GitHub, then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/naomi-fashion-hub.git
git push -u origin main
```

### 2. Create Web Service on Render

1. Visit [render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Select your GitHub repository
4. Fill in:
   - **Name**: `naomi-fashion-hub`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
5. Click **Create Web Service**

### 3. Wait for Deploy

Render will run:
```
==> Running build command 'npm install && npm run build'
...
==> Running 'npm run start'
```

Your app will be live at `https://naomi-fashion-hub.onrender.com`

### 4. Verify

- Open the URL
- Check that the RPM iframe loads
- Test background upload (Snap button)
- Test category switching and item selection

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails | Check Node version ≥ 18 in `package.json` engines |
| iframe blocked | Verify CSP headers in `next.config.js` |
| Styles missing | Ensure `postcss.config.js` and `tailwind.config.js` are committed |
| Port issues | Render auto-sets `PORT` env var; Next.js reads it automatically |

## Performance Tips

1. **Enable caching** in Render dashboard → Caching
2. **Upgrade to Starter** ($7/mo) for faster builds and no sleep
3. **Add a CDN** for static assets if scaling
