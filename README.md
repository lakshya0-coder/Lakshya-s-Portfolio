# Lakshya Jangir — Portfolio

A multi-page personal portfolio site for Lakshya Kumar Jangir, a full-stack developer (Python/React) and BCA student. Built as static HTML/CSS/JS — no build step, no framework, no dependencies beyond Google Fonts.

**Live repo list:** the Repositories page fetches directly from the GitHub REST API (`api.github.com/users/lakshya0-coder/repos`) at load time, so it always reflects the current public repos instead of a hardcoded snapshot.

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero intro, animated "build pipeline" strip, recently shipped projects |
| About | `about.html` | Background, facts, and a breakdown of the build process |
| Projects | `projects.html` | Featured, written-up case studies of key builds |
| Repositories | `repositories.html` | Live, filterable list of all public GitHub repos |
| Experience | `experience.html` | Internship timeline, education, and skills |
| Contact | `contact.html` | Contact links + a form that opens a pre-filled email |

## Structure

```
site/
├── index.html
├── about.html
├── projects.html
├── repositories.html
├── experience.html
├── contact.html
├── css/
│   └── style.css        # shared theme, layout, animations
└── js/
    ├── main.js           # nav, scroll reveal, progress bar, page transitions
    └── repos.js          # live GitHub API fetch + filtering (repositories.html only)
```

## Running locally

No build tools required. Either:

- Open `index.html` directly in a browser, or
- Serve the folder locally so the GitHub API fetch works reliably across browsers:

  ```bash
  cd site
  python3 -m http.server 8000
  ```

  Then visit `http://localhost:8000`.

## Deploying

This is a static site — it can be deployed as-is to any static host:

- **GitHub Pages:** push the contents of `site/` to a repo and enable Pages on the branch/folder
- **Netlify / Vercel:** drag-and-drop the `site/` folder, or connect the repo — no build command needed

## Editing content

- **Featured projects:** edit the cards directly in `projects.html`
- **Repo list:** updates automatically — no edits needed, it's pulled live from GitHub
- **Colors/fonts/animations:** all defined as CSS variables and rules at the top of `css/style.css`
- **Contact details:** update the `mailto:` links and social URLs in each page's footer and on `contact.html`

## Tech notes

- Fonts: Fraunces (headings), Inter (body), IBM Plex Mono (labels/data) via Google Fonts
- No JS frameworks — vanilla JS for nav state, scroll reveal (IntersectionObserver), and the GitHub API call (`fetch`)
- Respects `prefers-reduced-motion`
