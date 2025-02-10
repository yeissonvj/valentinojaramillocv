// Firebase Integration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';
import { getDatabase, ref, set, increment, onValue } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_Iy1rWWFz6lJFEfZxEr_SmwXih_UQtkM",
  authDomain: "portafoliovalentino.firebaseapp.com",
  databaseURL: "https://portafoliovalentino-default-rtdb.firebaseio.com",
  projectId: "portafoliovalentino",
  storageBucket: "portafoliovalentino.firebasestorage.app",
  messagingSenderId: "1075784839743",
  appId: "1:1075784839743:web:0b3b81483c345595aefe8a",
  measurementId: "G-W4K3NLJL0C"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Función para registrar una visita
function registrarVisita() {
  const page = window.location.pathname.replace(/\//g, "_") || "root";
  const visitRef = ref(database, `visitas/${page}`);
  set(visitRef, increment(1));
}

// Función para obtener estadísticas (opcional)
function obtenerEstadisticas(callback) {
  const visitasRef = ref(database, 'visitas');
  onValue(visitasRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

// Llama a registrarVisita cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
  registrarVisita();
});

// Inicializar i18next con i18next-http-backend
i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    backend: {
      //loadPath: '/locales/{{lng}}.json'
      loadPath: '/valentinojaramillocv/locales/{{lng}}.json'
    },
    lng: 'fr', // Idioma por defecto
    fallbackLng: 'fr', // Idioma de respaldo
    debug: true
  }, function(err, t) {
    if (err) console.error(err);
    updateContent();
    updateContentContact();
    updateContentSelect();
  });

// Actualizar el contenido traducido en la página
function updateContent() {
    document.title = i18next.t('title');
    document.querySelector('.logo').textContent = i18next.t('logo');
    document.querySelector('[href="#home"]').textContent = i18next.t('nav-home');
    document.querySelector('[href="#about"]').textContent = i18next.t('nav-about');
    document.querySelector('[href="#experience"]').textContent = i18next.t('nav-experience');
    document.querySelector('[href="#skills"]').textContent = i18next.t('nav-skills');
    document.querySelector('[href="#projects"]').textContent = i18next.t('nav-projects');
    document.querySelector('[href="#contact"]').textContent = i18next.t('nav-contact');
    document.querySelector('.hero-text h1').textContent = i18next.t('hero-title');
    document.querySelector('.hero-text p').textContent = i18next.t('hero-text');

    // Sección "About Me"
    document.querySelector('#about h2').textContent = i18next.t('about-title');
    document.querySelector('#about .about-text p').textContent = i18next.t('about-text');
    document.querySelector('#language-label').textContent = i18next.t('language-label');

    // Actualizar las habilidades de la sección "About"
    const skillsList = document.querySelectorAll('#about .about-skills li');
    skillsList[0].innerHTML = `<i class="fas fa-code"></i> ${i18next.t('skills-advanced-development')}`;
    skillsList[1].innerHTML = `<i class="fas fa-lightbulb"></i> ${i18next.t('skills-problem-solving')}`;
    skillsList[2].innerHTML = `<i class="fas fa-users"></i> ${i18next.t('skills-collaboration')}`;
    skillsList[3].innerHTML = `<i class="fas fa-tasks"></i> ${i18next.t('skills-project-management')}`;
    skillsList[4].innerHTML = `<i class="fas fa-chart-line"></i> ${i18next.t('skills-continuous-improvement')}`;

    // Actualizar la sección "Experiencia Profesional"
    document.querySelector('#experience h2').textContent = i18next.t('experience-title');
    updateExperienceSection();

    // Actualizar la sección "Habilidades"
    document.querySelector('#skills h2').textContent = i18next.t('skills-title');
    updateSkillsSection();

    // Actualizar la sección "Proyectos"
    document.querySelector('#projects h2').textContent = i18next.t('projects-title');
    updateProjectsSection();

    // Actualizar el pie de página
    document.querySelector('footer p').innerHTML = i18next.t('footer');
}

// Cambiar idioma al seleccionar uno en el menú
document.getElementById('language-select').addEventListener('change', function() {
    const selectedLanguage = this.value;
    i18next.changeLanguage(selectedLanguage, function(err, t) {
        if (err) console.error(err);
        updateContent();
        updateContentContact();
    });
});

// Actualizar los ítems de la experiencia profesional
function updateExperienceSection() {
    for (let i = 1; i <= 5; i++) {
        updateExperienceItem(i);
    }
}

function updateContentSelect() {
    document.getElementById('language-label').innerHTML = i18next.t('languageSelection.selectLanguage');
  }


function updateExperienceItem(itemNumber) {
    const dateSelector = `#experience .timeline-item:nth-child(${itemNumber}) .timeline-date`;
    const titleSelector = `#experience .timeline-item:nth-child(${itemNumber}) h3`;
    const descriptionSelector = `#experience .timeline-item:nth-child(${itemNumber}) p`;
    const listSelector = `#experience .timeline-item:nth-child(${itemNumber}) ul`;

    document.querySelector(dateSelector).textContent = i18next.t(`experience-item${itemNumber}-date`);
    document.querySelector(titleSelector).textContent = i18next.t(`experience-item${itemNumber}-title`);
    document.querySelector(descriptionSelector).textContent = i18next.t(`experience-item${itemNumber}-description`);

    // Actualizar la lista de tareas
    const tasks = i18next.t(`experience-item${itemNumber}-tasks`, { returnObjects: true });
    const listElement = document.querySelector(listSelector);
    listElement.innerHTML = ''; // Limpiar la lista actual
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task;
        listElement.appendChild(listItem);
    });
}

// Actualizar las habilidades
function updateSkillsSection() {
    const skills = [
        { id: 1, icon: 'fa-laptop-code' },
        { id: 2, icon: 'fa-database' },
        { id: 3, icon: 'fa-network-wired' },
        { id: 4, icon: 'fa-cogs' },
        { id: 5, icon: 'fa-lock' },
        { id: 6, icon: 'fa-project-diagram' }
    ];

    skills.forEach(skill => {
        const skillTitle = i18next.t(`skills-${skill.id}-title`);
        const skillDescription = i18next.t(`skills-${skill.id}-description`);

        const skillCard = document.querySelector(`#skills .skill-card:nth-child(${skill.id})`);
        skillCard.querySelector('h3').textContent = skillTitle;
        skillCard.querySelector('p').textContent = skillDescription;
    });
}

// Actualizar los proyectos
function updateProjectsSection() {
    const projects = [
        { id: 1, link: 'https://technologismaps.com/' },
        { id: 2, link: 'https://www.esri.co/en-co/home' },
        { id: 3, link: 'https://www.softwareone.com/en' },
        { id: 4, link: 'https://www.procalculo.com/index.html' },
        { id: 5, link: 'https://evolutionscsas.com/?page=Inicio' }
    ];

    projects.forEach(project => {
        const projectTitle = i18next.t(`projects-${project.id}-title`);
        const projectDescription = i18next.t(`projects-${project.id}-description`);
        const projectButton = i18next.t(`projects-${project.id}-button`);

        const projectCard = document.querySelector(`#projects .project-card:nth-child(${project.id})`);
        projectCard.querySelector('h3').textContent = projectTitle;
        projectCard.querySelector('p').textContent = projectDescription;
        projectCard.querySelector('a').textContent = projectButton;
        projectCard.querySelector('a').href = project.link;
    });
}

// Actualizar el contenido de la sección "Contacto"
function updateContentContact() {
  // Actualizar el título de la sección "Contacto"
  const contactTitle = document.querySelector('#contact h2');
  if (contactTitle) {
      contactTitle.textContent = i18next.t('contact-title');
  }

  // Actualizar el párrafo del correo electrónico, incluyendo el texto introductorio
  const contactEmailParagraph = document.querySelector('#contact .contact-content div:nth-child(1) p:nth-child(1)');
  if (contactEmailParagraph) {
      contactEmailParagraph.innerHTML = `${i18next.t('contact-text-email')} <a href="mailto:${i18next.t('contact-email')}">${i18next.t('contact-email')}</a>`;
  }

  // Actualizar el párrafo de LinkedIn, incluyendo el texto introductorio
  const contactLinkedInParagraph = document.querySelector('#contact .contact-content div:nth-child(1) p:nth-child(2)');
  if (contactLinkedInParagraph) {
      contactLinkedInParagraph.innerHTML = `${i18next.t('contact-text-linkedin')} <a href="https://www.linkedin.com/in/valentino-jaramillo-89427851/">${i18next.t('contact-linkedin')}</a>`;
  }

  // Actualizar el crédito de la imagen
  const contactImageCreditParagraph = document.querySelector('#contact .image-credit');
  if (contactImageCreditParagraph) {
      contactImageCreditParagraph.innerHTML = `${i18next.t('contact-image-credit')} <a href="https://www.aleksandarsavic.com/" target="_blank">${i18next.t('contact-image-author')}</a>`;
  }
}


// Scroll suave
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animaciones en las secciones al hacer scroll
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Animaciones en la línea de tiempo
document.addEventListener('DOMContentLoaded', function () {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});

// Controlar el comportamiento del menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cambiar el fondo del menú al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});
