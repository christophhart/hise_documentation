#!/bin/bash
################################################################################
# GZIP Compression Script for HISE Documentation
# Generates pre-compressed .gz files for all static assets
################################################################################

set -e  # Exit on error

echo "======================================"
echo "  GZIP Asset Compression Script"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compression level (1-9, where 9 is maximum compression)
COMPRESSION_LEVEL=9

# Statistics
TOTAL_ORIGINAL=0
TOTAL_COMPRESSED=0
FILE_COUNT=0

# Function to gzip a file and show statistics
gzip_file() {
    local file="$1"
    
    if [ ! -f "$file" ]; then
        echo "⚠️  File not found: $file"
        return
    fi
    
    # Get original size
    original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    
    # Compress with maximum compression
    gzip -${COMPRESSION_LEVEL} -k -f "$file"
    
    # Get compressed size
    compressed_size=$(stat -f%z "${file}.gz" 2>/dev/null || stat -c%s "${file}.gz" 2>/dev/null)
    
    # Calculate savings
    saved=$((original_size - compressed_size))
    percent=$((100 - (compressed_size * 100 / original_size)))
    
    # Update totals
    TOTAL_ORIGINAL=$((TOTAL_ORIGINAL + original_size))
    TOTAL_COMPRESSED=$((TOTAL_COMPRESSED + compressed_size))
    FILE_COUNT=$((FILE_COUNT + 1))
    
    # Format sizes
    orig_kb=$(echo "scale=1; $original_size/1024" | bc)
    comp_kb=$(echo "scale=1; $compressed_size/1024" | bc)
    
    echo -e "${GREEN}✓${NC} $(basename "$file")"
    echo "  ${orig_kb} KB → ${comp_kb} KB (${percent}% reduction)"
}

# Change to template directory
cd template

echo -e "${BLUE}Compressing Minified CSS files...${NC}"
echo "-----------------------------------"
gzip_file "css/style.min.css"
gzip_file "css/prism.min.css"
echo ""

echo -e "${BLUE}Compressing Minified JavaScript files...${NC}"
echo "-----------------------------------"
gzip_file "scripts/anchor-nav.min.js"
gzip_file "scripts/search.min.js"
gzip_file "scripts/generate.min.js"
echo ""

echo -e "${BLUE}Compressing Large JSON files...${NC}"
echo "-----------------------------------"
gzip_file "scripts/search.json"
gzip_file "scripts/toc.json"
echo ""

echo -e "${BLUE}Compressing Other CSS/JS files...${NC}"
echo "-----------------------------------"
gzip_file "css/autoComplete.css"
gzip_file "scripts/autoComplete.js"
gzip_file "scripts/prism.js"
gzip_file "scripts/index.js"
echo ""

# Optional: Compress HTML templates
echo -e "${BLUE}Compressing HTML templates...${NC}"
echo "-----------------------------------"
gzip_file "header.html"
gzip_file "footer.html"
gzip_file "index.html"
gzip_file "dummy.html"
echo ""

# Calculate total savings
total_saved=$((TOTAL_ORIGINAL - TOTAL_COMPRESSED))
total_percent=$((100 - (TOTAL_COMPRESSED * 100 / TOTAL_ORIGINAL)))

# Format totals
total_orig_kb=$(echo "scale=1; $TOTAL_ORIGINAL/1024" | bc)
total_comp_kb=$(echo "scale=1; $TOTAL_COMPRESSED/1024" | bc)
total_saved_kb=$(echo "scale=1; $total_saved/1024" | bc)

echo "======================================"
echo -e "${GREEN}  COMPRESSION SUMMARY${NC}"
echo "======================================"
echo "Files compressed: ${FILE_COUNT}"
echo "Original size:    ${total_orig_kb} KB"
echo "Compressed size:  ${total_comp_kb} KB"
echo -e "${YELLOW}Total saved:      ${total_saved_kb} KB (${total_percent}% reduction)${NC}"
echo ""
echo -e "${GREEN}✅ All assets compressed successfully!${NC}"
echo ""
echo "Pre-compressed .gz files are ready for deployment."
echo "Configure your web server to serve .gz files when available."
