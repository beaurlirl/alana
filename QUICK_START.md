# 🚀 Quick Start Guide

Get your portfolio website up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Tailwind CSS, and other dependencies.

## Step 2: Set Your Admin Password

The default password is `admin123`. For security, you should change it before deploying.

Option A: Edit `.env.local` (already created):
```env
ADMIN_PASSWORD=your_secure_password_here
```

Option B: Create `.env.local` if it doesn't exist and add:
```env
ADMIN_PASSWORD=your_secure_password_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 3: Start the Development Server

```bash
npm run dev
```

Your site will be available at:
- **Public Site**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

## Step 4: Customize Your Content

### A. Update Personal Information

**Edit About Page** (`app/about/page.tsx`):
- Replace `[Your City]` with your location
- Add your measurements and details
- Update your bio

**Edit Contact Page** (`app/contact/page.tsx`):
- Replace `hello@alana.com` with your email
- Update Instagram handle
- Add your agency information
- Update your location

**Edit Model Name** (`data/portfolio.json`):
```json
{
  "modelName": "Your Name",
  "heroTagline": "Your Tagline"
}
```

### B. Upload Your Photos

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Login with your password (default: `admin123`)
3. Drag and drop your images or click to upload
4. Add titles and descriptions (optional)
5. Drag to reorder images
6. View your portfolio at [http://localhost:3000](http://localhost:3000)

## Step 5: Deploy to Vercel

### Quick Deploy (Easiest)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
# Create a new repository on GitHub, then:
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

2. **Deploy on Vercel**:
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Add environment variable: `ADMIN_PASSWORD=your_password`
- Click "Deploy"
- Done! 🎉

### Manual Deploy

```bash
npm run build
```

Then deploy the `.next` folder to any hosting provider.

## Common Tasks

### Change Password
Edit `.env.local` and change `ADMIN_PASSWORD`

### Upload Images
Go to `/admin` → Upload section → Drag & drop

### Reorder Images
Go to `/admin` → Drag images in the "Manage Images" section

### Edit Image Details
Go to `/admin` → Click "Edit" on any image

### Delete Images
Go to `/admin` → Click "Delete" on any image

### Change Colors
Edit `tailwind.config.ts` → `colors` section

### Change Model Name
Edit `data/portfolio.json` → `modelName` field

## Troubleshooting

**Problem**: Can't login to admin
- **Solution**: Check your password in `.env.local` or use default `admin123`

**Problem**: Images not showing
- **Solution**: Make sure `public/uploads` folder exists and has write permissions

**Problem**: Build errors
- **Solution**: Delete `node_modules` and `.next`, then run `npm install` again

**Problem**: Port already in use
- **Solution**: Use a different port: `npm run dev -- -p 3001`

## Need More Help?

Check the full [README.md](README.md) for detailed documentation.

---

**That's it! You're ready to showcase your portfolio to the world! 🌟**

