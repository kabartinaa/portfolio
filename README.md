# Kabartinaa S — Portfolio

A responsive, dark-themed developer portfolio built with **React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion and Lucide**.

All content (about text, skills, experience, projects, education, contact details) lives in one typed file: [`src/data/portfolio.ts`](src/data/portfolio.ts).

## Requirements

- Node.js 20.19+ or 22.12+ (required by Vite)
- npm

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command             | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload          |
| `npm run build`     | Type-check, then create a production build in `dist/` |
| `npm run preview`   | Serve the production build locally            |
| `npm run typecheck` | Run the TypeScript compiler without building  |

## Updating your content

Everything is in `src/data/portfolio.ts`. No component changes are needed for routine edits.

### Add real project links

Each project has a `links` object. The **GitHub** and **Live Demo** buttons are hidden until a URL is present:

```ts
links: {
  github: 'https://github.com/kabartinaa/subscription-tracker',
  live: 'https://your-demo-url.vercel.app',
},
```

While `links` is empty, the project dialog shows a "See my work on GitHub" button that points to your GitHub profile.

### Availability badge

The hero shows "Open to software engineering opportunities". Set `availability.open` to `false` in the data file to hide it (the `openToWork` line in the hero code panel follows the same setting).

### Resume

The resume PDF is at `public/KABARTINAA_RESUME.pdf` and is linked from the navbar, the hero and the mobile menu. To update it, replace that file (keep the name, or change `profile.resumeFile`).

## Contact form

The form validates every field (required fields and email format) and has loading, success and error states. It does not pretend to send anything when no service is connected:

- **Default (no setup):** submitting opens the visitor's email app with the message pre-filled (a `mailto:` link), and the page says plainly that nothing has been sent yet. The email address can also be copied with one click.
- **With a form service:** set `VITE_CONTACT_ENDPOINT` and messages are sent with a `POST` request (JSON body: `name`, `email`, `subject`, `message`).

Using [Formspree](https://formspree.io) as an example:

1. Create a form and copy its endpoint, e.g. `https://formspree.io/f/xxxxxxxx`.
2. Put it in `.env` (local) and in your host's environment variables (production):
   ```
   VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```
3. Rebuild. Web3Forms, Getform or your own API work the same way if they accept a JSON `POST`.

## SEO and social previews

`index.html` contains the page title, meta description, Open Graph and Twitter tags and JSON-LD. Social platforms need an absolute image URL, so after you know your domain set:

```
VITE_SITE_URL=https://your-domain.com
```

The preview image is `public/og-image.png` (1200 × 630). Replace it with your own if you like.

## Deploying

The build output is a static site in `dist/`.

**Vercel**
1. Push the project to GitHub and import it at vercel.com/new.
2. Framework preset: Vite (build command `npm run build`, output `dist`).
3. Add `VITE_SITE_URL` and, optionally, `VITE_CONTACT_ENDPOINT` under Environment Variables.

**Netlify**
1. Import the repository at app.netlify.com. `netlify.toml` already sets the build command and publish directory.
2. Add the same environment variables under Site settings.

## Project structure

```
public/
  KABARTINAA_RESUME.pdf   resume download
  favicon.svg, og-image.png
src/
  data/portfolio.ts       all content and TypeScript types
  components/
    Navbar, Hero, EditorPanel, RotatingText
    About, Skills, Experience, Education, Contact, Footer
    Projects, ProjectCard, ProjectModal, ProjectVisuals
    SectionHeading, Reveal, TechIcon, SocialIcons, BackToTop
  hooks/                  active-section tracking, scroll helpers
  index.css               design tokens (colors, fonts) and base styles
  App.tsx, main.tsx
```

## Design tokens

Colors, fonts and radii are defined once in the `@theme` block of `src/index.css` (navy and charcoal surfaces, electric blue and violet accents, Geist and Geist Mono typefaces). Change them there and the whole site follows.

## Accessibility and performance notes

- Semantic landmarks, a skip link, visible focus rings and keyboard-operable navigation, menu, dialogs and form.
- Project details use the native `<dialog>` element (focus trap, Escape to close, focus returns to the button that opened it).
- `prefers-reduced-motion` is respected: movement animations, the rotating headline and the typed code panel become static.
- Fonts are self-hosted through Fontsource, so there are no third-party font requests. Project previews are inline SVG, so there are no image downloads.
- The production JavaScript bundle is about 144 kB gzipped.
