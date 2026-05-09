/* ── Particles ── */
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let pts = [];
  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 60; i++) pts.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.4 + 0.3, dx: (Math.random() - .5) * .3, dy: (Math.random() - .5) * .3, o: Math.random() * .45 + .1 });
  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(109,141,255,${p.o})`; ctx.fill(); p.x += p.dx; p.y += p.dy; if (p.x < 0 || p.x > canvas.width) p.dx *= -1; if (p.y < 0 || p.y > canvas.height) p.dy *= -1; });
    requestAnimationFrame(draw);
  })();
})();

/* ── Mobile nav ── */
(function () {
  const btn = document.querySelector('.nav-toggle');
  const hdr = document.querySelector('.site-header');
  if (!btn) return;
  btn.addEventListener('click', () => { const o = hdr.classList.toggle('nav-open'); btn.setAttribute('aria-expanded', o); btn.textContent = o ? '✕' : '☰'; });
})();

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const VIDEOS = [
  { id:'v1', 
    driveId:'1hZWbke7BukA7UsWjIPXphdgtj47lNskv', 
    title:'كيف تجعل الزبون يشتري وهو غير مهتم ', 
    desc:'هل تساءلت يوماً لماذا تشتري أشياء لم تكن تخطط لشرائها؟ أو لماذا تشعر برغبة ملحة في اقتناء منتج معين بمجرد رؤية إعلان له؟ في هذا الفيديو، نغوص في عالم "علم النفس التسويقي" لنكشف لك أقوى الحيل والتقنيات التي تستخدمها كبرى الشركات العالمية للتأثير على قرارات الشراء لدى المستهلكين. سنشرح لك كيف يمكنك كصاحب مشروع أو مسوق استخدام هذه الاستراتيجيات الأخلاقية لزيادة مبيعاتك وإقناع العميل بجدوى منتجك حتى لو كان متردداً.', 
    category:'business', 
    catLabel:'التسويق الرقمي', 
    instructor:'الأستاذ نبيل يوسف', 
    initial:'NY', 
    dur:'15:05 دقيقة', 
    views:'345', 
    date:'BusinessTube', 
    badge:'جديد', 
    tags:['ريادة الأعمال','التسويق الرقمي','التخطيط الاستراتيجي'], 
    emoji:'', 
    grad:'linear-gradient(135deg,#1a2a4a,#0d1a30)' 
  },

    { id:'v2', 
    driveId:'1hZWbke7BukA7UsWjIPXphdgtj47lNskv', 
    title:'حيل نفسية في التسويق تجعل الزبون يشتري.. حتى لو لم يكن مهتم ', 
    desc:'هل تساءلت يوماً لماذا تشتري أشياء لم تكن تخطط لشرائها؟ أو لماذا تشعر برغبة ملحة في اقتناء منتج معين بمجرد رؤية إعلان له؟ في هذا الفيديو، نغوص في عالم "علم النفس التسويقي" لنكشف لك أقوى الحيل والتقنيات التي تستخدمها كبرى الشركات العالمية للتأثير على قرارات الشراء لدى المستهلكين. سنشرح لك كيف يمكنك كصاحب مشروع أو مسوق استخدام هذه الاستراتيجيات الأخلاقية لزيادة مبيعاتك وإقناع العميل بجدوى منتجك حتى لو كان متردداً.', 
    category:'business', 
    catLabel:'ريادة الأعمال', 
    instructor:'نبيل يوسف', 
    initial:'ع', 
    dur:'15 دقيقة', 
    views:'١٢,٤٥٠', 
    date:'منذ ٣ أيام', 
    badge:'جديد', 
    tags:['ريادة الأعمال','بناء المشاريع','التخطيط الاستراتيجي'], 
    emoji:'🚀', 
    grad:'linear-gradient(135deg,#1a2a4a,#0d1a30)' 
  },

];

/* ════════════════════════════════════════
   STATE
════════════════════════════════════════ */
let currentId = VIDEOS[0].id;
let liked  = new Set(JSON.parse(localStorage.getItem('vp_liked') || '[]'));
let saved  = new Set(JSON.parse(localStorage.getItem('vp_saved') || '[]'));
let progTimer = null, progVal = 0;

/* ════════════════════════════════════════
   DOM REFS
════════════════════════════════════════ */
const iframe    = document.getElementById('mainVideoIframe');
const overlay   = document.getElementById('loadingOverlay');
const fill      = document.getElementById('progressFill');
const thumb     = document.getElementById('progressThumb');
const track     = document.getElementById('progressTrack');
const recList   = document.getElementById('recommendedList');
const pills     = document.getElementById('filterPills');
const elTitle   = document.getElementById('videoTitle');
const elDesc    = document.getElementById('videoDesc');
const elCat     = document.getElementById('videoCategory');
const elBadge   = document.getElementById('videoBadge');
const elBadgeTx = document.getElementById('badgeText');
const elDur     = document.getElementById('videoDuration');
const elViews   = document.getElementById('viewCount');
const elDate    = document.getElementById('videoDate');
const elTags    = document.getElementById('tagsRow');
const elBread   = document.getElementById('breadcrumb-title');
const elAvatar  = document.getElementById('instructorAvatar');
const elInst    = document.getElementById('instructorName');
const likeBtn   = document.getElementById('likeBtn');
const saveBtn   = document.getElementById('saveBtn');
const shareBtn  = document.getElementById('shareBtn');
const descTgl   = document.getElementById('descToggle');
const toast     = document.getElementById('toast');

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderRec('all');
  updateMeta(VIDEOS[0]);
  updateActions();
  startProgress();
  bindEvents();
  initReveal();
});

/* ════════════════════════════════════════
   RENDER REC CARDS
════════════════════════════════════════ */
function renderRec(filter) {
  const list = filter === 'all' ? VIDEOS : VIDEOS.filter(v => v.category === filter);
  recList.innerHTML = '';
  list.forEach((v, i) => {
    const el = document.createElement('div');
    el.className = 'vp-rec-card' + (v.id === currentId ? ' active' : '');
    el.dataset.id = v.id;
    el.style.animationDelay = (i * 55) + 'ms';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.innerHTML = `
      <div class="vp-rec-thumb">
        <div class="vp-thumb-placeholder" style="background:${v.grad}"><span style="font-size:1.9rem">${v.emoji}</span></div>
        <div class="vp-rec-thumb__overlay">
          <div class="vp-play-icon"><svg width="10" height="12" viewBox="0 0 10 12"><path d="M0 0l10 6-10 6z"/></svg></div>
        </div>
        <span class="vp-rec-duration">${v.dur}</span>
      </div>
      <div class="vp-rec-body">
        <div class="vp-rec-title">${v.title}</div>
        <div class="vp-rec-meta">
          <span class="vp-rec-instructor">${v.instructor}</span>
          <span class="vp-rec-views">👁 ${v.views} مشاهدة</span>
          <span class="vp-rec-category">${v.catLabel}</span>
        </div>
      </div>`;
    el.addEventListener('click', () => selectVideo(v.id));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') selectVideo(v.id); });
    recList.appendChild(el);
  });
}

/* ════════════════════════════════════════
   SELECT VIDEO
════════════════════════════════════════ */
function selectVideo(id) {
  if (id === currentId) return;
  const v = VIDEOS.find(x => x.id === id);
  if (!v) return;
  currentId = id;
  overlay.classList.remove('hidden');
  resetProg();
  iframe.src = `https://drive.google.com/file/d/${v.driveId}/preview`;
  document.querySelector('.vp-frame-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  updateMeta(v);
  updateActions();
  document.querySelectorAll('.vp-rec-card').forEach(c => c.classList.toggle('active', c.dataset.id === id));
  setTimeout(startProgress, 400);
}

/* ════════════════════════════════════════
   UPDATE META
════════════════════════════════════════ */
function updateMeta(v) {
  elTitle.textContent = v.title;
  elDesc.textContent  = v.desc;
  elCat.textContent   = v.catLabel;
  elDur.textContent   = v.dur;
  elViews.textContent = v.views;
  elDate.textContent  = v.date;
  elAvatar.textContent = v.initial;
  elInst.textContent  = v.instructor;
  elBread.textContent = v.title.substring(0, 42) + (v.title.length > 42 ? '…' : '');
  if (v.badge) { elBadge.style.display = 'inline-flex'; elBadgeTx.textContent = v.badge; }
  else          { elBadge.style.display = 'none'; }
  elTags.innerHTML = '';
  v.tags.forEach(t => { const s = document.createElement('span'); s.className = 'tag'; s.textContent = t; elTags.appendChild(s); });
  elDesc.classList.remove('expanded');
  descTgl.textContent = 'عرض المزيد ↓';
  elTitle.style.animation = 'none';
  elTitle.offsetHeight;
  elTitle.style.animation = 'fadeUp 0.4s ease';
}

/* ════════════════════════════════════════
   ACTIONS
════════════════════════════════════════ */
function updateActions() {
  likeBtn.classList.toggle('active', liked.has(currentId));
  saveBtn.classList.toggle('active', saved.has(currentId));
}

/* ════════════════════════════════════════
   PROGRESS BAR
════════════════════════════════════════ */
function setProg(p) {
  fill.style.width = p + '%';
  const pStr = p + '%';
  thumb.style.setProperty('--progress', pStr);
  track.style.setProperty('--progress', pStr);
}
function startProgress() {
  clearInterval(progTimer); progVal = 0; setProg(0);
  progTimer = setInterval(() => {
    progVal = Math.min(85, progVal + (progVal < 40 ? 2 : progVal < 70 ? 0.8 : 0.2));
    setProg(progVal);
    if (progVal >= 85) clearInterval(progTimer);
  }, 120);
}
function resetProg()    { clearInterval(progTimer); progVal = 0; setProg(0); }
function finishProg()   { clearInterval(progTimer); setProg(100); setTimeout(() => setProg(0), 600); }
iframe.addEventListener('load', () => { overlay.classList.add('hidden'); finishProg(); });
track.addEventListener('click', e => {
  const r = track.getBoundingClientRect();
  progVal = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
  setProg(progVal);
});

/* ════════════════════════════════════════
   EVENTS
════════════════════════════════════════ */
function bindEvents() {
  /* Filter pills */
  pills.querySelectorAll('.vp-pill').forEach(p => {
    p.addEventListener('click', () => {
      pills.querySelectorAll('.vp-pill').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      renderRec(p.dataset.filter);
    });
  });
  /* Desc toggle */
  descTgl.addEventListener('click', () => {
    const exp = elDesc.classList.toggle('expanded');
    descTgl.textContent = exp ? 'إخفاء ↑' : 'عرض المزيد ↓';
  });
  /* Like */
  likeBtn.addEventListener('click', () => {
    if (liked.has(currentId)) { liked.delete(currentId); showToast('تمت إزالة الإعجاب'); }
    else { liked.add(currentId); showToast('✨ تمت إضافة الإعجاب'); }
    localStorage.setItem('vp_liked', JSON.stringify([...liked]));
    updateActions();
  });
  /* Save */
  saveBtn.addEventListener('click', () => {
    if (saved.has(currentId)) { saved.delete(currentId); showToast('تمت إزالة الفيديو من المحفوظات'); }
    else { saved.add(currentId); showToast('📌 تم حفظ الفيديو'); }
    localStorage.setItem('vp_saved', JSON.stringify([...saved]));
    updateActions();
  });
  /* Share */
  shareBtn.addEventListener('click', () => {
    if (navigator.share) navigator.share({ title: VIDEOS.find(v => v.id === currentId)?.title, url: location.href }).catch(() => {});
    else navigator.clipboard.writeText(location.href).then(() => showToast('🔗 تم نسخ الرابط')).catch(() => showToast('تعذّر نسخ الرابط'));
  });
}

/* ════════════════════════════════════════
   TOAST
════════════════════════════════════════ */
let toastT;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ════════════════════════════════════════
   REVEAL ON SCROLL
════════════════════════════════════════ */
function initReveal() {
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }), { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
