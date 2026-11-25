(() => {
    const stage  = document.querySelector('[data-reveal]');
    if (!stage) return;

    const logo   = stage.querySelector('.reveal-logo');
    const panels = {
        left:  stage.querySelector('[data-panel="left"]'),
        right: stage.querySelector('[data-panel="right"]')
    };

    const COMMIT_RATIO    = 0.35;  // how far you must drag before it sticks
    const REST_RATIO      = 0.60;  // where the logo parks once committed
    const REVEAL_RATIO    = 0.60;  // how far before a panel is fully visible
    const SLIDE_PX        = 18;    // how far a panel slides in from the edge

    let maxTravel = 200;   // furthest the logo may travel from centre, in px
    let rest      = 0;     // committed offset
    let offset    = 0;     // offset currently painted
    let startX    = 0;
    let startOffset = 0;
    let dragging  = false;
    let moved     = false;
    let pointerId = null;

    /* ---------- geometry ---------- */

    function measure() {
        const stageW = stage.clientWidth;
        const logoW  = logo.offsetWidth || 120;
        // keeps the logo inside the stage with a 16px gutter
        maxTravel = Math.max(70, (stageW - logoW) / 2 - 16);
    }

    const clampOffset = v => Math.max(-maxTravel, Math.min(maxTravel, v));

    /* ---------- painting ---------- */

    function paint(value) {
        offset = value;
        logo.style.transform = `translateX(${value.toFixed(2)}px)`;

        // 0 → 1 progress, reaches 1 at REVEAL_RATIO of the maximum travel
        const p = Math.min(1, Math.abs(value) / (maxTravel * REVEAL_RATIO));

        const leftP  = value > 0 ? p : 0;   // drag right → left panel
        const rightP = value < 0 ? p : 0;   // drag left  → right panel

        panels.left.style.opacity   = leftP.toFixed(3);
        panels.left.style.transform = `translateX(${(-SLIDE_PX * (1 - leftP)).toFixed(2)}px)`;

        panels.right.style.opacity   = rightP.toFixed(3);
        panels.right.style.transform = `translateX(${(SLIDE_PX * (1 - rightP)).toFixed(2)}px)`;
    }

    /* ---------- pointer handlers ---------- */

    function onDown(e) {
        if (e.button !== undefined && e.button !== 0) return; // left / primary only
        dragging    = true;
        moved       = false;
        pointerId   = e.pointerId;
        startX      = e.clientX;
        startOffset = rest;

        stage.classList.add('is-dragging', 'has-interacted');
        logo.classList.add('is-grabbed');
        try { logo.setPointerCapture(pointerId); } catch (_) {}
    }

    function onMove(e) {
        if (!dragging || e.pointerId !== pointerId) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 3) moved = true;
        paint(clampOffset(startOffset + dx));
    }

    function onUp(e) {
        if (!dragging || e.pointerId !== pointerId) return;
        dragging  = false;
        pointerId = null;

        stage.classList.remove('is-dragging');
        logo.classList.remove('is-grabbed');

        if (!moved) {                 // plain click / tap → snap shut
        rest = 0;
        } else {
        const threshold = maxTravel * COMMIT_RATIO;
        if (offset < -threshold)      rest = -maxTravel * REST_RATIO;
        else if (offset > threshold)  rest =  maxTravel * REST_RATIO;
        else                          rest = 0;
        }

        void logo.offsetWidth;        // force reflow so the transition re-engages
        paint(rest);
    }

    logo.addEventListener('pointerdown',   onDown);
    logo.addEventListener('pointermove',   onMove);
    logo.addEventListener('pointerup',     onUp);
    logo.addEventListener('pointercancel', onUp);

    /* ---------- keyboard ---------- */

    logo.addEventListener('keydown', e => {
        const step = maxTravel * REST_RATIO;

        if (e.key === 'ArrowLeft')       { e.preventDefault(); rest = -step; }
        else if (e.key === 'ArrowRight') { e.preventDefault(); rest =  step; }
        else if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        rest = 0;
        } else return;

        stage.classList.add('has-interacted');
        paint(rest);
    });

    /* ---------- resize ---------- */

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
        const ratio = maxTravel ? rest / maxTravel : 0;
        measure();
        rest = ratio * maxTravel;
        paint(rest);
        }, 120);
    });

    /* ---------- boot ---------- */

    measure();
    paint(0);
})();