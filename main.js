// ==========================================================================
//  Portafolio — Augusto Rodríguez
//  main.js: navegación de proyectos, tema claro/oscuro e internacionalización
// ==========================================================================

// --------------------------------------------------------------------------
//  Internacionalización (ES / EN)
// --------------------------------------------------------------------------
const translations = {
    es: {
        role: "Desarrollador FullStack",
        nav_home: "Inicio",
        nav_about: "Sobre mí",
        nav_stack: "Tecnologías",
        nav_projects: "Proyectos",
        btn_projects: "Proyectos",
        tip_projects: "Ver Proyectos",
        tip_whatsapp: "Escribime por WhatsApp",
        tip_mail: "Enviar correo",
        tip_github: "Ver mi GitHub",
        tip_cv: "Ver CV",
        tip_linkedin: "Abrir LinkedIn",
        about_title: "Sobre mí",
        stack_title: "Tecnologías",
        projects_title: "Proyectos",
        footer_text: "Hecho con ☕ por Augusto Rodríguez",
        cuentitas_desc: "Aplicación privada de finanzas personales para llevar los gastos mes a mes, hecha a medida para mí y mi familia. Incluye cuentas, metas de ahorro y campos propios, además de una app móvil y un bot de WhatsApp para registrar todo al día con mayor facilidad.",
        cuentitas_tech: "Tecnologías: NestJS, TypeORM, Vue, React Native, PostgreSQL, Hostinger (VPS) y APIs públicas.",
        link_site: "Ver sitio",
        about_text: "Hola, soy Augusto Rodríguez, desarrollador FullStack. Construyo aplicaciones web de punta a punta con Node.js y JavaScript, y últimamente enfoco buena parte de mi trabajo en la integración de IA: agentes, herramientas (tools/MCP) y flujos con modelos como Claude. Aprendo rápido, resuelvo problemas reales y busco mejorar de forma constante en lo que hago.",
        proj1_desc: "Rimainder es una aplicación de recordatorios con calendario que integra Telegram para avisarte de tus eventos de forma automática (1 día, 1 hora y 30 minutos antes). Cuenta con autenticación segura y permite crear eventos tanto desde la web como mediante comandos del bot.",
        proj1_tech: "Tecnologías: Node.js, Express, PostgreSQL, TypeORM, JWT, y Telegram Bot API.",
        proj3_title: "SGGM – Sistema de Gestión de Guardias Médicas",
        proj3_desc: "Backend en Node.js/Express para administrar integralmente las guardias médicas de una institución: usuarios, profesionales, servicios, registro de guardias y auditoría/logging con RabbitMQ. Implementa autenticación JWT, autorización por roles, validación con Joi y una arquitectura modular por dominios (vertical slice).",
        proj3_tech: "Tecnologías: Node.js, Express, TypeORM, MySQL, RabbitMQ, JWT/Passport, Joi. Documentación de API disponible en Postman.",
        link_demo: "Ver demo",
        link_api: "Ver API (Postman)"
    },
    en: {
        role: "FullStack Developer",
        nav_home: "Home",
        nav_about: "About",
        nav_stack: "Technologies",
        nav_projects: "Projects",
        btn_projects: "Projects",
        tip_projects: "View projects",
        tip_whatsapp: "Message me on WhatsApp",
        tip_mail: "Send email",
        tip_github: "View my GitHub",
        tip_cv: "View resume",
        tip_linkedin: "Open LinkedIn",
        about_title: "About me",
        stack_title: "Technologies",
        projects_title: "Projects",
        footer_text: "Made with ☕ by Augusto Rodríguez",
        cuentitas_desc: "Private personal-finance app to track month-to-month spending, tailor-made for me and my family. It includes accounts, savings goals and custom fields, plus a mobile app and a WhatsApp bot to log everything on the go with ease.",
        cuentitas_tech: "Technologies: NestJS, TypeORM, Vue, React Native, PostgreSQL, Hostinger (VPS) and public APIs.",
        link_site: "Visit site",
        about_text: "Hi, I'm Augusto Rodríguez, a FullStack developer. I build end-to-end web applications with Node.js and JavaScript, and lately I focus a good part of my work on AI integration: agents, tools (tools/MCP) and workflows with models like Claude. I learn fast, solve real problems and keep improving at what I do.",
        proj1_desc: "Rimainder is a reminder app with a calendar that integrates Telegram to notify you of your events automatically (1 day, 1 hour and 30 minutes before). It features secure authentication and lets you create events both from the web and through bot commands.",
        proj1_tech: "Technologies: Node.js, Express, PostgreSQL, TypeORM, JWT, and the Telegram Bot API.",
        proj3_title: "SGGM – Medical On-Call Management System",
        proj3_desc: "Node.js/Express backend to fully manage an institution's medical on-call shifts: users, professionals, services, shift logging and auditing/logging with RabbitMQ. It implements JWT authentication, role-based authorization, validation with Joi and a modular architecture by domain (vertical slice).",
        proj3_tech: "Technologies: Node.js, Express, TypeORM, MySQL, RabbitMQ, JWT/Passport, Joi. API documentation available on Postman.",
        link_demo: "View demo",
        link_api: "View API (Postman)"
    }
};

function setLanguage(lang) {
    if (!translations[lang]) lang = "es";
    const dict = translations[lang];

    // Texto de los elementos con data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // Tooltips (atributo data-tooltip usado por el CSS)
    document.querySelectorAll("[data-i18n-tooltip]").forEach((el) => {
        const key = el.getAttribute("data-i18n-tooltip");
        if (dict[key] !== undefined) el.setAttribute("data-tooltip", dict[key]);
    });

    // Etiquetas accesibles (aria-label)
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
        const key = el.getAttribute("data-i18n-aria");
        if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
    });

    // Estado del documento, botones y persistencia
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });
    localStorage.setItem("lang", lang);
}

function initLanguage() {
    const saved = localStorage.getItem("lang");
    const initial = saved || (navigator.language || "es").slice(0, 2);
    setLanguage(translations[initial] ? initial : "es");

    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });
}

// --------------------------------------------------------------------------
//  Tema claro / oscuro (con persistencia)
// --------------------------------------------------------------------------
function initTheme() {
    const toggle = document.getElementById("ModoOscuro");
    if (!toggle) return;

    // El sitio es oscuro por defecto; la clase lightMode activa el modo claro.
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("lightMode");
        toggle.checked = true;
    }

    toggle.addEventListener("change", () => {
        const isLight = document.body.classList.toggle("lightMode");
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
}

// --------------------------------------------------------------------------
//  Navbar: menú hamburguesa (móvil)
// --------------------------------------------------------------------------
function initNav() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    const cerrar = () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
        const abierto = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(abierto));
    });

    // Cerrar el menú al elegir un enlace
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", cerrar));
}

// --------------------------------------------------------------------------
//  Scroll suave hacia la sección de proyectos
// --------------------------------------------------------------------------
function initScrollProyectos() {
    const btn = document.getElementById("IrProyectos");
    if (!btn) return;
    btn.addEventListener("click", () => {
        const destino = document.querySelector("#proyectos") || document.querySelector(".Proyectos");
        if (destino) destino.scrollIntoView({ behavior: "smooth" });
    });
}

// --------------------------------------------------------------------------
//  Animaciones de entrada al hacer scroll (respeta prefers-reduced-motion)
// --------------------------------------------------------------------------
function initReveal() {
    const elementos = document.querySelectorAll(".reveal");
    if (elementos.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
        elementos.forEach((el) => el.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elementos.forEach((el) => observer.observe(el));
}

// --------------------------------------------------------------------------
//  Arranque
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    initLanguage();
    initTheme();
    initNav();
    initScrollProyectos();
    initReveal();
});
