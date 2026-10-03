/**
 * Generates a consistent hash from a string to pick colors deterministically.
 */
function stringToHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

/**
 * Generates a beautiful gradient based on the project title.
 */
export function generateGradient(title: string) {
  const hash = stringToHash(title);

  // A curated list of premium Apple-like gradient pairs
  const gradients = [
    { start: "#FF2A54", end: "#FF9B44" }, // Red to Orange
    { start: "#007AFF", end: "#00C6FF" }, // Blue to Light Blue
    { start: "#34C759", end: "#93F9B9" }, // Green to Light Green
    { start: "#AF52DE", end: "#FF8177" }, // Purple to Pink
    { start: "#FF9500", end: "#FFD60A" }, // Orange to Yellow
    { start: "#5856D6", end: "#34AADC" }, // Indigo to Teal
  ];

  const index = Math.abs(hash) % gradients.length;
  const { start, end } = gradients[index];

  return { start, end };
}

interface ProjectIconProps {
  title: string;
}

export default function ProjectIcon({ title }: ProjectIconProps) {
  const letter = title.charAt(0).toUpperCase();
  const { start, end } = generateGradient(title);

  // A unique ID for the SVG gradient so multiple icons don't clash
  const gradientId = `grad-${title.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div
      className="project-icon-placeholder"
      style={{ background: "transparent", padding: 0 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: "22.5%", overflow: "hidden" }} // Apple squircle approximation
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={start} />
            <stop offset="100%" stopColor={end} />
          </linearGradient>

          <filter
            id={`shadow-${gradientId}`}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor={start}
              floodOpacity="0.4"
            />
          </filter>
        </defs>

        {/* Background rounded rect */}
        <rect width="100" height="100" fill={`url(#${gradientId})`} />

        {/* Letter rendering */}
        <text
          x="50"
          y="50"
          fontFamily="var(--font-sans)"
          fontSize="48"
          fontWeight="700"
          fill="#FFFFFF"
          textAnchor="middle"
          dy=".35em"
          filter={`url(#shadow-${gradientId})`}
        >
          {letter}
        </text>
      </svg>
    </div>
  );
}
