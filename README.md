# muhtashamshafi.com

Personal site of Muhtasham Shafi — robotics, AI and web projects, and Miracle Robotics.

Built with Next.js 16 (App Router), React 19 and Tailwind CSS 4. Deployed on Vercel.

## Editing content

You almost never need to touch the page code:

- `lib/content.ts` — bio, stats, projects, client work, services, awards, journey timeline, Miracle Robotics, press links, socials.
- `lib/posts.ts` — blog posts (add a new object to publish a post).
- `public/assets/img/` — images.

## Pages

| Route | What |
| --- | --- |
| `/` | Home: intro, selected work, services, awards, Miracle Robotics, journey, writing, contact |
| `/work` | Full portfolio: prototypes, client work, services |
| `/awards` | Awards, achievements and photo gallery |
| `/miracle-robotics` | The company: mission, focus areas, projects |
| `/writing` | Blog posts, plus press mentions once added |

## Local development

```bash
npm install
npm run dev
```
