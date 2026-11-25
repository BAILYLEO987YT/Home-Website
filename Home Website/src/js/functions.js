function activateEasterEgg(easterEgg) {
    switch (easterEgg){
        case "KONAMI":
            document.getElementById('page').classList.add('party-mode');
            break;
        case "MARQUEE":
            const target = document.getElementById('page');
            const wrapper = document.createElement('marquee');
            target.before(wrapper);
            wrapper.append(target);
    }
}

function initCarousel(carousel) {
    const track   = carousel.querySelector('.carousel-track');
    const slides  = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsBox = carousel.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    let index = 0;
    let timer = null;
    const AUTOPLAY_MS = 6000;

    // Build dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsBox.appendChild(dot);
    });
    const dots = Array.from(dotsBox.children);

    function goTo(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, di) => {
            const active = di === index;
            d.classList.toggle('active', active);
            d.setAttribute('aria-selected', active ? 'true' : 'false');
        });
    }

    function startAutoplay() {
        stopAutoplay();
        timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    }
    function stopAutoplay() {
        if (timer) { clearInterval(timer); timer = null; }
    }

    prevBtn?.addEventListener('click', () => goTo(index - 1));
    nextBtn?.addEventListener('click', () => goTo(index + 1));

    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  goTo(index - 1);
        if (e.key === 'ArrowRight') goTo(index + 1);
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin',   stopAutoplay);
    carousel.addEventListener('focusout',  startAutoplay);

    // Pause when tab is hidden (saves CPU)
    document.addEventListener('visibilitychange', () => {
        document.hidden ? stopAutoplay() : startAutoplay();
    });

    goTo(0);
    startAutoplay();
}