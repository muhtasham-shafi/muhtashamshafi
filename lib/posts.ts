/**
 * Blog posts. Add a new object to the top of the list to publish a post.
 * `body` is a list of blocks: plain strings are paragraphs, `{ h: "..." }`
 * is a sub-heading.
 */

export type Block = string | { h: string };

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "what-first-global-taught-me",
    title: "What two FIRST Global Challenges taught me",
    date: "2025-11-01",
    summary:
      "Singapore in 2023, Panama in 2025 — what changed between 36th of 186 and 43rd of 191, and what I'd tell the next Team Bangladesh.",
    body: [
      "I've represented Bangladesh at the FIRST Global Challenge twice: in Singapore in 2023, where we ranked 36th of 186 countries, and in Panama in 2025, where we ranked 43rd of 191.",
      { h: "Build early, break early" },
      "The teams that did best weren't the ones with the fanciest robots. They were the ones who had driven their robot into a wall a hundred times before the event. Iteration beats perfection.",
      { h: "The robot is half the job" },
      "Strategy, scouting and talking to other teams mattered as much as the machine itself. Some of the most useful things I learned came from conversations in the pit area.",
      { h: "What's next" },
      "Everything I learned at FIRST Global went straight into Miracle Robotics — especially the habit of building a rough version first and improving it in the real world.",
    ],
  },
  {
    slug: "why-i-started-miracle-robotics",
    title: "Why I started Miracle Robotics",
    date: "2026-02-01",
    summary:
      "Six prototypes, one question: how do they get out of my workshop and into the places that need them?",
    body: [
      "Over the years I built a robotic arm, a delivery and rescue drone, a smart-home system, smart irrigation, a flood bridge and an NFC toll system. Each one worked. None of them were helping anyone yet.",
      { h: "Problems close to home" },
      "Bangladesh deals with floods every monsoon, farmers who need to make every drop of water count, and traffic that eats hours out of people's days. Those are the problems I want to work on.",
      { h: "Charity-aligned by design" },
      "Miracle Robotics exists to turn those prototypes into affordable technology for communities — not just products for whoever can pay the most.",
      "If you want to help, partner, or invest, get in touch.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function sortedPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
