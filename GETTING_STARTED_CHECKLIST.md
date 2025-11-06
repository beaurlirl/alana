# ✅ Getting Started Checklist

Follow this checklist to get your portfolio live in under an hour!

---

## 📋 Pre-Deployment Checklist

### Step 1: Installation (5 minutes)

- [ ] Open terminal in project folder
- [ ] Run `npm install` and wait for completion
- [ ] Verify no error messages appear

### Step 2: Local Testing (10 minutes)

- [ ] Run `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Verify homepage loads correctly
- [ ] Check navigation works (Home, Portfolio, About, Contact)
- [ ] Visit http://localhost:3000/admin
- [ ] Login with password: `admin123`
- [ ] Upload a test image
- [ ] Verify image appears on homepage
- [ ] Try dragging to reorder images
- [ ] Try clicking an image to open lightbox
- [ ] Test on mobile (Chrome DevTools → Toggle Device Toolbar)

### Step 3: Content Customization (15 minutes)

#### Update About Page
- [ ] Open `app/about/page.tsx`
- [ ] Replace `[Your City]` with your location
- [ ] Update bio paragraphs with your story
- [ ] Fill in your measurements
- [ ] Save the file

#### Update Contact Page
- [ ] Open `app/contact/page.tsx`
- [ ] Replace `hello@alana.com` with your email
- [ ] Update Instagram handle
- [ ] Add your agency information
- [ ] Update your location
- [ ] Save the file

#### Update Model Information
- [ ] Open `data/portfolio.json`
- [ ] Change `modelName` to your name
- [ ] Change `heroTagline` to your title
- [ ] Save the file
- [ ] Refresh browser to see changes

### Step 4: Upload Your Images (10 minutes)

- [ ] Go to http://localhost:3000/admin
- [ ] Login with password
- [ ] Upload 5-10 of your best images
- [ ] Add titles to key images (optional)
- [ ] Add descriptions where helpful (optional)
- [ ] Drag to reorder images in your preferred sequence
- [ ] View homepage to verify layout
- [ ] Click images to test lightbox
- [ ] Test on mobile view

### Step 5: Security (2 minutes)

- [ ] Open `.env.local` file
- [ ] Change `ADMIN_PASSWORD` from `admin123` to something secure
  - Use at least 12 characters
  - Mix letters, numbers, and symbols
  - Don't use personal info
- [ ] Save the file
- [ ] Restart dev server (`Ctrl+C` then `npm run dev`)
- [ ] Test login with new password

---

## 🚀 Deployment Checklist

### Step 6: Prepare for Deployment (5 minutes)

- [ ] Stop dev server (`Ctrl+C`)
- [ ] Run `npm run build` to test production build
- [ ] Fix any errors that appear
- [ ] Verify build completes successfully

### Step 7: Git Setup (5 minutes)

- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Create repository on GitHub
- [ ] Copy repository URL
- [ ] Add remote: `git remote add origin YOUR_URL`
- [ ] Push code: `git push -u origin main`

### Step 8: Deploy to Vercel (5 minutes)

- [ ] Go to [vercel.com/new](https://vercel.com/new)
- [ ] Sign in with GitHub
- [ ] Click "Import Project"
- [ ] Select your repository
- [ ] Add environment variables:
  - [ ] `ADMIN_PASSWORD` = your secure password
  - [ ] `NEXT_PUBLIC_SITE_URL` = (leave blank for now)
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Copy your Vercel URL (e.g., `https://alana.vercel.app`)
- [ ] Go to Project Settings → Environment Variables
- [ ] Update `NEXT_PUBLIC_SITE_URL` with your Vercel URL
- [ ] Redeploy (Deployments tab → click ⋯ → Redeploy)

### Step 9: Post-Deployment Testing (5 minutes)

- [ ] Visit your live site
- [ ] Test all navigation links
- [ ] Verify images load correctly
- [ ] Test lightbox functionality
- [ ] Check mobile responsiveness
- [ ] Go to `/admin` on live site
- [ ] Login with your password
- [ ] Upload a new image to verify admin works
- [ ] Test on different devices/browsers

---

## 🎨 Optional Enhancements

### Custom Domain (10 minutes)
- [ ] Purchase domain (Namecheap, Google Domains, etc.)
- [ ] Go to Vercel Project Settings → Domains
- [ ] Add your domain
- [ ] Update DNS records at your domain provider
- [ ] Wait for DNS propagation (up to 48 hours)
- [ ] Verify HTTPS is enabled

### Additional Customizations
- [ ] Change color scheme in `tailwind.config.ts`
- [ ] Adjust grid layout in `components/PortfolioGrid.tsx`
- [ ] Add social media links
- [ ] Set up Google Analytics
- [ ] Add favicon and meta tags
- [ ] Create custom 404 page
- [ ] Add more pages (Press, Blog, etc.)

---

## 📊 Launch Checklist

### Before Going Public
- [ ] All personal info is updated
- [ ] All placeholder text is replaced
- [ ] Images are high quality and properly formatted
- [ ] Mobile view looks perfect
- [ ] All links work correctly
- [ ] Contact information is accurate
- [ ] Admin password is secure
- [ ] Site loads fast (under 3 seconds)
- [ ] No console errors in browser
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices

### Marketing & Sharing
- [ ] Add site URL to Instagram bio
- [ ] Share on social media
- [ ] Update agency with new portfolio link
- [ ] Add to comp cards and materials
- [ ] Email contacts with new link
- [ ] Add to LinkedIn profile
- [ ] Submit to Google Search Console
- [ ] Add site to model directories

---

## 🆘 Troubleshooting

### If something doesn't work:

1. **Build fails:**
   ```bash
   rm -rf node_modules .next
   npm install
   npm run build
   ```

2. **Can't login to admin:**
   - Verify password in `.env.local`
   - Clear browser cookies
   - Try incognito mode

3. **Images not showing:**
   - Check `public/uploads` folder exists
   - Verify image uploaded successfully
   - Check browser console for errors

4. **Deployment fails:**
   - Check Vercel deployment logs
   - Verify environment variables are set
   - Ensure build succeeds locally first

5. **Need help:**
   - Read README.md thoroughly
   - Check DEPLOYMENT.md for platform-specific help
   - Review CUSTOMIZATION.md for design changes

---

## 🎯 Success Metrics

Your portfolio is successful when:

- ✅ Site loads in under 3 seconds
- ✅ Looks professional on all devices
- ✅ Easy for you to update images
- ✅ Agency/clients can easily view your work
- ✅ You receive positive feedback
- ✅ Getting more opportunities
- ✅ You're proud to share the link

---

## 📈 Next Steps After Launch

Week 1:
- [ ] Monitor site analytics
- [ ] Share with 10 people for feedback
- [ ] Make adjustments based on feedback
- [ ] Upload 5 more images

Month 1:
- [ ] Update portfolio with recent work
- [ ] Analyze which images get most attention
- [ ] Optimize based on analytics
- [ ] Consider adding new sections

Ongoing:
- [ ] Update images monthly
- [ ] Keep contact info current
- [ ] Add recent achievements to About page
- [ ] Backup portfolio data regularly
- [ ] Update dependencies: `npm update`

---

## 🎉 You're Ready!

Once all items above are checked, you have a professional, production-ready portfolio website!

**Time to Complete**: ~1 hour  
**Difficulty**: Easy  
**Result**: Professional portfolio you control

---

**Questions?** Check the documentation files:
- Quick answers → QUICK_START.md
- Detailed setup → README.md
- Going live → DEPLOYMENT.md
- Making changes → CUSTOMIZATION.md

**Good luck with your modeling career! 📸✨**

