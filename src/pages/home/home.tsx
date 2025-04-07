import { LanguageSelectionContainer } from "@/components/languageSelection/languageSelection";
import { Title } from "./components/title";
import { Intro } from "./components/intro";

export function Home() {
  return (
    <>
      <div className="text-center pt-8 pb-10 flex flex-col gap-3 px-20">
        <Title />
        <Intro />
      </div>
      <LanguageSelectionContainer />
    </>
  );
}
