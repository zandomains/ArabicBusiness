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
  { id:'v1', driveId:'1ThSzFyzbjR2UoQQcgrySw4jKjNZ8_EMy', title:'أساسيات ريادة الأعمال: كيف تبني مشروعاً ناجحاً من الصفر', desc:'في هذا الدرس الشامل، سنأخذك في رحلة عملية لاكتشاف الأسس الحقيقية التي يقوم عليها أي مشروع ناجح. ستتعلم كيفية تحديد الفكرة المناسبة، تحليل السوق المستهدف، وبناء نموذج عمل مستدام يضمن لك الاستمرارية والنمو.', category:'business', catLabel:'ريادة الأعمال', instructor:'الأستاذ عبد الرحيم', initial:'ع', dur:'٤٥ دقيقة', views:'١٢,٤٥٠', date:'منذ ٣ أيام', badge:'جديد', tags:['ريادة الأعمال','بناء المشاريع','التخطيط الاستراتيجي'], emoji:'🚀', grad:'linear-gradient(135deg,#1a2a4a,#0d1a30)' },
  { id:'v2', driveId:'1ThSzFyzbjR2UoQQcgrySw4jKjNZ8_EMy', title:'التداول في الأسواق المالية للمبتدئين — الدرس الأول', desc:'مقدمة عملية شاملة في عالم التداول المالي. تعرف على أنواع الأسواق، كيفية قراءة الشموع اليابانية، ومتى تدخل وتخرج من الصفقة بذكاء.', category:'trading', catLabel:'التداول', instructor:'الأستاذ عبد الرحيم', initial:'ع', dur:'٣٨ دقيقة', views:'٩,٨٢٠', date:'منذ أسبوع', badge:'مميز', tags:['التداول','الأسواق المالية','الشموع اليابانية'], emoji:'📈', grad:'linear-gradient(135deg,#1a3a2a,#0d2010)' },
  { id:'v3', driveId:'1ThSzFyzbjR2UoQQcgrySw4jKjNZ8_EMy', title:'التسويق الرقمي — استراتيجيات المحتوى 2026', desc:'دليلك الكامل لبناء استراتيجية محتوى فعّالة تستقطب جمهوراً مخلصاً وتحوّله إلى عملاء فعليين عبر منصات التواصل الاجتماعي والبريد الإلكتروني.', category:'marketing', catLabel:'التسويق', instructor:'خبراء المنصة', initial:'خ', dur:'٥٢ دقيقة', views:'٧,١٩٠', date:'منذ أسبوعين', badge:'', tags:['التسويق الرقمي','استراتيجية المحتوى'], emoji:'📊', grad:'linear-gradient(135deg,#2a1a3a,#180d28)' },
  { id:'v4', driveId:'1ThSzFyzbjR2UoQQcgrySw4jKjNZ8_EMy', title:'كيف تبني متجراً إلكترونياً ناجحاً على أمازون', desc:'الدليل التطبيقي خطوة بخطوة لإطلاق متجرك على أمازون وتحقيق أول ١٠٠٠ دولار من المبيعات خلال ٣٠ يوماً.', category:'business', catLabel:'ريادة الأعمال', instructor:'الأستاذ عبد الرحيم', initial:'ع', dur:'١ ساعة ١٥ دقيقة', views:'١٥,٦٠٠', date:'منذ شهر', badge:'الأكثر مشاهدة', tags:['أمازون','التجارة الإلكترونية','بيع أونلاين'], emoji:'🛒', grad:'linear-gradient(135deg,#2a2a1a,#1a1a0d)' },
  { id:'v5', driveId:'1ThSzFyzbjR2UoQQcgrySw4jKjNZ8_EMy', title:'إدارة المخاطر في التداول — حافظ على رأس مالك', desc:'تعلم كيف يفكر المتداولون المحترفون في إدارة المخاطر، وكيف تضع حدوداً واضحة لخسائرك لتضمن البقاء في السوق طويلاً.', category:'trading', catLabel:'التداول', instructor:'الأستاذ عبد الرحيم', initial:'ع', dur:'٢٩ دقيقة', views:'٦,٤٠٠', date:'منذ أسبوعين', badge:'', tags:['إدارة المخاطر','التداول'], emoji:'🛡️', grad:'linear-gradient(135deg,#1a1a3a,#0d0d20)' },
  { id:'v6', driveId:'1ThSzFyzbjR2UoQQcgrySw4jKjNZ8_EMy', title:'عقلية المليونير — كيف تبرمج تفكيرك نحو الثروة', desc:'رحلة في أعماق الفارق الذهني بين من يبني ثروة ومن يبقى في دوامة الراتب. مستوحى من أبرز الكتب المالية العالمية.', category:'business', catLabel:'ريادة الأعمال', instructor:'فريق الأكاديمية', initial:'ف', dur:'٤١ دقيقة', views:'١١,٢٣٠', date:'منذ ٣ أسابيع', badge:'', tags:['عقلية النجاح','الثروة','التطوير الذاتي'], emoji:'💎', grad:'linear-gradient(135deg,#2a1a1a,#200d0d)' },
  { id:'v7', driveId:'1ThSzFyzbjR2UoQQcgrySw4jKjNZ8_EMy', title:'الذكاء الاصطناعي في خدمة مشروعك — أدوات 2026', desc:'استعراض عملي لأفضل أدوات الذكاء الاصطناعي التي يمكن لكل رائد أعمال توظيفها لتوفير الوقت ومضاعفة الإنتاجية.', category:'marketing', catLabel:'التسويق', instructor:'خبراء المنصة', initial:'خ', dur:'٣٦ دقيقة', views:'١٨,٩٠٠', date:'منذ يومين', badge:'جديد', tags:['الذكاء الاصطناعي','الإنتاجية'], emoji:'🤖', grad:'linear-gradient(135deg,#1a2a3a,#0d1a20)' },
  { id:'v8', driveId:'1ThSzFyzbjR2UoQQcgrySw4jKjNZ8_EMy', title:'التحليل الأساسي للأسهم — كيف تختار السهم الصح', desc:'تعلم كيف تقرأ الميزانيات العمومية، تحلل نسب الأداء المالي، وتميز بين الشركات القوية والضعيفة قبل أن تضع أموالك.', category:'trading', catLabel:'التداول', instructor:'الأستاذ عبد الرحيم', initial:'ع', dur:'٥٨ دقيقة', views:'٨,٣٢٠', date:'منذ أسبوع', badge:'', tags:['تحليل أساسي','أسهم','استثمار'], emoji:'📉', grad:'linear-gradient(135deg,#1a3a1a,#0d200d)' }
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
