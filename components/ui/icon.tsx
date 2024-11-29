"use client";
import { icons } from "lucide-react";

interface Props {
  name: string;
  color?: string;
  size?: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Icon = ({ name, color, size, className, ...props }: Props) => {
  const LucideIcon = icons[name];

  return (
    <LucideIcon className={className} color={color} size={size} {...props} />
  );
};

export default Icon;
