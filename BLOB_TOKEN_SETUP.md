# 🔑 Vercel Blob Token Setup Required!

## ⚠️ Why Uploads Aren't Working:

Vercel Blob requires a **token** (environment variable) to work. Without it, uploads will fail.

---

## ✅ Quick Fix (2 Minutes):

### Step 1: Generate Blob Token

1. Go to: https://vercel.com/dashboard
2. Click your project (alana)
3. Go to **Storage** tab (top navigation)
4. Click **"Create Database"** or **"Connect Store"**
5. Select **"Blob"**
6. Click **"Continue"**
7. It will create a Blob store and generate a token automatically

### Step 2: Token is Auto-Added!

Good news! When you create a Blob store, Vercel **automatically adds** the `BLOB_READ_WRITE_TOKEN` environment variable to your project. You don't need to manually add it!

### Step 3: Redeploy

After creating the Blob store:

**Option A - From Vercel Dashboard:**
1. Go to **Deployments** tab
2. Click ••• on latest deployment
3. Click **"Redeploy"**

**Option B - Push Code:**
```bash
git commit --allow-empty -m "Trigger redeploy with Blob token"
git push
```

---

## 🎯 Alternative: Use Cloudinary (Free & Easy)

If Vercel Blob setup is confusing, I can switch you to **Cloudinary** instead:

**Benefits:**
- ✅ Free tier: 25GB storage, 25GB bandwidth
- ✅ Easier setup
- ✅ Built-in image optimization
- ✅ Works immediately

Let me know if you want to switch!

---

## 🧪 Test After Setup:

1. Wait for deployment to finish
2. Go to `/admin` on your live site
3. Try uploading an image
4. Should work! ✅

---

## 📊 Check Your Blob Store:

After creating:
- Vercel Dashboard → Your Project → Storage
- You'll see your Blob store
- Monitor usage and files

---

## 🆘 Still Not Working?

**Check these:**

1. **Token exists?**
   - Vercel Dashboard → Settings → Environment Variables
   - Look for `BLOB_READ_WRITE_TOKEN`

2. **Redeployed after creating store?**
   - Creating the store doesn't automatically redeploy
   - You must manually redeploy

3. **Check function logs:**
   - Deployments → Latest → View Function Logs
   - Look for specific error messages

---

## 🔄 Full Setup Steps Summary:

```
1. Go to Vercel Dashboard
   ↓
2. Your Project → Storage → Create → Blob
   ↓
3. Vercel auto-adds BLOB_READ_WRITE_TOKEN
   ↓
4. Go to Deployments → Redeploy
   ↓
5. Test upload on live site
   ↓
6. ✅ Should work!
```

---

## 💡 Pro Tip:

The Blob store creation is a **one-time setup**. After this, all future uploads will work automatically!

---

**Quick Link:**
https://vercel.com/dashboard → Your Project → Storage → Create Blob Store

