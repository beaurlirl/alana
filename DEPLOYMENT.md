# 🌐 Deployment Guide

Complete guide for deploying your portfolio website to various hosting platforms.

## Prerequisites

Before deploying, make sure you have:

1. ✅ Tested locally with `npm run dev`
2. ✅ Customized your content (About, Contact pages)
3. ✅ Set a secure admin password in environment variables
4. ✅ Pushed your code to GitHub (for most platforms)

## Deployment Options

- [Vercel](#vercel-recommended) - **Easiest and recommended**
- [Netlify](#netlify)
- [Railway](#railway)
- [DigitalOcean App Platform](#digitalocean)
- [AWS Amplify](#aws-amplify)

---

## Vercel (Recommended)

Vercel is made by the creators of Next.js and offers the best integration.

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub
   - Click "Import Project"
   - Select your repository
   - Configure:
     - **Framework Preset**: Next.js
     - **Build Command**: `npm run build` (default)
     - **Output Directory**: `.next` (default)
   - Add environment variables:
     - `ADMIN_PASSWORD`: Your secure password
     - `NEXT_PUBLIC_SITE_URL`: Your deployment URL (you'll get this after first deploy)
   - Click "Deploy"

3. **Update Environment Variable**:
   - After deployment, copy your Vercel URL (e.g., `https://alana.vercel.app`)
   - Go to Project Settings → Environment Variables
   - Update `NEXT_PUBLIC_SITE_URL` with your Vercel URL
   - Redeploy

4. **Custom Domain (Optional)**:
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `alana.com`)
   - Follow DNS configuration instructions from your domain provider

### Method 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts and add environment variables when asked.

### Environment Variables for Vercel

| Variable | Value | Required |
|----------|-------|----------|
| `ADMIN_PASSWORD` | Your secure password | ✅ Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | ✅ Yes |

---

## Netlify

### Method 1: GitHub Integration

1. **Push to GitHub** (see Vercel instructions above)

2. **Deploy on Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - Add environment variables in "Site settings" → "Environment variables":
     - `ADMIN_PASSWORD`
     - `NEXT_PUBLIC_SITE_URL`
   - Click "Deploy site"

### Method 2: Drag & Drop

```bash
npm run build
```

Then drag the `.next` folder to Netlify's deploy interface.

⚠️ Note: You'll need to manually add environment variables in Site Settings.

### Method 3: Netlify CLI

```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## Railway

Railway offers simple deployment with automatic scaling.

1. **Push to GitHub** (see instructions above)

2. **Deploy on Railway**:
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Add environment variables:
     - `ADMIN_PASSWORD`
     - `NEXT_PUBLIC_SITE_URL`
   - Railway will automatically detect Next.js and deploy

3. **Get Your URL**:
   - Click "Settings" → "Generate Domain"
   - Update `NEXT_PUBLIC_SITE_URL` with this domain
   - Redeploy

---

## DigitalOcean App Platform

1. **Push to GitHub** (see instructions above)

2. **Create App**:
   - Go to [cloud.digitalocean.com/apps](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Choose GitHub and select your repository
   - Configure:
     - **Name**: alana-portfolio
     - **Branch**: main
     - **Build Command**: `npm run build`
     - **Run Command**: `npm start`
   - Add environment variables
   - Choose plan (Basic is fine for portfolios)
   - Click "Create Resources"

---

## AWS Amplify

1. **Push to GitHub** (see instructions above)

2. **Deploy on Amplify**:
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
   - Click "New app" → "Host web app"
   - Connect GitHub
   - Select your repository and branch
   - Configure build settings:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```
   - Add environment variables
   - Save and deploy

---

## Post-Deployment Checklist

After deploying, make sure to:

- [ ] Test the live site
- [ ] Login to admin panel (`yoursite.com/admin`)
- [ ] Upload a test image
- [ ] Check mobile responsiveness
- [ ] Update About and Contact pages
- [ ] Set up custom domain (if desired)
- [ ] Enable HTTPS (usually automatic)
- [ ] Test image upload and deletion
- [ ] Test image reordering

---

## Custom Domain Setup

Most platforms offer similar steps:

1. **Purchase a domain** from:
   - Namecheap
   - GoDaddy
   - Google Domains
   - Cloudflare

2. **Add to hosting platform**:
   - Go to your project settings
   - Find "Domains" or "Custom Domains"
   - Add your domain (e.g., `alana.com`)

3. **Configure DNS**:
   - Add provided records to your domain provider:
     - Type: `A` or `CNAME`
     - Name: `@` or `www`
     - Value: [Provided by hosting platform]

4. **Wait for propagation** (5 minutes to 48 hours)

5. **Enable SSL/HTTPS** (usually automatic)

---

## Updating Your Site

### For Git-based Deployments (Recommended)

```bash
# Make changes locally
git add .
git commit -m "Update content"
git push

# Your site will automatically redeploy!
```

### Manual Updates

For manual deployments, repeat the build and upload process.

---

## Troubleshooting

### Build Fails

**Error**: Module not found
```bash
# Solution: Make sure all dependencies are in package.json
npm install
npm run build
```

**Error**: Environment variables not set
- Go to your platform's dashboard
- Navigate to Environment Variables or Settings
- Add required variables
- Redeploy

### Images Not Persisting

**Problem**: Uploaded images disappear after redeploy

**Solution**: Platforms like Vercel use ephemeral file systems. Consider:
1. Using a cloud storage solution (AWS S3, Cloudinary)
2. Using a database (Supabase, Firebase)
3. Committing images to Git (not recommended for many images)

For production, I recommend migrating to Cloudinary or AWS S3 for image storage. This requires modifying the upload and image display logic.

### Admin Can't Login

- Check environment variables are set correctly
- Clear browser cookies
- Try incognito/private mode
- Check that `ADMIN_PASSWORD` matches what you're entering

### Site is Slow

- Enable image optimization (Next.js does this by default)
- Use Vercel's Edge Network
- Compress images before upload
- Enable caching headers

---

## Production Recommendations

For a production-ready portfolio:

1. **Change Default Password**: Use a strong, unique password
2. **Enable Analytics**: Add Google Analytics or Vercel Analytics
3. **Set up Monitoring**: Use Vercel Monitoring or LogRocket
4. **Backup Data**: Regularly backup `data/portfolio.json`
5. **Cloud Storage**: Consider moving images to Cloudinary or AWS S3
6. **Performance**: Enable all caching and optimization features
7. **SEO**: Add meta tags, sitemap, and robots.txt

---

## Need Help?

- Check the [README.md](README.md) for general documentation
- Visit [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Check your hosting platform's documentation
- Search for platform-specific issues on Stack Overflow

---

**Happy deploying! 🚀**

