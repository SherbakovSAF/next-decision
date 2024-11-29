import { Button } from "../ui/button";
import ColorCardElement from "../elements/color-card.element";
import { Textarea } from "../ui/textarea";
import { useLockBodyScroll, useToggle } from "react-use";
// import { Doubt_E } from "@/app/types/doubt.types";
import { DoubtReaction_E } from "@prisma/client";

interface Props {
  children: React.ReactNode;
}

const DoubtModal: React.FC<Props> = ({ children }) => {
  const [isViewModal, setViewModal] = useToggle(false);
  useLockBodyScroll(isViewModal);

  const handleCloseModalOutside = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      event.preventDefault();
      handleCloseModal();
    }
  };
  const handleOpenModal = () => {
    setViewModal(true);
  };
  const handleCloseModal = () => {
    setViewModal(false);
  };
  return (
    <div>
      <div onClick={() => handleOpenModal()}>{!isViewModal && children}</div>

      {isViewModal && (
        <div
          className="fixed bg-[#0000007c] backdrop-blur-sm w-full h-full top-0 left-0 flex justify-center items-center"
          onClick={(event) => handleCloseModalOutside(event)}
        >
          <div className="flex flex-col h-screen justify-center">
            <header
              onClick={handleCloseModal}
              className="absolute right-0 top-0"
            >
              Закрыть
            </header>
            <main className="mt-auto">
              <h3>Стоит ли мне покупать гитару?</h3>
              <div className="flex justify-around">
                <ColorCardElement
                  type={DoubtReaction_E.BAD}
                  className="w-20 h-20 p-2"
                />
                <ColorCardElement
                  type={DoubtReaction_E.GOOD}
                  className="w-20 h-20 p-2"
                />
              </div>
              <Textarea placeholder="Поделитель эмоциями (необязательно)" />
            </main>
            <footer className="mt-auto mx-auto mb-4">
              <Button>Отправить</Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoubtModal;
