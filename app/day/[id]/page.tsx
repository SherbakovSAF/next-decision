"use client";

import DoubtModal from "@/components/block/doubt-modal.block";
import CardDoubtReactionBlock from "@/components/block/card-doubt-reaction.block";
import MasonryGrid from "@/components/block/masonry-grid.block";
import ButtonBottom from "@/components/elements/button-bottom.element";
import { DoubtReaction_M, DoubtReaction_E } from "@prisma/client";

const generateRandomText = (length: number) => {
  const characters =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result.trim();
};
const DayPage = () => {
  const mockupReaction: DoubtReaction_M[] = Array.from(
    { length: 20 },
    (_, index) => {
      const randomLength = Math.floor(Math.random() * 200) + 50; // Длина текста от 50 до 150 символов
      return {
        id: index,
        text: generateRandomText(randomLength),
        date: new Date(),
        type: index % 2 === 0 ? DoubtReaction_E.GOOD : DoubtReaction_E.BAD,
        doubtId: 2,
        userId: 3,
      };
    }
  );
  return (
    <div className="pb-20">
      <div className="mb-8">
        <strong>15 числа</strong> на вопрос{" "}
        <strong>“Купить ли мне гитару”</strong> у Вас были такие ощущения
      </div>

      <MasonryGrid columnNumber={2} elements={mockupReaction} gap={4}>
        {(data) => (
          <div>
            <div>
              <CardDoubtReactionBlock
                key={data.id}
                type={data.type}
                date={data.date}
                text={data.text}
              />
            </div>
          </div>
        )}
      </MasonryGrid>

      <DoubtModal>
        <ButtonBottom>Добавить</ButtonBottom>
      </DoubtModal>
    </div>
  );
};

export default DayPage;
