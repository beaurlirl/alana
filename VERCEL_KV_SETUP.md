# 🗄️ VERCEL KV SETUP - REQUIRED FOR PRODUCTION

## ⚠️ CRITICAL: Your CMS won't work without this!

The site is now configured to use **Vercel KV** (key-value storage) for saving portfolio data. This is **included in your Pro plan** at no extra cost.

---

## 🚀 SETUP STEPS (5 minutes):

### Step 1: Create KV Database

1. Go to: https://vercel.com/dashboard
2. Click your **alana** project
3. Click **"Storage"** tab (top navigation)
4. Click **"Create Database"** or **"Create"**
5. Select **"KV"** (Key-Value Database)
6. Name it: `portfolio-data`
7. Click **"Create"**

### Step 2: Connect to Project

1. After creating, you'll see a connection dialog
2. Select **all environments**: Production, Preview, Development
3. Click **"Connect"**

**Vercel automatically adds these environment variables:**
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_URL`

### Step 3: Redeploy

After connecting the KV store:

**In Vercel Dashboard:**
1. Go to **"Deployments"** tab
2. Click ••• on your latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

---

## ✅ AFTER SETUP:

Once redeployed, test your admin panel:

1. Go to `/admin` on your live site
2. **Upload image** ✅ (saved to Vercel Blob)
3. **Edit details** ✅ (saved to Vercel KV)
4. **Create collection** ✅ (saved to Vercel KV)
5. **Delete image** ✅ (removed from Blob + KV)
6. **Reorder images** ✅ (saved to KV)

**Everything should work!** 🎉

---

## 📊 WHAT'S STORED WHERE:

### Vercel Blob (images):
- Actual image files
- URLs like: `https://xxx.public.blob.vercel-storage.com/...`
- 100 GB storage (Pro plan)

### Vercel KV (data):
- Portfolio metadata (titles, descriptions)
- Collections and categories
- Image order and organization
- Unlimited storage for this use case

---

## 💰 COST:

**Both included in your Vercel Pro plan!**
- ✅ Blob: 100 GB storage, 1 TB bandwidth
- ✅ KV: 256 MB data, plenty for portfolio metadata
- ✅ No extra charges

---

## 🔍 CHECK YOUR SETUP:

### Verify KV is connected:
1. Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. You should see:
   - `BLOB_READ_WRITE_TOKEN` (from Blob store)
   - `KV_REST_API_URL` (from KV store)
   - `KV_REST_API_TOKEN` (from KV store)
   - `KV_URL` (from KV store)

### Verify deployment used these:
1. Make sure you redeployed AFTER creating KV
2. Earlier deployments won't have the KV connection

---

## 🆘 TROUBLESHOOTING:

### "Failed to save" error:
- **Cause:** KV not connected or deployment before KV creation
- **Fix:** Create KV store, then redeploy

### "Database error" in logs:
- **Cause:** KV environment variables missing
- **Fix:** Go to Storage → KV → Reconnect to project

### Saves work locally but not production:
- **Cause:** Local dev using fallback, production needs KV
- **Fix:** Create KV store (even for local testing it will work)

---

## 🎯 SUMMARY:

```
1. Create KV database in Vercel Storage
   ↓
2. Connect to all environments
   ↓
3. Redeploy your site
   ↓
4. Test admin panel
   ↓
5. Everything works! ✅
```

---

## 📝 TECHNICAL DETAILS:

### Data Structure in KV:

```json
{
  "images": [
    {
      "id": "1234567890",
      "filename": "https://blob.vercel-storage.com/image.jpg",
      "title": "Editorial Shot",
      "description": "Vogue Italia 2024",
      "order": 0,
      "category": "Editorial",
      "collection": "Vogue Italia Spring 2024"
    }
  ],
  "collections": [
    {
      "name": "Vogue Italia Spring 2024",
      "category": "Editorial"
    }
  ],
  "categories": ["Editorial", "Commercial", "Runway"],
  "modelName": "Alana Cabanzo",
  "heroTagline": "Model"
}
```

All stored under key: `portfolio-data`

---

**Quick link:** https://vercel.com/dashboard → Your Project → Storage → Create KV

**After this, your CMS will work perfectly in production!** 🚀

