type Props = {
  className?: string;
  size?: number;
};

export function SparkleIcon({ className, size = 14 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      className={className}
      aria-hidden
    >
      <path
        d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z"
        fill="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}
