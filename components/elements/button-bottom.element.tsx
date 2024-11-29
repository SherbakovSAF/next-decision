import { Button } from "@/components/ui/button";

interface ButtonBottomProps {
  children: React.ReactNode;
}
const ButtonBottom: React.FC<ButtonBottomProps> = ({ children }) => {
  return (
    <Button className="fixed text-base bottom-6 left-1/2 -translate-x-1/2">
      {children}
    </Button>
  );
};

export default ButtonBottom;
