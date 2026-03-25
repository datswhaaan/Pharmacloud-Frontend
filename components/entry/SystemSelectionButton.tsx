import Card from "../Card";
import Link from "next/link";

type SystemSelectionProps = {
  system: "Pharmacloud" | "Drug" | "system3";
};

const systemConfig = {
  Pharmacloud: {
    logo: "/logo/logo.svg",
    name: "PharmaCloud",
    path: "/prescription"
  },
  Drug: {
    logo: "/logo/logo.svg",
    name: "DrugMaster",
    path: "/drugs"
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
            <Card center className="w-xs h-75 flex justify-center items-center p-10">
              <img src={config.logo} className="w-full h-12 object-contain" />
              <div className="w-full flex justify-center items-center">
                <p className="text-primary-blue text-4xl">
                  {config.name}
                </p>
              </div>
            </Card>
        </Link>
    );
}