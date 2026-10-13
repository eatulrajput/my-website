Portfolio Website: PRD and Technical Spec
React Native Developer Portfolio · Version 1.0 · October 2026
Part 1: Product Requirements Document

1. Overview
   A fast, minimal, one-page portfolio website (plus a blog) for a 2026 graduate React Native developer. The site presents the developer as a capable, in-demand mobile engineer. It must make hiring managers and recruiters want to reach out, without any language that reads as pleading for a job.
2. Goals
3. Convince a recruiter or engineering manager within 30 seconds that the developer ships polished mobile apps.
4. Drive a clear action: contact by email, view a project, or open the resume.
5. Demonstrate engineering judgment through the site itself (speed, accessibility, clean code).
6. Provide a blog that shows the ability to explain technical problems clearly.
7. Non-goals
   • No backend, database, user accounts, or authentication.
   • No contact form, CMS, or e-commerce.
   • No dark mode at launch.
   • No more than three featured projects.
   • No multi-language support in v1.
8. Target audience
   Persona
   Context
   What they need
   Recruiter
   Opens the link from a CV or LinkedIn, often on a phone, spends under a minute
   Role fit, availability, proof of real work, easy contact
   Engineering manager
   Checks work quality and communication
   Real apps, stack, the developer's role, outcomes
   Senior engineer
   May open the GitHub repo and blog
   Code quality, technical depth, clear writing
   Startup founder or freelance client
   Looking for a mobile builder
   Shipped apps, speed, how to start a conversation
9. Positioning and tone
   • Positioning: a mobile developer who builds fast, polished React Native apps, and who cares about performance and design.
   • Tone: confident, plain, specific. Show work, not adjectives.
   • Availability: communicated as a status ("Available from [month] 2026"), never as a request.
   • Avoid: "fresh graduate seeking opportunity", "passionate", "hardworking", "please give me a chance", skill percentage bars.
10. Scope
    In scope (v1)
    • One-page home with Hero, Selected Work, About, Skills, Contact.
    • Blog index and individual MDX post pages.
    • Resume link, social links, SEO and social sharing metadata.
    • Scroll-reveal motion with reduced-motion support.
    Out of scope (later)
    • Individual case study pages per project (v1.1, via the projects content collection).
    • Dark mode, RSS styling polish, analytics dashboards, newsletter.
11. Functional requirements
    ID
    Requirement
    Priority
    F1
    Hero shows headline, one-line subtext, availability pill, and two buttons (View work, Get in touch)
    Must
    F2
    Selected Work displays 2 to 3 featured projects from a content collection, ordered by an order field
    Must
    F3
    Each project card shows title, one-line problem, role, stack tags, outcome or lesson, and links (live, store, GitHub)
    Must
    F4
    Projects display in a phone mockup using a short looping muted video, with an image fallback
    Must
    F5
    About section has a short paragraph and an optional photo
    Must
    F6
    Skills section shows a compact list of technologies grouped by category, with no bars or percentages
    Must
    F7
    Contact section shows email (mailto), GitHub, LinkedIn, and resume download
    Must
    F8
    Blog index lists published posts by date; drafts never appear in production
    Must
    F9
    Blog post pages render MDX with syntax highlighting, readable typography, and reading time
    Must
    F10
    Home shows the 2 to 3 best blog posts, with a link to the full archive
    Should
    F11
    Header with anchor navigation (Work, About, Blog, Contact), collapsing cleanly on mobile
    Must
    F12
    Open Graph image, page titles, meta descriptions, favicon, sitemap
    Must
    F13
    RSS feed for the blog
    Should
    F14
    Smooth scroll-reveal animation with staggered entrance, disabled under prefers-reduced-motion
    Must
    F15
    Custom 404 page
    Should
12. Content requirements
    • Headline (draft): "I build fast, polished mobile apps with React Native." The italic word receives the serif accent and gradient.
    • Subtext: one sentence on what the developer builds and for whom.
    • Projects: each must state the problem, the developer's role, the stack, and an outcome or lesson. Prefer apps that are live on TestFlight, the App Store, or the Play Store. Avoid tutorial clones.
    • About: three to five sentences, first person, specific, no buzzwords.
    • Blog: posts about real React Native problems solved (performance, navigation, native modules, state, testing).
13. Success metrics
    Metric
    Target
    Lighthouse (mobile): Performance, Accessibility, Best Practices, SEO
    95 or higher each
    Largest Contentful Paint on a mid-range phone
    Under 2.0 s
    Cumulative Layout Shift
    Under 0.05
    Time to find contact method
    Under 10 s
    Contact clicks (email, LinkedIn, resume)
    Tracked monthly
    Interview or recruiter conversations attributed to the site
    Qualitative, tracked manually
14. Risks and mitigations
    Risk
    Mitigation
    Weak or too few projects undermines the pitch
    Polish one or two strong projects before launch; the work matters more than the design
    Heavy videos slow the page
    Compress to under 1 to 2 MB each, lazy-load, use WebM or MP4, no GIFs
    Gradient and animation overuse look templated
    Limit gradient to three places, one motion pattern
    Page reads as desperate
    Copy review against the tone rules in section 5
    Over-engineering delays launch
    Treat v1 as a one-weekend build; abstract only on the second repetition
15. Milestones
    Phase
    Deliverable
    Estimate
    0
    Copy, project selection, media capture (screen recordings, screenshots)
    2 to 3 days
    1
    Astro, Tailwind, tokens, fonts, layouts
    0.5 day
    2
    Hero, Work, About, Skills, Contact sections
    1 day
    3
    Blog collection, post layout, MDX migration
    0.5 to 1 day
    4
    Reveal animation, polish, responsive pass
    0.5 day
    5
    SEO, Open Graph, Lighthouse, real-device test, deploy, custom domain
    0.5 day
16. Launch checklist
    • Copy reviewed for tone (no pleading, no buzzwords).
    • Every link works; resume is current.
    • Tested on a real iPhone and Android phone.
    • Lighthouse targets met.
    • Social share preview checked on LinkedIn and WhatsApp.
    • Custom domain live with HTTPS.
    • GitHub repo public with a clear README.
    Part 2: Technical Spec Sheet
17. Stack
    Layer
    Choice
    Reason
    Framework
    Astro (static output)
    Near-zero JavaScript by default, fast on mobile networks
    Styling
    Tailwind CSS with @tailwindcss/typography
    Enforces consistent spacing and tokens; prose styles for the blog
    Content
    Astro content collections with Zod schemas
    Typed, validated content; add a project by adding a file
    Blog format
    MDX via @astrojs/mdx
    Markdown plus optional static components
    Code highlighting
    Shiki (built into Astro)
    Zero client JS
    Animation
    CSS plus one small IntersectionObserver script
    Ships almost nothing; covers fade-up and stagger
    Fonts
    Self-hosted (Fontsource or Astro font handling)
    No layout shift, no third-party request
    Images
    Astro <Image />
    Automatic resizing and modern formats
    Video
    Muted, looping, lazy-loaded MP4 or WebM
    Real app motion without bloat
    SEO
    @astrojs/sitemap, @astrojs/rss, Open Graph tags
    Discoverability and clean sharing
    Tooling
    TypeScript, ESLint, Prettier (Astro and Tailwind plugins)
    Consistency
    Hosting
    Cloudflare Pages, Netlify, or Vercel (free tier)
    Static deploys from GitHub
    Domain
    Custom (for example yourname.dev)
    Strong professionalism signal
    React islands are not used unless a feature genuinely needs client state.
18. Design tokens
    Defined once in global.css as CSS variables and mapped into Tailwind. Components use token names only, never hex values.
    Token
    Value
    Use
    --bg
    #FFFFFF (or #FAFAF9)
    Page background
    --text
    #0F172A
    Primary text
    --muted
    #64748B
    Secondary text, dates, tags (minimum allowed lightness for text)
    --border
    #E2E8F0
    Cards, dividers
    --accent-from
    #6366F1
    Gradient start (indigo)
    --accent-via
    #8B5CF6
    Gradient middle (violet)
    --accent-to
    #EC4899
    Gradient edge only (faint pink)
    --available
    #22C55E
    Availability dot only
    Gradient usage rules (three places only):
19. Blurred mesh behind the hero at 10 to 25% opacity.
20. The italic accent word in the headline (bg-clip-text, large text only).
21. The primary button, or its hover state.
    Alternate palettes to test by swapping tokens: blue to teal (#3B82F6 to #06B6D4), or orange to pink (#F97316 to #EC4899).
22. Typography
    Role
    Font
    Notes
    Accent (one or two headline words, blog post titles)
    Instrument Serif, Fraunces, or Playfair Display, italic
    Gives the personal, cursive-like feel without hurting readability
    Body and UI
    Inter, Geist, or Plus Jakarta Sans
    Clean and legible
    • Maximum two font families and three weights.
    • Type scale: fluid headline (about 40 to 72 px), section headings (28 to 36 px), body 16 to 18 px, small 14 px.
    • Blog reading width of 65 to 70 characters per line, line height 1.6 to 1.75.
    • No full cursive fonts for body or headings.
23. Layout and responsiveness
    • Mobile-first. Breakpoints: 640, 768, 1024, 1280 px.
    • Content container max width about 1100 px; blog column about 680 px.
    • Generous vertical spacing between sections (96 to 160 px desktop, 64 to 96 px mobile).
    • Wide elements (tables, code blocks) scroll inside their own container; the page never scrolls sideways.
    • Touch targets at least 44 px.
24. Page structure
    Route
    Content
    /
    Hero, Selected Work, About, Skills, Featured Posts, Contact
    /blog
    All published posts, newest first
    /blog/[slug]
    Single post with prose styling, reading time, back link
    /404
    Friendly not-found page with link home
    /rss.xml, /sitemap-index.xml
    Generated
    Hero layout: availability pill, headline, subtext, two buttons, and a blurred gradient mesh behind. Optionally a phone mockup on the right on desktop, stacked below on mobile.
25. Motion spec
    • Entrance: fade up, 16 to 24 px translate, about 500 ms, ease-out.
    • Stagger: 80 to 100 ms per sibling via a CSS variable (--delay).
    • Trigger: one IntersectionObserver adds a visible class once; elements do not re-animate.
    • Hover: cards lift slightly with a soft shadow; buttons shift gradient position. CSS transitions only.
    • Accessibility: a single prefers-reduced-motion rule disables all reveal motion and autoplaying video loops fall back to a poster image.
    • No parallax, no scroll hijacking, no more than one motion pattern.
26. Content schemas
    Projects collection
    Field
    Type
    Notes
    title
    string
    Required
    summary
    string
    One-line problem and solution
    role
    string
    What the developer owned
    stack
    string[]
    For example React Native, Expo, TypeScript
    outcome
    string
    Result or lesson learned
    links
    object
    live, appStore, playStore, testFlight, github (all optional)
    cover
    image
    Poster or screenshot
    video
    string (optional)
    Path to compressed MP4 or WebM
    featured
    boolean
    Shown on home when true
    order
    number
    Sort order
    Blog collection
    Field
    Type
    Notes
    title
    string
    Required
    description
    string
    Used for meta and cards
    date
    date
    Required
    tags
    string[]
    Optional
    draft
    boolean
    Drafts are excluded from production builds
    cover
    image (optional)
    For cards and Open Graph
    Site data (src/data/site.ts): name, role title, email, social links, resume path, availability text, navigation items. The header, footer, contact section, and meta tags all read from this single file.
27. Architecture
    src/
    ├── content/
    │ ├── blog/
    │ └── projects/
    ├── content.config.ts
    ├── data/site.ts
    ├── styles/global.css
    ├── layouts/
    │ ├── BaseLayout.astro
    │ └── PostLayout.astro
    ├── components/
    │ ├── ui/ Button, Badge, StatusPill, Container,
    │ │ SectionHeading, Card, GradientText, PhoneFrame
    │ ├── sections/ Hero, Work, About, Skills, Contact
    │ └── blog/ PostCard, PostMeta
    ├── pages/
    │ ├── index.astro
    │ ├── 404.astro
    │ ├── rss.xml.ts
    │ └── blog/ (index.astro, [...slug].astro)
    └── scripts/reveal.ts
    Rules
    • Separate design (tokens), content (collections and site.ts), and structure (components).
    • Type every component's props with a TypeScript interface.
    • Use path aliases (@/components, @/data).
    • Extract a primitive on the second repetition, not the first.
    • One component per file, named by role.
    • Tailwind utilities in components; custom CSS only for prose styles and the gradient mesh.
28. Performance budget
    Item
    Budget
    Client JavaScript on home page
    Under 10 KB (only the reveal script)
    Total page weight (excluding lazy videos)
    Under 500 KB
    Each project video
    Under 1 to 2 MB, lazy-loaded, muted, playsinline
    Fonts
    Two families, WOFF2, subsetted, preloaded
    Images
    Responsive sizes, modern formats, explicit width and height
    Lighthouse (mobile)
    95 or higher in all four categories
29. Accessibility
    • Meets WCAG AA contrast (4.5:1 for body text).
    • Semantic landmarks (header, main, section, footer) and a logical heading order.
    • Visible keyboard focus states and a skip-to-content link.
    • Alt text on all meaningful images; decorative gradients are aria-hidden.
    • Videos are decorative or have adjacent text describing the app.
    • Gradient text used only at large sizes.
30. SEO and sharing
    • Unique title and meta description per page.
    • Open Graph and Twitter card tags with a designed 1200 x 630 image.
    • Canonical URLs, sitemap, and RSS.
    • Structured data (Person) on the home page.
    • Favicon set including an Apple touch icon.
31. Deployment and operations
    • Git repository on GitHub, public, with a README covering the stack, structure, and how to add a project or post.
    • Automatic deploys from the main branch; preview URLs for branches.
    • HTTPS and custom domain.
    • Privacy-friendly analytics (Plausible or Vercel Analytics) with custom events for email, LinkedIn, and resume clicks.
    • Contact is a plain mailto: link, with no form to maintain or spam to filter.
32. Acceptance criteria
33. All functional requirements marked Must are implemented.
34. Lighthouse mobile scores are 95 or higher on home, blog index, and a post page.
35. The site works on a real iPhone and Android device with no horizontal scroll.
36. Reduced-motion users see no animation and still get all content.
37. Adding a new project or post requires creating one file and no component changes.
38. Copy contains no begging language, buzzwords, or skill percentage bars.
39. The social share preview renders correctly on LinkedIn and WhatsApp.
40. Open questions
    • Which two or three projects will be featured, and are any live on a store or TestFlight?
    • Will a photo be included in the About section?
    • Which gradient palette is final after testing on the real page (indigo-violet, blue-teal, or warm)?
    • Which framework was the existing MDX blog written for, and how much cleanup does the migration need?
