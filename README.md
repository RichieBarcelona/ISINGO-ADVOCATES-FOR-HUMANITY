# Isingo Advocates for Humanity — static website

Official informational website for **Isingo Advocates for Humanity**, an independent, not-for-profit, non-partisan organisation in Uganda working on civil liberties, human rights, humanitarian services and education.

This is a frontend-only site. There is no database, login, or case-management system.

## Stage 1 (current)

Completed:

- Project structure
- Global design system (`assets/css/style.css`, `assets/css/responsive.css`)
- Shared JavaScript (`assets/js/main.js`)
- Header, navigation, footer (`components/` plus duplicated markup in `index.html`)
- Homepage (`index.html`)
- `robots.txt` and `sitemap.xml`

Later pages are linked in the navigation but are not built yet. They will be added in Stages 2–5.

## How to test Stage 1

From this folder, start a local server. Examples:

```bash
npx --yes serve -l 8080
```

or

```bash
python -m http.server 8080
```

Then open:

- `http://localhost:8080/`
- or `http://localhost/isingo/` if the folder is served from a local Apache/Nginx `isingo` directory

Check:

1. Homepage hero, introduction, three focus cards, mission, vision, principles and assistance call-to-action.
2. Desktop navigation and dropdowns.
3. Mobile hamburger menu at 320px, 375px, 425px and 768px.
4. Skip link, keyboard focus, and back-to-top button.
5. Contact details in the top bar and footer: Nkrumah Road, Light Arcade Level 3 Room G13; (+256) 704 299 423; (+256) 783 511 246; greenhillnps@gmail.com.

## Content rule

Organisation facts come from the supplied brief. Missing items are marked for the organisation to supply. Do not treat placeholder text as official policy.

The homepage mission sentence follows the meaning in the development brief. Replace it with the exact official mission wording if the organisation document differs.

## Logo

The current mark is a temporary text-based logo (`ISINGO` / `Advocates for Humanity`) so an official logo file can replace `assets/images/logo/logo-mark.svg` later.

## Deployment

The site can be deployed as static files to GitHub Pages, Netlify, Vercel, or any standard static host. After a domain is confirmed, update canonical URLs in each page, `robots.txt` and `sitemap.xml`.
