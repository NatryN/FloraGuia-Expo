// Integrantes y color de cada uno. Para cambiar quién expone una diapositiva,
// edita el atributo data-presenter de su <section> en index.html.
const PRESENTERS = {
  espinoza: { name: 'Digber David Espinoza Huamani', initials: 'DE', role: 'Team Leader', color: '#2E5A3F' },
  moreno:   { name: 'Brother Pablo Moreno Cordova',  initials: 'BM', role: 'Requisitos',  color: '#B5652A' },
  lluen:    { name: 'Bryan Jair Lluen Garnique',     initials: 'BL', role: 'Diseño de BD', color: '#3D6FA8' },
  arias:    { name: 'Angel Alejandro Arias Ticona',  initials: 'AA', role: 'Modelo físico', color: '#8A5BA8' },
  mendez:   { name: 'Rodolfo Enmanuel Méndez Díaz',  initials: 'RM', role: 'SGBD',         color: '#C2406A' },
};

const ICONS = {
  sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  warning: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  trees: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
  braces: '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>',
};

const $ = (s, el = document) => el.querySelector(s);
const params = new URLSearchParams(location.search);

document.querySelectorAll('.ic[data-icon]').forEach(el => {
  el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[el.dataset.icon] || ''}</svg>`;
});

const slides = [...document.querySelectorAll('#slides-src > .slide')].map((el, i) => ({
  el,
  n: i + 1,
  title: el.dataset.title,
  who: PRESENTERS[el.dataset.presenter],
  key: el.dataset.presenter,
  min: parseFloat(el.dataset.min) || 1,
  notes: el.querySelector('aside')?.innerHTML || '',
}));

const fmtMin = m => {
  const s = Math.round(m * 60);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} min`;
};

// ---------- Modo exportación (?modo=print) ----------
if (params.get('modo') === 'print') {
  document.body.classList.add('print');
} else {
  buildOverview();
  setupViewer();
}

function buildOverview() {
  const total = slides.reduce((a, s) => a + s.min, 0);
  $('#total-time').textContent = `Duración sugerida: ${fmtMin(total)} · ${slides.length} diapositivas`;

  // Integrantes en el orden en que aparecen
  const order = [...new Set(slides.map(s => s.key))];

  const tl = $('#timeline');
  slides.forEach(s => {
    const span = document.createElement('span');
    span.style.width = `${(s.min / total) * 100}%`;
    span.style.background = s.who.color;
    span.title = `${s.n}. ${s.title} — ${s.who.name}`;
    tl.append(span);
  });

  $('#legend').innerHTML = order.map(k => {
    const p = PRESENTERS[k];
    const t = slides.filter(s => s.key === k).reduce((a, s) => a + s.min, 0);
    return `<span><i style="background:${p.color}"></i>${p.name.split(' ').slice(0, 1)} ${p.name.split(' ').slice(-2, -1)} · ${fmtMin(t)}</span>`;
  }).join('');

  $('#presenters').innerHTML = order.map(k => {
    const p = PRESENTERS[k];
    const own = slides.filter(s => s.key === k);
    const t = own.reduce((a, s) => a + s.min, 0);
    const items = own.map(s => `
      <li><details class="slide-item">
        <summary><span class="num">${s.n}</span>${s.title}<span class="dur">${fmtMin(s.min)}</span></summary>
        <div class="points">${s.notes}</div>
        <button class="go" data-start="${s.n}">Presentar desde aquí →</button>
      </details></li>`).join('');
    return `
      <article class="presenter" style="--c:${p.color}">
        <div class="presenter-head">
          <span class="avatar">${p.initials}</span>
          <div><h3>${p.name}</h3><p class="meta">${p.role} · ${own.length} diapositiva${own.length > 1 ? 's' : ''} · ${fmtMin(t)}</p></div>
        </div>
        <ul class="slide-list">${items}</ul>
      </article>`;
  }).join('');

  const thumbs = $('#thumbs');
  slides.forEach(s => {
    const b = document.createElement('button');
    b.className = 'thumb';
    b.dataset.start = s.n;
    b.innerHTML = `<div class="thumb-frame"></div>
      <div class="thumb-cap"><i style="background:${s.who.color}"></i>${s.n}. ${s.title}<small>${s.who.name.split(' ')[0]}</small></div>`;
    const clone = s.el.cloneNode(true);
    clone.querySelector('aside')?.remove();
    b.firstElementChild.append(clone);
    thumbs.append(b);
  });
  const fitThumbs = () => document.querySelectorAll('.thumb-frame').forEach(f => {
    f.firstElementChild.style.transform = `scale(${f.clientWidth / 1920})`;
  });
  new ResizeObserver(fitThumbs).observe(thumbs);
  fitThumbs();
}

function setupViewer() {
  const viewer = $('#viewer'), overview = $('#overview');
  const inner = $('#stage-inner'), stage = $('#stage'), notes = $('#notes');
  let cur = 0;

  $('#progress').innerHTML = slides.map(s => `<span style="flex:${s.min};background:${s.who.color}"></span>`).join('');

  const fit = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    const pad = w < 700 ? 8 : 24;
    const sc = Math.min((w - pad * 2) / 1920, (h - pad * 2) / 1080);
    inner.style.transform = `scale(${sc})`;
    inner.style.left = `${(w - 1920 * sc) / 2}px`;
    inner.style.top = `${(h - 1080 * sc) / 2}px`;
  };

  const show = i => {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    const s = slides[cur];
    const clone = s.el.cloneNode(true);
    clone.querySelector('aside')?.remove();
    inner.replaceChildren(clone);
    $('#counter').textContent = `${s.n} / ${slides.length}`;
    $('#presenter-chip').innerHTML = `<span class="avatar" style="background:${s.who.color}">${s.who.initials}</span>${s.who.name}`;
    const nxt = slides[cur + 1];
    const handoff = nxt && nxt.key !== s.key ? ` · <b>cede la palabra a ${nxt.who.name}</b>` : '';
    notes.innerHTML = `<h4>Guion · ${s.title}</h4><p class="who">${s.who.name} · ${fmtMin(s.min)}</p>${s.notes}
      ${nxt ? `<p class="next-up">Siguiente: ${nxt.n}. ${nxt.title}${handoff}</p>` : '<p class="next-up">Fin de la exposición.</p>'}`;
    [...$('#progress').children].forEach((el, k) => el.classList.toggle('done', k <= cur));
    history.replaceState(null, '', `#${s.n}`);
    fit();
  };

  const open = n => {
    overview.hidden = true;
    viewer.hidden = false;
    show(n - 1);
  };
  const close = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    viewer.hidden = true;
    overview.hidden = false;
    history.replaceState(null, '', location.pathname + location.search);
  };

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-start]');
    if (t) open(parseInt(t.dataset.start, 10));
  });
  $('#btn-exit').onclick = close;
  $('#nav-prev').onclick = () => show(cur - 1);
  $('#nav-next').onclick = () => show(cur + 1);
  const toggleNotes = () => {
    notes.hidden = !notes.hidden;
    $('#btn-notes').setAttribute('aria-pressed', String(!notes.hidden));
    fit();
  };
  const toggleFull = () => document.fullscreenElement ? document.exitFullscreen() : viewer.requestFullscreen?.();
  $('#btn-notes').onclick = toggleNotes;
  $('#btn-full').onclick = toggleFull;

  document.addEventListener('keydown', e => {
    if (viewer.hidden) return;
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); show(cur + 1); }
    else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); show(cur - 1); }
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(slides.length - 1);
    else if (e.key === 'n' || e.key === 'N') toggleNotes();
    else if (e.key === 'f' || e.key === 'F') toggleFull();
    else if (e.key === 'Escape' && !document.fullscreenElement) close();
  });
  addEventListener('resize', fit);
  new ResizeObserver(fit).observe(stage);

  // Notas ocultas por defecto en pantallas pequeñas
  if (innerWidth < 860) { notes.hidden = true; $('#btn-notes').setAttribute('aria-pressed', 'false'); }

  const fromHash = () => {
    const n = parseInt(location.hash.slice(1), 10);
    if (n >= 1 && n <= slides.length && slides[cur].n !== n || (n >= 1 && viewer.hidden)) open(n);
  };
  addEventListener('hashchange', fromHash);
  fromHash();
}
