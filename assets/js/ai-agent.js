// ══ CONFIGURATION — ضع مفتاح Groq هنا ══
const GROQ_API_KEY = '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'; // احصل عليه من console.groq.com
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `أنت المستشار عدنان من فريق ArabicBusiness متخصص في في مناقشة مواضيع ريادة الأعمال ، التجارة الإلكترونية، الاستثمار في الصناعة، التداول في الأسواق المالية، واحتراف التسويق الرقمي. 
أجب دائماً باللغة العربية الفصحة و بأسلوب واضح ومفيد ومهني.`;

// ══ مراجع العناصر ══
const input     = document.getElementById('search-input');
const clearBtn  = document.getElementById('clearBtn');
const askBtn    = document.getElementById('askBtn');
const luckyBtn  = document.getElementById('luckyBtn');
const chatSec   = document.getElementById('chat-section');
const chatDiv   = document.getElementById('chatDivider');
const spinner   = document.getElementById('spinner');
const chips     = document.querySelectorAll('.chip');

let messages  = [];
let isLoading = false;

// ══ الإرسال المباشر إلى Groq API ══
async function sendMessage(overrideText = null) {
  const query = (overrideText ?? input.value).trim();
  if (!query || isLoading) return;

  chatSec.classList.add('visible');
  chatDiv.classList.add('visible');
  appendMessage('user', query);

  input.value = '';
  clearBtn.style.display = 'none';
  setLoading(true);

  const aiContent = appendMessage('ai', null);

  // بناء تاريخ المحادثة
  const chatMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages,
    { role: 'user', content: query }
  ];

  try {
    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: chatMessages,
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || `خطأ ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || 'لم أتمكن من الحصول على رد.';

    renderAI(aiContent, text);

    // حفظ التاريخ
    messages.push({ role: 'user',      content: query });
    messages.push({ role: 'assistant', content: text  });

  } catch (err) {
    console.error('Groq Error:', err);
    renderAI(aiContent, `⚠️ ${err.message}`);
  } finally {
    setLoading(false);
  }
}

// ══ ربط الأحداث ══
if (askBtn) askBtn.addEventListener('click', () => sendMessage());

if (luckyBtn) luckyBtn.addEventListener('click', () => {
  const prompts = [
    'كيف أبدأ بالتداول في البورصة المغربية؟',
    'أفضل نماذج التجارة الإلكترونية بالمغرب',
    'نصيحة للاستثمار العقاري في المغرب'
  ];
  sendMessage(prompts[Math.floor(Math.random() * prompts.length)]);
});

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const text = chip.textContent.replace(/^[\S]+\s/, '').trim();
    sendMessage(text);
  });
});

input.addEventListener('input', () => {
  clearBtn.style.display = input.value.length > 0 ? 'block' : 'none';
});

clearBtn.addEventListener('click', () => {
  input.value = '';
  clearBtn.style.display = 'none';
  input.focus();
});

input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// ══ وظائف مساعدة ══
function setLoading(state) {
  isLoading = state;
  spinner.style.display = state ? 'block' : 'none';
  if (askBtn) askBtn.disabled = state;
}

function appendMessage(role, text) {
  const wrap = document.createElement('div');
  wrap.className = `message ${role === 'user' ? 'user-msg' : 'ai-msg'}`;
  wrap.innerHTML = `<div class="msg-body"><div class="msg-content">${
    text === null ? 'جاري التفكير...' : formatText(text)
  }</div></div>`;
  chatSec.appendChild(wrap);
  wrap.scrollIntoView({ behavior: 'smooth' });
  return wrap.querySelector('.msg-content');
}

function renderAI(el, text) {
  el.innerHTML = formatText(text);
}

function formatText(t) {
  if (!t) return '';
  return t
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}
