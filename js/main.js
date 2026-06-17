/* =====================================================
   main.js
   Entry point. Fetches data/portfolio.json and renders
   the dynamic sections (skills, projects, hackathons,
   contact, hero actions, footer). Static content
   (about paragraphs, experience) can also be rendered
   from JSON; both supported.
   ===================================================== */

(function () {
  'use strict';

  const DATA_URL = 'data/portfolio.json';

  /* ---------- Utilities ---------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const escapeHTML = (str = '') =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  // Build rel attribute for external links
  const relFor = (href) => {
    if (!href) return '';
    return /^https?:\/\//.test(href) ? 'noopener noreferrer' : '';
  };
  const targetFor = (href) => (/^https?:\/\//.test(href) ? '_blank' : '_self');

  /* ---------- Section renderers ---------- */

  function renderNav(site, items) {
    const logo = $('.nav-logo');
    if (logo) {
      logo.textContent = site.shortName || site.name;
      logo.setAttribute('href', '#hero');
    }
    const list = $('.nav-links');
    if (!list || !items) return;
    list.innerHTML = items
      .map(
        (item) =>
          `<li><a href="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a></li>`
      )
      .join('');
  }

  function renderHeroActions(actions) {
    const wrap = $('.hero-actions');
    if (!wrap || !actions) return;
    wrap.innerHTML = actions
      .map((a) => {
        const cls = a.variant === 'primary' ? 'btn btn-primary' : 'btn btn-outline';
        const rel = a.external ? ' rel="noopener noreferrer"' : '';
        const target = a.external ? ' target="_blank"' : '';
        return `<a class="${cls}" href="${escapeHTML(a.href)}"${target}${rel}>${escapeHTML(a.label)}</a>`;
      })
      .join('');
  }

  function renderBadges(badges) {
    const wrap = $('.hero-badge');
    if (!wrap || !badges) return;
    wrap.innerHTML = badges
      .map(
        (b, i) => `
          ${i > 0 ? '<div class="badge-divider"></div>' : ''}
          <div class="badge-item">
            <span class="badge-num">${escapeHTML(b.num)}</span>
            <span class="badge-label">${escapeHTML(b.label)}</span>
          </div>`
      )
      .join('');
  }

  function renderAbout(about) {
    if (!about) return;
    const section = $('#about');
    if (!section) return;

    const label = section.querySelector('.section-label');
    const heading = section.querySelector('h2');
    if (label)  label.textContent  = about.label;
    if (heading) heading.textContent = about.heading;

    const text = section.querySelector('.about-text');
    if (text && about.paragraphs) {
      text.innerHTML = about.paragraphs.map((p) => `<p>${escapeHTML(p)}</p>`).join('');
    }

    const details = section.querySelector('.about-details');
    if (details && about.details) {
      details.innerHTML = about.details
        .map((row) => {
          let val;
          if (row.href) {
            const rel = relFor(row.href);
            const tgt = targetFor(row.href);
            const relAttr = rel ? ` rel="${rel}"` : '';
            const tgtAttr = tgt === '_blank' ? ' target="_blank"' : '';
            val = `<a href="${escapeHTML(row.href)}"${tgtAttr}${relAttr}>${escapeHTML(row.value)}</a>`;
          } else {
            val = escapeHTML(row.value);
          }
          return `
            <div class="detail-row">
              <span class="detail-key">${escapeHTML(row.key)}</span>
              <span class="detail-val">${val}</span>
            </div>`;
        })
        .join('');
    }
  }

  function renderSkills(skills) {
    if (!skills) return;
    const section = $('#skills');
    if (!section) return;

    const label = section.querySelector('.section-label');
    const heading = section.querySelector('h2');
    if (label)  label.textContent  = skills.label;
    if (heading) heading.textContent = skills.heading;

    const grid = section.querySelector('.skills-grid');
    if (!grid || !skills.categories) return;

    grid.innerHTML = skills.categories
      .map(
        (cat) => `
          <article class="skill-block">
            <h3>${escapeHTML(cat.name)}</h3>
            <div class="tags">
              ${cat.tags
                .map(
                  (t) =>
                    `<span class="tag${t.highlight ? ' hi' : ''}">${escapeHTML(t.label)}</span>`
                )
                .join('')}
            </div>
          </article>`
      )
      .join('');
  }

  function renderProjects(projects) {
    const section = $('#projects');
    if (!section) return;
    const list = section.querySelector('.projects-list');
    if (!list || !projects) return;

    list.innerHTML = projects
      .map(
        (p) => `
          <article class="project-card">
            <header class="project-header">
              <h3 class="project-name">${escapeHTML(p.name)}</h3>
              <div class="project-links">
                ${(p.links || [])
                  .map((l) => {
                    const rel = relFor(l.href);
                    const tgt = targetFor(l.href);
                    const relAttr = rel ? ` rel="${rel}"` : '';
                    const tgtAttr = tgt === '_blank' ? ' target="_blank"' : '';
                    return `<a class="proj-link" href="${escapeHTML(l.href)}"${tgtAttr}${relAttr}>${escapeHTML(l.label)}</a>`;
                  })
                  .join('')}
              </div>
            </header>
            <p class="project-desc">${escapeHTML(p.description)}</p>
            <div class="project-stack" aria-label="Tech stack">
              ${p.stack.map((s) => `<span class="stack-tag">${escapeHTML(s)}</span>`).join('')}
            </div>
          </article>`
      )
      .join('');
  }

  function renderHackathons(hackathons) {
    if (!hackathons) return;
    const section = $('#hackathons');
    if (!section) return;

    const label = section.querySelector('.section-label');
    const heading = section.querySelector('h2');
    if (label)  label.textContent  = hackathons.label;
    if (heading) heading.textContent = hackathons.heading;

    const list = section.querySelector('.hackathons-list');
    if (!list) return;

    list.innerHTML = hackathons.items
      .map((h) => {
        const subHTML = (h.subParts || [])
          .map((part) =>
            part.href
              ? `<a href="${escapeHTML(part.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(part.text)}</a>`
              : escapeHTML(part.text)
          )
          .join('');
        return `
          <div class="hackathon-row">
            <span class="hackathon-place" aria-hidden="true">${escapeHTML(h.place)}</span>
            <div>
              <div class="hackathon-name">${escapeHTML(h.name)}</div>
              <div class="hackathon-sub">${subHTML}</div>
            </div>
            <span class="hackathon-year">${escapeHTML(h.year)}</span>
          </div>`;
      })
      .join('');
  }

  function renderExperience(exp) {
    if (!exp) return;
    const section = $('#experience');
    if (!section) return;

    const label = section.querySelector('.section-label');
    const heading = section.querySelector('h2');
    const role  = section.querySelector('.exp-role');
    const date  = section.querySelector('.exp-date');
    const org   = section.querySelector('.exp-org');
    const desc  = section.querySelector('.exp-desc');

    if (label)   label.textContent  = exp.label;
    if (heading) heading.textContent = exp.heading;
    if (role)    role.textContent    = exp.role;
    if (date)    date.textContent    = exp.date;
    if (org)     org.textContent     = exp.org;

    if (desc && exp.descriptionParts) {
      desc.innerHTML = exp.descriptionParts
        .map((part) =>
          part.href
            ? `<a href="${escapeHTML(part.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(part.text)}</a>`
            : escapeHTML(part.text)
        )
        .join('');
    }
  }

  function renderContact(contact) {
    if (!contact) return;
    const section = $('#contact');
    if (!section) return;

    const label = section.querySelector('.section-label');
    const heading = section.querySelector('h2');
    if (label)  label.textContent  = contact.label;
    if (heading) heading.textContent = contact.heading;

    const grid = section.querySelector('.contact-grid');
    if (!grid) return;

    grid.innerHTML = contact.cards
      .map((c) => {
        const rel = relFor(c.href);
        const tgt = targetFor(c.href);
        const relAttr = rel ? ` rel="${rel}"` : '';
        const tgtAttr = tgt === '_blank' ? ' target="_blank"' : '';
        const ariaLabel = `${c.platform}: ${c.handle.replace(/[→]/g, '').trim()}`;
        return `
          <a class="contact-card" href="${escapeHTML(c.href)}"${tgtAttr}${relAttr} aria-label="${escapeHTML(ariaLabel)}">
            <span class="contact-platform">${escapeHTML(c.platform)}</span>
            <span class="contact-handle">${escapeHTML(c.handle)}</span>
          </a>`;
      })
      .join('');
  }

  function renderFooter(footer) {
    if (!footer) return;
    const f = $('.site-footer');
    if (!f) return;
    const ps = f.querySelectorAll('p');
    if (ps[0]) ps[0].textContent = footer.left;
    if (ps[1]) {
      if (footer.right && footer.right.href) {
        const rel = relFor(footer.right.href);
        const tgt = targetFor(footer.right.href);
        const relAttr = rel ? ` rel="${rel}"` : '';
        const tgtAttr = tgt === '_blank' ? ' target="_blank"' : '';
        ps[1].innerHTML = `<a href="${escapeHTML(footer.right.href)}"${tgtAttr}${relAttr}>${escapeHTML(footer.right.label)}</a>`;
      } else {
        ps[1].textContent = footer.right;
      }
    }
  }

  /* ---------- Meta (title, description) ---------- */
  function applyMeta(site) {
    if (!site) return;
    if (site.title) document.title = site.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && site.description) desc.setAttribute('content', site.description);
  }

  /* ---------- Boot ---------- */
  function boot() {
    fetch(DATA_URL, { cache: 'no-cache' })
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load portfolio data: ' + r.status);
        return r.json();
      })
      .then((data) => {
        renderNav(data.site, data.nav);
        renderHeroActions(data.hero && data.hero.actions);
        renderBadges(data.hero && data.hero.badges);
        renderAbout(data.about);
        renderSkills(data.skills);
        renderProjects(data.projects);
        renderHackathons(data.hackathons);
        renderExperience(data.experience);
        renderContact(data.contact);
        renderFooter(data.footer);
        applyMeta(data.site);
        // Notify observer that new .fade elements were added
        document.dispatchEvent(new CustomEvent('portfolio:rendered'));
      })
      .catch((err) => {
        // Fail quietly — static content is already in the HTML as a fallback
        console.warn('[portfolio] data load failed; using static fallback.', err);
        document.dispatchEvent(new CustomEvent('portfolio:rendered'));
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
