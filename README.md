# NAOMI FASHION HUB

> **SEE IT THEN BE IT**

A production-ready 3D Avatar Customization Studio built with Next.js 14, Tailwind CSS, and Ready Player Me. Inspired by the Snapchat/Bitmoji interface.

## Features

- **3D Avatar Engine**: Embedded Ready Player Me creator via iframe with `postMessage` API
- **Background Upload**: "Snap" feature to upload custom photos as avatar backgrounds
- **Undo/Redo System**: Full history stack for outfit changes
- **Dynamic Categories**: Fashion Store, Personal Closet, and Avatar Body customization tabs
- **Color Swatches**: Real-time skin, hair, and clothing color selection
- **Dark Mode Aesthetic**: Deep charcoal UI matching the Bitmoji reference
- **Responsive Grid**: 3-4 column adaptive item grid with Framer Motion animations
- **Save & Export**: One-click avatar export with toast confirmation
- **Gender Filter**: Filter fashion items by Men / Women / All
- **100+ Real Brand Styles**: Authentic brands from around the world

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| 3D Engine | Ready Player Me (iframe) |
| Utilities | clsx + tailwind-merge |

## Project Structure

```
naomi-fashion-hub/
├── app/
│   ├── layout.tsx      # Root layout with Inter font + metadata
│   ├── page.tsx        # Main application logic & UI (100+ brands)
│   └── globals.css     # Tailwind setup + custom scrollbars
├── package.json
├── next.config.js      # Standalone output + CSP headers
├── tailwind.config.js  # Custom color palette (naomi.*)
├── postcss.config.js
└── tsconfig.json
```

## Local Development

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd naomi-fashion-hub

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev

# 4. Open http://localhost:3000
```

## Deploy to Render (Production)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: NAOMI FASHION HUB"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/naomi-fashion-hub.git
git push -u origin main
```

### Step 2: Create Render Service

1. Go to [dashboard.render.com](https://dashboard.render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository (`naomi-fashion-hub`)
4. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | `naomi-fashion-hub` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run start` |
| **Plan** | Free (or Starter for production) |

5. Click **"Create Web Service"**

Render will automatically:
- Install dependencies (`npm install`)
- Build the Next.js app (`next build`)
- Start the production server (`next start`) on port `10000`

### Step 3: Environment Variables (Optional)

If you add a database or external API later:

1. In Render Dashboard → Your Service → **Environment**
2. Add key-value pairs (e.g., `DATABASE_URL`, `RPM_SUBDOMAIN`)
3. Redeploy automatically triggers

## Important Notes

### Ready Player Me Integration

The app uses the **public demo** RPM iframe:
```
https://demo.readyplayer.me/avatar?frameApi&clearCache
```

For production, replace this with your own RPM subdomain:
```
https://YOUR_SUBDOMAIN.readyplayer.me/avatar?frameApi
```

### CSP Headers

`next.config.js` includes Content Security Policy headers allowing `frame-src` from `*.readyplayer.me`. Update this if you change the RPM domain.

### Standalone Output

`next.config.js` sets `output: 'standalone'` for optimal Docker/container performance on Render.

## Contact

**NAOMI FASHION HUB**
- Location: MPAMA EGBU OWERRI NORTH LGA
- Phone: 08163002468
- Email: ogueriamarachi0@gmail.com

## License

Proprietary — All rights reserved.
