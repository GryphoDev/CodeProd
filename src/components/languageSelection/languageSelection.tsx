import { Button } from "../ui/button";
import { useStore } from "@/store/dataStore";
import { Selection } from "./components/select";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { AlertMessage } from "./components/alertMessage";
import { LanguageCard } from "./components/languageCard";
import { useHandleStartGame } from "./utils/startGame";
import { useTranslation } from "@/utils/useTranslation";

export function LanguageSelectionContainer() {
  const { t } = useTranslation();
  const { difficulty, gameMode, setDifficulty, setGameMode } =
    useGameSettingsStore();
  const { handleStartGame, error } = useHandleStartGame();
  const allLanguages = useStore((state) => state.allLanguages);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-10">
        <Selection
          value={gameMode}
          onValueChange={setGameMode}
          selectValue="Mode"
          data={t.home.gameModes}
        />
        <Selection
          value={difficulty}
          onValueChange={setDifficulty}
          selectValue="Difficulty"
          data={
            gameMode === "classic"
              ? t.home.difficulties.classic
              : gameMode === "survival"
              ? t.home.difficulties.survival
              : gameMode === "timeAttack"
              ? t.home.difficulties.timeAttack
              : []
          }
        />
        <Button children={t.home.startButton} onClick={handleStartGame} />
      </div>
      {error && <AlertMessage>{t.home.alertInvalidSelection}</AlertMessage>}
      <div className="grid grid-cols-1 justify-center gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {allLanguages.map((lang) => (
          <LanguageCard key={lang} lang={lang} />
        ))}
      </div>
    </div>
  );
}
