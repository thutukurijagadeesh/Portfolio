tailwind.config={
darkMode: 'class',
theme:{
extend:{
colors:{
primary:'#3b82f6',
secondary:'#64748b'
},
borderRadius:{
'none':'0px',
'sm':'4px',
DEFAULT:'8px',
'md':'12px',
'lg':'16px',
'xl':'20px',
'2xl':'24px',
'3xl':'32px',
'full':'9999px',
'button':'8px'
}
}
}
}
function initTheme() {
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
// Check for saved theme preference, otherwise use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// Set initial theme
if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
html.classList.add('dark');
}
// Toggle theme function
function toggleTheme() {
const isDark = html.classList.toggle('dark');
localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
// Add click event listener
if (themeToggle) {
themeToggle.addEventListener('click', toggleTheme);
}
// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
if (!localStorage.getItem('theme')) {
if (e.matches) {
html.classList.add('dark');
} else {
html.classList.remove('dark');
}
}
});
}
function checkScroll() {
const elements = document.querySelectorAll('.fade-up, .fade-in, .slide-in-left, .slide-in-right, .scale-up');
elements.forEach(element => {
const elementTop = element.getBoundingClientRect().top;
const elementBottom = element.getBoundingClientRect().bottom;
const windowHeight = window.innerHeight;
if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
element.classList.add('visible');
}
});
}
document.addEventListener('DOMContentLoaded', function() {
// Initialize theme functionality
initTheme();
// Initial check and add scroll listener
checkScroll();
window.addEventListener('scroll', checkScroll);
// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
mobileMenuToggle.addEventListener('change', function() {
if (this.checked) {
mobileMenu.style.opacity = '1';
mobileMenu.style.transform = 'translateY(0)';
mobileMenu.style.pointerEvents = 'auto';
} else {
mobileMenu.style.opacity = '0';
mobileMenu.style.transform = 'translateY(-2px)';
mobileMenu.style.pointerEvents = 'none';
}
});
// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
link.addEventListener('click', function() {
mobileMenuToggle.checked = false;
mobileMenu.style.opacity = '0';
mobileMenu.style.transform = 'translateY(-2px)';
mobileMenu.style.pointerEvents = 'none';
});
});
// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
// Smooth scroll for nav links
navLinks.forEach(link => {
link.addEventListener('click', function(e) {
e.preventDefault();
const targetId = this.getAttribute('href');
const targetSection = document.querySelector(targetId);
if (targetSection) {
targetSection.scrollIntoView({ behavior: 'smooth' });
}
});
});
// Update active nav link on scroll
window.addEventListener('scroll', function() {
let current = '';
sections.forEach(section => {
const sectionTop = section.offsetTop;
const sectionHeight = section.clientHeight;
if (window.pageYOffset >= sectionTop - 200) {
current = section.getAttribute('id');
}
});
navLinks.forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href').substring(1) === current) {
link.classList.add('active');
}
});
});
// Project filter functionality
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(button => {
button.addEventListener('click', function() {
// Remove active class from all buttons
filterButtons.forEach(btn => btn.classList.remove('active'));
// Add active class to clicked button
this.classList.add('active');
});
});
// Form submission handling
const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', function(e) {
e.preventDefault();
const formData = new FormData(this);
// Validate form
let isValid = true;
formData.forEach((value, key) => {
if (!value) isValid = false;
});
if (!isValid) {
const notification = document.createElement('div');
notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-lg';
notification.textContent = 'Please fill in all fields';
document.body.appendChild(notification);
setTimeout(() => notification.remove(), 3000);
return;
}
// Show success message
const successNotification = document.createElement('div');
successNotification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg';
successNotification.textContent = 'Message sent successfully!';
document.body.appendChild(successNotification);
setTimeout(() => successNotification.remove(), 3000);
// Reset form
this.reset();
});
});
/* function downloadPDF() {
      const link = document.createElement('a');
      link.href = 'path/to/your-certificate.pdf';  // Replace with actual path
      link.download = 'certificate.pdf';           // Downloaded file name
      link.click();
    }
*/

function openTab(evt, tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
  }

  function animateProgressBar(bar, target) {
    let width = 0;
    const interval = setInterval(() => {
      if (width >= target) {
        clearInterval(interval);
      } else {
        width++;
        bar.style.width = width + "%";
        bar.textContent = width + "%";
      }
    }, 10);
  }

  const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        const fill = entry.target.querySelector(".skill-fill");
        const percent = parseInt(entry.target.getAttribute("data-percent"));
        animateProgressBar(fill, percent);
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".scroll-animate").forEach(el => {
    scrollObserver.observe(el);
  });