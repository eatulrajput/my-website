type Props = {
  src?: string
  alt?: string
}

export default function BlogImage({ alt }: Props) {
  if (!alt) return null;
  return (
    <figure className="my-8 flex flex-col items-center w-full">
      <div className="w-full rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/60 p-4 font-mono text-xs text-neutral-700 dark:text-neutral-300">
        <span className="text-light-sea-green font-bold">[NOTE] </span>
        {alt}
      </div>
    </figure>
  )
}