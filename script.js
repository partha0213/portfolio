// Typing Animation for Hero Section
const typedText = document.getElementById('typed-text');
const words = ["AI/ML Developer", "Frontend Developer", "Creative Technologist"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 120;
let erasingDelay = 60;
let newWordDelay = 1200;

function type() {
  if (charIndex < words[wordIndex].length && !isDeleting) {
    typedText.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else if (charIndex === words[wordIndex].length && !isDeleting) {
    isDeleting = true;
    setTimeout(type, newWordDelay);
  } else if (isDeleting && charIndex > 0) {
    typedText.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(type, erasingDelay);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, typingDelay);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (words.length) setTimeout(type, 500);
});

// Navbar Active State on Scroll
const sections = document.querySelectorAll('section');
const navLinksHeader = document.querySelectorAll('header nav .navlist a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navLinksHeader.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

const menuIcon = document.getElementById('menu-icon');
const navlist = document.querySelector('.navlist');
const navLinksToggle = document.querySelectorAll('.navlist a');

menuIcon.onclick = () => {
  console.log('Menu icon clicked');
  navlist.classList.toggle('open');
};

navLinksToggle.forEach(link => {
  link.onclick = () => {
    navlist.classList.remove('open');
  };
});

// Smooth Scroll for Anchor Links
const allLinks = document.querySelectorAll('a[href^="#"]');
allLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll Reveal Animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, section, .service-box, .portfolio-box');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Close nav on scroll (mobile)
window.addEventListener('scroll', () => {
  navlist.classList.remove('open');
});

// AJAX Formspree submission for contact form
const contactForm = document.querySelector('section.contact form');
const formSuccess = document.getElementById('form-success');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        setTimeout(() => {
          formSuccess.style.display = 'none';
          contactForm.style.display = 'block';
          formSuccess.style.color = ''; // reset color
          formSuccess.textContent = ''; // reset text
        }, 3000);
      } else {
        formSuccess.style.display = 'block';
        formSuccess.style.color = 'red';
        formSuccess.textContent = 'Sorry, there was an error sending your message.';
      }
    } catch (error) {
      formSuccess.style.display = 'block';
      formSuccess.style.color = 'red';
      formSuccess.textContent = 'Sorry, there was an error sending your message.';
    }
  });
}
