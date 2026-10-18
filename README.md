# Ranaha Gold Company — Frontend Deployment

Public-facing website for **Ranaha Gold Company**, a growing gold-services brand from Andhra Pradesh.

This folder is a self-contained, Vercel-ready copy of the Ranaha Gold frontend. It was prepared from the main project for independent deployment through GitHub and Vercel.

---

## Technologies

| Technology       | Version   | Purpose                                  |
|------------------|-----------|------------------------------------------|
| Next.js          | 14.x      | React framework (App Router)             |
| React            | 18.x      | UI library                               |
| TypeScript       | 5.x       | Type safety                              |
| Tailwind CSS     | 3.x       | Utility-first styling                    |
| Framer Motion    | 11.x      | Animations                               |
| Lucide React     | 0.453     | Icons                                    |
| Supabase JS      | 2.x       | Backend client (enquiries, careers)      |

---

## What Works in Frontend-Only Mode

These features work out of the box with no backend configuration:

- ✅ Homepage with full design, animations, and particles
- ✅ Announcement banner with Kurnool branch opening countdown
- ✅ Hero section with gold typography and brand identity
- ✅ Navigation bar and responsive mobile menu
- ✅ About section
- ✅ Services section
- ✅ Franchise overview and individual franchise tier pages (`/franchise/platinum`, `/franchise/diamond`, `/franchise/gold`, `/franchise/silver`)
- ✅ Membership section
- ✅ Funding section
- ✅ Careers section (UI and modal — submission is "Coming Soon")
- ✅ Contact / enquiry form (UI renders — submission shows "Coming Soon")
- ✅ Customer mandatories and five-step process sections
- ✅ Footer
- ✅ All public images, logos, and assets
- ✅ SEO metadata, `robots.txt`, and `sitemap.xml`
- ✅ Responsive design for desktop and mobile

---

## What Requires a Backend / Environment Variables

These features depend on Supabase and environment variables. They will still render in the UI, but their server-side functionality requires configuration:

| Feature                    | Dependency              | What Happens Without It                                                |
|----------------------------|-------------------------|------------------------------------------------------------------------|
| **Live Metal Rates**       | External API + API route| The `/api/metals` route fetches from public APIs. Falls back to static reference rates if both APIs fail. Works on Vercel with no config. |
| **Enquiry Form Submission**| Supabase + service key  | The form renders and the submit button says "Coming Soon". If re-enabled, it posts to `/api/enquiry`, which requires `SUPABASE_SERVICE_ROLE_KEY`. |
| **Career Applications**    | Supabase + service key  | The modal renders and the submit button says "Coming Soon". If re-enabled, it posts to `/api/careers`, which requires `SUPABASE_SERVICE_ROLE_KEY`. |
| **Middleware (admin auth)**| Supabase anon key       | Middleware only runs for `/admin/*` routes, which are excluded from this deployment. It has no effect on public pages. |

> **Live Metal Rates will work on Vercel without any environment variables.** The API route uses a free public API (OroPocket) as its primary source, with a hardcoded fallback. The optional `GOLD_API_KEY` adds a secondary provider.

---

## What Is Excluded

The following are **not** included in this deployment folder (they remain in the original project):

- Admin dashboard, admin login, and admin pages
- Admin API routes (`/api/admin/*`)
- Admin authentication utilities (`admin-auth.ts`, `supabase-admin.ts`)
- Database migrations, SQL files, and Supabase CLI state
- `.env.local` and any real credentials
- `node_modules/` and `.next/` build cache
- `.git/` history
- Development documents and internal notes

---

## Getting Started

### 1. Open the Folder Independently

Copy this entire `ranaha-gold-frontend-deploy` folder to any location on your computer. It is fully self-contained.

```bash
# Example: copy to your Desktop
cp -r ranaha-gold-frontend-deploy ~/Desktop/ranaha-gold-frontend-deploy
cd ~/Desktop/ranaha-gold-frontend-deploy
```

### 2. Install Dependencies

Make sure you have **Node.js 18+** installed.

```bash
npm install
```

This uses the included `package-lock.json` for reproducible installs.

### 3. Set Up Environment Variables

```bash
# Windows PowerShell:
Copy-Item .env.example .env.local

# macOS / Linux:
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials if you want enquiry/career form submission to work. For just viewing the website, you can use placeholder values — the public pages will render without valid Supabase credentials (forms show "Coming Soon").

**Minimum `.env.local` for the site to build and run:**

```
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder
SUPABASE_SERVICE_ROLE_KEY=placeholder
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build and Verify

```bash
npm run build
```

If the build succeeds with no errors, the project is ready for deployment.

To preview the production build locally:

```bash
npm start
```

---

## Deploying to GitHub

### Step 1: Create a New GitHub Repository

1. Go to [github.com/new](https://github.com/new).
2. Name the repository (e.g., `ranaha-gold-website`).
3. Set it to **Private** (recommended, since the code is proprietary).
4. Do **not** initialize with README, `.gitignore`, or license (this folder already has them).
5. Click **Create repository**.

### Step 2: Push This Folder's Contents

Open a terminal **inside this `ranaha-gold-frontend-deploy` folder** and run:

```bash
git init
git add .
git commit -m "Initial commit: Ranaha Gold frontend deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ranaha-gold-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username and `ranaha-gold-website` with whatever you named the repository.

---

## Deploying to Vercel

### Step 1: Import into Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (or create an account).
2. Click **Add New → Project**.
3. Connect your GitHub account if you haven't already.
4. Select the repository you just pushed (`ranaha-gold-website`).

### Step 2: Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

| Setting            | Value         |
|--------------------|---------------|
| **Framework Preset** | Next.js       |
| **Root Directory** | `.` (leave as default — the repo root is the project root) |
| **Build Command**  | `next build` (or leave as default) |
| **Output Directory** | `.next` (leave as default) |
| **Install Command** | `npm install` (leave as default) |

> **Important:** The Root Directory should be `.` (the repository root). Do **not** set it to `ranaha-gold-frontend-deploy` — the contents of this folder become the root of the repository.

### Step 3: Set Environment Variables

In the Vercel project settings → **Environment Variables**, add:

| Variable                         | Required? | Notes                                    |
|----------------------------------|-----------|------------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`       | Yes       | Your Supabase project URL                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | Yes       | Supabase publishable/anon key            |
| `SUPABASE_SERVICE_ROLE_KEY`      | Yes       | Supabase service-role key (server-only)  |
| `GOLD_API_KEY`                   | No        | Optional GoldAPI.io key for metal rates  |
| `METALS_CACHE_TTL`               | No        | Cache lifetime in seconds (default: 300) |
| `NEXT_PUBLIC_SITE_URL`           | No        | Your production URL for SEO metadata     |

> Without Supabase credentials, the site will build and deploy, but enquiry and career form submissions will return a 503 error if someone bypasses the "Coming Soon" button. The rest of the website works fully.

### Step 4: Deploy

Click **Deploy**. Vercel will install dependencies, build the project, and deploy it.

After deployment, Vercel provides a URL like `https://ranaha-gold-website.vercel.app`. You can later add a custom domain in the Vercel dashboard.

---

## Project Structure

```
ranaha-gold-frontend-deploy/
├── public/                  # Static assets (images, logos, SEO files)
│   ├── images/              # Logo and membership card images
│   ├── data/maps/           # GeoJSON map data
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout with fonts and metadata
│   │   ├── page.tsx         # Homepage
│   │   ├── globals.css      # Global styles
│   │   ├── api/
│   │   │   ├── enquiry/     # Enquiry form API route
│   │   │   ├── careers/     # Career application API route
│   │   │   └── metals/      # Live metal rates API route
│   │   └── franchise/       # Franchise detail pages
│   │       └── [tier]/      # Dynamic route (platinum/diamond/gold/silver)
│   ├── components/          # All React components
│   ├── data/                # Static data files and GeoJSON maps
│   ├── lib/                 # Utility functions, fonts, Supabase clients
│   ├── types/               # TypeScript type definitions
│   └── middleware.ts        # Auth middleware (only targets /admin/* routes)
├── .env.example             # Environment variable template
├── .gitignore               # Git ignore rules
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies and scripts
├── package-lock.json        # Lockfile for reproducible installs
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS theme and configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

---

## Limitations Before Going Fully Live

1. **Form submissions are disabled.** Public forms show "Coming Soon" and do not save data. To enable submissions, configure valid Supabase credentials and verify the database schema has the required tables (`enquiries`, `career_applications`).

2. **No admin portal.** Admin pages and admin API routes are not included. The admin dashboard must be deployed separately or added back from the original project.

3. **Middleware references Supabase.** The middleware only runs for `/admin/*` routes (which are not in this deployment), so it has no effect on public pages. If you remove the Supabase dependencies entirely in the future, also delete `src/middleware.ts`.

4. **Custom domain setup.** After deploying to Vercel, configure your custom domain (e.g., `www.ranahagold.com`) in the Vercel dashboard under **Settings → Domains**.

5. **`sitemap.xml` and `robots.txt`** reference `www.ranahagold.com`. Update these files if your domain is different.

---

## Available Scripts

| Command         | Purpose                                |
|-----------------|----------------------------------------|
| `npm run dev`   | Start development server on port 3000  |
| `npm run build` | Create production build                |
| `npm start`     | Serve production build locally         |
| `npm run lint`  | Run ESLint                             |

---

## Support

This deployment was prepared from the Ranaha Gold Company main project. For questions about the original codebase, database setup, or admin functionality, refer to the main project repository.
