// Modal functionality for image zoom
let isZoomed = false;
let currentScale = 1;

function openModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    modalCaption.textContent = img.alt;
    
    // Reset zoom state
    isZoomed = false;
    currentScale = 1;
    modalImg.style.transform = 'scale(1)';
    modalImg.style.cursor = 'zoom-in';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Add click on modal background to close
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
    
    // Add click on image to zoom
    modalImg.onclick = function(event) {
        event.stopPropagation(); // Prevent modal close
        toggleZoom();
    }
    
    // Add double-click for extra zoom
    modalImg.ondblclick = function(event) {
        event.stopPropagation();
        if (currentScale < 2) {
            currentScale = 2.5;
            modalImg.style.transform = `scale(${currentScale})`;
            modalImg.style.cursor = 'zoom-out';
            isZoomed = true;
        }
    }
}


function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Contact owner functionality
function contactOwner(serviceName) {
    // You can customize this function based on your needs
    // Options: WhatsApp, Email, Phone, etc.
    
    // Example with WhatsApp (replace with your WhatsApp number)
    const phoneNumber = '6289504466438'; // Replace with actual number
    const message = `Halo, saya mau order ${serviceName}. Bisa dijelaskan lebih detail?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Alternative: Show contact options modal
    // showContactModal(serviceName);
}


function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Close modal with Escape key
    if (event.key === 'Escape') {
        closeModal();
        closeContactModal();
    }
});

// Smooth scroll behavior for page navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth entrance animation to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });
    
    menuItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add hover sound effect (optional)
    const buttons = document.querySelectorAll('.contact-btn, .back-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // You can add a subtle sound effect here if needed
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Lazy loading for images (performance optimization)
    const images = document.querySelectorAll('.poster');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove loading overlay if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
});

// Performance: Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Handle responsive adjustments if needed
        const modal = document.getElementById('imageModal');
        if (modal && modal.style.display === 'block') {
            // Adjust modal size on resize
            const modalImg = document.getElementById('modalImage');
            modalImg.style.maxHeight = '80vh';
        }
    }, 250);
});