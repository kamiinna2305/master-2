/*
  Template © 2025 Inna Web Boutique
  License: for personal use only. Resale prohibited.
*/

document.addEventListener('DOMContentLoaded', () => {
  const cfgPath = 'data/config.json';

  fetch(cfgPath)
    .then(res => {
      if (!res.ok) throw new Error('Fetch error ' + res.status);
      return res.json();
    })
    .then(data => {
      // --- safe default values ---
      const defaults = {
        businessName: 'Your Business',
        tagline: '',
        description: '',
        phone: '',
        email: '',
        location: '',
        instagram: '',
        whatsApp: '',
        descriptionAbout: '',
        themeColor: '#d4a785',
        bodyColor: '',
        hoverColor: '',
        textColor: '',
        services: [],
        gallery: []
      };
      data = Object.assign({}, defaults, data);

      // Title & name
      if (data.businessName) {
        document.title = data.businessName;
        document.querySelectorAll('.business-name')
          .forEach(el => el.textContent = data.businessName);
      }

      // Text blocks
      document.querySelectorAll('.tagline').forEach(el => el.textContent = data.tagline || '');
      document.querySelectorAll('.description').forEach(el => el.textContent = data.description || '');
      document.querySelectorAll('.phone').forEach(el => el.textContent = data.phone || '');
      document.querySelectorAll('.whatsapp').forEach(el => el.textContent = data.whatsApp || '');
      document.querySelectorAll('.email').forEach(el => el.textContent = data.email || '');
      document.querySelectorAll('.location').forEach(el => el.textContent = data.location || '');
      document.querySelectorAll('.instagram').forEach(el => el.textContent = data.instagram || '');
      document.querySelectorAll('.about_description').forEach(el => el.textContent = data.descriptionAbout || '');

      // Links
      const phoneEl = document.querySelector('.phone');
      if (phoneEl) {
        phoneEl.textContent = data.phone;
        phoneEl.setAttribute('href', `tel:${(data.phone || '').replace(/\s/g, '')}`);
      }

      const emailEl = document.querySelector('.email');
      if (emailEl) {
        emailEl.textContent = data.email;
        emailEl.setAttribute('href', `mailto:${data.email || ''}`);
      }

      const whatsappEl = document.querySelector('.whatsapp');
      if (whatsappEl) {
        whatsappEl.textContent = data.whatsApp ? `${data.whatsApp} WhatsApp` : 'WhatsApp';
        whatsappEl.setAttribute('href', `https://wa.me/${(data.phone || '').replace(/\D/g, '')}`);
      }

      const instagramEl = document.querySelector('.instagram');
      if (instagramEl) {
        instagramEl.textContent = data.instagram || '';
        const igUser = (data.instagram || '').replace(/^@/, '');
        instagramEl.setAttribute('href', igUser ? `https://instagram.com/${igUser}` : '#');
      }

      // Colors
      document.documentElement.style.setProperty('--theme-color', data.themeColor);
      if (data.bodyColor)  document.documentElement.style.setProperty('--body-color',  data.bodyColor);
      if (data.hoverColor) document.documentElement.style.setProperty('--hover-color', data.hoverColor);
      if (data.textColor)  document.documentElement.style.setProperty('--text-color',  data.textColor);

      // Services: поддержка строк и объектов {name, price}
      const servicesList = document.querySelector('.services');
      if (servicesList && Array.isArray(data.services)) {
        servicesList.innerHTML = '';
        data.services.forEach(service => {
          const li = document.createElement('li');

          if (typeof service === 'string') {
            li.textContent = service;
          } else {
            const name = service.name || '';
            const price = service.price || '';
            li.innerHTML = `
              <span class="service-name">${name}</span>
              <span class="service-price">${price}</span>
            `;
          }

          servicesList.appendChild(li);
        });
      }

      // Gallery: из config.json
      const galleryContainer = document.querySelector('.gallery-grid');
      if (galleryContainer) {
        galleryContainer.innerHTML = '';
        if (Array.isArray(data.gallery)) {
          data.gallery.forEach(item => {
            const src = item?.src || '';
            if (!src) return;

            const link = document.createElement('a');
            link.href = src;
            link.setAttribute('data-fancybox', 'gallery');
            if (item?.caption) link.setAttribute('data-caption', item.caption);

            const img = document.createElement('img');
            img.src = src;
            img.alt = item?.alt || 'gallery image';

            link.appendChild(img);
            galleryContainer.appendChild(link);
          });
        }
      }

      // Инициализация Fancybox, если он подключен
      if (window.Fancybox && document.querySelector('[data-fancybox="gallery"]')) {
        Fancybox.bind("[data-fancybox='gallery']", {
          animated: true,
          showClass: "f-fadeIn",
          hideClass: "f-fadeOut",
          Thumbs: false,
          Toolbar: {
            display: [
              { id: "counter", position: "center" },
              "zoom",
              "slideshow",
              "fullscreen",
              "close"
            ]
          }
        });
      }
    })
    .catch(err => {
      console.error('Error config.json:', err);
    });

  // Burger: безопасные обработчики
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu_items');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      this.classList.toggle('active');
      menu.classList.toggle('open');
    });

    // Close on click of link
    menu.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.classList.remove('active');
    });
  }
});

/*
  Template © 2025 Inna Web Boutique 
  Author: Inna Hiliarovska
  License: Personal use only. Resale prohibited.
*/
