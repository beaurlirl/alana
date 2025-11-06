# Alana - Model Portfolio Website

A minimal, elegant model portfolio website with a built-in CMS admin panel. Inspired by clean editorial design, this project allows models to showcase their work through a beautiful, mobile-responsive interface while maintaining complete control over their content through an easy-to-use admin dashboard.

## ✨ Features

- **Clean Minimal Design**: Editorial-style layout with generous whitespace
- **Hero Section**: Large text introduction with model headshot
- **Portfolio Grid**: Beautiful grid layout showcasing modeling work
- **Lightbox Gallery**: Click images to view full-size with keyboard navigation
- **Simple CMS**: JSON-based content management system
- **Admin Panel**: Easy-to-use dashboard at `/admin`
- **Drag & Drop Upload**: Upload images with drag and drop functionality
- **Image Reordering**: Simply drag images to reorder them
- **Mobile Responsive**: Looks great on all devices
- **Password Protected**: Secure admin access
- **No Coding Required**: Manage content without technical knowledge

## 🎨 Design

- **Headers**: Migra font (via Fontshare)
- **Body**: JetBrains Mono (monospace)
- **Clean, minimal aesthetic**
- **Generous whitespace**
- **Smooth animations**

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Image Optimization**: Next.js Image component
- **CMS**: JSON-based file storage
- **Authentication**: Cookie-based auth

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Setup Steps

1. **Install Dependencies**

```bash
npm install
```

2. **Set Up Environment Variables**

Create a `.env.local` file in the root directory (or copy from `.env.example`):

```env
ADMIN_PASSWORD=your_secure_password_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

⚠️ **IMPORTANT**: Change the default password before deploying to production!

3. **Run Development Server**

```bash
npm run dev
```

4. **Open in Browser**

Visit [http://localhost:3000](http://localhost:3000) to see your site.

Visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.

## 🔐 Admin Panel Usage

### Accessing the Admin Panel

1. Navigate to `/admin` (e.g., `http://localhost:3000/admin`)
2. Enter your admin password (default: `admin123`)
3. You'll be redirected to the dashboard

### Managing Images

**Uploading Images:**
1. In the admin dashboard, find the "Upload New Image" section
2. Drag and drop an image or click to select a file
3. Supported formats: JPG, PNG, GIF, WebP (max 10MB)
4. The image will automatically be added to your portfolio

**Editing Image Details:**
1. Find the image in the "Manage Images" section
2. Click the "Edit" button
3. Add a title (optional)
4. Add a description (optional)
5. Click "Save"

**Reordering Images:**
1. Simply drag and drop images to reorder them
2. The order is automatically saved
3. Changes reflect immediately on the live site

**Deleting Images:**
1. Click the "Delete" button on any image
2. Confirm the deletion
3. The image is permanently removed

### Logging Out

Click the "Logout" button in the top right corner of the admin dashboard.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy to Vercel**

- Go to [vercel.com](https://vercel.com)
- Sign in with GitHub
- Click "Import Project"
- Select your repository
- Add environment variables:
  - `ADMIN_PASSWORD`: Your secure password
  - `NEXT_PUBLIC_SITE_URL`: Your production URL
- Click "Deploy"

3. **Configure Domain (Optional)**

- In Vercel dashboard, go to "Settings" → "Domains"
- Add your custom domain
- Follow DNS configuration instructions

### Deploy to Netlify

1. **Build the Project**

```bash
npm run build
```

2. **Deploy to Netlify**

- Go to [netlify.com](https://netlify.com)
- Drag and drop your `.next` folder or connect your Git repository
- Add environment variables in Site Settings → Build & Deploy → Environment
- Set build command: `npm run build`
- Set publish directory: `.next`

### Other Platforms

This is a standard Next.js app and can be deployed to:
- AWS Amplify
- Cloudflare Pages
- Railway
- Digital Ocean
- Any Node.js hosting provider

## 📝 Customization

### Changing Model Name and Tagline

Edit `data/portfolio.json`:

```json
{
  "modelName": "Your Name",
  "heroTagline": "Your Tagline",
  "images": []
}
```

### Updating About Page

Edit `app/about/page.tsx` to add your personal information, measurements, and bio.

### Updating Contact Information

Edit `app/contact/page.tsx` to add your email, social media, and agency contact details.

### Changing Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  'cream': '#F5F5F0',
  'charcoal': '#2A2A2A',
}
```

### Changing Fonts

The current fonts are:
- **Headers**: Migra (loaded from Fontshare in `app/layout.tsx`)
- **Body**: JetBrains Mono (loaded via Google Fonts)

To change fonts, edit `app/layout.tsx` and `tailwind.config.ts`.

## 🔧 Troubleshooting

### Images Not Showing

- Check that the `public/uploads` directory exists and has proper permissions
- Verify images were uploaded successfully in the admin panel
- Check browser console for errors

### Can't Login to Admin

- Verify your `ADMIN_PASSWORD` environment variable is set
- Clear browser cookies and try again
- Check that the `.env.local` file exists and is properly formatted

### Build Errors

- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Run `npm run build` to test

### Images Not Uploading

- Check file size (must be under 10MB)
- Verify file format (JPG, PNG, GIF, WebP only)
- Check server logs for errors

## 📂 Project Structure

```
alana/
├── app/
│   ├── admin/              # Admin panel page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication
│   │   ├── portfolio/      # Portfolio data
│   │   ├── upload/         # Image upload
│   │   └── delete-image/   # Image deletion
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── admin/              # Admin components
│   │   ├── AdminDashboard.tsx
│   │   ├── ImageUploader.tsx
│   │   └── ImageManager.tsx
│   ├── Hero.tsx            # Hero section
│   ├── Navigation.tsx      # Navigation bar
│   ├── PortfolioGrid.tsx   # Portfolio grid
│   └── Lightbox.tsx        # Image lightbox
├── lib/
│   ├── data.ts             # Data management
│   └── auth.ts             # Authentication helpers
├── public/
│   └── uploads/            # Uploaded images
├── data/
│   └── portfolio.json      # Portfolio data storage
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🤝 Support

For issues or questions:
1. Check this README thoroughly
2. Review the code comments
3. Check Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)

## 📄 License

This project is open source and available for personal and commercial use.

## 🎯 Next Steps

1. Change the admin password in `.env.local`
2. Customize the About and Contact pages with your information
3. Upload your portfolio images through the admin panel
4. Customize colors and fonts to match your brand
5. Deploy to Vercel or your preferred platform
6. Connect a custom domain

---

**Made with ❤️ for models who want a beautiful, simple portfolio**

