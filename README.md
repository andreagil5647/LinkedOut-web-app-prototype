# LinkedOut

LinkedOut is a front-end prototype built for the womENcourage 2026 Hackathon.

The project explores how technology can support wellbeing and career confidence for students and early-career people in computing. Instead of asking users to perform a polished professional identity, LinkedOut helps them explore possible paths, test assumptions with real people, and update their plans with more context.

## Event Context

This prototype was created for the ACM womENcourage 2026 Hackathon.

- Event: ACM Celebration of Women in Computing, womENcourage 2026
- Location: Sophia Antipolis, French Riviera, France
- Dates: September 30 - October 2, 2026
- Hackathon focus: technology-driven solutions for wellbeing, inclusion, education, and career growth

Official event pages:

- https://womencourage.acm.org/2026/
- https://womencourage.acm.org/2026/index.php/join-the-hackathon/

## Problem

Final-year students often face career decisions before they have enough real-world context. Professional platforms tend to reward certainty, visibility, and self-promotion, which can make normal uncertainty feel like failure.

LinkedOut is designed around a quieter question:

> What could I become, and what do I still need to understand before choosing?

## Prototype

The current prototype includes:

- A guided onboarding flow for interests, worries, and career direction
- A visual career path graph
- Role detail pages with assumptions, routes, and day-to-day reality
- An expectation check to surface misconceptions
- Reality Guide profiles for conversations with people already living the path
- A booking flow for a short Reality Check conversation
- An Expectation Delta view showing what changed after the conversation
- An organisations area with partner companies, real logos, and sponsor boundaries
- A lightweight community space for honest student questions

## Design Principles

- No follower counts
- No self-promotion feeds
- No popularity scores
- No paid ranking for partner companies
- No student data resale
- Support for undecided, non-linear, work-first, and academic routes

## Tech Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS v4
- pnpm

## Run Locally

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Deployment

This is a static Vite app. For platforms such as Render Static Site, use:

```txt
Build Command: pnpm build
Publish Directory: dist
```

## Notes

This is a hackathon prototype, not a production service. Organisation profiles, user data, bookings, and conversations are mocked to demonstrate the concept and user experience.
