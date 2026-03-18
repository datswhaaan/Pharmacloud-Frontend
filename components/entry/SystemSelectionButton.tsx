import Card from "../Card";
import Link from "next/link";

type SystemSelectionProps = {
  system: "Pharmacloud" | "system2" | "system3";
};

const systemConfig = {
  Pharmacloud: {
    logo: "/logo/logo.svg",
    name: "/logo/name.svg",
    path: "/prescription"
  },
  system2: {
    logo: "/logo2.svg",
    name: "/name2.svg",
    path: "#"
  },
  system3: {
    logo: "/logo3.svg",
    name: "/name3.svg",
    path: "#"
  },
};

export default function SystemSelectionButton({ system }: SystemSelectionProps) {
    const config = systemConfig[system];
    
    return (
        <Link href={config.path}>
            <Card center className="flex w-xs h-64 justify-center items-center p-10">
                <img
                    src={config.logo}
                    alt={`${system} logo`}
                    className="w-full h-12 object-contain"
                />
                <img
                    src={config.name}
                    alt={`${system} name`}
                    className="h-10 object-contain"
                />
            </Card>
        </Link>
    );
}