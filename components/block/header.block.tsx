"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter, usePathname } from "next/navigation";
import Icon from "../ui/icon";

function HeaderBlock() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center py-6">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.back()}
      >
        {/* TODO: Когда задеплою глянуть норм ли переходит */}
        {pathname !== "/" && <Icon name="ArrowBigLeft" />}
        <h1>
          Привет, <span>Сергей</span>
        </h1>
      </div>

      <div className="flex gap-1">
        <TooltipProvider delayDuration={5}>
          <Tooltip>
            <TooltipTrigger>
              <Button className="p-2" size="icon" asChild>
                <Icon name="Settings" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Настройки</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={5}>
          <Tooltip>
            <TooltipTrigger>
              <Button className="p-2" size="icon" asChild>
                <Icon name="LogOut" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Выйти</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default HeaderBlock;
