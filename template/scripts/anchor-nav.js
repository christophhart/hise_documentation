/**
 * Right-Side Anchor Navigation for HISE Documentation
 * Uses new 'anchors' object for O(1) lookup - super fast!
 * Version: 2.0 - New TOC structure
 */

(function() {
  'use strict';

  /**
   * Extract anchors from the global 'anchors' object
   * HISE generates anchors as a separate lookup table in toc.json
   */
  function getCurrentPageAnchors() {
    if (typeof anchors === 'undefined') {
      return [];
    }

    // Normalize current path (remove leading slash)
    let currentPath = window.location.pathname;
    if (currentPath.startsWith('/')) {
      currentPath = currentPath.substring(1);
    }

    // Look up anchors for this page
    const pageAnchors = anchors[currentPath];
    if (!pageAnchors) {
      return [];
    }

    // Convert object to array format
    const result = [];
    for (const id in pageAnchors) {
      if (pageAnchors.hasOwnProperty(id)) {
        result.push({
          id: id,
          title: pageAnchors[id]
        });
      }
    }
    return result;
  }

  /**
   * Try to get actual heading text from DOM (fallback)
   */
  function getHeadingText(anchorId, fallbackTitle) {
    const element = document.getElementById(anchorId);
    if (element) {
      const heading = element.querySelector('h1, h2, h3, h4, h5, h6') || element;
      const text = heading.textContent.trim();
      if (text && text.length > 0) {
        return text;
      }
    }
    return fallbackTitle;
  }

  /**
   * Render the anchor navigation
   * Returns true if anchors were rendered, false otherwise
   */
  function renderAnchorNav() {
    const container = document.getElementById('anchor-nav-container');
    if (!container) {
      return false;
    }

    const pageAnchors = getCurrentPageAnchors();

    if (pageAnchors.length === 0) {
      // No anchors for this page - hide the navigation
      container.style.display = 'none';

      // Also hide the toggle button
      const toggleButton = document.getElementById('anchor-nav-toggle');
      if (toggleButton) {
        toggleButton.style.display = 'none';
      }

      return false;
    }

    // Show container
    container.style.display = 'block';

    // Get page title from <title> tag or <h1>
    let pageTitle = 'On This Page';
    const titleTag = document.querySelector('title');
    if (titleTag) {
      // Extract just the page name, remove " | HISE" suffix
      const fullTitle = titleTag.textContent;
      pageTitle = fullTitle.replace(/\s*\|\s*HISE.*$/, '').trim();
    }
    // Fallback to h1 if title is just "HISE"
    if (!pageTitle || pageTitle === 'HISE') {
      const h1 = document.querySelector('h1');
      if (h1) {
        pageTitle = h1.textContent.trim();
      }
    }

    // Build HTML with clickable page title that scrolls to top
    let html = '<div class="anchor-nav-header">';
    html += '<a href="#" class="anchor-nav-page-title" data-anchor="top">' + pageTitle + '</a>';
    html += '</div>';
    html += '<ul class="anchor-nav-list">';

    pageAnchors.forEach(anchor => {
      // Titles are already in the anchors object - no need for fallback!
      const title = anchor.title || getHeadingText(anchor.id, anchor.id);

      html += `
        <li class="anchor-nav-item">
          <a href="#${anchor.id}"
             data-anchor="${anchor.id}"
             class="anchor-nav-link">
            ${title}
          </a>
        </li>
      `;
    });

    html += '</ul>';
    container.innerHTML = html;

    // Add smooth scroll behavior
    addSmoothScroll();

    // Setup scroll spy
    setupScrollSpy(pageAnchors.map(a => a.id));

    return true;
  }

  /**
   * Add smooth scroll to anchor links
   * Using event delegation to avoid multiple listeners
   */
  var smoothScrollAdded = false;

  function addSmoothScroll() {
    // Only add the delegated listener once
    if (smoothScrollAdded) {
      return;
    }

    const container = document.getElementById('anchor-nav-container');
    if (!container) return;

    // Event delegation - one listener for all links
    container.addEventListener('click', function(e) {
      // Handle both .anchor-nav-link and .anchor-nav-page-title
      const link = e.target.closest('.anchor-nav-link, .anchor-nav-page-title');
      if (!link) return;

      e.preventDefault();
      const targetId = link.getAttribute('data-anchor');

      // Handle scroll to top (page title link)
      if (targetId === 'top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        // Update URL - remove hash
        const currentUrl = window.location.pathname + window.location.search;
        history.pushState(null, null, currentUrl);
        return;
      }

      // Handle regular anchor links
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL hash without jumping - preserve full path
        const currentUrl = window.location.pathname + window.location.search;
        history.pushState(null, null, currentUrl + '#' + targetId);
      }
    });

    smoothScrollAdded = true;
  }

  /**
   * Setup scroll spy to highlight active anchor
   */
  var scrollSpyObserver = null; // Track observer to prevent duplicates

  function setupScrollSpy(anchorIds) {
    // Disconnect previous observer if it exists
    if (scrollSpyObserver) {
      scrollSpyObserver.disconnect();
      scrollSpyObserver = null;
    }

    // Get all anchor elements
    const anchorElements = anchorIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (anchorElements.length === 0) {
      return;
    }

    // Track which sections are currently visible
    const visibleSections = new Set();

    scrollSpyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;

        if (entry.isIntersecting) {
          visibleSections.add(id);
        } else {
          visibleSections.delete(id);
        }
      });

      // Update active states (throttled to prevent too many updates)
      updateActiveAnchor(visibleSections, anchorIds);
    }, {
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0
    });

    // Observe all anchor elements
    anchorElements.forEach(element => {
      scrollSpyObserver.observe(element);
    });
  }

  /**
   * Update which anchor link is marked as active
   * Throttled to prevent excessive DOM operations
   */
  var updateThrottleTimer = null;
  var lastActiveId = null;

  function updateActiveAnchor(visibleSections, allAnchorIds) {
    // Throttle updates to max once per 100ms
    if (updateThrottleTimer) {
      return;
    }

    updateThrottleTimer = setTimeout(function() {
      updateThrottleTimer = null;

      // Find the first visible section (topmost)
      let activeId = null;
      for (const id of allAnchorIds) {
        if (visibleSections.has(id)) {
          activeId = id;
          break;
        }
      }

      // If no sections visible, check if we're at the top
      if (!activeId && allAnchorIds.length > 0) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop < 200) {
          activeId = allAnchorIds[0];
        }
      }

      // Only update DOM if active section changed
      if (activeId !== lastActiveId) {
        const links = document.querySelectorAll('.anchor-nav-link');

        // Remove active from all links
        links.forEach(link => link.classList.remove('active'));

        // Mark active link
        if (activeId) {
          const activeLink = document.querySelector(`.anchor-nav-link[data-anchor="${activeId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }

        lastActiveId = activeId;
      }
    }, 100);
  }

  /**
   * Track if mobile nav has been initialized to prevent duplicate event listeners
   */
  var mobileNavInitialized = false;

  /**
   * Initialize mobile dropdown functionality
   * Creates a slide-in drawer from the right side
   */
  function initMobileAnchorNav() {
    const container = document.getElementById('anchor-nav-container');
    if (!container) return;

    // Create toggle button if it doesn't exist
    let toggleButton = document.getElementById('anchor-nav-toggle');
    if (!toggleButton) {
      toggleButton = document.createElement('button');
      toggleButton.id = 'anchor-nav-toggle';
      toggleButton.setAttribute('aria-label', 'Toggle anchor navigation');
      document.body.appendChild(toggleButton);
    }

    // Show toggle button on mobile (CSS will handle display based on screen size)
    toggleButton.style.display = 'block';

    // Create backdrop if it doesn't exist
    let backdrop = document.getElementById('anchor-nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'anchor-nav-backdrop';
      document.body.appendChild(backdrop);
    }

    // Create dropdown container if it doesn't exist
    let dropdown = document.getElementById('anchor-nav-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.id = 'anchor-nav-dropdown';
      document.body.appendChild(dropdown);
    }

    // Copy content from anchor-nav-container to dropdown
    dropdown.innerHTML = container.innerHTML;

    // Toggle function to open/close drawer
    function toggleDrawer(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      // Get fresh references to ensure we're working with the correct elements
      const dropdownEl = document.getElementById('anchor-nav-dropdown');
      const backdropEl = document.getElementById('anchor-nav-backdrop');
      
      if (!dropdownEl || !backdropEl) {
        return;
      }
      
      const isOpen = dropdownEl.classList.contains('open');

      if (isOpen) {
        dropdownEl.classList.remove('open');
        backdropEl.classList.remove('open');
      } else {
        dropdownEl.classList.add('open');
        backdropEl.classList.add('open');
      }
    }

    // Only add event listeners once
    if (!mobileNavInitialized) {
      // Toggle button click handler
      toggleButton.addEventListener('click', toggleDrawer);

      // Close when clicking backdrop
      backdrop.addEventListener('click', function(e) {
        e.preventDefault();
        toggleDrawer();
      });

      // Handle anchor clicks in dropdown
      dropdown.addEventListener('click', function(e) {
        const link = e.target.closest('.anchor-nav-link, .anchor-nav-page-title');
        if (link) {
          e.preventDefault();

          // Get the anchor target
          const targetId = link.getAttribute('data-anchor');

          // Get fresh references to close the dropdown
          const dropdownEl = document.getElementById('anchor-nav-dropdown');
          const backdropEl = document.getElementById('anchor-nav-backdrop');
          
          // Close dropdown first
          if (dropdownEl) dropdownEl.classList.remove('open');
          if (backdropEl) backdropEl.classList.remove('open');

          // Then scroll to target after a brief delay
          setTimeout(function() {
            if (targetId === 'top') {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
              const currentUrl = window.location.pathname + window.location.search;
              history.pushState(null, null, currentUrl);
            } else {
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
                const currentUrl = window.location.pathname + window.location.search;
                history.pushState(null, null, currentUrl + '#' + targetId);
              }
            }
          }, 100);
        }
      });

      mobileNavInitialized = true;
    }
  }

  /**
   * Initialize anchor navigation
   * Works with HISE-generated rootDb structure
   */
  function initAnchorNav() {
    // Quick check - rootDb should be loaded from toc.json
    if (typeof rootDb === 'undefined') {
      return;
    }

    const hasAnchors = renderAnchorNav();

    // Only initialize mobile functionality if we have anchors
    if (hasAnchors) {
      initMobileAnchorNav();
    }
  }

  // Initialize when DOM is ready (only once!)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnchorNav);
  } else {
    initAnchorNav();
  }

})();
