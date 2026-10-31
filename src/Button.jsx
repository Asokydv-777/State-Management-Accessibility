export default function Button({
  variant = "primary",
  disabled = false,
  children,
  ...props
}) {
  return (
    <button className={`btn btn-${variant}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
