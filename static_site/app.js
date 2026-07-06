/* ─── BDI DATA ────────────────────────────────────────────── */
const questions = [
  { id:1,  category:"Mood",      title:"Sadness",
    options:["I do not feel sad.","I feel sad.","I am sad all the time and I can't snap out of it.","I am so sad and unhappy that I can't stand it."] },
  { id:2,  category:"Outlook",   title:"Pessimism",
    options:["I am not particularly discouraged about the future.","I feel discouraged about the future.","I feel I have nothing to look forward to.","I feel the future is hopeless and that things cannot improve."] },
  { id:3,  category:"Self-View", title:"Past Failure",
    options:["I do not feel like a failure.","I feel I have failed more than the average person.","As I look back on my life, all I can see is a lot of failures.","I feel I am a complete failure as a person."] },
  { id:4,  category:"Pleasure",  title:"Loss of Pleasure",
    options:["I get as much satisfaction out of things as I used to.","I don't enjoy things the way I used to.","I don't get real satisfaction out of anything anymore.","I am dissatisfied or bored with everything."] },
  { id:5,  category:"Emotions",  title:"Guilty Feelings",
    options:["I don't feel particularly guilty.","I feel guilty a good part of the time.","I feel quite guilty most of the time.","I feel guilty all of the time."] },
  { id:6,  category:"Emotions",  title:"Punishment",
    options:["I don't feel I am being punished.","I feel I may be punished.","I expect to be punished.","I feel I am being punished."] },
  { id:7,  category:"Self-View", title:"Self-Dislike",
    options:["I don't feel disappointed in myself.","I am disappointed in myself.","I am disgusted with myself.","I hate myself."] },
  { id:8,  category:"Self-View", title:"Self-Criticalness",
    options:["I don't feel I am any worse than anybody else.","I am critical of myself for my weaknesses or mistakes.","I blame myself all the time for my faults.","I blame myself for everything bad that happens."] },
  { id:9,  category:"Safety",    title:"Suicidal Thoughts",
    options:["I don't have any thoughts of killing myself.","I have thoughts of killing myself, but I would not carry them out.","I would like to kill myself.","I would kill myself if I had the chance."] },
  { id:10, category:"Emotions",  title:"Crying",
    options:["I don't cry any more than usual.","I cry more now than I used to.","I cry all the time now.","I used to be able to cry, but now I can't cry even though I want to."] },
  { id:11, category:"Mood",      title:"Agitation",
    options:["I am no more irritated by things than I ever was.","I am slightly more irritated now than usual.","I am quite annoyed or irritated a good deal of the time.","I feel irritated all the time."] },
  { id:12, category:"Social",    title:"Loss of Interest",
    options:["I have not lost interest in other people.","I am less interested in other people than I used to be.","I have lost most of my interest in other people.","I have lost all of my interest in other people."] },
  { id:13, category:"Cognition", title:"Indecisiveness",
    options:["I make decisions about as well as I ever could.","I put off making decisions more than I used to.","I have greater difficulty in making decisions more than I used to.","I can't make decisions at all anymore."] },
  { id:14, category:"Self-View", title:"Worthlessness",
    options:["I don't feel that I look any worse than I used to.","I am worried that I am looking old or unattractive.","I feel there are permanent changes in my appearance that make me look unattractive.","I believe that I look ugly."] },
  { id:15, category:"Behavior",  title:"Loss of Energy",
    options:["I can work about as well as before.","It takes an extra effort to get started at doing something.","I have to push myself very hard to do anything.","I can't do any work at all."] },
  { id:16, category:"Physical",  title:"Sleep Changes",
    options:["I can sleep as well as usual.","I don't sleep as well as I used to.","I wake up 1–2 hours earlier than usual and find it hard to get back to sleep.","I wake up several hours earlier than I used to and cannot get back to sleep."] },
  { id:17, category:"Physical",  title:"Fatigue",
    options:["I don't get more tired than usual.","I get tired more easily than I used to.","I get tired from doing almost anything.","I am too tired to do anything."] },
  { id:18, category:"Physical",  title:"Appetite Changes",
    options:["My appetite is no worse than usual.","My appetite is not as good as it used to be.","My appetite is much worse now.","I have no appetite at all anymore."] },
  { id:19, category:"Physical",  title:"Weight Loss",
    options:["I haven't lost much weight, if any, lately.","I have lost more than five pounds.","I have lost more than ten pounds.","I have lost more than fifteen pounds."] },
  { id:20, category:"Physical",  title:"Health Concern",
    options:["I am no more worried about my health than usual.","I am worried about physical problems like aches, pains, upset stomach, or constipation.","I am very worried about physical problems and it's hard to think of much else.","I am so worried about my physical problems that I cannot think of anything else."] },
  { id:21, category:"Physical",  title:"Loss of Libido",
    options:["I have not noticed any recent change in my interest in sex.","I am less interested in sex than I used to be.","I have almost no interest in sex.","I have lost interest in sex completely."] }
];

const SEVERITY = [
  { min:0,  max:10, label:"Normal ups & downs",            emoji:"🌤️", color:"#15803d",
    desc:"Your score falls in the normal range. Everyone experiences emotional ups and downs." },
  { min:11, max:16, label:"Mild mood disturbance",          emoji:"🌥️", color:"#65a30d",
    desc:"Mild mood disturbance. Consider journaling, exercise, or talking to a trusted friend." },
  { min:17, max:20, label:"Borderline clinical depression", emoji:"⛅",  color:"#ca8a04",
    desc:"Borderline clinical depression. Consider speaking with a healthcare professional." },
  { min:21, max:30, label:"Moderate depression",            emoji:"🌦️", color:"#c2410c",
    desc:"Moderate depression. A professional evaluation is strongly recommended." },
  { min:31, max:40, label:"Severe depression",              emoji:"🌧️", color:"#dc2626",
    desc:"Severe depression. Please seek professional evaluation as soon as possible." },
  { min:41, max:63, label:"Extreme depression",             emoji:"⛈️", color:"#7f1d1d",
    desc:"Extreme depression. Please reach out to a mental health professional or crisis line immediately." }
];

/* ─── STATE ──────────────────────────────────────────────── */
let answers  = new Array(21).fill(null);
let currentQ = 0;
let twTimer  = null;
let raf      = null;

/* ─── MOUSE PARALLAX ─────────────────────────────────────── */
(function initParallax() {
  const objs = document.querySelectorAll('.parallax-obj');
  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    tx = (e.clientX - cx) / cx;
    ty = (e.clientY - cy) / cy;
  });

  function tick() {
    mx += (tx - mx) * 0.06;
    my += (ty - my) * 0.06;
    objs.forEach(el => {
      const d = parseFloat(el.dataset.depth || 0.05);
      const ox = mx * d * 30;
      const oy = my * d * 20;
      el.style.transform = `translate(${ox}px, ${oy}px)`;
    });
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
})();

/* ─── SCREEN TRANSITIONS ──────────────────────────────────── */
function showScreen(nextId) {
  const current = document.querySelector('.screen.active');
  const next    = document.getElementById(nextId);
  if (!next || next === current) return;

  if (current) {
    current.classList.add('screen-exit');
    setTimeout(() => {
      current.classList.remove('active','screen-exit');
    }, 300);
  }
  setTimeout(() => {
    next.classList.add('active','screen-enter');
    setTimeout(() => next.classList.remove('screen-enter'), 400);
  }, 200);
}

/* ─── CLICK RIPPLE ────────────────────────────────────────── */
function spawnRipple(e) {
  const r = document.createElement('div');
  r.className = 'click-ripple';
  r.style.left = e.clientX + 'px';
  r.style.top  = e.clientY + 'px';
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 700);
}

document.getElementById('laptop-start').addEventListener('click', spawnRipple);

/* ─── BOOT SEQUENCE ───────────────────────────────────────── */
function bootComputer() {
  const screenRect = document.getElementById('laptop-screen-rect');
  const offGroup   = document.getElementById('screen-off-content');
  const onGroup    = document.getElementById('screen-on-content');
  const hint       = document.getElementById('laptop-hint');
  const laptop     = document.getElementById('laptop-start');

  // Remove interactivity
  laptop.style.cursor = 'default';
  laptop.onclick = null;
  hint.style.opacity = '0';
  hint.style.transition = 'opacity 0.3s';

  // Phase 1: screen flicker off
  screenRect.style.transition = 'fill 0.1s';
  screenRect.setAttribute('fill','#000');

  setTimeout(() => {
    // Phase 2: screen turns blue
    screenRect.setAttribute('fill','#1a1aff');
    offGroup.style.opacity = '0';
    setTimeout(() => {
      offGroup.style.display = 'none';
      onGroup.style.opacity = '1';
      onGroup.style.transition = 'opacity 0.3s';

      // Typewriter: line 1
      const line1 = document.getElementById('screen-line1');
      const line2 = document.getElementById('screen-line2');
      typeText(line1, 'BDI.exe — loading...', 50, () => {
        setTimeout(() => {
          typeText(line2, 'Initializing...', 60, () => {
            setTimeout(() => {
              // Go to quiz
              answers  = new Array(21).fill(null);
              currentQ = 0;
              buildQDots();
              renderQuestion(0);
              showScreen('screen-quiz');
            }, 500);
          });
        }, 200);
      });
    }, 200);
  }, 200);
}

function typeText(el, text, delay, cb) {
  if (twTimer) clearInterval(twTimer);
  el.textContent = '';
  let i = 0;
  twTimer = setInterval(() => {
    el.textContent += text[i] || '';
    i++;
    if (i >= text.length) { clearInterval(twTimer); if (cb) cb(); }
  }, delay);
}

/* ─── Q-DOTS ──────────────────────────────────────────────── */
function buildQDots() {
  const grid = document.getElementById('qdot-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 21; i++) {
    const d = document.createElement('div');
    d.className = 'qdot';
    d.id = `dot-${i}`;
    d.title = `Question ${i+1}`;
    d.onclick = () => jumpTo(i);
    grid.appendChild(d);
  }
}

function updateQDots() {
  for (let i = 0; i < 21; i++) {
    const d = document.getElementById(`dot-${i}`);
    if (!d) continue;
    d.className = 'qdot';
    if      (i === currentQ)       d.classList.add('active');
    else if (answers[i] !== null)  d.classList.add('answered');
  }
}

function jumpTo(i) { currentQ = i; renderQuestion(i); }

/* ─── RENDER QUESTION ─────────────────────────────────────── */
function renderQuestion(idx) {
  const q = questions[idx];

  // Laptop screen on quiz side
  const qnum  = document.getElementById('q-screen-qnum');
  const qtitle = document.getElementById('q-screen-title');
  const cursor = document.getElementById('q-cursor');

  qnum.textContent = `Q${String(idx+1).padStart(2,'0')} // ${q.category.toUpperCase()}`;
  qtitle.textContent = '';

  // Typewriter on laptop screen
  if (twTimer) clearInterval(twTimer);
  let i = 0;
  twTimer = setInterval(() => {
    qtitle.textContent += q.title[i] || '';
    // Move cursor after text
    cursor.setAttribute('x', String(72 + qtitle.textContent.length * 9.5));
    i++;
    if (i >= q.title.length) clearInterval(twTimer);
  }, 50);

  // Window title
  document.getElementById('win-title').textContent =
    `QUESTION_${String(idx+1).padStart(2,'0')}.exe`;

  // Category tag
  document.getElementById('q-category-tag').textContent = q.category;

  // Render options with staggered entrance
  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  const keys = ['A','B','C','D'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn' + (answers[idx] === i ? ' selected' : '');
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(10px)';
    btn.style.transition = `opacity 0.2s ${i * 60}ms, transform 0.2s ${i * 60}ms`;
    btn.innerHTML = `
      <span class="opt-key">${keys[i]}</span>
      <span>${opt}</span>
      <span class="opt-score">${i}</span>
    `;
    btn.onclick = () => selectOption(idx, i);
    grid.appendChild(btn);
    // Trigger animation
    requestAnimationFrame(() => requestAnimationFrame(() => {
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    }));
  });

  // Nav buttons
  const prev   = document.getElementById('prev-btn');
  const next   = document.getElementById('next-btn');
  const submit = document.getElementById('submit-btn');

  prev.disabled = idx === 0;

  if (idx === 20) {
    next.classList.add('hidden');
    submit.classList.remove('hidden');
    submit.disabled = answers[idx] === null;
  } else {
    next.classList.remove('hidden');
    submit.classList.add('hidden');
    next.disabled = answers[idx] === null;
  }

  // Tally
  const answered = answers.filter(a => a !== null).length;
  document.getElementById('progress-pill').textContent = `${answered}/21 answered`;

  updateRunningScore();
  updateQDots();
}

/* ─── SELECT OPTION ───────────────────────────────────────── */
function selectOption(qIdx, optIdx) {
  answers[qIdx] = optIdx;

  // Update visuals
  document.querySelectorAll('.option-btn').forEach((b, i) => {
    b.classList.toggle('selected', i === optIdx);
  });

  const next   = document.getElementById('next-btn');
  const submit = document.getElementById('submit-btn');
  if (qIdx === 20) submit.disabled = false;
  else             next.disabled   = false;

  updateQDots();
  updateRunningScore();

  // Auto-advance with slight delay
  if (qIdx < 20) setTimeout(() => nextQuestion(), 520);
}

/* ─── NAVIGATION ──────────────────────────────────────────── */
function nextQuestion() {
  if (currentQ < 20) { currentQ++; renderQuestion(currentQ); }
}
function prevQuestion() {
  if (currentQ > 0)  { currentQ--; renderQuestion(currentQ); }
}

/* ─── RUNNING SCORE ───────────────────────────────────────── */
function updateRunningScore() {
  const answered = answers.filter(a => a !== null).length;
  const total    = answers.reduce((s,a) => s + (a ?? 0), 0);
  const el = document.getElementById('score-display');
  if (!el) return;
  el.textContent = answered > 0 ? String(total).padStart(2,'0') : '—';
}

/* ─── SUBMIT ──────────────────────────────────────────────── */
function submitAssessment() {
  const missing = answers.filter(a => a === null).length;
  if (missing > 0) {
    alert(`${missing} question(s) still need your answer.`);
    // Jump to first unanswered
    currentQ = answers.findIndex(a => a === null);
    renderQuestion(currentQ);
    return;
  }
  buildResults();
  showScreen('screen-results');
}

/* ─── BUILD RESULTS ───────────────────────────────────────── */
function buildResults() {
  const total = answers.reduce((s,a) => s + a, 0);

  // Count-up animation on big score
  const scoreEl = document.getElementById('big-score');
  scoreEl.textContent = '00';
  let count = 0;
  const step = Math.max(1, Math.ceil(total / 35));
  const timer = setInterval(() => {
    count = Math.min(count + step, total);
    scoreEl.textContent = String(count).padStart(2,'0');
    if (count >= total) clearInterval(timer);
  }, 35);

  // Date
  document.getElementById('result-date').textContent =
    new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric'});

  // Severity
  const sev = SEVERITY.find(s => total >= s.min && total <= s.max) || SEVERITY[SEVERITY.length-1];
  document.getElementById('sev-emoji').textContent = sev.emoji;
  document.getElementById('sev-label').textContent = sev.label;
  document.getElementById('sev-label').style.color = sev.color;
  document.getElementById('sev-desc').textContent  = sev.desc;
  document.getElementById('severity-band').style.borderColor = sev.color;

  // Bar
  setTimeout(() => {
    document.getElementById('bar-fill').style.width = (total / 63 * 100) + '%';
  }, 300);

  // Category breakdown
  const cats = {};
  questions.forEach((q,i) => {
    if (!cats[q.category]) cats[q.category] = { score:0, max:0 };
    cats[q.category].score += answers[i];
    cats[q.category].max   += 3;
  });
  const bRows = document.getElementById('breakdown-rows');
  bRows.innerHTML = '';
  Object.entries(cats).forEach(([cat, data]) => {
    const pct = (data.score / data.max * 100).toFixed(0);
    const row = document.createElement('div');
    row.className = 'breakdown-row';
    row.innerHTML = `
      <span class="bd-cat">${cat}</span>
      <div class="bd-track"><div class="bd-bar" data-w="${pct}%"></div></div>
      <span class="bd-num">${data.score}/${data.max}</span>
    `;
    bRows.appendChild(row);
  });
  setTimeout(() => {
    document.querySelectorAll('.bd-bar').forEach(b => { b.style.width = b.dataset.w; });
  }, 400);

  // Review list
  const rList = document.getElementById('review-list');
  rList.innerHTML = '';
  questions.forEach((q,i) => {
    const s = answers[i];
    const item = document.createElement('div');
    item.className = 'review-item';
    item.innerHTML = `
      <div class="r-num">${i+1}</div>
      <div class="r-text"><strong>${q.title}</strong>: ${q.options[s]}</div>
      <div class="r-badge badge-${s}">${s}</div>
    `;
    rList.appendChild(item);
  });
}

/* ─── TOGGLE REVIEW ───────────────────────────────────────── */
function toggleReview(btn) {
  const list = document.getElementById('review-list');
  const hidden = list.classList.toggle('hidden');
  btn.textContent = hidden ? '[ SHOW ALL RESPONSES ]' : '[ HIDE RESPONSES ]';
}

/* ─── RETAKE ──────────────────────────────────────────────── */
function retake() {
  answers  = new Array(21).fill(null);
  currentQ = 0;
  buildQDots();
  renderQuestion(0);
  showScreen('screen-quiz');
}

/* ─── KEYBOARD SHORTCUTS ──────────────────────────────────── */
document.addEventListener('keydown', e => {
  const quiz = document.getElementById('screen-quiz');
  if (!quiz.classList.contains('active')) return;

  if (e.key === 'ArrowRight' && !document.getElementById('next-btn').disabled)  nextQuestion();
  if (e.key === 'ArrowLeft'  && !document.getElementById('prev-btn').disabled)  prevQuestion();
  if (['1','2','3','4'].includes(e.key)) selectOption(currentQ, +e.key - 1);
  if (e.key === 'Enter') {
    const submit = document.getElementById('submit-btn');
    if (!submit.classList.contains('hidden') && !submit.disabled) submitAssessment();
    else if (!document.getElementById('next-btn').disabled)       nextQuestion();
  }
});

/* ─── LAPTOP KEYBOARD ENTER ───────────────────────────────── */
document.getElementById('laptop-start').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') bootComputer();
});

/* ─── SHARE ───────────────────────────────────────────────── */
function shareTest() {
  if (navigator.share) {
    navigator.share({
      title: 'BDI.exe - Depression Assessment',
      text: 'Find out if you or your friend are dealing with depression using this clinically-validated Beck\'s Depression Inventory tool.',
      url: window.location.href,
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('Website link copied to clipboard!');
  }
}

function shareReport() {
  const score = answers.reduce((s,a) => s + (a || 0), 0);
  const sev = SEVERITY.find(s => score >= s.min && score <= s.max) || SEVERITY[SEVERITY.length-1];
  const text = `I just took the BDI.exe depression assessment and scored ${score}/63 (${sev.label} ${sev.emoji}). Take the test yourself to see where you stand!`;
  
  if (navigator.share) {
    navigator.share({
      title: 'My BDI.exe Results',
      text: text,
      url: window.location.href,
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(text + '\n' + window.location.href);
    alert('Report text copied to clipboard!');
  }
}

/* ─── DEV TOOLS ───────────────────────────────────────────── */
function devJumpToResults(targetScore) {
  answers = new Array(21).fill(0);
  let remaining = targetScore;
  for (let i = 0; i < 21; i++) {
    if (remaining >= 3) {
      answers[i] = 3;
      remaining -= 3;
    } else if (remaining > 0) {
      answers[i] = remaining;
      remaining = 0;
    }
  }
  buildResults();
  showScreen('screen-results');
}

