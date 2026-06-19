const projectData = [
  {
    title: 'Rooftop Market Farm',
    category: 'Commercial',
    summary: 'High-yield garden delivering fresh greens to nearby markets and charities.',
    details: 'A revenue-generating food garden designed for small businesses and shared market distribution.',
    image: 'img/ornamental-garden.jpg',
    alt: 'Colorful ornamental garden with vibrant blooms and landscaping.'
  },
  {
    title: 'School Garden Hub',
    category: 'Education',
    summary: 'An educational garden where students learn planting, composting, and healthy cooking.',
    details: 'A classroom-in-the-garden concept built for schools and community learning spaces.',
    image: 'img/community-garden.jpg',
    alt: 'Community vegetable garden with raised beds.'
  },
  {
    title: 'Community Harvest Garden',
    category: 'Community',
    summary: 'A shared space for neighbours to grow food, gather and volunteer together.',
    details: 'A neighbourhood garden designed to support food security, social connection and local volunteering.',
    image: 'img/rooftop-garden.jpg',
    alt: 'Urban rooftop garden at residential building.'
  }
];

const serviceItems = [
  { title: 'Design & Installation', description: 'Customized garden systems tailored for rooftops, balconies and courtyards.' },
  { title: 'Ongoing Maintenance', description: 'Seasonal care, composting and irrigation support to keep your space thriving.' },
  { title: 'Community Training', description: 'Hands-on workshops for schools, volunteers, and local business partners.' }
];

function insertServices() {
  const serviceList = document.querySelector('#service-list');
  if (!serviceList) return;
  serviceList.innerHTML = serviceItems.map(item => `
    <article class="card service-card">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `).join('');
}

function renderProjectCards(filter = 'all', search = '') {
  const projectList = document.querySelector('#project-list');
  if (!projectList) return;
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = projectData.filter(project => {
    const matchesCategory = filter === 'all' || project.category.toLowerCase() === filter;
    const matchesSearch = project.title.toLowerCase().includes(normalizedSearch) || project.summary.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    projectList.innerHTML = '<p class="empty-state">No matching projects were found. Try another filter or keyword.</p>';
    return;
  }

  projectList.innerHTML = filtered.map(project => `
    <article class="card project-card slide-up">
      <img src="${project.image}" alt="${project.alt}" loading="lazy">
      <div>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <p><strong>Type:</strong> ${project.category}</p>
        <p>${project.details}</p>
      </div>
    </article>
  `).join('');
}

function setupProjectFiltering() {
  const searchInput = document.querySelector('#project-search');
  const categorySelect = document.querySelector('#project-category');
  if (!searchInput || !categorySelect) return;

  const updateProjects = () => {
    renderProjectCards(categorySelect.value, searchInput.value);
  };

  searchInput.addEventListener('input', updateProjects);
  categorySelect.addEventListener('change', updateProjects);
  updateProjects();
}

function setupGallery() {
  const gallery = document.querySelector('#gallery-grid');
  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  const lightboxCaption = document.querySelector('#lightbox-caption');

  if (!gallery || !lightbox || !lightboxImage || !lightboxCaption) return;

  gallery.addEventListener('click', event => {
    const item = event.target.closest('.gallery-item');
    if (!item) return;
    event.preventDefault();
    lightboxImage.src = item.dataset.large;
    lightboxImage.alt = item.dataset.alt;
    lightboxCaption.textContent = item.dataset.alt;
    lightbox.classList.add('open');
  });

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox || event.target.closest('.lightbox-close')) {
      lightbox.classList.remove('open');
      lightboxImage.src = '';
    }
  });
}

function setupTabs() {
  const tabList = document.querySelector('[data-tab-list]');
  if (!tabList) return;
  const tabs = tabList.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');

  tabList.addEventListener('click', event => {
    const clicked = event.target.closest('[role="tab"]');
    if (!clicked) return;
    const targetId = clicked.dataset.target;
    tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));
    clicked.setAttribute('aria-selected', 'true');
    tabPanels.forEach(panel => panel.hidden = panel.id !== targetId);
  });
}

function setupAccordion() {
  const accordion = document.querySelector('#about-accordion');
  if (!accordion) return;
  accordion.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    panel.hidden = isOpen;
  });
}

function setupMap() {
  const mapElement = document.querySelector('#contact-map');
  if (!mapElement || typeof L === 'undefined') return;

  const map = L.map('contact-map', { scrollWheelZoom: false }).setView([-25.7461, 28.1881], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.marker([-25.7461, 28.1881]).addTo(map).bindPopup('GreenRoot Urban Gardens HQ, Pretoria').openPopup();
}

function clearErrors(form) {
  form.querySelectorAll('.error-message').forEach(message => message.textContent = '');
  form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
}

function showError(input, message) {
  let messageBlock = input.parentElement.querySelector('.error-message');
  if (!messageBlock) {
    messageBlock = document.createElement('p');
    messageBlock.className = 'error-message';
    input.parentElement.appendChild(messageBlock);
  }
  messageBlock.textContent = message;
  input.setAttribute('aria-invalid', 'true');
}

function validateEnquiryForm(form) {
  clearErrors(form);
  let valid = true;
  const email = form.querySelector('#enquiry-email');
  const phone = form.querySelector('#enquiry-phone');
  const name = form.querySelector('#enquiry-name');
  const date = form.querySelector('#enquiry-date');

  if (!name.value.trim()) {
    showError(name, 'Please enter your name.');
    valid = false;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError(email, 'Please enter a valid email address.');
    valid = false;
  }
  if (!phone.value.trim() || !/^\+?[0-9]{9,15}$/.test(phone.value)) {
    showError(phone, 'Please enter a valid phone number with 9 to 15 digits.');
    valid = false;
  }
  if (!date.value) {
    showError(date, 'Please choose your preferred start date.');
    valid = false;
  }
  return valid;
}

function validateContactForm(form) {
  clearErrors(form);
  let valid = true;
  const name = form.querySelector('#contact-name');
  const email = form.querySelector('#contact-email');
  const message = form.querySelector('#contact-message');
  const type = form.querySelector('#contact-type');
  const phone = form.querySelector('#contact-phone');

  if (!name.value.trim()) {
    showError(name, 'Please enter your full name.');
    valid = false;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError(email, 'Please enter a valid email address.');
    valid = false;
  }
  if (phone.value.trim() && !/^\+?[0-9]{9,15}$/.test(phone.value)) {
    showError(phone, 'Please use 9 to 15 digits for your phone number.');
    valid = false;
  }
  if (!type.value) {
    showError(type, 'Please select the reason for your message.');
    valid = false;
  }
  if (!message.value.trim() || message.value.trim().length < 20) {
    showError(message, 'Please enter a message with at least 20 characters.');
    valid = false;
  }
  return valid;
}

async function ajaxSubmit(formData) {
  try {
    const response = await fetch('./js/form-response.json');
    if (!response.ok) throw new Error('Network response not OK');
    return response.json();
  } catch (error) {
    return {
      status: 'success',
      message: 'Your request was processed successfully in the browser. Please send the generated email if needed.'
    };
  }
}

function showFormResult(container, message, state = 'success') {
  container.innerHTML = `<div class="form-alert form-alert-${state}">${message}</div>`;
}

function setupEnquiryForm() {
  const form = document.querySelector('#enquiry-form-element');
  if (!form) return;
  const resultContainer = document.querySelector('#enquiry-result');

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!validateEnquiryForm(form)) return;
    const formData = new FormData(form);
    const response = await ajaxSubmit(formData);
    const costEstimate = formData.get('budget') === 'premium' ? 'R12,000 - R18,000' : 'R5,000 - R10,000';
    const responseMessage = `Thanks ${formData.get('name')}, we have received your enquiry for ${formData.get('subject')}. Based on your preferred start date of ${formData.get('date')}, we estimate the project cost to be ${costEstimate}. A GreenRoot specialist will contact you soon.`;
    showFormResult(resultContainer, responseMessage, response.status);
    form.reset();
  });
}

function setupContactForm() {
  const form = document.querySelector('#contact-form-element');
  if (!form) return;
  const resultContainer = document.querySelector('#contact-result');

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!validateContactForm(form)) return;
    const formData = new FormData(form);
    const emailSubject = `GreenRoot enquiry: ${formData.get('contact-type')}`;
    const emailBody = `Name: ${formData.get('contact-name')}\nEmail: ${formData.get('contact-email')}\nPhone: ${formData.get('contact-phone')}\nType: ${formData.get('contact-type')}\n\nMessage:\n${formData.get('contact-message')}`;
    const mailtoLink = `mailto:hello@greenrootgardens.co.za?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const response = await ajaxSubmit(formData);

    showFormResult(resultContainer, `Your message is ready to send. <a href="${mailtoLink}" class="link-button">Open email client</a>`, response.status);
    form.reset();
  });
}

function initAnimations() {
  document.querySelectorAll('.slide-up').forEach(element => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(element);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  insertServices();
  setupProjectFiltering();
  setupGallery();
  setupTabs();
  setupAccordion();
  setupMap();
  setupEnquiryForm();
  setupContactForm();
  initAnimations();
});
