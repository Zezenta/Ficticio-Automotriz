// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Product Filtering
    const filterButtons = document.querySelectorAll('.products__filter-btn');
    const productItems = document.querySelectorAll('.products__item');
    
    if (filterButtons.length && productItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('products__filter-btn--active'));
                
                // Add active class to clicked button
                this.classList.add('products__filter-btn--active');
                
                const filterValue = this.getAttribute('data-filter');
                
                productItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Testimonials Slider
    const testimonialSlides = document.querySelectorAll('.testimonials__slide');
    const prevButton = document.querySelector('.testimonials__prev');
    const nextButton = document.querySelector('.testimonials__next');
    
    if (testimonialSlides.length && prevButton && nextButton) {
        let currentSlide = 0;
        
        // Hide all slides except the first one
        testimonialSlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Show the specified slide
        function showSlide(index) {
            testimonialSlides.forEach(slide => {
                slide.style.display = 'none';
            });
            testimonialSlides[index].style.display = 'block';
        }
        
        // Next slide
        nextButton.addEventListener('click', function() {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
        
        // Previous slide
        prevButton.addEventListener('click', function() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = testimonialSlides.length - 1;
            }
            showSlide(currentSlide);
        });
        
        // Auto slide every 5 seconds
        setInterval(function() {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.products__quick-view');
    const modal = document.getElementById('quickViewModal');
    const modalClose = document.querySelector('.modal__close');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductImage = document.getElementById('modalProductImage');
    
    if (quickViewButtons.length && modal && modalClose) {
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product info from parent elements
                const productItem = this.closest('.products__item');
                const productTitle = productItem.querySelector('.products__title').textContent;
                const productPrice = productItem.querySelector('.products__price').textContent;
                const productImage = productItem.querySelector('.products__image img').src;
                
                // Set modal content
                if (modalProductTitle) modalProductTitle.textContent = productTitle;
                if (modalProductPrice) modalProductPrice.textContent = productPrice;
                if (modalProductImage) modalProductImage.src = productImage;
                
                // Show modal
                modal.classList.add('active');
            });
        });
        
        // Close modal
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Quantity controls
        const quantityDecrease = document.querySelector('.modal__quantity-decrease');
        const quantityIncrease = document.querySelector('.modal__quantity-increase');
        const quantityInput = document.querySelector('.modal__quantity-input');
        
        if (quantityDecrease && quantityIncrease && quantityInput) {
            quantityDecrease.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                if (value > 1) {
                    value--;
                    quantityInput.value = value;
                }
            });
            
            quantityIncrease.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                value++;
                quantityInput.value = value;
            });
        }
    }
    
    // Form Submissions
    const newsletterForm = document.querySelector('.newsletter__form');
    const contactForm = document.querySelector('.contact__form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por suscribirte a nuestro boletín!');
            this.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Te responderemos a la brevedad.');
            this.reset();
        });
    }
});

// Quick View Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('quickViewModal');
    const modalClose = document.querySelector('.modal__close');
    const productImages = document.querySelectorAll('.products__image');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductPrice = document.getElementById('modalProductPrice');

    function openModal(productElement) {
        const productInfo = productElement.closest('.products__item');
        const productImage = productInfo.querySelector('.products__image img').src;
        const productTitle = productInfo.querySelector('.products__title').textContent;
        const productPrice = productInfo.querySelector('.products__price').textContent;

        modalProductImage.src = productImage;
        modalProductTitle.textContent = productTitle;
        modalProductPrice.textContent = productPrice;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listener for quick view buttons
    document.querySelectorAll('.products__quick-view').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(this);
        });
    });

    // Event listener for mobile image clicks
    if (window.innerWidth <= 991) {
        productImages.forEach(image => {
            image.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(this);
            });
        });
    }

    // Close modal when clicking the close button
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});