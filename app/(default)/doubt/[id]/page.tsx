import ColorCardElement from "@/components/elements/color-card.element";
import { redirect } from "next/navigation";
import { getDoubtService } from "@/services/doubt.service";
import { RoutePath_E } from "@/types/route-path.type";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Link from "next/link";
import DoubtCalendarClient from "./(components)/doubt-calendar-client";

interface DoubtPageProps {
  params: Promise<{ id: string }>;
}

const DoubtPage: React.FC<DoubtPageProps> = async ({ params }) => {
  const id = (await params).id;
  if (!id) redirect(RoutePath_E.HOME);

  const doubt = await getDoubtService(Number(id));
  if (!doubt) redirect(RoutePath_E.HOME);

  const getAverageReactionWordType = () => {
    switch (doubt.averageReaction) {
      case "BAD":
        return "Нет";
      case "GOOD":
        return "Да";
      default:
        return "Возможно";
    }
  };
  return (
    <>
      <header className="flex justify-center items-center gap-2">
        <Link href={`${RoutePath_E.SETUP}/${doubt.id}`}>
          <Button size={"sm"} className="p-1 px-3">
            <Icon name="Settings" />
          </Button>
        </Link>

        <h2 className="text-xl">{doubt.title}</h2>
        <ColorCardElement className="p-1 px-3" type={doubt.averageReaction}>
          {getAverageReactionWordType()}
        </ColorCardElement>
      </header>
      <main>
        <DoubtCalendarClient doubt={doubt} />

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
};

export default DoubtPage;
