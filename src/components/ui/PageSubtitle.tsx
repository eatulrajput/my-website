interface PageSubtitleProps {
  children: string;
}

export default function PageSubtitle({ children }: PageSubtitleProps) {
  return (
    <p className="text-muted-foreground mx-auto mb-16 max-w-2xl text-center text-lg">
      {children}
    </p>
  );
}
