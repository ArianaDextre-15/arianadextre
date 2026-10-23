// Home page behaviour (index.html only).
// Project pages keep using js/script.js.

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initScrollSpy();
    initReveal();
    initCertificateLinks();
    initContactForm();
});

/* ---------- Filter chips (projects + technical showcase) ---------- */

function initFilters() {
    document.querySelectorAll('.filters[data-filter-for]').forEach(group => {
        const list = document.getElementById(group.dataset.filterFor);
        if (!list) return;
        const items = Array.from(list.children).filter(el => el.dataset.cat);
        const buttons = group.querySelectorAll('.filter');

        // Show how many items each filter has
        buttons.forEach(btn => {
            const f = btn.dataset.filter;
            const n = f === 'all' ? items.length : items.filter(el => el.dataset.cat === f).length;
            const count = document.createElement('span');
            count.className = 'count';
            count.textContent = `(${n})`;
            btn.append(' ', count);
        });

        const apply = (f) => {
            buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
            items.forEach(el => { el.hidden = !(f === 'all' || el.dataset.cat === f); });
            // Items revealed by a filter should be visible right away
            items.forEach(el => { if (!el.hidden) el.classList.add('in'); });
        };

        buttons.forEach(btn => btn.addEventListener('click', () => apply(btn.dataset.filter)));
        apply(group.dataset.default || 'all');
    });
}

/* ---------- Highlight the current section in the menu ---------- */

function initScrollSpy() {
    const links = Array.from(document.querySelectorAll('.side-nav a[href^="#"]'));
    const sections = links
        .map(a => document.getElementById(a.getAttribute('href').slice(1)))
        .filter(Boolean);
    if (!sections.length) return;

    const setActive = (id) => {
        links.forEach(a => {
            const on = a.getAttribute('href') === `#${id}`;
            a.classList.toggle('active', on);
            if (on) {
                a.setAttribute('aria-current', 'true');
                // On phones the menu scrolls sideways: keep the active item in view
                const ul = a.closest('ul');
                if (ul && ul.scrollWidth > ul.clientWidth) {
                    const left = a.offsetLeft - ul.clientWidth / 2 + a.offsetWidth / 2;
                    ul.scrollTo({ left, behavior: 'smooth' });
                }
            } else {
                a.removeAttribute('aria-current');
            }
        });
    };

    let ticking = false;
    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            ticking = false;
            const probe = window.innerHeight * 0.3;
            let current = sections[0].id;
            for (const s of sections) {
                if (s.getBoundingClientRect().top <= probe) current = s.id;
            }
            // At the very bottom, the last section wins
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
                current = sections[sections.length - 1].id;
            }
            setActive(current);
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
}

/* ---------- Gentle fade-in on scroll ---------- */

function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('in'));
        return;
    }
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
}

/* ---------- Only show "View Certificate" when the PDF exists ---------- */

function initCertificateLinks() {
    document.querySelectorAll('.cert-link').forEach(link => {
        link.hidden = true;
        fetch(link.getAttribute('href'), { method: 'HEAD' })
            .then(r => { if (r.ok) link.hidden = false; })
            .catch(() => {});
    });
}

/* ---------- Contact form (FormSubmit, with email fallback) ---------- */

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const submitBtn = document.getElementById('submitBtn');
    const status = document.getElementById('statusMessage');
    const to = 'ariana.dextre@pucp.edu.pe';

    const show = (text, type) => {
        status.textContent = text;
        status.className = `status-message ${type}`;
        status.style.display = 'block';
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        status.style.display = 'none';

        try {
            const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    _subject: `Portfolio: ${data.subject}`,
                    message: data.message,
                }),
            });
            if (!res.ok) throw new Error('send failed');
            show("Message sent! I'll get back to you soon. 💜", 'success');
            form.reset();
        } catch (err) {
            // Fallback: open the visitor's email app with the message filled in
            const subject = encodeURIComponent(data.subject);
            const body = encodeURIComponent(`Hi Ariana,\n\n${data.message}\n\n${data.name}\n${data.email}`);
            window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
            show('Opening your email app so you can send the message.', 'success');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}
