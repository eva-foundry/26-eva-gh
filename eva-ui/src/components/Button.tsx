export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
  ariaLabel
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}) {
  const cls = variant === "primary" ? "btn" : "btn-ghost";
  return (
    <button
      type={type}
      className={`focus-ring ${cls}${disabled ? " opacity-60 pointer-events-none" : ""}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}