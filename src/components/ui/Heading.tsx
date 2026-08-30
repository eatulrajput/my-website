interface PageSubtitleProps {
  children: string;
}

export default function Heading({ children }: PageSubtitleProps) {
  return <h1 className="pb-4 text-4xl">{children}</h1>;
}
