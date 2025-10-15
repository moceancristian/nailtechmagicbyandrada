# Instagram Feed Setup Guide

Instagram has restricted direct API access, making it challenging to fetch posts dynamically without authentication. Here are the best solutions for your Netlify site:

## Option 1: EmbedSocial (Recommended - Easy & Free)

**Best for**: Quick setup, no coding required, free tier available

1. Go to [EmbedSocial.com](https://embedsocial.com/)
2. Sign up for a free account
3. Connect your Instagram account
4. Generate an embed code for your feed
5. Copy the code and add it to `index.html` in the gallery section

**Pros**:
- Easy setup (5 minutes)
- Auto-updates with new posts
- Free tier includes 6 posts
- No technical knowledge needed

**Cons**:
- Shows "Powered by EmbedSocial" watermark on free plan
- Premium features require paid plan ($9/month)

---

## Option 2: Instagram Basic Display API (Free, Technical)

**Best for**: Full control, no watermarks, completely free

### Setup Steps:

1. **Create a Facebook App**:
   - Go to [developers.facebook.com](https://developers.facebook.com/)
   - Create a new app (type: Consumer)
   - Add "Instagram Basic Display" product

2. **Configure Instagram Basic Display**:
   - Add your Instagram account as a test user
   - Generate an access token
   - Copy the access token

3. **Create Netlify Function** (to hide your token):

Create file: `netlify/functions/instagram.js`
```javascript
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
  const USER_ID = process.env.INSTAGRAM_USER_ID;

  try {
    const response = await fetch(
      `https://graph.instagram.com/${USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${ACCESS_TOKEN}`
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch Instagram posts' })
    };
  }
};
```

4. **Update JavaScript** to use the Netlify function:
```javascript
async function loadInstagramFeed() {
  const feedContainer = document.getElementById('instagram-feed');
  if (!feedContainer) return;

  try {
    const response = await fetch('/.netlify/functions/instagram');
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      feedContainer.innerHTML = '';

      const postsToShow = data.data.slice(0, 6);

      postsToShow.forEach(post => {
        const imageUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;

        const postElement = document.createElement('a');
        postElement.href = post.permalink;
        postElement.target = '_blank';
        postElement.rel = 'noopener';
        postElement.className = 'instagram-post reveal';
        postElement.style.backgroundImage = `url(${imageUrl})`;

        feedContainer.appendChild(postElement);
      });

      const newReveals = feedContainer.querySelectorAll('.reveal');
      newReveals.forEach(el => io.observe(el));
    }
  } catch (error) {
    console.warn('Could not load Instagram feed:', error);
  }
}
```

5. **Set Environment Variables in Netlify**:
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add `INSTAGRAM_ACCESS_TOKEN`
   - Add `INSTAGRAM_USER_ID`

**Pros**:
- Completely free
- No watermarks
- Full control over styling
- Official Instagram API

**Cons**:
- Requires technical setup
- Access token expires every 60 days (needs manual refresh)

---

## Option 3: Manual Gallery (Current - No Dynamic Loading)

**Best for**: Full control, no dependencies, immediate solution

Keep the placeholder images and replace them manually with real Instagram images:

1. Download 6 recent images from Instagram
2. Add them to the `assets/` folder
3. Update `index.html`:

```html
<div class="gallery-grid">
  <a href="https://www.instagram.com/p/POST_CODE_1/" target="_blank" rel="noopener" class="instagram-post reveal" style="background-image: url('assets/gallery/post1.jpg')"></a>
  <a href="https://www.instagram.com/p/POST_CODE_2/" target="_blank" rel="noopener" class="instagram-post reveal" style="background-image: url('assets/gallery/post2.jpg')"></a>
  <!-- ... add 4 more -->
</div>
```

**Pros**:
- Works immediately
- No external dependencies
- Fast loading
- Complete control

**Cons**:
- Manual updates needed
- Not truly dynamic

---

## Option 4: SnapWidget (Easy, Free Tier)

**Best for**: Balance between ease and features

1. Go to [SnapWidget.com](https://snapwidget.com/)
2. Choose "Instagram Grid" widget
3. Enter username: `nailtech_magic_by_andrada`
4. Customize layout (3 columns, 2 rows)
5. Copy embed code and add to `index.html`

**Pros**:
- Very easy setup (2 minutes)
- Free tier available
- Auto-updates

**Cons**:
- "Powered by SnapWidget" watermark on free plan
- Premium features require paid plan

---

## Recommended Solution

For your use case, I recommend **Option 1 (EmbedSocial)** or **Option 4 (SnapWidget)** because:
- ✅ Takes 2-5 minutes to set up
- ✅ Automatically updates with new posts
- ✅ No coding required
- ✅ Free tier is sufficient for 6 posts
- ✅ Reliable and maintained by the service provider

If you want a completely free solution with no watermarks and don't mind the technical setup, go with **Option 2 (Instagram Basic Display API)**.

---

## Current Implementation

The current code in `js/main.js` attempts to fetch from Instagram directly, but this will fail due to CORS and authentication requirements. The placeholder images will be shown as a fallback.

To implement any of the above solutions, replace the gallery section in `index.html` with the embed code from your chosen service.
