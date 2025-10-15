# Instagram Gallery Images

## How to Add Instagram Posts to Your Gallery

### Step 1: Get Your Latest Instagram Posts

1. Go to your Instagram profile: https://www.instagram.com/nailtech_magic_by_andrada/
2. Open the 6 most recent posts you want to display
3. For each post, note down the URL (e.g., `https://www.instagram.com/p/ABC123XYZ/`)

### Step 2: Download the Images

For each post:
1. Open the post on Instagram
2. Right-click on the image
3. Select "Save image as..." or "Open image in new tab"
4. Save the image in this folder as:
   - `post1.jpg` (most recent)
   - `post2.jpg`
   - `post3.jpg`
   - `post4.jpg`
   - `post5.jpg`
   - `post6.jpg` (oldest)

### Step 3: Update the Gallery

The gallery in `index.html` is already set up to use these images. Just replace the placeholder `<div>` elements with your actual post URLs.

Example format (already in index.html):
```html
<a href="https://www.instagram.com/p/YOUR_POST_CODE/"
   target="_blank"
   rel="noopener"
   class="instagram-post reveal"
   style="background-image: url('assets/gallery/post1.jpg')"
   aria-label="Vezi postarea pe Instagram"></a>
```

### Quick Tip

To get the image URL from an Instagram post:
1. Open the post
2. Right-click the image → "Inspect" or "Inspect Element"
3. Look for `<img src="...">` and copy the URL
4. Download that image

---

## Image Recommendations

- **Format**: JPG or PNG
- **Size**: Optimally 640x640px (Instagram square format)
- **Quality**: Medium to high quality (not too large file size)
- **File naming**: post1.jpg, post2.jpg, etc.
