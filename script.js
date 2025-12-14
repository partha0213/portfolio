// Initialize Particles.js Background
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ['#667eea', '#764ba2', '#f093fb', '#00f2fe']
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#667eea',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

// Typing Animation for Hero Section
const typedText = document.getElementById('typed-text');
const words = ["AI/ML Developer", "Backend Developer", "Agentic AI Specialist"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 120;
let erasingDelay = 60;
let newWordDelay = 1500;

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

  // Use the middle of the viewport to determine active section
  const viewportMiddle = window.scrollY + (window.innerHeight / 2);

  // Find which section the viewport middle is currently in
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
      current = section.getAttribute('id');
    }
  });

  // Fallback: if nothing matched and we're at top, use first section
  if (!current && window.scrollY < 50) {
    current = sections[0]?.getAttribute('id');
  }

  // Update active class on nav links
  navLinksHeader.forEach(link => {
    link.classList.remove('active');
    if (current && link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navlist = document.querySelector('.navlist');
const navLinksToggle = document.querySelectorAll('.navlist a');

menuIcon.onclick = () => {
  navlist.classList.toggle('open');
};

navLinksToggle.forEach(link => {
  link.onclick = () => {
    navlist.classList.remove('open');
  };
});

// Close nav on scroll (mobile)
window.addEventListener('scroll', () => {
  navlist.classList.remove('open');
});

// Smooth Scroll for Anchor Links
const allLinks = document.querySelectorAll('a[href^="#"]');
allLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillSection = document.querySelector('.services');

let skillsAnimated = false;

const animateSkills = () => {
  if (skillsAnimated) return;

  const sectionTop = skillSection.offsetTop;
  const sectionHeight = skillSection.offsetHeight;
  const scrollPosition = window.pageYOffset + window.innerHeight;

  if (scrollPosition > sectionTop + sectionHeight / 2) {
    skillBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      setTimeout(() => {
        bar.style.width = progress + '%';
      }, 300);
    });
    skillsAnimated = true;
  }
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Header Shadow on Scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    header.style.background = 'rgba(15, 15, 35, 0.95)';
  } else {
    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    header.style.background = 'rgba(15, 15, 35, 0.9)';
  }
});

// AJAX Formspree submission for contact form
const contactForm = document.querySelector('section.contact form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(contactForm);

    // Disable submit button
    const submitBtn = contactForm.querySelector('input[type="submit"]');
    const originalText = submitBtn.value;
    submitBtn.value = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formSuccess.style.display = 'block';
        formSuccess.style.color = '#667eea';
        formSuccess.textContent = '✓ Thank you! Your message has been sent successfully.';
        contactForm.reset();

        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      } else {
        formSuccess.style.display = 'block';
        formSuccess.style.color = '#f5576c';
        formSuccess.textContent = '✗ Sorry, there was an error sending your message. Please try again.';
      }
    } catch (error) {
      formSuccess.style.display = 'block';
      formSuccess.style.color = '#f5576c';
      formSuccess.textContent = '✗ Sorry, there was an error sending your message. Please try again.';
    } finally {
      submitBtn.value = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Parallax Effect for Home Image
window.addEventListener('scroll', () => {
  const homeImg = document.querySelector('.home-img img');
  if (homeImg) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    homeImg.style.transform = `translateY(${rate}px)`;
  }
});

// Counter Animation for Stats (if needed in future)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Cursor Trail Effect (Optional Enhancement)
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

if (circles.length > 0) {
  circles.forEach(function (circle) {
    circle.x = 0;
    circle.y = 0;
  });

  window.addEventListener('mousemove', function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
      circle.style.left = x - 12 + 'px';
      circle.style.top = y - 12 + 'px';
      circle.style.scale = (circles.length - index) / circles.length;

      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();
}

// Certificate Hover Preview
const certItems = document.querySelectorAll('.cert-item');
const previewImage = document.querySelector('.preview-image');
const previewPlaceholder = document.querySelector('.preview-placeholder');

// Certificate image mapping from Netlify site
const certificateImages = {
  'azure': 'https://parthasarathyg693.netlify.app/certs/Microsoft Azure Fundamentals (AZ-900).png',
  'oracle': 'https://parthasarathyg693.netlify.app/certs/Oracle Cloud Infrastructure.jpeg',
  'cybersecurity': 'https://parthasarathyg693.netlify.app/certs/Foundations of Cybersecurity.jpeg',
  'ml-python': 'https://parthasarathyg693.netlify.app/certs/ML with pyhton.jpeg',
  'ai-policy': 'https://parthasarathyg693.netlify.app/certs/Artificial Intelligence for economic.jpeg',
  'intro-ai': 'https://parthasarathyg693.netlify.app/certs/Introduction to Artificial Intelligence.jpeg',
  'industry40': 'https://parthasarathyg693.netlify.app/certs/Introduction to Industry 4.0.jpeg',
  'sql': 'https://parthasarathyg693.netlify.app/certs/sql(basic).png',
  'python-basic': 'https://parthasarathyg693.netlify.app/certs/python(basic).png',
  'joy-python': 'https://parthasarathyg693.netlify.app/certs/The joy of computing using python.jpeg',
  'data-analytics': 'https://parthasarathyg693.netlify.app/certs/Data Analytics Essentials.png'
};

certItems.forEach(item => {
  item.addEventListener('mouseenter', function () {
    // Remove active class from all items
    certItems.forEach(cert => cert.classList.remove('active'));

    // Add active class to current item
    this.classList.add('active');

    // Get certificate ID
    const certId = this.getAttribute('data-cert');
    const certImage = certificateImages[certId];

    // Calculate position for preview panel
    const container = document.querySelector('.certificates-container');
    const itemRect = this.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate relative position within container
    const relativeTop = itemRect.top - containerRect.top + container.scrollTop;

    // Adjust preview panel position to align with hovered item
    const previewPanel = document.querySelector('.certificate-preview');
    const previewHeight = previewPanel.offsetHeight;
    const itemHeight = itemRect.height;

    // Calculate centered position
    let newTop = relativeTop - (previewHeight / 2) + (itemHeight / 2);

    // Prevent preview from going outside container bounds
    const maxTop = container.offsetHeight - previewHeight;
    newTop = Math.max(0, Math.min(newTop, maxTop));

    previewPanel.style.top = `${newTop}px`;

    if (certImage) {
      // Load image
      previewImage.src = certImage;
      previewImage.style.display = 'block';
      previewPlaceholder.style.display = 'none';

      // Add active animation class
      previewImage.classList.add('active');

      // Handle image load error
      previewImage.onerror = function () {
        this.style.display = 'none';
        previewPlaceholder.style.display = 'block';
        previewPlaceholder.querySelector('p').textContent = 'Certificate image not found';
      };

      // Remove animation class after animation completes
      setTimeout(() => {
        previewImage.classList.remove('active');
      }, 500);
    } else {
      // If no image path, show placeholder
      previewImage.style.display = 'none';
      previewPlaceholder.style.display = 'block';
      previewPlaceholder.querySelector('p').textContent = 'Hover over a certificate to view';
    }
  });
});

// Optional: Reset preview when mouse leaves the certificates section
const certificatesContainer = document.querySelector('.certificates-container');
if (certificatesContainer) {
  certificatesContainer.addEventListener('mouseleave', function () {
    certItems.forEach(cert => cert.classList.remove('active'));
    previewImage.style.display = 'none';
    previewPlaceholder.style.display = 'block';
    previewPlaceholder.querySelector('p').textContent = 'Hover over a certificate to view';
  });
}

// Log console message
console.log('%c✨ Portfolio by Parthasarathy G ✨', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with passion and modern web technologies 🚀', 'color: #f093fb; font-size: 12px;');
