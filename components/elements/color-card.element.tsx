import { DoubtReaction_E } from "@prisma/client";
import { cn } from "@/lib/utils";
import Icon from "../ui/icon";

interface ColorCardElementProps {
  type?: DoubtReaction_E;
  children?: React.ReactNode;
  className?: string;
}

const ColorCardElement: React.FC<ColorCardElementProps> = ({
  type = DoubtReaction_E.NORMAL,
  className,
  children,
}) => {
  const getIconByType = () => {
    switch (type) {
      case DoubtReaction_E.GOOD:
        return "Smile";
      case DoubtReaction_E.BAD:
        return "Frown";
      default:
        return "Meh";
    }
  };

  return (
    <div
      className={cn(
        "flex justify-center items-center bg-doubt-normal h-fit relative rounded-sm",
        className,
        `bg-doubt-${type}`
      )}
    >
      {children ?? <Icon name={getIconByType()} />}
    </div>
  );
};

export default ColorCardElement;
