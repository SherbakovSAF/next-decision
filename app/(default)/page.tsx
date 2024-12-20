import CardDoubtBlock from "@/components/block/card-doubt.block";
import Link from "next/link";
import ButtonBottom from "@/components/elements/button-bottom.element";
import { getAllDoubtsService } from "@/services/doubt.service";
import { Doubt_I } from "@/types/doubt.type";

const HomePage = async () => {
  let doubts: Doubt_I[] = [];
  // const cook = await cookies();

  doubts = await getAllDoubtsService();

  return (
    <>
      <h2 className="text-2xl mb-4">Твои сомнения</h2>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
        {doubts && doubts.length ? (
          doubts.map((doubt) => (
            <Link href={`/doubt/${doubt.id}`} key={doubt.id}>
              <CardDoubtBlock doubt={doubt} />
            </Link>
          ))
        ) : (
          <p>Нема</p>
        )}
      </div>

      <Link href={"/setup"}>
        <ButtonBottom>Я сомневаюсь в...</ButtonBottom>
      </Link>
    </>
  );
};

export default HomePage;
