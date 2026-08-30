interface PageTitleProps {
  children: string;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <h2 className="mb-12 text-center text-4xl font-light md:text-6xl">
      {children}
    </h2>
  );
}
