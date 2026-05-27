document.addEventListener('DOMContentLoaded', function () {

    // --- Project Data ---
    const projects = [
        {
            id: 1,
            name: 'Project Alpha',
            img: 'img/project%201.webp',
            tech: ['React', 'Node.js'],
            color: ['primary', 'secondary'],
            longDescription: 'A full-stack web application built with React and Node.js.',
            features: [
                'User authentication & authorization',
                'RESTful API with Express.js',
                'Responsive React frontend with state management',
                'MongoDB database integration',
                'Real-time data updates'
            ],
            duration: '3 months',
            role: 'Full-Stack Developer'
        },
        {
            id: 2,
            name: 'Project Beta',
            img: 'img/project%202.webp',
            tech: ['Python', 'Django'],
            color: ['success', 'secondary'],
            longDescription: 'E-commerce platform with payment integration and admin dashboard.',
            features: [
                'Product catalog with search & filters',
                'Shopping cart & checkout workflow',
                'Stripe payment gateway integration',
                'Admin dashboard with analytics',
                'Order management system'
            ],
            duration: '4 months',
            role: 'Backend Developer'
        },
        {
            id: 3,
            name: 'Project Gamma',
            img: 'img/project%203.webp',
            tech: ['Vue', 'D3.js'],
            color: ['danger', 'secondary'],
            longDescription: 'Mobile-first weather dashboard with real-time data visualization.',
            features: [
                'Real-time weather API integration',
                'Interactive charts with D3.js',
                'Geolocation-based forecasts',
                '7-day weather predictions',
                'Offline-capable progressive web app'
            ],
            duration: '2 months',
            role: 'Frontend Developer'
        },
        {
            id: 4,
            name: 'Project Delta',
            img: 'img/project%204.webp',
            tech: ['Angular', 'TypeScript'],
            color: ['warning', 'secondary'],
            longDescription: 'Task management tool with drag-and-drop boards.',
            features: [
                'Kanban-style drag-and-drop boards',
                'Task creation with priority labels',
                'Team collaboration & comments',
                'Deadline tracking & notifications',
                'Dark mode support'
            ],
            duration: '3 months',
            role: 'Frontend Developer'
        },
        {
            id: 5,
            name: 'Project Epsilon',
            img: 'img/project%205.webp',
            tech: ['ML', 'FastAPI'],
            color: ['info', 'secondary'],
            longDescription: 'Machine learning pipeline for sentiment analysis.',
            features: [
                'Natural language processing pipeline',
                'Sentiment classification model',
                'FastAPI REST endpoint',
                'Batch processing & real-time inference',
                'Performance dashboard with metrics'
            ],
            duration: '5 months',
            role: 'ML Engineer'
        },
        {
            id: 6,
            name: 'Project Zeta',
            img: 'img/project%206.webp',
            tech: ['Socket.io', 'Express'],
            color: ['purple', 'secondary'],
            longDescription: 'Real-time chat application with WebSocket support.',
            features: [
                'Real-time messaging with Socket.io',
                'Multiple chat rooms',
                'File sharing & image preview',
                'Typing indicators & read receipts',
                'Message history with search'
            ],
            duration: '2 months',
            role: 'Full-Stack Developer'
        }
    ];

    // --- Project Modal ---
    var projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    var modalTitle = document.getElementById('modalTitle');
    var modalImg = document.getElementById('modalImg');
    var modalTech = document.getElementById('modalTech');
    var modalDescription = document.getElementById('modalDescription');
    var modalFeatures = document.getElementById('modalFeatures');
    var modalDuration = document.getElementById('modalDuration');
    var modalRole = document.getElementById('modalRole');

    document.getElementById('productGrid').addEventListener('click', function (e) {
        var card = e.target.closest('.project-card');
        if (!card) return;

        var id = parseInt(card.dataset.id);
        var project = projects.find(function (p) { return p.id === id; });
        if (!project) return;

        modalTitle.textContent = project.name;
        modalImg.src = project.img;
        modalImg.alt = project.name;
        modalDescription.textContent = project.longDescription;

        modalTech.innerHTML = project.tech.map(function (t, i) {
            return '<span class="badge bg-' + project.color[i] + ' me-1">' + t + '</span>';
        }).join('');

        modalFeatures.innerHTML = project.features.map(function (f) {
            return '<li><i class="bi bi-check-circle-fill text-primary me-2"></i>' + f + '</li>';
        }).join('');

        modalDuration.textContent = project.duration;
        modalRole.textContent = project.role;

        projectModal.show();
    });

    // --- Scroll Reveal ---
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
        revealObserver.observe(el);
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // --- Back to Top Button ---
    const backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.innerHTML = '<i class="bi bi-chevron-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Project Cards stagger delay ---
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(function (card, i) {
        card.style.transitionDelay = (i * 0.08) + 's';
    });

    // --- Contact Form Validation ---
    const form = document.getElementById('contactForm');
    const toastEl = document.getElementById('formToast');
    const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { autohide: true, delay: 4000 });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        [name, email, subject, message].forEach(function (field) {
            field.classList.remove('is-invalid', 'is-valid');
        });

        if (!name.value.trim()) {
            name.classList.add('is-invalid');
            isValid = false;
        } else {
            name.classList.add('is-valid');
        }

        if (!email.value.trim()) {
            email.classList.add('is-invalid');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.add('is-valid');
        }

        if (!subject.value.trim()) {
            subject.classList.add('is-invalid');
            isValid = false;
        } else {
            subject.classList.add('is-valid');
        }

        if (!message.value.trim()) {
            message.classList.add('is-invalid');
            isValid = false;
        } else {
            message.classList.add('is-valid');
        }

        if (isValid) {
            form.reset();
            toast.show();
        }
    });

    // Live validation feedback on input
    document.querySelectorAll('#contactForm .form-control').forEach(function (input) {
        input.addEventListener('input', function () {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
            }
        });
    });
});
