# How to Update Gallery Images

The gallery currently has **30 image slots** ready to display your nail art portfolio.

## Current Status

- **Images 1-11**: Real images from your Mero profile ✅
- **Images 12-30**: Placeholder images (duplicates) - **READY TO REPLACE** 🔄

## How to Replace Placeholder Images

### Step 1: Gather Your Images

Collect 19 more high-quality images of your nail art work from:
- Your Instagram posts
- Your phone/camera gallery
- Recent client work
- Your best portfolio pieces

### Step 2: Prepare the Images

**Recommended specifications:**
- Format: JPG or PNG
- Size: 640x640px to 1080x1080px (square format works best)
- Quality: Medium to high (keep file size under 500KB per image)
- Content: Clear, well-lit photos of your nail art

### Step 3: Replace the Files

Simply replace the files in this folder:

```
assets/gallery/
├── post1.jpg - post6.jpg     ✅ (used on homepage - already real)
├── gallery7.jpg - gallery11.jpg   ✅ (already real images)
└── gallery12.jpg - gallery30.jpg  🔄 (REPLACE THESE 19 FILES)
```

**Important:** Keep the same filenames! Just replace the image content.

### Step 4: How to Replace

**On Mac/Windows:**
1. Download/save your 19 new images
2. Rename them to: `gallery12.jpg`, `gallery13.jpg`, ... `gallery30.jpg`
3. Copy them to this folder (`assets/gallery/`)
4. Replace the existing files when prompted

**Quick Method:**
- Download images from Instagram (right-click → Save image as...)
- Or transfer from your phone via AirDrop/USB
- Or use screenshots of your Instagram posts

### Step 5: Upload to Netlify

Once you've replaced the images:
1. Commit the changes to your repository
2. Push to GitHub/Git
3. Netlify will automatically rebuild and deploy
4. Your gallery will now show all 30 real images!

---

## Tips for Best Results

### Image Quality
- ✅ Good lighting (natural light is best)
- ✅ Clean background
- ✅ Focus on the nails
- ✅ Show variety: different styles, colors, techniques

### What to Include
- French manicures
- Gel polish designs
- 3D nail art
- Chrome/metallic finishes
- Seasonal designs
- Client favorites
- Before/after transformations
- Different nail shapes and lengths

### Image Sources
1. **Instagram**: Download your best posts
2. **Phone Gallery**: Recent client photos
3. **Mero Profile**: If more images are added there
4. **Client Testimonials**: With permission, use client photos

---

## Current Gallery Structure

The gallery page ([galerie.html](../../pagini/galerie.html)) displays all 30 images in a responsive grid:
- **Desktop**: 3 columns (10 rows)
- **Tablet**: 2 columns (15 rows)
- **Mobile**: 1 column (30 rows)

Each image opens in a full-screen lightbox when clicked, with navigation between all 30 images.

---

## Quick Reference

**Files to replace**: `gallery12.jpg` through `gallery30.jpg` (19 files total)

**Don't touch**:
- `post1.jpg` - `post6.jpg` (used on homepage)
- `gallery7.jpg` - `gallery11.jpg` (already real images)
- `README.md` (this file)

---

## Need Help?

If you need assistance:
1. Check that images are JPG or PNG format
2. Ensure filenames match exactly (case-sensitive)
3. Keep file sizes reasonable (under 500KB each)
4. Test locally by opening `galerie.html` in your browser

Once replaced, your gallery will showcase 30 beautiful nail art images! 🎨💅
