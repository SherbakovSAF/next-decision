import { Label } from "../ui/label";

interface LabelDoubtProps {
  value: string;
  children: React.ReactNode;
  htmlFor?: string;
}

const LabelBlock: React.FC<LabelDoubtProps> = ({
  children,
  value,
  htmlFor,
}) => {
  return (
    <div>
      <Label className="mb-3 block" htmlFor={htmlFor}>
        {value}
      </Label>
      {children}
    </div>
  );
};

export default LabelBlock;
