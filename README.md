# Professional Portfolio - Abdullah Al Moneem

A modern, professional portfolio website showcasing full-stack development skills, problem-solving achievements, and projects.

## 🎨 Design Features

- **Modern Gradient Theme**: Cyberpunk-inspired color scheme with animated gradient orbs
- **Custom Typography**: Syne font for headings, JetBrains Mono for body text
- **Smooth Animations**: Fade-in effects, hover animations, and scroll-triggered animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Animated navigation, gradient text effects, and parallax scrolling

## 🚀 Key Sections

1. **Hero Section**
   - Dynamic introduction with availability status
   - Quick stats showcase (500+ problems solved, 33 repos, CSE Fest Champion)
   - Call-to-action buttons

2. **About Section**
   - Professional introduction
   - Highlight achievements with visual icons
   - Career journey and goals

3. **Skills Section**
   - Organized by categories:
     - Frontend Development (HTML, CSS, JS, React, TypeScript, Tailwind)
     - Backend Development (Node.js, Express, Python, Django, FastAPI)
     - Database & Tools (MongoDB, MySQL, PostgreSQL, Prisma)
     - Problem Solving & DSA (C++, Algorithms, Competitive Programming)
     - DevOps & Tools (Git, GitHub, Docker, VS Code)
     - Soft Skills (Teamwork, Communication, Problem Solving)

4. **Projects Section**
   - Featured projects from GitHub
   - CSE Fest Hackathon (Championship project)
   - Hospital Management System (OOP demonstration)
   - Problem Solving Journey (500+ solutions)

5. **Achievements Section**
   - CSE Fest 2025 Champion 🏆
   - DevFest 2023 Participant
   - 500+ Problems Solved
   - 33 GitHub Repositories

6. **Contact Section**
   - Working contact form (FormSubmit integration)
   - Contact information cards
   - Social media links

## 📁 Project Structure

```
portfolio/
├── index.html                  # Semantic HTML shell + meta/OG/JSON-LD
├── assets/
│   ├── images/                 # photos, project screenshots, favicons
│   ├── icons/                  # UI icons (SVG)
│   └── resume/                 # downloadable PDFs
├── css/
│   ├── variables.css           # design tokens (colors, fonts, spacing)
│   ├── base.css                # resets, typography, motion preferences
│   ├── layout.css              # container, sections, skip-link
│   ├── components.css          # nav, buttons, tags, back-to-top, loader
│   ├── sections.css            # per-section styles
│   └── responsive.css          # media queries
├── js/
│   ├── main.js                 # fetches data/portfolio.json, renders DOM
│   ├── observer.js             # fade-in + active navbar highlighting
│   └── animations.js           # scroll progress, back-to-top, loader
├── data/
│   └── portfolio.json          # single source of truth for content
├── CNAME                       # custom domain (moneem.pro.bd)
└── README.md
```

## 🛠️ Setup Instructions

1. **Profile image**:
   - Replace `assets/images/moneem1.jpg`
   - The path is referenced in `index.html` (Open Graph `og:image`) and can be changed there.

2. **Update contact email**:
   - Current: `moneem.all.abdullah@gmail.com`
   - Edit `data/portfolio.json` → `site.email` and the matching entry in `contact.cards`.

3. **Update CV/Resume link**:
   - Download URL is in `data/portfolio.json` → `hero.actions[0].href`
     and `contact.cards[Resume / CV]`.
   - To also serve a local PDF, drop the file in `assets/resume/` and update the JSON.

4. **Add project images** (optional):
   - The project cards use text-only layouts by default.
   - Drop screenshots into `assets/images/` and reference them from `data/portfolio.json` (`projects[].image`).

## 🎨 Customization

### Colors
Edit CSS variables in `css/variables.css`:
```css
--bg:        #f5f3ef;
--surface:   #edeae4;
--border:    #d6d1c8;
--text:      #1a1916;
--muted:     #6b6760;
--accent:    #2b5be0;
--accent-dk: #1a3ea8;
```

### Fonts
Current fonts (Google Fonts):
- **Headings**: DM Serif Display
- **Body**: DM Sans
- **Mono**: DM Mono

To change fonts, update the Google Fonts URL in `index.html` and the `--font-serif`, `--font-sans`, `--font-mono` tokens in `css/variables.css`.

### Content
- All copy, projects, skills, hackathons, and contact links live in `data/portfolio.json`.
- The `js/main.js` module reads this file at load time and renders the dynamic sections.
- For a fully static site (no fetch), edit the matching HTML blocks directly in `index.html` — they're rendered as a no-JS fallback.

## 🌐 Deployment

### GitHub Pages
1. Create a new repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repo-name`

### Netlify/Vercel
1. Connect your GitHub repository
2. Deploy with default settings
3. Your site will be live instantly

## 📱 Social Links

Make sure to update all social media links in:
- Navigation (if added)
- Footer section (lines 556-576 in index.html)

Current links:
- GitHub: https://github.com/Moneemabdullah
- LinkedIn: https://www.linkedin.com/in/moneem-all-abdullah-4b07a9288/
- LeetCode: https://leetcode.com/user7674pr/
- Facebook: https://www.facebook.com/moneemall.abdullah/
- Instagram: https://www.instagram.com/moneem.abdullah/

## 💡 Features to Add Later

- Blog section for technical articles
- Testimonials from clients/colleagues
- More detailed project case studies
- Skills progress bars with percentages
- Dark/Light theme toggle
- Language switcher
- Analytics integration

## 🐛 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📄 License

Feel free to use this template for your own portfolio. Attribution appreciated but not required.

## 🙏 Credits

- Design: Custom design based on modern web trends
- Icons: Font Awesome 6.4.0
- Fonts: Google Fonts (Syne, JetBrains Mono)
- Form: FormSubmit.co

---

**Made with ❤️ by Abdullah Al Moneem**

*"Time is just a fleeting shadow. A race you can't pause. Chase it."*
# personal-portfolio
