/* --- bouncing logo screensaver --- */
(function () {
    'use strict';

    /* ===== knobs ===== */
    const IDLE_MS     = 15 * 60 * 1000;
    const SPEED       = 280;            // px per second
    const LOGO_SRC    = './src/images/VeilGuard-Shield.png';
    const MAX_LOGO_H  = 160;
    const MAX_LOGO_W  = 320;
    const HUE_STEP    = 33;
    /* ================= */

    const canvas = document.getElementById('screensaver');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const logo = new Image();
    let logoReady = false;
    logo.onload = () => {
        logoReady = true;
        if (active) { sizeLogo(); clampPos(); }
    };
    logo.src = LOGO_SRC;

    let active = false;
    let rafId = 0;
    let lastT = 0;
    let startedAt = 0;
    let hue = 0;
    let w = 240, h = 120;
    let x = 0, y = 0;
    let vx = 1, vy = 1;

    /* ---------- canvas sizing ---------- */
    function resizeCanvas() {
        const vw = innerWidth, vh = innerHeight;
        const dpr = Math.min(devicePixelRatio || 1, 2);
        canvas.width  = Math.round(vw * dpr);
        canvas.height = Math.round(vh * dpr);
        canvas.style.width  = vw + 'px';
        canvas.style.height = vh + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function sizeLogo() {
        if (!logoReady) { w = 240; h = 120; return; }
        const s = Math.min(MAX_LOGO_H / logo.naturalHeight, MAX_LOGO_W / logo.naturalWidth, 1);
        w = Math.round(logo.naturalWidth * s);
        h = Math.round(logo.naturalHeight * s);
    }

    function clampPos() {
        x = Math.min(x, Math.max(0, innerWidth  - w));
        y = Math.min(y, Math.max(0, innerHeight - h));
    }

    /* ---------- start / stop ---------- */
    function start() {
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (active || document.hidden) return;
        active = true;
        startedAt = performance.now();

        resizeCanvas();
        sizeLogo();

        x = Math.max(0, (innerWidth  - w) / 2);
        y = Math.max(0, (innerHeight - h) / 2);

        const a = Math.random() * Math.PI * 2;
        const sgn = v => (v < 0 ? -1 : 1);
        const min = 0.45;
        let dx = sgn(Math.cos(a)) * Math.max(Math.abs(Math.cos(a)), min);
        let dy = sgn(Math.sin(a)) * Math.max(Math.abs(Math.sin(a)), min);
        const m = Math.hypot(dx, dy);
        vx = dx / m;
        vy = dy / m;

        hue = Math.random() * 360;

        canvas.classList.add('is-visible');
        lastT = performance.now();
        rafId = requestAnimationFrame(tick);
    }

    function stop() {
        if (!active) return;
        active = false;
        cancelAnimationFrame(rafId);
        rafId = 0;
        canvas.classList.remove('is-visible');
    }

    /* ---------- animation ---------- */
    function tick(t) {
        if (!active) return;

        let dt = (t - lastT) / 1000;
        lastT = t;
        if (dt > 0.1) dt = 0.1;

        const vw = innerWidth, vh = innerHeight;
        const maxX = Math.max(0, vw - w);
        const maxY = Math.max(0, vh - h);

        x += vx * SPEED * dt;
        y += vy * SPEED * dt;

        let hit = false;
        if (x <= 0) { x = 0;    vx =  Math.abs(vx); hit = true; }
        else if (x >= maxX) { x = maxX; vx = -Math.abs(vx); hit = true; }
        if (y <= 0) { y = 0;    vy =  Math.abs(vy); hit = true; }
        else if (y >= maxY) { y = maxY; vy = -Math.abs(vy); hit = true; }

        if (hit) hue = (hue + HUE_STEP) % 360;

        draw(vw, vh);
        rafId = requestAnimationFrame(tick);
    }

    function draw(vw, vh) {
        ctx.clearRect(0, 0, vw, vh);

        if (logoReady) {
        ctx.filter = `hue-rotate(${hue}deg)`;
        ctx.drawImage(logo, x, y, w, h);
        ctx.filter = 'none';
        } else {
        ctx.fillStyle = `hsl(${hue} 80% 60%)`;
        ctx.fillRect(x, y, w, h);
        }
    }

    /* ---------- idle detection ---------- */
    let idleTimer = 0;
    let lastReset = 0;

    function scheduleIdle(force) {
        const now = Date.now();
        if (!force && now - lastReset < 800) return;
        lastReset = now;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(start, IDLE_MS);
    }

    function onActivity() {
        if (active) {
        if (performance.now() - startedAt < 200) return;
        stop();
        scheduleIdle(true);
        return;
        }
        scheduleIdle(false);
    }

    const EVENTS = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'touchmove', 'scroll'];

    EVENTS.forEach(type =>
        window.addEventListener(type, onActivity, { passive: true, capture: true })
    );

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
        clearTimeout(idleTimer);
        idleTimer = 0;
        if (active) stop();
        } else {
        scheduleIdle(true);
        }
    });

    addEventListener('resize', () => {
        if (!active) return;
        resizeCanvas();
        sizeLogo();
        clampPos();
    });

    scheduleIdle(true);
})();