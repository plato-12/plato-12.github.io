// Function to set a theme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
    
    // Update toggle state
    const checkbox = document.getElementById('theme-switch');
    if (checkbox) {
      checkbox.checked = themeName === 'dark';
    }
  }
  
  // Function to toggle between light and dark theme
  function toggleTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }
  
  // Function to initialize the theme on page load
  function initTheme() {
    // Check for saved theme preference or default to user's OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDarkScheme) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
  
  // Function to add the toggle switch to the page
  function addDarkModeToggle() {
    const toggleHtml = `
      <div class="dark-mode-toggle">
        <label class="theme-switch" for="theme-switch">
          <input type="checkbox" id="theme-switch" onchange="toggleTheme()" />
          <span class="slider"></span>
          <span class="sun-moon-icons">
            <span>☀️</span>
            <span>🌙</span>
          </span>
        </label>
      </div>
    `;
    
    // Insert toggle before the masthead navigation
    const masthead = document.querySelector('.masthead');
    if (masthead) {
      masthead.insertAdjacentHTML('beforeend', toggleHtml);
      
      // Set the correct toggle state based on current theme
      const checkbox = document.getElementById('theme-switch');
      checkbox.checked = localStorage.getItem('theme') === 'dark';
    }
  }
  
  // Run initialization when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    addDarkModeToggle();
  });
  
  // Listen for changes in color scheme preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
  });