import Image from "next/image";
import Link from "next/link";

type ButtonProps = {
  className?: string;
  logo?: string ;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
    className = "",
    logo,
    text,
    onClick,
    disabled = false,
}: ButtonProps) {
  return (
    <button 
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer
            ${className}
        `}
    >
        {logo && 
            <Image src={logo} 
                alt="" 
                width={16}
                height={16}
            />
        }
        <Link href="/detection">
            {text}
            </Link>
    </button>
  );
}