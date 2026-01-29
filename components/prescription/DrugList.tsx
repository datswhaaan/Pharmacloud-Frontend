import Card from "@/components/Card";
import Badges from "../Badges";

type ReviewDrug = {
  name: string;
  quantity: number;
  unit: string;
  isCorrect: boolean;
};

type DetectedDrug = {
  name: string;
  quantity: number;
  unit: string;
  detected: boolean;
};

type Drug = ReviewDrug | DetectedDrug;

type Props = {
  drugs: Drug[];
  title?: boolean;
  withCard?: boolean;
};

export default function DrugList({
  drugs,
  title = true,
  withCard = true,
}: Props) {
  const content = (
    <>
      {title && <h2 className="mb-2 font-medium">รายการยา</h2>}

      <div className="flex flex-col">
        {drugs.map((drug, index) => {
          const isReview = "isCorrect" in drug;
          const isDetected = "detected" in drug;

          const isWrong =
            (isReview && !drug.isCorrect) ||
            (isDetected && !drug.detected);

          const baseBg =
            index % 2 === 0 ? "bg-white" : "bg-gray-100";

          const bgClass =
            isReview && isWrong ? "bg-red-100" : baseBg;

          return (
            <div
              key={index}
              className={`flex justify-between items-center p-2 ${bgClass}`}
            >
              <p>{drug.name}</p>

              <div className="flex items-center gap-2">
                {isDetected && isWrong && (
                  <Badges varient="prescription"/>
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
