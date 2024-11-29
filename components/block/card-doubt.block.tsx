import { ChevronsRight } from "lucide-react";
import ColorCardElement from "../elements/color-card.element";
import { differenceInDays } from "date-fns";
import { DoubtReaction_E } from "@prisma/client";
import { useMemo } from "react";

interface CardDoubtBlockProps {
  doubt: {
    title: string;
    dateFinish: Date;
  };
}

const CardDoubtBlock: React.FC<CardDoubtBlockProps> = ({ doubt }) => {
  const differenceDayDoubt = useMemo(
    () => Math.abs(differenceInDays(new Date(2024, 11, 20), doubt.dateFinish)),
    [doubt.dateFinish]
  );

  return (
    <div className="flex justify-between items-center bg-primary-foreground py-4 px-2 rounded-lg">
      <div className="flex">
        <div className="flex gap-3 items-center">
          <ColorCardElement
            type={DoubtReaction_E.NORMAL}
            className="p-2 rounded-sm md:p-3"
          />
          <div>
            <h3 className="md:text-base">{doubt.title}</h3>
            <p className="text-sm text-secondary">
              Осталось {differenceDayDoubt} дней
            </p>
          </div>
        </div>
        {/* <DoubtModal>Реакция</DoubtModal> */}
      </div>
      <ChevronsRight />
    </div>
  );
};

export default CardDoubtBlock;
