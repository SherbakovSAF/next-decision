"use client";

// TODO: Убрать client
import { DoubtReaction_E } from "@prisma/client";
import CalendarBoard from "@/components/elements/celendar-board.element";
import ColorCardElement from "@/components/elements/color-card.element";
import { useRouter } from "next/navigation";
// import TimePicker from "@/components/elements/time-picker.element";
// import { Button } from "@/components/ui/button";
// import Icon from "@/components/ui/icon";
// import { Label } from "@/components/ui/label";
// import { Popover } from "@/components/ui/popover";
// import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
// import { useState } from "react";

function DoubtPage() {
  const router = useRouter();

  const mockupData = [
    {
      id: 0,
      date: new Date(Date.now() - 86400000).getTime(),
      status: "bad",
    },
    // { id: 1, date: Date.now(), status: "good" },
    { id: 2, date: new Date(Date.now() + 86400000).getTime(), status: "bad" },
  ];

  // const mockupNotification = [
  //   { id: 0, time: "15:00" },
  //   { id: 1, time: "16:00" },
  //   { id: 2, time: "17:00" },
  // ];

  // const [count, setCount] = useState(0);

  return (
    <>
      <header className="flex justify-center items-center gap-2">
        <h2 className="text-xl">Купить ли мне гитару?</h2>
        <ColorCardElement className="p-1 px-3" type={DoubtReaction_E.GOOD}>
          Да
        </ColorCardElement>
      </header>
      <main>
        <CalendarBoard
          reactions={mockupData}
          selectDayEvent={(reactionID) => router.push(`/day/${reactionID}`)}
        ></CalendarBoard>
        {/* <div>
          <Label htmlFor="doubt">Ваши уведомления?</Label>
          <div className="flex">
            {mockupNotification.map((time) => (
              <Popover key={time.id}>
                <PopoverTrigger asChild>
                  <Button variant="default">{time.time}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div>
                    <TimePicker
                      minutes={count}
                      onChange={(hours, minutes, seconds) => setCount(minutes)}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="default">
                  <Icon name="Plus" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div>
                  <TimePicker
                    minutes={count}
                    onChange={(hours, minutes, seconds) => setCount(minutes)}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div> */}
      </main>
    </>
  );
}

export default DoubtPage;
