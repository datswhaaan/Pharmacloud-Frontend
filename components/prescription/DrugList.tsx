import Card from "@/components/Card";
import Badges from "../Badges";
import { DrugDetectionItem } from "@/types/prescription";

type Props = {
  drugs: any[];
  title?: boolean;
  withCard?: boolean;
  detection?: boolean;
};

export default function DrugList({
  drugs,
  title = true,
  withCard = true,
  detection = false,
}: Props) {
  
  if (!drugs?.length) {
    const noData = (<p className="text-gray-400">ไม่มีข้อมูลยา</p>)
    return withCard ? <Card>{noData}</Card> : noData;
  }

  const content = (
    <>
      {title && <h2 className="mb-2 font-medium">รายการยา</h2>}

      <div className="flex flex-col">
        {drugs.map((drug, index) => {
          const isMissing = drug.match_type === "missing";
          const isExtra = drug.match_type === "extra";
          const isEdited = drug.is_manually_edited || null;

          const baseBg =
            index % 2 === 0 ? "bg-white" : "bg-gray-100";

          const bgClass = isExtra || isEdited ? "bg-red-100" : baseBg;

          return (
            <div
              key={index}
              className={`flex justify-between items-center p-2 ${bgClass}`}
            >
              <p>{drug.item_common_name}</p>

              <div className="flex items-center gap-2">
                {isMissing && !detection && (
                  <Badges varient="prescription" />
                )}
                <p>
                  {drug.quantity} {drug.unit}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  return withCard ? <Card>{content}</Card> : content;
}
