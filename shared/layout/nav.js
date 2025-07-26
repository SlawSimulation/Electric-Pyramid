// nav.js: Dynamically load nav.html and inject header and footer

async function loadNav() {
  try {
    const response = await fetch('shared/layout/nav.html');
    if (!response.ok) throw new Error('Failed to load nav.html');

    const text = await response.text();

    // Parse the response text as DOM nodes
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // Extract header and footer elements
    const header = doc.querySelector('header');
    const footer = doc.querySelector('footer');

    if (header) {
      document.getElementById('nav-placeholder').appendChild(header);
    }

    if (footer) {
      document.getElementById('footer-placeholder').appendChild(footer);
    }
  } catch (error) {
    console.error('Error loading navigation:', error);
  }
}

// Run after DOM is ready
document.addEventListener('DOMContentLoaded', loadNav);
