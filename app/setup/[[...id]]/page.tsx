"use client";

import LabelBlock from "@/components/block/label.block";
import ButtonBottom from "@/components/elements/button-bottom.element";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useMemo } from "react";

function SetupPage() {
  const [mockupDate, setMockupDate] = React.useState<number>(Date.now());

  const daysVariantList = useMemo(() => [7, 14, 21, 30], []);

  const getDiffDaysFromToday = useMemo(() => {
    const dateFinish = mockupDate;

    return Math.ceil(Math.abs((Date.now() - dateFinish) / 86400000));
  }, [mockupDate]);

  const getDateByDayNumber = (numberDays: number) => {
    if (numberDays <= 0) Date.now();
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    now.setDate(now.getDate() + numberDays);
    return now.getTime();
  };

  const isSelectedDate = (days: number) => {
    return (
      new Date(mockupDate).getTime() ===
      new Date().setHours(0, 0, 0, 0) + days * 24 * 60 * 60 * 1000
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <LabelBlock htmlFor="doubtTitle" value="В чём твоё сомнение">
        <Input type="text" id="doubt" placeholder="Купить ли мне гитару?" />
      </LabelBlock>

      <LabelBlock htmlFor="doubtTime" value="Сколько дней на решение?">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {daysVariantList.map((day) => (
              <Button
                key={day}
                onClick={() => setMockupDate(getDateByDayNumber(day))}
                variant={isSelectedDate(day) ? "default" : "outline"}
              >
                {day}
              </Button>
            ))}

            <Popover>
              <PopoverTrigger asChild>
                <Button>
                  <Icon name="Calendar" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  defaultMonth={new Date(mockupDate)}
                  mode="single"
                  selected={new Date(mockupDate)}
                  onSelect={(event) =>
                    setMockupDate(event ? event.getTime() : Date.now())
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex">
            <Button>
              <Icon name="Plus" />
            </Button>
            <Input
              type="number"
              placeholder="Кол-во дней"
              min={0}
              value={getDiffDaysFromToday}
              onChange={(event) =>
                setMockupDate(getDateByDayNumber(Number(event.target.value)))
              }
            />

            <Button>
              <Icon name="Minus" />
            </Button>
          </div>
        </div>
      </LabelBlock>

      <ButtonBottom>Создать/Обновить</ButtonBottom>
    </div>
  );
}

export default SetupPage;
