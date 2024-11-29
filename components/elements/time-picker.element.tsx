"use client";
import { useMemo } from "react";
import Icon from "../ui/icon";

interface Props {
  hours?: number;
  minutes?: number;
  seconds?: number;
  isViewHours?: boolean;
  onChange?: (hours: number, minutes: number, seconds: number) => void;
}

const TimePicker: React.FC<Props> = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  isViewHours = false,
  onChange,
}) => {
  const formateNumber = (value: number, minValue = 0, maxValue = 60) => {
    return value < minValue ? minValue : value > maxValue ? maxValue : value;
  };

  const updateData = (index: number, value: number) => {
    if (!onChange) return;
    switch (index) {
      case 0:
        onChange(formateNumber(value, 0, Infinity), minutes, seconds);
        break;
      case 2:
        onChange(hours, minutes, formateNumber(value));
        break;
      default:
        onChange(hours, formateNumber(value), seconds);
    }
  };

  const getValueForTimePicker = useMemo(() => {
    return [
      { id: 0, value: hours, isView: isViewHours },
      { id: 1, value: minutes, isView: true },
      { id: 0, value: seconds, isView: true },
    ];
  }, [isViewHours, hours, minutes, seconds]);

  return (
    <div className="flex">
      {getValueForTimePicker.map(
        (time) =>
          time.isView && (
            <div className="flex-col items-center" key={time.id}>
              <Icon
                name="Plus"
                onClick={() => updateData(time.id, time.value + 1)}
              />
              <p className="text-center">
                {time.value.toString().padStart(2, "0")}
              </p>
              <Icon
                name="Minus"
                onClick={() => updateData(time.id, time.value - 1)}
              />
            </div>
          )
      )}
    </div>
  );
};

export default TimePicker;
