// Volt Home Appliances — navigation script
// Handles swapping between the three pages (Home, Televisions, About Us)
// without reloading the browser, and keeps the nav / indicator in sync.

document.addEventListener('DOMContentLoaded', function () {

  var navLinks = document.querySelectorAll('.nav-link');
  var logoLink = document.querySelector('.logo-link');
  var pages = document.querySelectorAll('.page');
  var currentPageLabel = document.getElementById('current-page-label');
  var footerYear = document.getElementById('footer-year');

  // Human-readable labels for the current-page indicator
  var pageTitles = {
    home: 'Home',
    televisions: 'Televisions',
    about: 'About Us'
  };

  function showPage(pageId) {
    // Hide every page, then reveal only the one requested
    pages.forEach(function (page) {
      page.classList.toggle('active-page', page.id === pageId);
    });

    // Highlight the matching nav link so the user knows where they are
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-page') === pageId);
    });

    // Update the text indicator
    if (currentPageLabel && pageTitles[pageId]) {
      currentPageLabel.textContent = pageTitles[pageId];
    }

    // Send focus to the new page's heading for accessibility
    var heading = document.querySelector('#' + pageId + ' h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Wire up the three nav links
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      showPage(link.getAttribute('data-page'));
    });
  });

  // Clicking the logo always returns the user to the home page
  if (logoLink) {
    logoLink.addEventListener('click', function (event) {
      event.preventDefault();
      showPage('home');
    });
  }

  // Footer year, set dynamically so it never goes stale
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Show home page on first load
  showPage('home');
});