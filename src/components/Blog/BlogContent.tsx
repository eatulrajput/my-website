interface BlogContentProps {
  children: string;
}

export default function BlogContent({ children }: BlogContentProps) {
  return (
    <div className="my-6 text-base md:text-lg leading-relaxed md:leading-loose text-neutral-800 dark:text-neutral-200 text-pretty tracking-normal">
      {children}
    </div>
  );
}
