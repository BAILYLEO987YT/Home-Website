const KONAMI = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];
const MARQUEE = ['m','a','r','q','u','e','e'];

let pos = 0;

document.addEventListener('keydown', (e) => {
    // Normalize: arrow keys come through as-is, letters may be 'B' if shift/capslock
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    if (key === KONAMI[pos]) {
        pos++;
        if (pos === KONAMI.length) {
            pos = 0;
            activateEasterEgg("KONAMI");
        }
    } else if (key === MARQUEE[pos]) {
        pos++;
        if (pos === MARQUEE.length) {
            pos = 0;
            activateEasterEgg("MARQUEE")
        }
    } else {
        // Don't just reset to 0 — if the key matches the first step, treat it as a restart
        pos = key === KONAMI[0] ? 1 : 0;
        if (key === KONAMI[0] || key === MARQUEE[0]) {pos = 1;} else {pos = 0;}
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
});