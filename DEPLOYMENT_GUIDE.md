# Crezo Landing Page Deployment Guide

## 🚀 Step 1: Deploy on Vercel

### Method 1: Vercel Website (Recommended - 5 minutes)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign up/login with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your `crezo` repository
   - Root Directory: `crezo-landing`
   - Click "Deploy"

3. **Done!**
   - Wait 1-2 minutes
   - Your site: `https://crezo.vercel.app`

### Method 2: Vercel CLI (Alternative)

```bash
npm install -g vercel
vercel login
cd crezo-landing
vercel
```

---

## 📧 Step 2: Set Up Tally Waitlist

### Create Tally Form

1. **Go to Tally**
   - Visit https://tally.so
   - Sign up (free, no credit card)

2. **Create Form**
   - Click "Create form"
   - Add fields:
     - Email (required)
     - Name (optional)
     - Message (optional)

3. **Customize Design**
   - Title: "Join Crezo Waitlist"
   - Primary color: `#ADC6FF`
   - Background: `#131313`

4. **Publish & Get URL**
   - Click "Publish"
   - Copy URL: `https://tally.so/r/abc123`

---

## 🔗 Step 3: Connect Tally to Your Site

### Update the Form URL

In these two files, replace `YOUR_FORM_ID`:

**1. `/components/Waitlist.tsx`** (line 8):
```typescript
const TALLY_FORM_URL = "https://tally.so/r/YOUR_FORM_ID";
```

**2. `/components/Hero.tsx`** (line 7):
```typescript
const TALLY_FORM_URL = "https://tally.so/r/YOUR_FORM_ID";
```

### Example:
If your Tally URL is `https://tally.so/r/mYWDXZ`, change to:
```typescript
const TALLY_FORM_URL = "https://tally.so/r/mYWDXZ";
```

---

## 📤 Step 4: Deploy Updates

```bash
git add .
git commit -m "Add Tally waitlist integration"
git push
```

Vercel will auto-deploy in ~1 minute!

---

## ✅ How It Works

- **"Join Waitlist" buttons** open Tally form in elegant popup
- **Tally collects emails** for you automatically
- **Export to Google Sheets/Notion** from Tally dashboard
- **No backend needed** - completely free!

---

## 🎯 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Create Tally form
3. ✅ Update form URLs in code
4. ✅ Push to GitHub
5. 🎉 Share your landing page!

---

## 🔥 Pro Tips

- **Custom Domain**: Add in Vercel settings (Settings → Domains)
- **Analytics**: Enable Vercel Analytics (free)
- **Email Notifications**: Set up in Tally to get notified of new signups
- **Auto-export**: Connect Tally to Google Sheets for automatic backup

---

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Tally Help: https://tally.so/help
- Your site URL: Check Vercel dashboard
