export default function Badge({ color, children }: { color: "green" | "yellow" | "red"; children: any }) {
  return <span className={`badge badge-${color}`}>{children}</span>;
}