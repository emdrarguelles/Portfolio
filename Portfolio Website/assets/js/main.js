const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('click', () => {
        box.classList.toggle('flipped');
    });
});

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

emailjs.init('VjHxZFeWDkY1EW6Cg');

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const status = document.getElementById('form-status');
    const btn = document.querySelector('.submit-btn');
    
    btn.textContent = 'Sending...';
    btn.disabled = true;

    emailjs.sendForm('service_dog2tec', 'template_2qn9lin', this)
    .then(() => {
        status.textContent = 'Message sent successfully!';
        status.className = 'form-status success';
        btn.textContent = 'Send Message';
        btn.disabled = false;
        this.reset();
    })
    .catch(() => {  // ✅ FIXED
        status.textContent = 'Something went wrong. Please try again.';
        status.className = 'form-status error';
        btn.textContent = 'Send Message';
        btn.disabled = false;
    });
});