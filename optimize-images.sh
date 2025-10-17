#!/bin/bash

# Image Optimization Script for nailtechmagicbyandrada.beauty
# This script converts images to WebP format and creates properly sized versions

echo "Starting image optimization..."

# Create optimized directory if it doesn't exist
mkdir -p assets/optimized

# 1. Optimize and resize logo-new.png
# The logo is 2026x848px but displayed much smaller in the header
# Let's create multiple sizes for different use cases

echo "Optimizing logo..."

# Full size WebP (for schema.org and OG images)
convert assets/logo-new.png -quality 85 -define webp:method=6 assets/optimized/logo-new.webp

# Header size (approx 200px wide based on typical header sizes)
convert assets/logo-new.png -resize 400x167 -quality 85 -define webp:method=6 assets/optimized/logo-header.webp
convert assets/logo-new.png -resize 400x167 -quality 90 assets/optimized/logo-header.png

# Footer size (approx 150px wide)
convert assets/logo-new.png -resize 300x125 -quality 85 -define webp:method=6 assets/optimized/logo-footer.webp
convert assets/logo-new.png -resize 300x125 -quality 90 assets/optimized/logo-footer.png

# 2. Optimize gallery images
echo "Optimizing gallery images..."

# Convert all gallery JPGs to WebP
for img in assets/gallery/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .jpg)
        echo "Converting $filename.jpg to WebP..."
        convert "$img" -quality 80 -define webp:method=6 "assets/gallery/$filename.webp"
    fi
done

# Convert gallery PNGs to WebP (these are quite large: 354KB - 942KB)
for img in assets/gallery/*.png; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .png)
        echo "Converting $filename.png to WebP..."
        # Convert to WebP (original PNG is kept as fallback)
        convert "$img" -quality 80 -define webp:method=6 "assets/gallery/$filename.webp"
    fi
done

# 3. Optimize share.png (used for OG image)
echo "Optimizing share image..."
convert assets/share.png -quality 85 -define webp:method=6 assets/optimized/share.webp
convert assets/share.png -strip -quality 90 assets/optimized/share.png

echo ""
echo "Optimization complete!"
echo ""
echo "File size comparison:"
echo "-------------------"

# Show original logo size
echo "Original logo-new.png: $(du -h assets/logo-new.png | cut -f1)"
echo "Optimized logo-header.webp: $(du -h assets/optimized/logo-header.webp | cut -f1)"
echo "Optimized logo-header.png: $(du -h assets/optimized/logo-header.png | cut -f1)"
echo ""

# Show gallery sizes
echo "Gallery images:"
for img in assets/gallery/*.webp; do
    if [ -f "$img" ]; then
        original="${img%.webp}.png"
        if [ ! -f "$original" ]; then
            original="${img%.webp}.jpg"
        fi
        if [ -f "$original" ]; then
            echo "  $(basename $original): $(du -h $original | cut -f1) -> $(basename $img): $(du -h $img | cut -f1)"
        fi
    fi
done

echo ""
echo "Next steps:"
echo "1. Update HTML files to use WebP images with PNG/JPG fallbacks"
echo "2. Add width and height attributes to all <img> tags"
echo "3. Optimize Google Fonts loading"
