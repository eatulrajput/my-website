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
    • Light, dark, and system theme modes with an animated theme change.
    Out of scope (later)
    • Individual case study pages per project (v1.1, via the projects content collection).
    • RSS styling polish, analytics dashboards, newsletter.
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
    Contact section shows email (mailto), GitHub, LinkedIn, and resume download, each with an icon and a text label
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
    Header with anchor navigation (Work, About, Blog, Contact) and the theme switcher, collapsing into a full-screen menu on mobile (see 5a)
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
    F16
    Theme switcher with three modes: Light, Dark, System. System follows the device prefers-color-scheme and updates live when it changes
    Must
    F17
    Theme choice persists across pages and visits, with no flash of the wrong theme on load
    Must
    F18
    Theme change animates (circular reveal, with a crossfade fallback) and switches instantly under prefers-reduced-motion
    Must
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
    Reveal animation, theme switcher and transition, polish, responsive pass
    1 day
    5
    SEO, Open Graph, Lighthouse, real-device test, deploy, custom domain
    0.5 day
16. Launch checklist
    • Copy reviewed for tone (no pleading, no buzzwords).
    • Every link works; resume is current.
    • Tested on a real iPhone and Android phone in light, dark, and system modes.
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
    Light
    Dark
    Use
    --bg
    #FFFFFF (or #FAFAF9)
    #0B1120
    Page background
    --surface
    #F8FAFC
    #111827
    Cards and raised panels
    --text
    #0F172A
    #E2E8F0
    Primary text
    --muted
    #64748B
    #94A3B8
    Secondary text, dates, tags (lightest allowed gray in light mode)
    --border
    #E2E8F0
    #1E293B
    Cards, dividers
    --accent-from
    #3B82F6
    #60A5FA
    Gradient start (blue)
    --accent-via
    #06B6D4
    #22D3EE
    Gradient middle (teal)
    --accent-to
    #10B981
    #34D399
    Gradient end (green)
    --available
    #22C55E
    #4ADE80
    Availability dot only
    Gradient usage rules (three places only):
19. Blurred mesh behind the hero at 10 to 25% opacity in light mode and 15 to 30% in dark mode.
20. The italic accent word in the headline (bg-clip-text, large text only).
21. The primary button, or its hover state.
    Alternate palettes to test by swapping tokens: indigo to violet (#6366F1 to #8B5CF6), or orange to pink (#F97316 to #EC4899).
    2a. Theme system (light, dark, system)
    The site offers three modes: Light, Dark, and System. The choice is stored as a preference and applied through a data-theme attribute on <html>.
    Mode
    Behavior
    Light
    Always uses the light tokens
    Dark
    Always uses the dark tokens
    System
    Follows the device prefers-color-scheme setting and updates live when it changes; the default for first-time visitors
    Implementation
    • Preference stored in localStorage under one key (theme) with the values light, dark, or system; wrapped in try/catch so blocked storage falls back to System.
    • A tiny inline script in <head> resolves the theme and sets data-theme and color-scheme before first paint, so there is no flash of the wrong theme.
    • A matchMedia('(prefers-color-scheme: dark)') listener re-resolves the theme when the mode is System.
    • Tokens: light values on :root, dark overrides on :root[data-theme="dark"]. Tailwind's dark: variant is configured to use that selector, not the media query.
    • Switcher: a three-option segmented control (sun, monitor, moon icons) in the header and the mobile menu, built as a labeled radio group.
    • Code blocks: Shiki dual themes (one light, one dark) switched through CSS variables, with no extra JavaScript.
    • Gradient mesh: separate opacity values per theme; the browser theme-color meta tag updates with the active theme.
    • The Open Graph image stays a single light-themed image.
    2b. Theme change animation
    Switching themes plays one coordinated transition of about 500 ms, built from the layers below. The click origin is the switcher button.
    Animation
    What the visitor sees
    Technique
    Duration
    Circular reveal (primary)
    The new theme expands as a circle from the switcher button until it covers the page
    View Transitions API (document.startViewTransition) animating clip-path: circle() on the new-theme snapshot, from the button center to the farthest page corner
    500 ms, ease-in-out
    Color crossfade (fallback)
    Backgrounds, text, and borders fade smoothly to the new colors
    Temporary theme-transition class on <html> that adds transition on background-color, color, border-color, fill, and stroke, removed after the change
    300 ms, ease
    Switcher icon motion
    The sun, moon, or monitor icon rotates and scales in while the old one scales out; the active-option highlight slides to the chosen segment
    CSS transform and opacity; indicator moved with translateX
    250 ms, ease-out
    Gradient mesh shift
    The hero gradient blobs fade between their light and dark opacities
    opacity transition on the mesh layer
    500 ms, in sync with the reveal
    Reduced motion
    Theme changes instantly with no animation
    prefers-reduced-motion: reduce disables all of the above
    0 ms
    Rules
    • Browsers without View Transitions support use the crossfade, so the visitor never sees a hard flash.
    • When System mode follows an operating system change, use the 300 ms crossfade instead of the circular reveal, since there is no click origin.
    • The theme-transition class exists only during the switch, so hover effects and scroll reveals are never slowed.
    • No animation runs on first page load; the inline script sets the theme before paint.
    • Only color properties animate, so the switch causes no layout shift.
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
    5a. Mobile navigation (full-screen menu)
    Below 768 px the header collapses to the logo, the theme switcher, and a menu button. The menu opens as a full-screen overlay with a smooth ease.
    Property
    Spec
    Coverage
    Fixed overlay filling the whole viewport (inset: 0, 100dvh), respecting safe-area insets
    Open animation
    Overlay fades in (opacity 0 to 1) while moving from translateY(-8px) to 0; 400 ms, cubic-bezier(0.16, 1, 0.3, 1) (ease-out)
    Close animation
    Reverse of the open animation; 300 ms, cubic-bezier(0.4, 0, 1, 1) (ease-in)
    Link entrance
    Links fade up with a 60 ms stagger, starting about 100 ms after the overlay begins to open
    Button icon
    menu icon rotates and cross-fades into x; 250 ms
    Scroll lock
    Page scroll locked while open (overflow: hidden), restored on close
    Closing
    Close button, tapping a link, the Escape key, or an anchor change
    Contents
    Large links (Work, About, Blog, Contact), theme switcher, social icon row, availability pill, resume button
    Background
    --bg token with a light backdrop blur, so it works in both themes
    Reduced motion
    Opens and closes instantly, with no movement
    Accessibility: the menu button has aria-expanded; focus moves into the menu on open, stays trapped inside, and returns to the button on close; the page behind is inert. A closed menu uses visibility: hidden after its transition so it is never focusable. The script is under 1 KB.
    5b. Icons
    Lucide is the icon set for interface icons. Lucide has deprecated its brand logos, so the GitHub and LinkedIn marks come from Simple Icons as inline SVG. Use @lucide/astro, which renders icons as inline SVG at build time with no client JavaScript; import only the icons in use.
    Use
    Icon
    Source
    Email
    mail
    Lucide
    GitHub
    GitHub mark
    Simple Icons (inline SVG)
    LinkedIn
    LinkedIn mark
    Simple Icons (inline SVG)
    Resume
    file-text or download
    Lucide
    Project links (live, store)
    arrow-up-right
    Lucide
    Mobile menu
    menu, x
    Lucide
    Theme switcher
    sun, monitor, moon
    Lucide
    Rules
    • Social links appear in the Contact section, footer, and mobile menu.
    • In Contact and the mobile menu, each icon has a visible text label (for example, GitHub); icon-only links in the header or footer carry an aria-label.
    • One consistent size (20 px in lists, 24 px in the mobile menu), a 1.5 to 2 px stroke, and currentColor so icons follow the light and dark tokens.
    • Touch targets at least 44 px.
    • Hover: icon color moves to the accent and shifts up 1 to 2 px; 150 ms.
25. Motion spec
    • Entrance: fade up, 16 to 24 px translate, about 500 ms, ease-out.
    • Stagger: 80 to 100 ms per sibling via a CSS variable (--delay).
    • Trigger: one IntersectionObserver adds a visible class once; elements do not re-animate.
    • Hover: cards lift slightly with a soft shadow; buttons shift gradient position. CSS transitions only.
    • Accessibility: a single prefers-reduced-motion rule disables all reveal motion and autoplaying video loops fall back to a poster image.
    • No parallax, no scroll hijacking, no more than one motion pattern.
    Theme-change animations are specified separately in section 2b.
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
    Under 10 KB (reveal and theme scripts only)
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
    • Meets WCAG AA contrast (4.5:1 for body text) in both the light and dark themes.
    • Semantic landmarks (header, main, section, footer) and a logical heading order.
    • Visible keyboard focus states and a skip-to-content link.
    • Alt text on all meaningful images; decorative gradients are aria-hidden.
    • Videos are decorative or have adjacent text describing the app.
    • Gradient text used only at large sizes.
    • Theme switcher is keyboard-operable, has labeled options (Light, Dark, System), and announces the current selection.
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
40. Light, dark, and system modes all work, persist across reloads, and never flash the wrong theme on load.
41. The theme change plays the circular reveal (or the crossfade fallback) and is instant under reduced motion.
42. Social links in Contact, the footer, and the mobile menu show icons with text labels or accessible names.
43. Below 768 px the menu opens full-screen with the specified ease, traps focus, locks scroll, and is instant under reduced motion.
44. Open questions
    • Which two or three projects will be featured, and are any live on a store or TestFlight?
    • Will a photo be included in the About section?
    • Does the blue-to-green gradient hold up on both light and dark backgrounds once tested on the real page?
    • Which framework was the existing MDX blog written for, and how much cleanup does the migration need?
