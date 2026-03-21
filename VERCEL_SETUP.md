# Fix Vercel - Can't See Private Repo

## Option 1: Make Repository Public (Recommended for Landing Pages)

### On GitHub:
1. Go to https://github.com/Tarun-007/crezo
2. Click **Settings** (top right)
3. Scroll to bottom → **Danger Zone**
4. Click **Change visibility**
5. Select **Make public**
6. Type repository name to confirm
7. ✅ Done!

**Now go back to Vercel and refresh - you'll see your repo!**

---

## Option 2: Give Vercel Access to Private Repo

### If you want to keep it private:

1. **On Vercel** (https://vercel.com):
   - Click your profile (bottom left)
   - Go to **Settings** → **Git**
   - Find **GitHub** section
   - Click **Adjust GitHub App Permissions**

2. **On GitHub** (redirected):
   - Select **Tarun-007** account
   - Under **Repository access**:
     - Choose **Only select repositories**
     - Click **Select repositories**
     - Choose **crezo**
   - Click **Save**

3. **Back on Vercel**:
   - Go to "Add New Project"
   - You should now see **crezo** repo
   - Click **Import**

---

## Recommendation:

**✅ Make it public!** 

Landing pages are meant to be shared anyway. Benefits:
- Easier collaboration
- Portfolio piece
- No permission issues
- Can share the code with others
- Free hosting anywhere (Vercel, Netlify, etc.)

Your code doesn't contain any secrets or API keys, so it's safe to be public.

---

## After Making it Public:

1. Refresh Vercel dashboard
2. Click "Add New Project"
3. You'll see **crezo** in the list
4. Click "Import"
5. Root Directory: `crezo-landing`
6. Click "Deploy"
7. ✅ Live in 2 minutes!
