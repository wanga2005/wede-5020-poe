# GreenRoot Urban Gardens

## Project Overview
GreenRoot Urban Gardens is a responsive brochure-style website for a sustainable urban farming initiative in Pretoria, South Africa. The site is built using HTML5, CSS3, and Vanilla JavaScript, with a focus on clean UI, accessibility, dynamic interactivity, and SEO-ready page structure.

## File Structure
- `index.html`
- `about.html`
- `gardens.html`
- `enquiry.html`
- `contact.html`
- `css/style.css`
- `js/app.js`
- `js/form-response.json`
- `robots.txt`
- `sitemap.xml`

## Changelog
- **2026-06-17**: Added Part 3 enhancements for SEO, UX, and frontend functionality.
  - Implemented unique page titles and meta descriptions on every page.
  - Added semantic heading structure (`h1` through `h3`) for improved accessibility and SEO.
  - Created a new JavaScript module (`js/app.js`) for dynamic content, search and filter functionality, lightbox gallery, tabs, accordions, form validation, AJAX handling, and Leaflet map integration.
  - Added `robots.txt` and `sitemap.xml` to support search engine indexing.
  - Built fully responsive enquiry and contact forms with HTML5 validation, custom inline error messaging, and client-side AJAX-style submission handling.
  - Added page-specific internal linking, lazy loading for images, and CSS transitions for improved performance.

- **2026-06-16**: Completed Part 2 initial website structure with 5 linked pages and styling.
  - Added homepage, about, gardens, enquiry, and contact pages.
  - Established a shared navigation bar and consistent branding across pages.
  - Created the main stylesheet and base layout.

## Implementation Notes
- Use descriptive commit messages such as:
  - `feat: add AJAX enquiry form and dynamic service filtering`
  - `fix: improve SEO metadata and heading structure`
  - `docs: add robots.txt and sitemap.xml`
- After deployment, update `sitemap.xml` URLs to use the actual live site domain.
- Keep working copies in the repository with regular commits after each functional change.

## Deployment Ready
This project is ready to deploy to GitHub Pages, Netlify, or any static hosting provider. The code is modular and uses only static assets and client-side JavaScript.
