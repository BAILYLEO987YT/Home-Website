/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */
const pick = arr => arr[(Math.random() * arr.length) | 0];

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+-<>/\\';
const randGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** One <span class="char"> per character, remembering the real character. */
function buildChars(text) {
    return [...text].map(ch => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch === ' ' ? '\u00A0' : ch;   // keep space width
        span.dataset.char = ch;
        return span;
    });
}

/** Wrap the spans in an aria-hidden layer and return it. */
function wrapLayer(spans) {
    const layer = document.createElement('span');
    layer.className = 'label';
    layer.setAttribute('aria-hidden', 'true');
    spans.forEach(s => layer.appendChild(s));
    return layer;
}

/* ================================================================== */
/* 2. DECODE — glyphs cycle, then lock in one letter at a time        */
/* ================================================================== */
function decodeEffect(btn, text, { persist = false } = {}) {
    const spans = buildChars(text);
    const layer = wrapLayer(spans);

    btn.textContent = '';
    btn.setAttribute('aria-label', text);
    btn.appendChild(layer);

    const n = spans.length;
    const target = spans.map(s => s.dataset.char);
    const locked = new Array(n).fill(false);

    const BASE    = 160;
    const STAGGER = Math.min(55, 700 / n);
    const TICK    = 45;

    let raf = null;
    let startedAt = 0;
    let lastTick = -Infinity;
    let isDecrypted = false;

    const resetLocks = () => {
        for (let i = 0; i < n; i++) locked[i] = target[i] === ' ';
    };

    const scrambleAll = () => {
        for (let i = 0; i < n; i++) {
        if (target[i] !== ' ') spans[i].textContent = randGlyph();
        }
    };

    function frame(now) {
        const t = now - startedAt;

        if (t - lastTick >= TICK) {
        lastTick = t;
        for (let i = 0; i < n; i++) {
            if (!locked[i]) spans[i].textContent = randGlyph();
        }
        }

        let pending = false;
        for (let i = 0; i < n; i++) {
        if (locked[i]) continue;
        if (t >= BASE + i * STAGGER) {
            spans[i].textContent = target[i];
            locked[i] = true;
        } else {
            pending = true;
        }
        }

        if (pending) {
        raf = requestAnimationFrame(frame);
        } else {
        raf = null;
        isDecrypted = true;               // ← reveal complete
        }
    }

    function startDecoding() {
        if (raf) return;                    // already running, don't restart
        if (isDecrypted) return;            // already finished, stay finished
        resetLocks();
        scrambleAll();
        startedAt = performance.now();
        lastTick = -Infinity;
        raf = requestAnimationFrame(frame);
    }

    function reset() {
        if (persist) return;                // persist → let the animation finish
        cancelAnimationFrame(raf);
        raf = null;
        isDecrypted = false;
        resetLocks();
        scrambleAll();
    }

    scrambleAll();
    btn.addEventListener('mouseenter', startDecoding);
    btn.addEventListener('focus', startDecoding);
    btn.addEventListener('mouseleave', reset);
    btn.addEventListener('blur', reset);
}

/* ================================================================== */
/* wire it up                                                         */
/* ================================================================== */
const EFFECTS = {
    decode:  decodeEffect,
};
const EFFECT_LIST = Object.values(EFFECTS);

const DEFAULT_PERSIST = false;   // ← flip to true if you'd rather persist by default

/** data-persist (bare) → true, data-persist="false" → false, absent → DEFAULT_PERSIST */
function resolvePersist(btn) {
    const raw = btn.dataset.persist;
    if (raw === undefined) return DEFAULT_PERSIST;
    return !(raw === 'false' || raw === '0' || raw === 'no');
}

document.querySelectorAll('[data-encrypt]').forEach(btn => {
    const text = (btn.dataset.encrypt || btn.textContent).trim();
    if (!text || reducedMotion) return;

    const effect = EFFECTS[btn.dataset.effect] ?? pick(EFFECT_LIST);
    effect(btn, text, { persist: resolvePersist(btn) });
});