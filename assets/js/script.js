/* ─────────────────────────────────────────
   ArabicBusiness – script.js
───────────────────────────────────────── */

/* 1. Scroll-reveal */
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.1 }
);
revealElements.forEach((el) => observer.observe(el));

/* 2. Nav toggle */
const navToggle = document.querySelector(".nav-toggle");
const siteHeader = document.querySelector(".site-header");
if (navToggle && siteHeader) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

/* 3. Animated particles canvas */
(function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H, particles;

  const PARTICLE_COUNT = window.innerWidth < 680 ? 28 : 55;
  const COLORS = ["#6d8dff", "#53e0c2", "#ff7edb", "#4fcbf4"];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.55 + 0.2,
    };
  }

  function initParticleList() {
    particles = Array.from({ length: PARTICLE_COUNT }, randomParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  initParticleList();
  draw();
  window.addEventListener("resize", () => { resize(); initParticleList(); });
})();

/* 4. Count-up numbers */
(function initCountUp() {
  const els = document.querySelectorAll(".count-up");
  if (!els.length) return;

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1400;
        const step = 16;
        const increment = target / (duration / step);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          el.textContent = Math.round(current);
          if (current >= target) clearInterval(timer);
        }, step);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  els.forEach((el) => countObserver.observe(el));
})();

/* 5. Quote slider auto-rotate */
(function initQuoteSlider() {
  const slides = document.querySelectorAll(".quote-slide");
  const dots = document.querySelectorAll(".qdot");
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function start() {
    timer = setInterval(() => goTo(current + 1), 4500);
  }

  function reset() {
    clearInterval(timer);
    start();
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(parseInt(dot.dataset.idx, 10));
      reset();
    });
  });

  start();
})();

/* 6. Subtle cursor glow (desktop only) */
(function initCursorGlow() {
  if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch

  const glow = document.createElement("div");
  glow.style.cssText = `
    position: fixed;
    width: 340px;
    height: 340px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(circle, rgba(109,141,255,0.09) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
})();

/* 7. Contact Form Handling */
(function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // سحب البيانات من الحقول
        const name = document.getElementById('sender_name').value;
        const email = document.getElementById('sender_email').value;
        const type = document.getElementById('request_type').value;
        const company = document.getElementById('company').value;
        const subjectLine = document.getElementById('subject').value;
        const msg = document.getElementById('message').value;

        // تنسيق محتوى الإيميل
        const mailtoSubject = encodeURIComponent(`ArabicBusiness: ${subjectLine}`);
        const mailtoBody = encodeURIComponent(
            `رسالة جديدة من الموقع:\n\n` +
            `الاسم: ${name}\n` +
            `البريد الإلكتروني: ${email}\n` +
            `نوع الطلب: ${type}\n` +
            `المشروع/الشركة: ${company}\n\n` +
            `نص الرسالة:\n${msg}`
        );

        // فتح تطبيق البريد الإلكتروني
        window.location.href = `mailto:steps.studio.info@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    });
})();

