# Coding Standards & Best Practices (2026)

This repository follows modern, scalable coding practices designed to optimize readability for both human engineers and AI coding assistants. Adherence to these standards ensures a maintainable, bug-resistant, and easily navigable codebase.

---

## 1. Naming Conventions

The primary goal of naming is **discoverability** and **clarity**. In an era where AI agents assist with coding, highly descriptive names are essential. We do not charge by the letter; favor clarity over brevity.

### Variables & Functions (camelCase)
*   **Explicit is better than implicit:** Avoid abbreviations.
    *   *Good:* `getUserData`, `calculateTotalRevenue`, `userRegistrationDate`
    *   *Bad:* `getDat`, `calcTot`, `regDate`
*   **Action-oriented function names:** Start function names with a verb.
    *   *Good:* `fetchPosts`, `deleteUser`, `formatDate`
    *   *Bad:* `posts`, `userDelete`, `dateFormatter` (these sound like variables or classes)

### Booleans
Prefix with `is`, `has`, `should`, or `can` to make it immediately clear they are true/false values.
*   *Good:* `isModalOpen`, `hasUnreadMessages`, `shouldTriggerAnimation`
*   *Bad:* `modalOpen`, `unreadMessages`, `triggerAnimation`

### Event Handlers
Use the `handle` prefix for functions that process an event, and the `on` prefix for the prop that accepts the function.
```tsx
// Good
const handleSubmit = (e) => { ... }
<Button onClick={handleSubmit} />

// Component Prop
interface ButtonProps {
  onClick: () => void; // Prop is 'on'
}
```

### Components & Classes (PascalCase)
Must be nouns or noun phrases representing what the component *is*.
*   *Good:* `UserProfileCard`, `NavigationSidebar`
*   *Bad:* `RenderProfile`, `SidebarMenuLayoutWrap`

### Interfaces & Types (PascalCase)
Do not use the legacy `I` prefix (e.g., `IUser`). Just name it exactly what it is.
*   *Good:* `User`, `ProjectData`, `ComponentProps`
*   *Bad:* `IUser`, `TProjectData`

### Constants (UPPER_SNAKE_CASE)
Used for true, application-wide configuration values that do not change at runtime.
*   *Good:* `MAX_RETRY_ATTEMPTS = 3`

---

## 2. Functions & Logic

### Single Responsibility Principle
A function should do exactly one thing. If you need the word "and" to describe what a function does, split it.
```typescript
// Bad: Does too much
function validateAndSaveUser(user: User) {
  if (!user.name) throw new Error("Name required");
  database.save(user);
}

// Good: Separated concerns
function isValidUser(user: User): boolean {
  return !!user.name;
}

function saveUser(user: User) {
  if (!isValidUser(user)) throw new Error("Invalid user");
  database.save(user);
}
```

### Early Returns (Guard Clauses)
Handle edge cases at the top of your function and return early to avoid deep nesting (the "arrow code" anti-pattern).
```typescript
// Bad
function processPayment(payment: Payment) {
  if (payment.isValid) {
    if (payment.amount > 0) {
      if (payment.method === 'credit_card') {
        // Process logic here
      }
    }
  }
}

// Good
function processPayment(payment: Payment) {
  if (!payment.isValid) return;
  if (payment.amount <= 0) return;
  if (payment.method !== 'credit_card') return;

  // Process logic here
}
```

### Pure Functions
Where possible, functions should be pure. They should not mutate external state and should always return the same output for the same input.

### TypeScript Strictness
*   **Avoid `any`:** `any` defeats the purpose of TypeScript. If the type is truly unknown, use `unknown` and narrow it down with type guards.
*   **Explicit Return Types:** Always define the return type of a function. It makes the code easier to read and prevents accidental type changes during refactoring.

---

## 3. Comments & Documentation

In modern codebases, the code explains *what* and *how*. Comments should strictly explain *why*.

### "Why" Over "What"
Do not write comments that just restate the code.
```typescript
// Bad: Redundant
// Check if the user is an admin
if (user.role === 'admin') { ... }

// Good: Explains the "Why"
// Admins bypass the 2FA requirement during legacy migrations (Ticket #1234)
if (user.role === 'admin') { ... }
```

### JSDoc / TSDoc
Use standard JSDoc comments for public APIs, complex functions, and component props. This powers IDE intellisense and provides necessary context for AI tools.
```typescript
/**
 * Formats a given date string into a human-readable relative time (e.g., "2 hours ago").
 * 
 * @param dateString - The ISO 8601 formatted date string.
 * @param locale - The user's current locale string (defaults to 'en-US').
 * @returns The formatted relative time string.
 */
export function formatRelativeTime(dateString: string, locale: string = 'en-US'): string { ... }
```

### Zombie Code
Never leave commented-out blocks of code in the repository. We use Git for version control. If code is no longer needed, delete it.

---

## 4. Component Design (React / Next.js)

### React Server Components (RSC) Default
Following modern Next.js App Router architecture, components should be Server Components by default. 
*   **Do not use `'use client'` globally.**
*   Only add `'use client'` to the very edge nodes of the component tree that strictly require browser APIs, state (`useState`), or lifecycle hooks (`useEffect`).

### Props Destructuring
Always destructure props in the function signature. It immediately shows what data the component relies on.
```tsx
// Bad
const UserProfile = (props: UserProfileProps) => {
  return <div>{props.user.name}</div>
}

// Good
const UserProfile = ({ user, theme = 'light' }: UserProfileProps) => {
  return <div className={theme}>{user.name}</div>
}
```

### Component Size
If a component exceeds 150-200 lines, it is a strong indicator that it should be broken down into smaller, composable pieces. 

---

## 5. Architecture & File Structure

### Feature-Sliced Colocation
Group files by feature/domain rather than file type. Everything a feature needs should live close to it.
```text
// Bad: Split by file type
/components
  /UserProfile.tsx
/hooks
  /useUser.ts
/types
  /user.types.ts

// Good: Feature-sliced (Colocated)
/features
  /user
    UserProfile.tsx
    useUser.ts
    user.types.ts
    user.test.ts
```

### Strict Layering (Separation of Concerns)
Keep your UI "dumb". The UI should only care about rendering data and capturing user events.
1.  **UI Layer:** React Components. Renders props and passes up event callbacks.
2.  **Logic Layer:** Custom Hooks. Manages state, formatting, and orchestrates data fetching.
3.  **Data/API Layer:** Vanilla TS functions. Only cares about hitting the network, parsing JSON, and error handling.

### Immutable State
Treat all state as immutable. Never mutate arrays or objects directly; always return new copies (using spread syntax `...` or array methods like `.map()` and `.filter()`).
```typescript
// Bad
function addUser(users: User[], newUser: User) {
  users.push(newUser); // Mutates original array
  return users;
}

// Good
function addUser(users: User[], newUser: User) {
  return [...users, newUser]; // Returns a new array
}
```
