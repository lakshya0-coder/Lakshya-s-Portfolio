const GH_USER = 'lakshya0-coder';
const grid = document.getElementById('repo-grid');
const countEl = document.getElementById('repo-count');
const filterWrap = document.getElementById('repo-filters');

const LANG_COLORS = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6',
  HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', 'C++': '#f34b7d',
  C: '#555555', PHP: '#4F5D95', Shell: '#89e051', Jupyter: '#DA5B0B',
  default: '#8a8a76'
};

function skeletons(n) {
  grid.innerHTML = '';
  for (let i = 0; i < n; i++) {
    const s = document.createElement('div');
    s.className = 'repo-skel';
    grid.appendChild(s);
  }
}

function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days < 1) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 30) return days + ' days ago';
  const months = Math.floor(days / 30);
  if (months < 12) return months + ' mo ago';
  return Math.floor(months / 12) + ' yr ago';
}

function render(repos) {
  grid.innerHTML = '';
  if (!repos.length) {
    grid.innerHTML = '<div class="repo-error">No repositories match this filter.</div>';
    return;
  }
  repos.forEach((r, i) => {
    const a = document.createElement('a');
    a.className = 'repo-card';
    a.href = r.html_url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.style.animationDelay = (i * 0.05) + 's';
    const color = LANG_COLORS[r.language] || LANG_COLORS.default;
    a.innerHTML = `
      <div class="repo-card-top">
        <span class="repo-card-name">${r.name}</span>
        <span class="repo-arrow">↗</span>
      </div>
      <div class="repo-card-desc">${r.description ? r.description : 'No description provided.'}</div>
      <div class="repo-card-meta">
        ${r.language ? `<span><span class="lang-dot" style="background:${color}"></span>${r.language}</span>` : ''}
        <span>★ ${r.stargazers_count}</span>
        <span>updated ${timeAgo(r.updated_at)}</span>
      </div>
    `;
    grid.appendChild(a);
  });
}

async function loadRepos() {
  skeletons(6);
  try {
    const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error('GitHub API returned ' + res.status);
    const repos = await res.json();
    const clean = repos.filter(r => !r.fork).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    countEl.textContent = clean.length + ' public repositories';

    const langs = ['All', ...new Set(clean.map(r => r.language).filter(Boolean))];
    filterWrap.innerHTML = '';
    langs.forEach(lang => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (lang === 'All' ? ' active' : '');
      btn.textContent = lang;
      btn.addEventListener('click', () => {
        filterWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render(lang === 'All' ? clean : clean.filter(r => r.language === lang));
      });
      filterWrap.appendChild(btn);
    });

    render(clean);
  } catch (err) {
    grid.innerHTML = `<div class="repo-error">Couldn't load live repositories from GitHub right now (${err.message}). Browse them directly at <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">github.com/${GH_USER}</a>.</div>`;
    countEl.textContent = '';
  }
}

loadRepos();
