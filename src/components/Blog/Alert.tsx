type Props = {
  children: React.ReactNode;
  type?: "success" | "warning";
};

export default function Alert({ children, type = "success" }: Props) {
  const isSuccess = type === "success";
  return (
    <div
      className={`my-6 flex items-start gap-4 rounded-2xl border p-6 shadow-sm ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100"
          : "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-100"
      }`}
    >
      <div className="mt-1 flex-shrink-0">
        {isSuccess ? (
          <svg
            className="h-6 w-6 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        )}
      </div>
      <div className="text-lg leading-relaxed">{children}</div>
    </div>
  );
}
