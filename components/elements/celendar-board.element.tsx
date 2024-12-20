"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils.lib";
import { DoubtReaction_E } from "@prisma/client";
import {
  getDoubtBgColor,
  getDoubtTextColor,
} from "@/consts/doubt-colors.const";

interface Event {
  id: number;
  date: number; // Используем timestamp
  status: "good" | "bad" | string; // Можно расширить по необходимости
}

interface CalendarProps {
  reactions: Event[];
  selectDayEvent: (idReactionDoubt: number) => void;
  // TODO: RenderCell пока что не проработан
  renderCell?: (day: Date, events: Event[]) => JSX.Element;
}

const CalendarBoardElement: React.FC<CalendarProps> = ({
  reactions,
  selectDayEvent,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleDayClick = (day: Date) => {
    if (
      day.getMonth() !== currentMonth.getMonth() ||
      day.getFullYear() !== currentMonth.getFullYear()
    ) {
      setCurrentMonth(day);
    } else {
      const finedReaction = reactions.find(
        (event) => new Date(event.date).toDateString() === day.toDateString()
      );
      if (finedReaction) selectDayEvent(finedReaction.id);
    }
  };

  const generateDays = () => {
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startDay = new Date(startOfMonth);
    startDay.setDate(startDay.getDate() - startDay.getDay() + 1); // Начинаем с начала недели
    const endDay = new Date(endOfMonth);
    endDay.setDate(endDay.getDate() + (6 - endDay.getDay()) + 1); // Конец недели

    const days: Date[] = [];
    let day = startDay;

    while (day <= endDay) {
      days.push(day);

      day = new Date(day);
      day.setDate(day.getDate() + 1);
    }

    return days;
  };

  const getReactionByDay = (day: Date) => {
    return (
      reactions.find(
        (event) => new Date(event.date).toDateString() === day.toDateString()
      ) ?? null
    );
  };

  const isFutureMonthByDay = (day: Date) => {
    return day.getMonth() !== currentMonth.getMonth();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePrevMonth}>Назад</Button>
        <h2 className="text-md uppercase">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h2>
        <Button onClick={handleNextMonth}>Вперед</Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {generateDays().map((day) => (
          <CalendarCell
            day={day}
            key={day.getTime()}
            reactionDoubt={getReactionByDay(day)}
            isFutureMonth={isFutureMonthByDay(day)}
            onClickDay={() => handleDayClick(day)}
          />
        ))}
      </div>
    </div>
  );
};

const CalendarCell: React.FC<{
  day: Date;
  reactionDoubt: Event | null;
  isFutureMonth: boolean;
  onClickDay?: (day: Date) => void;
  customCell?: React.ReactNode;
}> = ({ day, reactionDoubt, isFutureMonth, onClickDay, customCell }) => {
  const getClassesForDay = () => {
    const isFuture = reactionDoubt ? reactionDoubt.date > Date.now() : false;
    if (isFuture || isFutureMonth) {
      return "opacity-40";
    }

    if (reactionDoubt) {
      return reactionDoubt.status === DoubtReaction_E.GOOD
        ? `${getDoubtBgColor(DoubtReaction_E.GOOD).primary} ${
            getDoubtTextColor(DoubtReaction_E.GOOD).secondary
          }`
        : `${getDoubtBgColor(DoubtReaction_E.BAD).primary} ${
            getDoubtTextColor(DoubtReaction_E.BAD).secondary
          }`;
    }
    return "bg-primary-foreground";
  };
  return (
    <div
      onClick={() => onClickDay && onClickDay(day)}
      className={cn(
        "flex  justify-center items-center w-full cursor-pointer rounded-md py-3 ",
        getClassesForDay()
      )}
    >
      {customCell ?? <div>{day.getDate()}</div>}
    </div>
  );
};

export default CalendarBoardElement;
