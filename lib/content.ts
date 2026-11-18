/**
 * All site content lives here. Edit this file to update the website —
 * no need to touch the page components.
 */

export const profile = {
  name: "Muhtasham Shafi",
  role: "Student innovator · Robotics & AI",
  location: "Dhaka, Bangladesh",
  tagline: "Building the future, one prototype at a time.",
  intro:
    "I build robots, AI systems and websites — and I founded Miracle Robotics to turn those prototypes into technology that helps communities in Bangladesh.",
  bio: [
    "I started with a line-following robot in 2019. Since then I've represented Bangladesh three times at the FIRST Global Challenge, joined an MIT robotics workshop, debated at the Oxford Union, and built six working prototypes aimed at real problems — floods, farming, traffic and factory work.",
    "Today I run Miracle Robotics and take on client work building websites, AI assistants and custom hardware.",
  ],
  email: "me@muhtashamshafi.com",
  photo: "/assets/img/1st.jpg",
  photoAlt: "/assets/img/2nd.jpg",
};

export const stats = [
  { value: "7+", label: "Years building" },
  { value: "3×", label: "FIRST Global, Team Bangladesh" },
  { value: "6", label: "Working prototypes" },
];

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/md-muhtasham-musharof-shafi-055a20317/" },
  { name: "GitHub", href: "https://github.com/muhtasham-shafi" },
  { name: "YouTube", href: "https://www.youtube.com/@MuhtashamShafi.07" },
  { name: "Instagram", href: "https://www.instagram.com/muhtasham.shafi/" },
  { name: "WhatsApp", href: "https://wa.me/8801711903180" },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  metrics: { value: string; label: string }[];
  image: string;
};

export const projects: Project[] = [
  {
    slug: "robotic-arm",
    title: "Industrial Robotic Arm",
    category: "Industrial",
    status: "Scaling",
    summary:
      "A multi-axis programmable arm for repetitive, hazardous and precision tasks in garment, pharma and electronics factories.",
    metrics: [
      { value: "−40%", label: "Labour cost" },
      { value: "3×", label: "Throughput" },
      { value: "24/7", label: "Operation" },
    ],
    image: "/assets/img/p01-robotic-arm.jpg",
  },
  {
    slug: "drone",
    title: "Drone Delivery & Rescue",
    category: "Logistics",
    status: "Seeking investment",
    summary:
      "A dual-purpose drone fleet: commercial delivery for ports, and aid drops for flood-stricken communities.",
    metrics: [
      { value: "−45%", label: "Per-unit cost" },
      { value: "−60%", label: "CO₂ impact" },
    ],
    image: "/assets/img/p02-drone.jpg",
  },
  {
    slug: "smart-home",
    title: "AI Smart Home",
    category: "Consumer",
    status: "Miniaturising",
    summary:
      "Presence sensors and daily schedules let the house manage its own appliances to save energy.",
    metrics: [
      { value: "−40%", label: "Energy bills" },
      { value: "2.1 yrs", label: "Payback" },
    ],
    image: "/assets/img/p03-smart-home.jpg",
  },
  {
    slug: "irrigation",
    title: "AI Smart Irrigation",
    category: "AgriTech",
    status: "Prototype",
    summary:
      "Per-plant soil moisture sensors; the AI recommends how much water and what soil mix each plant needs.",
    metrics: [
      { value: "−50%", label: "Water use" },
      { value: "+30%", label: "Yield" },
    ],
    image: "/assets/img/p04-irrigation.jpg",
  },
  {
    slug: "flood-bridge",
    title: "Floor-Lifting Flood Bridge",
    category: "Climate",
    status: "Design complete",
    summary:
      "A hydraulic bridge deck that rises automatically with the water, keeping roads open during monsoon floods.",
    metrics: [{ value: "Auto", label: "Water-level trigger" }],
    image: "/assets/img/p05-flood-bridge.jpg",
  },
  {
    slug: "nfc-toll",
    title: "NFC Smart Toll",
    category: "Mobility",
    status: "Prototype ready",
    summary:
      "Tap-and-go toll payments that cut a 3-minute transaction down to 3 seconds.",
    metrics: [
      { value: "3 s", label: "Per vehicle" },
      { value: "−85%", label: "Queue length" },
    ],
    image: "/assets/img/p06-nfc-toll.jpg",
  },
];

export type Build = {
  title: string;
  year: string;
  category: string;
  summary: string;
  result?: string;
  image?: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string;
};

/** Competition robots, software and earlier builds (shown on the Work page). */
export const builds: Build[] = [
  {
    title: "FIRST Global robot — Korea",
    year: "2026",
    category: "Competition robot",
    summary:
      "Team Bangladesh's robot for the FIRST Global Challenge in Korea — designed, built, wired and programmed by our student team.",
    image: "/assets/img/journey/2026-korea.jpg",
    position: "50% 72%",
  },
  {
    title: "FIRST Global robot — Panama",
    year: "2025",
    category: "Competition robot",
    summary:
      "An aluminium-frame competition robot built for the FIRST Global Challenge in Panama City.",
    result: "43rd of 191 countries",
    image: "/assets/img/journey/2023-innovation.jpg",
    position: "50% 70%",
  },
  {
    title: "FIRST Global robot — Singapore",
    year: "2023",
    category: "Competition robot",
    summary:
      "Built for the “Hydrogen Horizons” challenge — my first time representing Bangladesh internationally.",
    result: "36th of 186 countries",
    image: "/assets/img/journey/2023-fgc-singapore.jpg",
  },
  {
    title: "Jarvis",
    year: "Ongoing",
    category: "AI assistant",
    summary:
      "My own voice-aware AI assistant. It keeps context across a conversation and connects to home automation and web tools.",
  },
  {
    title: "AI home automation",
    year: "2022",
    category: "Smart home",
    summary:
      "My first complete system: sensors, relays and software that switch home appliances automatically — the starting point for the AI Smart Home prototype.",
  },
  {
    title: "Line-following robot",
    year: "2019",
    category: "First build",
    summary:
      "An Arduino robot with three IR sensors that tracks a black line. The first time I saw code make something move.",
    image: "/assets/img/journey/2019-lfr.jpg",
  },
];

export const clientWork = [
  {
    title: "PanamTanker.com",
    summary:
      "Company website and platform for one of Bangladesh's leading tanker logistics fleets.",
    href: "https://panamtanker.com/",
    image: "/assets/img/panamtanker.png",
  },
];

export const services = [
  {
    title: "Websites & storefronts",
    summary:
      "Fast, responsive, SEO-friendly sites built from scratch — no bloated templates, startup-friendly pricing.",
  },
  {
    title: "AI assistants",
    summary:
      "Custom chatbots like Jarvis, my own voice-aware assistant that remembers context and connects to home and web tools.",
  },
  {
    title: "Hardware & automation",
    summary:
      "Robotics, IoT and smart-home builds — sensors, actuators and embedded software, from prototype to install.",
  },
];

export type Award = {
  year: string;
  title: string;
  detail: string;
  kind: "Competition" | "Olympiad" | "Program";
};

export const awards: Award[] = [
  {
    year: "2026",
    title: "FIRST Global Challenge — Korea",
    detail: "Team Bangladesh",
    kind: "Competition",
  },
  {
    year: "2025",
    title: "FIRST Global Challenge — Panama",
    detail: "Team Bangladesh · ranked 43rd of 191 countries",
    kind: "Competition",
  },
  {
    year: "2025",
    title: "Global Youth Summit — Hanoi",
    detail: "Worked with international delegates on SDG solutions",
    kind: "Program",
  },
  {
    year: "2024",
    title: "National Mental Math Olympiad",
    detail: "4th place",
    kind: "Olympiad",
  },
  {
    year: "2024",
    title: "MIT Robotics Workshop",
    detail: "Selected participant",
    kind: "Program",
  },
  {
    year: "2024",
    title: "Oxford Union Debating",
    detail: "Participant",
    kind: "Program",
  },
  {
    year: "2023",
    title: "FIRST Global Challenge — Singapore",
    detail: "Team Bangladesh · ranked 36th of 186 countries · “Hydrogen Horizons”",
    kind: "Competition",
  },
  {
    year: "2022",
    title: "National Mental Math Olympiad",
    detail: "6th place",
    kind: "Olympiad",
  },
];

export const timeline = [
  {
    year: "2026",
    title: "Miracle Robotics, and Korea",
    text: "Turned years of prototyping into a company building community tech for Bangladesh — and represented Team Bangladesh at FIRST Global in Korea.",
    image: "/assets/img/journey/2026-miracle.jpg",
  },
  {
    year: "2025",
    title: "Hanoi, then Panama",
    text: "Global Youth Summit in Vietnam, then Team Bangladesh at FIRST Global Panama — 43rd of 191.",
    image: "/assets/img/journey/panama.jpg",
  },
  {
    year: "2024",
    title: "MIT and Oxford",
    text: "MIT robotics workshop, Oxford Union debating, and 4th in the National Mental Math Olympiad.",
    image: "/assets/img/journey/2024.jpg",
  },
  {
    year: "2023",
    title: "FIRST Global Singapore",
    text: "First time representing Bangladesh internationally — 36th of 186 countries.",
    image: "/assets/img/journey/2023-fgc-singapore.jpg",
  },
  {
    year: "2022",
    title: "First real system",
    text: "Built an AI home-automation system, and placed 6th in the National Mental Math Olympiad.",
    image: "/assets/img/journey/2022-olympiad.jpg",
  },
  {
    year: "2019",
    title: "The first robot",
    text: "A line-follower. The first time I saw code make something move — and I was hooked.",
    image: "/assets/img/journey/2019-lfr.jpg",
  },
];

export const miracleRobotics = {
  name: "Miracle Robotics",
  founded: "2026",
  oneLiner: "Robotics and AI built for the problems Bangladesh actually faces.",
  mission:
    "Miracle Robotics turns working prototypes into affordable, charity-aligned technology for communities in Bangladesh — from flood resilience to farming to factory safety.",
  focus: [
    {
      title: "Climate resilience",
      text: "Flood bridges and rescue drones that keep people connected and supplied during the monsoon.",
    },
    {
      title: "Agriculture",
      text: "Low-cost sensing and AI that help farmers use less water and grow more.",
    },
    {
      title: "Industry & mobility",
      text: "Automation for factories and faster, cashless infrastructure like NFC tolling.",
    },
  ],
  // Which projects to feature on the Miracle Robotics page (by slug).
  projectSlugs: ["flood-bridge", "drone", "irrigation", "robotic-arm"],
  image: "/assets/img/journey/2026-miracle.jpg",
};

export type PressItem = {
  title: string;
  outlet: string;
  date: string; // YYYY-MM-DD
  href: string;
};

/**
 * Add news articles, interviews and features here. The Press section
 * appears automatically on the Writing page once this list has items.
 * Example:
 * { title: "Dhaka teen builds flood bridge", outlet: "The Daily Star", date: "2026-03-01", href: "https://..." },
 */
export const press: PressItem[] = [];
