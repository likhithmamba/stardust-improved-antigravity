// Common JavaScript Functions for Galactic Note Ring Overview Variants

/**
 * Toggle between dark and light mode
 */
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  
  // Save preference to localStorage
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/**
 * Initialize theme based on saved preference or system preference
 */
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  }
}

/**
 * Apply mouse parallax effect to elements
 * @param {string} selector - CSS selector for elements to apply parallax to
 * @param {number} intensity - Parallax intensity multiplier
 */
function applyParallax(selector, intensity = 5) {
  document.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const amount = intensity;
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2) * amount;
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2) * amount;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

/**
 * Create a reusable navigation component
 * @returns {string} HTML string for navigation
 */
function createNavigation() {
  return `
    <nav class="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 nav-container">
      <button class="nav-button" title="Brush">
        <span class="material-icons-outlined block">brush</span>
      </button>
      <button class="nav-button" title="Add Note">
        <span class="material-icons-outlined block">add</span>
      </button>
      <div class="h-6 w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
      <button class="nav-button" title="Grid View">
        <span class="material-icons-outlined block">grid_view</span>
      </button>
      <button class="nav-button" title="Download System">
        <span class="material-icons-outlined block">file_download</span>
      </button>
      <button class="nav-button" title="Share Space">
        <span class="material-icons-outlined block">ios_share</span>
      </button>
      <div class="h-6 w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
      <button class="nav-button" title="Knowledge Map">
        <span class="material-icons-outlined block">map</span>
      </button>
      <button class="nav-button" title="Connect Nodes">
        <span class="material-icons-outlined block">link</span>
      </button>
      <button class="nav-button" title="Help">
        <span class="material-icons-outlined block">help_outline</span>
      </button>
    </nav>
  `;
}

/**
 * Create a mode toggle button
 * @returns {string} HTML string for mode toggle
 */
function createModeToggle() {
  return `
    <div class="absolute top-8 left-8 mode-toggle" onclick="toggleDarkMode()">
      <span class="material-icons-outlined block dark:hidden">dark_mode</span>
      <span class="material-icons-outlined hidden dark:block">light_mode</span>
    </div>
  `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
});
