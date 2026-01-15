#!/usr/bin/env python3
"""
Generate sitemap.xml for HISE documentation
Crawls html_build directory and creates XML sitemap
"""

import os
import xml.etree.ElementTree as ET
from datetime import datetime
from pathlib import Path

# Configuration
HTML_BUILD_DIR = Path(__file__).parent.parent / 'html_build'
BASE_URL = 'https://docs.hise.dev/'  # Update with actual production URL
OUTPUT_FILE = HTML_BUILD_DIR / 'sitemap.xml'

def get_priority(path):
    """Determine priority based on path depth and content type"""
    depth = len(path.parts)

    if path.name == 'index.html' and depth <= 2:
        return '1.0'  # Homepage
    elif depth <= 3:
        return '0.9'  # Top-level sections
    elif depth <= 4:
        return '0.8'  # Sub-sections
    elif 'tutorial' in str(path).lower():
        return '0.9'  # Tutorials are important
    else:
        return '0.7'  # Other pages

def get_changefreq(path):
    """Determine change frequency based on path"""
    if path.name == 'index.html' and len(path.parts) <= 2:
        return 'weekly'  # Homepage
    elif 'tutorial' in str(path).lower():
        return 'monthly'
    elif 'scripting-api' in str(path):
        return 'monthly'  # API docs change occasionally
    else:
        return 'monthly'

def generate_sitemap():
    """Generate sitemap.xml from HTML files"""

    print('Generating sitemap.xml...')

    # Create root element
    urlset = ET.Element('urlset')
    urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

    # Find all HTML files
    html_files = []
    for root, dirs, files in os.walk(HTML_BUILD_DIR):
        # Skip test files and template directory
        if 'template' in root or 'test-' in root:
            continue

        for file in files:
            if file.endswith('.html') and not file.startswith('test-'):
                file_path = Path(root) / file
                rel_path = file_path.relative_to(HTML_BUILD_DIR)
                html_files.append(rel_path)

    print(f'Found {len(html_files)} HTML files')

    # Sort files for consistent output
    html_files.sort()

    # Get last modified date
    lastmod = datetime.now().strftime('%Y-%m-%d')

    # Create URL entries
    for html_file in html_files:
        url = ET.SubElement(urlset, 'url')

        # Create clean URL path
        url_path = str(html_file).replace('\\', '/')
        if url_path == 'index.html':
            url_path = ''

        # Add URL elements
        loc = ET.SubElement(url, 'loc')
        loc.text = BASE_URL + url_path

        mod = ET.SubElement(url, 'lastmod')
        mod.text = lastmod

        freq = ET.SubElement(url, 'changefreq')
        freq.text = get_changefreq(html_file)

        priority = ET.SubElement(url, 'priority')
        priority.text = get_priority(html_file)

    # Create XML tree and write to file
    tree = ET.ElementTree(urlset)
    ET.indent(tree, space='  ')  # Pretty print

    tree.write(OUTPUT_FILE, encoding='utf-8', xml_declaration=True)

    print(f'OK - Sitemap generated: {OUTPUT_FILE}')
    print(f'  Total URLs: {len(html_files)}')

if __name__ == '__main__':
    generate_sitemap()
