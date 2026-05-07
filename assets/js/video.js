/* ════════════════════════════════════════
   1. UI DECORATIONS (Particles)
   ════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let pts = [];
  
  function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 60; i++) {
    pts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - .5) * .3,
      dy: (Math.random() - .5) * .3,
      o: Math.random() * .45 + .1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(109,141,255,${p.o})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ════════════════════════════════════════
   2. DATA & GLOBAL STATE
   ════════════════════════════════════════ */
const VIDEOS = [
  { 
    id: 'v1', 
    driveId: '1hZWbke7BukA7UsWjIPXphdgtj47lNskv', 
    title: 'حيل نفسية في التسويق تجعل الزبون يشتري.. حتى لو لم يكن مهتم', 
    desc: 'في هذا الفيديو، نغوص في عالم "علم النفس التسويقي" لنكشف لك أقوى الحيل والتقنيات التي تستخدمها كبرى الشركات العالمية للتأثير على قرارات الشراء لدى المستهلكين.', 
    category: 'business', 
    catLabel: 'ريادة الأعمال', 
    instructor: 'نبيل يوسف', 
    initial: 'ن', 
    dur: '15:05 دقيقة', 
    badge: 'استراتيجيات التسويق', 
    tags: ['ريادة الأعمال', 'بناء المشاريع', 'التسويق'], 
    emoji: '🚀' 
  }
];

let currentId = VIDEOS[0].id;
let liked = new Set(JSON.parse(localStorage.getItem('vp_liked') || '[]'));
let saved = new Set(JSON.parse(localStorage.getItem('vp_saved') || '[]'));
let progTimer = null;

/* ════════════════════════════════════════
   3. DOM REFERENCES (Safety Cached)
   ════════════════════════════════════════ */
const ui = {
  iframe:    document.getElementById('mainVideoIframe'),
  overlay:   document.getElementById('loadingOverlay'),
  fill:      document.getElementById('progressFill'),
  thumb:     document.getElementById('progressThumb'),
  track:     document.getElementById('progressTrack'),
  title:     document.getElementById('videoTitle'),
  desc:      document.getElementById('videoDesc'),
  cat:       document.getElementById('videoCategory'),
  badge:     document.getElementById('videoBadge'),
  badgeTx:   document.getElementById('badgeText'),
  dur:       document.getElementById('videoDuration'),
  views:     document.getElementById('viewCount'),
  date:      document.getElementById('videoDate'),
  tags:      document.getElementById('tagsRow'),
  avatar:    document.getElementById('instructorAvatar'),
  inst:      document.getElementById('instructorName'),
  likeBtn:   document.getElementById('likeBtn'),
  saveBtn:   document.getElementById('saveBtn'),
  shareBtn:  document.getElementById('shareBtn'),
  descTgl:   document.getElementById('descToggle'),
  toast:     document.getElementById('toast'),
  navToggle: document.querySelector('.nav-toggle'),
  header:    document.querySelector('.site-header')
};

/* ════════════════════════════════════════
   4. FUNCTIONS
   ════════════════════════════════════════ */

function updateMeta(v) {
  if (!v) return;
  if (ui.title) ui.title.textContent = v.title;
  if (ui.desc)  ui.desc.textContent  = v.desc;
  if (ui.cat)   ui.cat.textContent   = v.catLabel;
  if (ui.dur)   ui.dur.textContent   = v.dur;
  if (ui.avatar) ui.avatar.textContent = v.initial;
  if (ui.inst)  ui.inst.textContent  = v.instructor;
  
  if (v.badge && ui.badge) {
    ui.badge.style.display = 'inline-flex';
    if (ui.badgeTx) ui.badgeTx.textContent = v.badge;
  }

  if (ui.tags) {
    ui.tags.innerHTML = '';
    v.tags.forEach(t => {
      const s = document.createElement('span');
      s.className = 'tag';
      s.textContent = t;
      ui.tags.appendChild(s);
    });
  }
}

function setProgress(p) {
  if (!ui.fill) return;
  ui.fill.style.width = p + '%';
  if (ui.thumb) ui.thumb.style.setProperty('--progress', p + '%');
}

function startLoadingAnim() {
  let val = 0;
  clearInterval(progTimer);
  progTimer = setInterval(() => {
    val = Math.min(90, val + (val < 50 ? 2 : 0.5));
    setProgress(val);
  }, 100);
}

function showToast(msg) {
  if (!ui.toast) return;
  ui.toast.textContent = msg;
  ui.toast.classList.add('show');
  setTimeout(() => ui.toast.classList.remove('show'), 3000);
}

function updateActionsUI() {
  if (ui.likeBtn) ui.likeBtn.classList.toggle('active', liked.has(currentId));
  if (ui.saveBtn) ui.saveBtn.classList.toggle('active', saved.has(currentId));
}

/* ════════════════════════════════════════
   5. EVENT BINDING
   ════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  updateMeta(VIDEOS[0]);
  updateActionsUI();
  startLoadingAnim();

  // Mobile Nav
  if (ui.navToggle && ui.header) {
    ui.navToggle.onclick = () => {
      const open = ui.header.classList.toggle('nav-open');
      ui.navToggle.textContent = open ? '✕' : '☰';
    };
  }

  // Iframe Loaded
  if (ui.iframe) {
    ui.iframe.onload = () => {
      if (ui.overlay) ui.overlay.classList.add('hidden');
      clearInterval(progTimer);
      setProgress(100);
      setTimeout(() => setProgress(0), 600);
    };
  }

  // Like
  if (ui.likeBtn) {
    ui.likeBtn.onclick = () => {
      liked.has(currentId) ? liked.delete(currentId) : liked.add(currentId);
      localStorage.setItem('vp_liked', JSON.stringify([...liked]));
      updateActionsUI();
      showToast(liked.has(currentId) ? '✨ تمت الإضافة للإعجابات' : 'تمت الإزالة');
    };
  }

  // Save
  if (ui.saveBtn) {
    ui.saveBtn.onclick = () => {
      saved.has(currentId) ? saved.delete(currentId) : saved.add(currentId);
      localStorage.setItem('vp_saved', JSON.stringify([...saved]));
      updateActionsUI();
      showToast(saved.has(currentId) ? '📌 تم الحفظ في المكتبة' : 'تمت الإزالة');
    };
  }

  // WhatsApp Share
  if (ui.shareBtn) {
    ui.shareBtn.onclick = () => {
      const v = VIDEOS.find(x => x.id === currentId);
      const title = v ? v.title : "فيديو من AraBusiness Tub";
      const url = window.location.href;
      const msg = `شاهد هذا الفيديو على AraBusiness Tub:\n\n*${title}*\n\nالرابط:\n${url}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
      showToast('🚀 جاري الانتقال لواتساب...');
    };
  }

  // Desc Toggle
  if (ui.descTgl && ui.desc) {
    ui.descTgl.onclick = () => {
      const exp = ui.desc.classList.toggle('expanded');
      ui.descTgl.textContent = exp ? 'إخفاء ↑' : 'عرض المزيد ↓';
    };
  }

  // Intersection Observer for Reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});