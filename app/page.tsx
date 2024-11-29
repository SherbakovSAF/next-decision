import CardDoubtBlock from "@/components/block/card-doubt.block";
import Link from "next/link";
import ButtonBottom from "@/components/elements/button-bottom.element";
function HomePage() {
  return (
    <div className="pb-20">
      <h2 className="text-base">Твои сомнения</h2>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21,
        ].map((f) => (
          <Link href={`/doubt/${f}`} key={f}>
            <CardDoubtBlock
              doubt={{ title: "Поехать в Италию", dateFinish: new Date() }}
            />
          </Link>
        ))}
      </div>

      <Link href={"/setup"}>
        <ButtonBottom>Я сомневаюсь в...</ButtonBottom>
      </Link>
    </div>
  );
}

export default HomePage;
