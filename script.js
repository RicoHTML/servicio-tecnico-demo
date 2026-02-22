// SLIDER
const slides = document.querySelectorAll(".slide");
const videos = document.querySelectorAll("video");
let current = 0;

function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  videos.forEach(v => { v.pause(); v.currentTime = 0; });

  slides[index].classList.add("active");
  videos[index].play();
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

showSlide(current);
setInterval(nextSlide, 5000);

// HAMBURGER MENU
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i = 0; i < 70; i++){
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    ctx.fillStyle = "#00bfff";
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if(p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if(p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", function(e) {
    const circle = document.createElement("span");
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - this.offsetTop - radius}px`;

    const ripple = this.getElementsByTagName("span")[0];

    if (ripple) ripple.remove();

    this.appendChild(circle);
  });
});