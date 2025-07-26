// nav.js: Dynamically load header and footer from nav.html

async function loadNav() {
  try {
    // Adjust the path if needed (this assumes the script is called from /Shared/Pages/sound.html)
    const response = await fetch('../layout/nav.html');
    if (!response.ok) throw new Error(`Failed to load nav.html: ${response.status}`);

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    const header = doc.querySelector('header');
    const footer = doc.querySelector('footer');

    const navPlaceholder = document.getElementById('nav-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (header && navPlaceholder) {
      navPlaceholder.appendChild(header);
    } else {
      console.warn('Header or #nav-placeholder not found');
    }

    if (footer && footerPlaceholder) {
      footerPlaceholder.appendChild(footer);
    } else {
      console.warn('Footer or #footer-placeholder not found');
    }
  } catch (error) {
    console.error('Error loading navigation:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadNav);
