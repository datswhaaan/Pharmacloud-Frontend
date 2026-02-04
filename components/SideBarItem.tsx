"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type ActiveStyle = "auto" | "fixed";
type Variant = keyof typeof VariantStyles;

const VariantStyles = {
  default: {
    text: "text-black",
    active: "text-blue-700",
    bg: "bg-blue-100",
  },
  muted: {
    text: "text-gray-400",
    active: "text-gray-500",
    bg: "bg-gray-100",
  },
  destructive: {
    text: "text-red-600",
    active: "text-red-700",
    bg: "bg-red-100",
  },
};

export default function SideBarItem({
  route,
  path,
  Icon,
  activeStyle = 'auto',
  variant = 'default'
}: {
  route: string;
  path: string;
  Icon?: React.ComponentType<{ className?: string }>;
  activeStyle?: ActiveStyle;
  variant?: Variant;
}) {
  const pathname = usePathname();
  const isActive = pathname === path;
  const shouldHighlight = activeStyle === "auto" && isActive;
  const styles = VariantStyles[variant];

  return (
    <Link href={path}>
      <div
        className={`w-full flex items-end gap-3 px-5 py-3  text-sm text-black rounded-lg
                   hover:bg-gray-200 cursor-pointer
                   ${shouldHighlight ? styles.bg : ''}`}
      >
        {Icon && (
          <Icon
            className={shouldHighlight ? styles.active : styles.text}
          />
        )}
        <span className={shouldHighlight ? styles.active : styles.text}>{route}</span>
      </div>
    </Link>
  );
}
