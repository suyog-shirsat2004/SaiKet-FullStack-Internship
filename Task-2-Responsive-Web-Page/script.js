document.addEventListener('DOMContentLoaded', function () {

    // ----- Scroll Reveal -----
    var revealEls = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    // ----- Navbar Scroll Effect -----
    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // ----- Back to Top Button -----
    var backToTop = document.createElement('button');
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

    // ----- Product Data & Rendering -----
    const products = [
        // Electronics
        { id: 1, name: 'Wireless Headphones', price: 79.99, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', badge: 'Bestseller', category: 'Electronics', description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.' },
        { id: 2, name: 'Bluetooth Speaker', price: 49.99, img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop', badge: 'New', category: 'Electronics', description: 'Portable Bluetooth speaker with rich 360-degree sound, IPX7 waterproof rating, and 12-hour playtime.' },
        { id: 3, name: 'USB-C Hub', price: 34.99, img: 'https://images.unsplash.com/photo-1619953942547-233eab5a70d6?w=400&h=300&fit=crop', badge: null, category: 'Electronics', description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and PD charging. Compatible with all USB-C devices.' },
        { id: 4, name: 'Mechanical Keyboard', price: 89.99, img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=300&fit=crop', badge: 'Sale', category: 'Electronics', description: 'RGB mechanical keyboard with hot-swappable switches, aluminum frame, and programmable macro keys.' },
        // Wearables
        { id: 5, name: 'Smart Watch', price: 199.99, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop', badge: null, category: 'Wearables', description: 'Feature-packed smartwatch with heart rate monitoring, GPS tracking, sleep analysis, and AMOLED display.' },
        { id: 6, name: 'Fitness Tracker', price: 59.99, img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop', badge: 'Bestseller', category: 'Wearables', description: 'Slim fitness tracker with step counting, calorie tracking, heart rate monitor, and 7-day battery life.' },
        { id: 7, name: 'Wireless Earbuds', price: 129.99, img: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop', badge: null, category: 'Wearables', description: 'True wireless earbuds with active noise cancellation, spatial audio, and 24-hour total battery life.' },
        // Accessories
        { id: 8, name: 'Leather Backpack', price: 89.99, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', badge: 'Sale', category: 'Accessories', description: 'Handcrafted genuine leather backpack with padded laptop compartment and reinforced stitching.' },
        { id: 9, name: 'Sunglasses', price: 59.99, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop', badge: null, category: 'Accessories', description: 'Polarized UV400 sunglasses with lightweight titanium frame and scratch-resistant lenses.' },
        { id: 10, name: 'Leather Wallet', price: 39.99, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop', badge: 'New', category: 'Accessories', description: 'Slim RFID-blocking leather wallet with 6 card slots and a bill compartment. Minimalist design.' },
        { id: 11, name: 'Travel Mug', price: 24.99, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop', badge: null, category: 'Accessories', description: 'Double-wall vacuum insulated stainless steel travel mug with spill-proof lid. Keeps drinks hot for 6 hours or cold for 12 hours. BPA-free and eco-friendly.' },
        // Footwear
        { id: 12, name: 'Running Shoes', price: 129.99, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', badge: null, category: 'Footwear', description: 'Lightweight running shoes with responsive cushioning, breathable mesh upper, and superior grip.' },
        { id: 13, name: 'Casual Sneakers', price: 74.99, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop', badge: 'Bestseller', category: 'Footwear', description: 'Stylish casual sneakers with memory foam insole, durable outsole, and premium canvas upper.' },
        { id: 14, name: 'Hiking Boots', price: 149.99, img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop', badge: null, category: 'Footwear', description: 'Waterproof hiking boots with Vibram sole, ankle support, and cushioned midsole for trail comfort.' },
        // Men's Clothing
        { id: 15, name: 'Classic Denim Jacket', price: 79.99, img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=300&fit=crop', badge: 'Bestseller', category: "Men's Clothing", description: 'Timeless denim jacket with button-front closure, chest pockets, and adjustable waistband. A wardrobe essential.' },
        { id: 16, name: 'Cotton Crew Neck T-Shirt', price: 19.99, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop', badge: null, category: "Men's Clothing", description: 'Premium 100% organic cotton crew neck tee. Soft, breathable, and available in multiple colors.' },
        { id: 17, name: 'Slim Fit Chinos', price: 49.99, img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=300&fit=crop', badge: 'Sale', category: "Men's Clothing", description: 'Stretch cotton chinos with slim fit, zip fly, and tapered leg. Perfect for casual or office wear.' },
        { id: 18, name: 'Hooded Sweatshirt', price: 44.99, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop', badge: null, category: "Men's Clothing", description: 'French terry hoodie with kangaroo pocket, drawstring hood, and ribbed cuffs. Ultra-soft and cozy.' },
        // Women's Clothing
        { id: 19, name: 'Floral Summer Dress', price: 54.99, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=300&fit=crop', badge: 'New', category: "Women's Clothing", description: 'Lightweight floral dress with adjustable straps, smocked bodice, and flowy A-line skirt. Perfect for summer.' },
        { id: 20, name: 'Tailored Blazer', price: 89.99, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop', badge: null, category: "Women's Clothing", description: 'Single-breasted blazer with notched lapels, padded shoulders, and two-button closure. Office-ready elegance.' },
        { id: 21, name: 'High-Waist Jeans', price: 59.99, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=300&fit=crop', badge: 'Bestseller', category: "Women's Clothing", description: 'High-waist skinny jeans with stretch denim, classic 5-pocket design, and a flattering fit.' },
        { id: 22, name: 'Cashmere Sweater', price: 69.99, img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=300&fit=crop', badge: null, category: "Women's Clothing", description: 'Luxurious cashmere blend sweater with ribbed cuffs and hem. Soft, warm, and effortlessly stylish.' },
    ];

    const productGrid = document.getElementById('productGrid');
    var categoryOrder = ['Electronics', 'Wearables', 'Accessories', 'Footwear', "Men's Clothing", "Women's Clothing"];
    var categoryIcons = {
        'Electronics': 'bi-plug',
        'Wearables': 'bi-watch',
        'Accessories': 'bi-bag',
        'Footwear': 'bi-shoes',
        "Men's Clothing": 'bi-person',
        "Women's Clothing": 'bi-handbag'
    };

    var currentFilter = 'all';

    function renderProducts() {
        var filtered = currentFilter === 'all'
            ? products
            : products.filter(function (p) { return p.category === currentFilter; });

        var categoriesToShow = currentFilter === 'all'
            ? categoryOrder
            : [currentFilter];

        var html = '';
        categoriesToShow.forEach(function (cat) {
            var catProducts = products.filter(function (p) { return p.category === cat; });
            if (catProducts.length === 0) return;

            html +=
                '<div class="col-12 reveal">' +
                    '<div class="category-header d-flex align-items-center gap-2 mb-3 mt-4">' +
                        '<i class="bi ' + (categoryIcons[cat] || 'bi-tag') + ' fs-4 text-primary"></i>' +
                        '<h4 class="fw-bold mb-0">' + cat + '</h4>' +
                        '<span class="badge bg-primary rounded-pill">' + catProducts.length + '</span>' +
                    '</div>' +
                '</div>';

            catProducts.forEach(function (p) {
                var badgeHtml = p.badge
                    ? '<span class="badge bg-danger position-absolute top-0 end-0 m-2">' + p.badge + '</span>'
                    : '';
                html +=
                    '<div class="col-md-6 col-lg-4 reveal">' +
                        '<div class="card product-card h-100 border-0 shadow-sm" data-id="' + p.id + '" role="button">' +
                            '<div class="position-relative overflow-hidden">' +
                                '<img src="' + p.img + '" class="card-img-top" alt="' + p.name + '">' +
                                badgeHtml +
                            '</div>' +
                            '<div class="card-body d-flex flex-column">' +
                                '<h5 class="card-title">' + p.name + '</h5>' +
                                '<p class="card-text text-muted mb-1">₹' + p.price.toFixed(2) + '</p>' +
                                '<button class="btn btn-primary w-100 mt-auto add-to-cart" data-id="' + p.id + '">' +
                                    '<i class="bi bi-cart-plus me-1"></i> Add to Cart' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            });
        });
        productGrid.innerHTML = html;
    }

    renderProducts();

    // Re-observe new reveal elements from rendered products
    setTimeout(function () {
        document.querySelectorAll('#productGrid .reveal').forEach(function (el) {
            revealObserver.observe(el);
        });
    }, 0);

    // ----- Filter Buttons -----
    var filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderProducts();
            // Re-observe new reveal elements
            setTimeout(function () {
                document.querySelectorAll('#productGrid .reveal').forEach(function (el) {
                    revealObserver.observe(el);
                });
            }, 0);
        });
    });

    // ----- Cart State -----
    let cartCount = 0;
    var cartItems = [];
    const cartCountEl = document.getElementById('cartCount');
    const cartToastEl = document.getElementById('cartToast');
    const toastMessage = document.getElementById('toastMessage');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(cartToastEl);

    // ----- Product Card Click (Modal) -----
    var productModal = new bootstrap.Modal(document.getElementById('productModal'));
    var modalTitle = document.getElementById('modalTitle');
    var modalImg = document.getElementById('modalImg');
    var modalPrice = document.getElementById('modalPrice');
    var modalBadge = document.getElementById('modalBadge');
    var modalCategory = document.getElementById('modalCategory');
    var modalDescription = document.getElementById('modalDescription');
    var modalAddToCart = document.getElementById('modalAddToCart');
    var currentModalProduct = null;

    productGrid.addEventListener('click', function (e) {
        var btn = e.target.closest('.add-to-cart');
        var card = e.target.closest('.product-card');

        if (btn) {
            var id = parseInt(btn.dataset.id);
            var product = products.find(function (p) { return p.id === id; });
            if (!product) return;

            cartCount++;
            cartItems.push({ id: product.id, name: product.name, price: product.price });
            cartCountEl.classList.remove('d-none');
            cartCountEl.textContent = cartCount;

            btn.classList.add('added');
            btn.innerHTML = '<i class="bi bi-check-lg me-1"></i> Added!';
            setTimeout(function () {
                btn.classList.remove('added');
                btn.innerHTML = '<i class="bi bi-cart-plus me-1"></i> Add to Cart';
            }, 1500);

            toastMessage.textContent = product.name + ' added to cart!';
            toastBootstrap.show();
            return;
        }

        if (card) {
            var cardId = parseInt(card.dataset.id);
            var prod = products.find(function (p) { return p.id === cardId; });
            if (!prod) return;

            currentModalProduct = prod;
            modalTitle.textContent = prod.name;
            modalImg.src = prod.img;
            modalImg.alt = prod.name;
            modalPrice.textContent = '₹' + prod.price.toFixed(2);
            modalBadge.style.display = prod.badge ? 'inline' : 'none';
            if (prod.badge) {
                modalBadge.innerHTML = '<span class="badge bg-danger">' + prod.badge + '</span>';
            } else {
                modalBadge.innerHTML = '';
            }
            modalCategory.textContent = prod.category;
            modalDescription.textContent = prod.description;

            productModal.show();
        }
    });

    // Modal Add to Cart button
    modalAddToCart.addEventListener('click', function () {
        if (!currentModalProduct) return;

        cartCount++;
        cartItems.push({ id: currentModalProduct.id, name: currentModalProduct.name, price: currentModalProduct.price });
        cartCountEl.classList.remove('d-none');
        cartCountEl.textContent = cartCount;

        toastMessage.textContent = currentModalProduct.name + ' added to cart!';
        toastBootstrap.show();
        productModal.hide();
    });

    // ----- Checkout (Cart Button) -----
    var checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    var checkoutItems = document.getElementById('checkoutItems');
    var checkoutTotal = document.getElementById('checkoutTotal');
    var checkoutForm = document.getElementById('checkoutForm');
    var orderToast = document.getElementById('orderToast');
    var orderToastMessage = document.getElementById('orderToastMessage');
    var orderToastBootstrap = bootstrap.Toast.getOrCreateInstance(orderToast);

    document.getElementById('cartBtn').addEventListener('click', function () {
        // Close mobile navbar if open
        var navCollapse = document.getElementById('navMenu');
        if (navCollapse.classList.contains('show')) {
            var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
            if (bsCollapse) bsCollapse.hide();
        }

        if (cartCount === 0) {
            toastMessage.textContent = 'Your cart is empty! Add some products first.';
            toastBootstrap.show();
            return;
        }

        // Build order summary
        var itemsHtml = cartItems.map(function (item, i) {
            return '<div class="d-flex justify-content-between align-items-center mb-2">' +
                '<span>' + (i + 1) + '. ' + item.name + '</span>' +
                '<span class="fw-semibold">₹' + item.price.toFixed(2) + '</span>' +
            '</div>';
        }).join('');

        var total = cartItems.reduce(function (sum, item) { return sum + item.price; }, 0);

        checkoutItems.innerHTML = itemsHtml;
        checkoutTotal.textContent = '₹' + total.toFixed(2);

        checkoutForm.reset();
        checkoutForm.querySelectorAll('.is-valid, .is-invalid').forEach(function (el) {
            el.classList.remove('is-valid', 'is-invalid');
        });

        checkoutModal.show();
    });

    // ----- Order Form Validation & Submit -----
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = document.getElementById('ordName');
        var email = document.getElementById('ordEmail');
        var phone = document.getElementById('ordPhone');
        var address = document.getElementById('ordAddress');
        var payment = document.getElementById('ordPayment');

        [name, email, phone, address, payment].forEach(function (field) {
            field.classList.remove('is-invalid', 'is-valid');
        });

        var isValid = true;

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

        if (!phone.value.trim()) {
            phone.classList.add('is-invalid');
            isValid = false;
        } else if (!/^[+]?[\d\s-]{7,15}$/.test(phone.value.trim())) {
            phone.classList.add('is-invalid');
            isValid = false;
        } else {
            phone.classList.add('is-valid');
        }

        if (!address.value.trim()) {
            address.classList.add('is-invalid');
            isValid = false;
        } else {
            address.classList.add('is-valid');
        }

        if (!payment.value) {
            payment.classList.add('is-invalid');
            isValid = false;
        } else {
            payment.classList.add('is-valid');
        }

        if (!isValid) return;

        // Success — show order toast
        var total = cartItems.reduce(function (sum, item) { return sum + item.price; }, 0);
        var paymentLabel = payment.options[payment.selectedIndex].text;
        orderToastMessage.innerHTML =
            '<i class="bi bi-check-circle-fill me-2"></i> Order placed successfully!<br>' +
            '<small class="opacity-75">' + name.value.trim() + ' — ₹' + total.toFixed(2) + ' via ' + paymentLabel + '</small>';

        orderToastBootstrap.show();

        // Reset cart
        cartCount = 0;
        cartItems = [];
        cartCountEl.classList.add('d-none');
        cartCountEl.textContent = '0';

        checkoutModal.hide();
        checkoutForm.reset();
        [name, email, phone, address, payment].forEach(function (field) {
            field.classList.remove('is-valid');
        });
    });

    // Live validation on input
    document.querySelectorAll('#checkoutForm .form-control, #checkoutForm .form-select').forEach(function (input) {
        input.addEventListener('input', function () {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
            }
        });
    });

    // ----- Theme Toggle (Dark Mode) -----
    var themeToggle = document.getElementById('themeToggle');
    var themeIcon = document.getElementById('themeIcon');

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark');
        if (document.body.classList.contains('dark')) {
            themeIcon.className = 'bi bi-sun-fill';
        } else {
            themeIcon.className = 'bi bi-moon-fill';
        }
    });

    // ----- Newsletter Form Validation -----
    var newsletterForm = document.getElementById('newsletterForm');
    var newsletterEmail = document.getElementById('newsletterEmail');
    var newsletterFeedback = document.getElementById('newsletterFeedback');

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var email = newsletterEmail.value.trim();
        newsletterFeedback.className = 'text-center small';

        if (!email) {
            newsletterFeedback.className = 'text-center small text-danger';
            newsletterFeedback.textContent = 'Please enter your email address.';
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newsletterFeedback.className = 'text-center small text-danger';
            newsletterFeedback.textContent = 'Please enter a valid email address.';
            return;
        }

        newsletterFeedback.className = 'text-center small text-success';
        newsletterFeedback.textContent = 'Thanks for subscribing! Check your inbox for deals.';
        newsletterForm.reset();
    });

});
