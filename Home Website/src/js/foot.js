function initNavigation() {
    const buttons = document.querySelectorAll('.nav-btn[data-target]');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
        const el = document.getElementById(btn.dataset.target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ================================================================== */
/* project filtering (tags + search bar)                               */
/* ================================================================== */
function initProjectFilter() {
    const section  = document.getElementById('projects');
    const grid     = document.getElementById('projects-grid');
    const bar      = document.getElementById('projects-filter');
    const barLabel = document.getElementById('projects-filter-label');
    const clearBtn = document.getElementById('projects-filter-clear');
    const empty    = document.getElementById('projects-empty');
    const form     = document.getElementById('site-search');
    const input    = document.getElementById('site-search-input');

    if (!section || !grid) return;

    const norm = s => (s || '').trim().toLowerCase();

    // Read every project card once and keep the searchable bits alongside it.
    const projects = Array.from(grid.querySelectorAll('.project')).map(card => ({
        card,
        tags:  Array.from(card.querySelectorAll('.tag[data-tag]')).map(t => norm(t.dataset.tag)),
        title: norm(card.querySelector('.project-title')?.textContent),
        desc:  norm(card.querySelector('.project-desc')?.textContent),
    }));

    // Every distinct tag on the site: lower-cased → spelling as written in projects.json,
    // so searching "rust" can show the label as "Rust".
    const allTags = new Map();
    grid.querySelectorAll('.tag[data-tag]').forEach(t => {
        const key = norm(t.dataset.tag);
        if (!allTags.has(key)) allTags.set(key, t.dataset.tag.trim());
    });

    let activeTag = null;   // lower-cased tag currently filtered on, or null

    /** Show only the cards for which keep(project) is true. */
    function applyFilter(keep, labelText) {
        let shown = 0;
        projects.forEach(p => {
            const visible = keep(p);
            p.card.hidden = !visible;
            if (visible) shown++;
        });

        // highlight the active tag everywhere it appears (including Featured)
        document.querySelectorAll('.tag[data-tag]').forEach(t => {
            t.classList.toggle('is-active', activeTag !== null && norm(t.dataset.tag) === activeTag);
        });

        if (labelText) {
            barLabel.textContent = `${labelText} (${shown} of ${projects.length})`;
            bar.hidden = false;
        } else {
            bar.hidden = true;
        }
        empty.hidden = shown !== 0;
    }

    function filterByTag(tag) {
        activeTag = norm(tag);
        applyFilter(p => p.tags.includes(activeTag), `Tagged “${tag.trim()}”`);
    }

    function filterByText(query) {
        activeTag = null;
        const q = norm(query);
        applyFilter(
            p => p.title.includes(q) || p.desc.includes(q) || p.tags.some(t => t.includes(q)),
            `Results for “${query.trim()}”`
        );
    }

    function clearFilter() {
        activeTag = null;
        applyFilter(() => true, null);
    }

    function goToProjects() {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ---------- clickable tags ---------- */
    // One listener on the document catches clicks on any tag, including the
    // Featured Project's tags on the home section.
    document.addEventListener('click', e => {
        const tagBtn = e.target.closest('.tag[data-tag]');
        if (!tagBtn) return;

        const tag = tagBtn.dataset.tag;
        if (activeTag === norm(tag)) {
            clearFilter();              // clicking the active tag again turns it off
        } else {
            filterByTag(tag);
            if (input) input.value = tag;
        }
        goToProjects();
    });

    clearBtn?.addEventListener('click', () => {
        clearFilter();
        if (input) input.value = '';
    });

    /* ---------- search bar ---------- */
    form?.addEventListener('submit', e => {
        e.preventDefault();             // stop the browser reloading the page

        const query = input.value;
        if (norm(query) === '') {
            clearFilter();
        } else if (allTags.has(norm(query))) {
            filterByTag(allTags.get(norm(query)));  // exact tag name → same as clicking the tag
        } else {
            filterByText(query);        // otherwise match title / description / tags
        }
        goToProjects();
    });

    // Esc in the search box clears it and the filter
    input?.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            input.value = '';
            clearFilter();
        }
    });
}

initNavigation();
initProjectFilter();
