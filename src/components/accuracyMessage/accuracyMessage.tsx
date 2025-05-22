import { useGameStore } from "@/store/gameStore";
import { useTranslation } from "@/utils/useTranslation";

export function AccuracyMessage() {
  const { t } = useTranslation();
  const { accuracy, realAccuracy } = useGameStore();
  return (
    <div className="flex flex-col text-center">
      <span className="font-bold">{`${t.scoringBoard.accuracy} : ${accuracy}%, ${t.scoringBoard.realAccuracy} : ${realAccuracy}%`}</span>
      {accuracy === 100 && accuracy - realAccuracy !== 0 && (
        <span className="text-sm">
          {t.accuracyMessage({ accuracy, realAccuracy })}
        </span>
      )}
      {accuracy < 100 && accuracy - realAccuracy !== 0 && (
        <span className="text-sm">
          {t.accuracyMessage2({ accuracy, realAccuracy })}
        </span>
      )}
      {accuracy < 100 && accuracy === realAccuracy && (
        <span>{t.accuracyMessage3({ accuracy })}</span>
      )}
      {accuracy === 100 && realAccuracy === 100 && (
        <span className="text-sm">{t.accuracyMessage4}</span>
      )}
    </div>
  );
}
