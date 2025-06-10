// Background floating elements
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'floating-dot';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.animationDelay = Math.random() * 6 + 's';
        dot.style.animationDuration = (3 + Math.random() * 6) + 's';
        container.appendChild(dot);
    }
}

// Add interactive mouse effects
document.addEventListener('mousemove', (e) => {
    const dots = document.querySelectorAll('.floating-dot');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    dots.forEach((dot, index) => {
        const speed = (index + 1) * 0.5;
        dot.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    
    // Initialize typing effect
    const typing = new Typed(".typing", {
        strings: ["Jasa joki", "Joki gendong", "Mabar Vip", "Room wangi"],  
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true       
    });
});

// Add button click effects
document.querySelectorAll('.button button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});