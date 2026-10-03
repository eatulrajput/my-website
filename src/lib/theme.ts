export type ThemePaletteId = "ember" | "emerald" | "indigo" | "custom";

export interface ThemePalette {
  id: ThemePaletteId;
  name: string;
  description: string;
  lightAccent: string;
  darkAccent: string;
  previewSwatches: [string, string, string];
}

export const themePalettes: Record<
  Exclude<ThemePaletteId, "custom">,
  ThemePalette
> = {
  ember: {
    id: "ember",
    name: "Electric Ember",
    description: "Vibrant signature orange & warm amber glow",
    lightAccent: "#f34213",
    darkAccent: "#FF8800",
    previewSwatches: ["#f34213", "#FF8800", "#18181b"],
  },
  emerald: {
    id: "emerald",
    name: "Cyber Emerald",
    description: "Crisp emerald green & mint neon accents",
    lightAccent: "#059669",
    darkAccent: "#10b981",
    previewSwatches: ["#059669", "#10b981", "#064e3b"],
  },
  indigo: {
    id: "indigo",
    name: "Neon Indigo",
    description: "Deep ultra-violet & neon indigo light",
    lightAccent: "#6366f1",
    darkAccent: "#818cf8",
    previewSwatches: ["#6366f1", "#818cf8", "#1e1b4b"],
  },
};
