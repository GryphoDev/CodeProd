import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useEffect, useState } from "react";
import { useTranslation } from "@/utils/useTranslation";

type Scores = {
  cpm: number;
  date: string;
  snippet: string;
  time: string;
  realAccuracy: number;
  length: number;
  error?: number;
  difficulty?: string;
};

export function ScoringBoard() {
  const { t } = useTranslation();
  const [scores, setScores] = useState<Scores[]>([]);
  const { gameMode } = useGameSettingsStore();

  useEffect(() => {
    const handleScoreUpdated = () => {
      const updatedScores = JSON.parse(
        localStorage.getItem(`${gameMode}Results`) || "[]"
      );
      setScores(updatedScores);
    };
    handleScoreUpdated();
    window.addEventListener("scoreUpdated", handleScoreUpdated);

    return () => {
      window.removeEventListener("scoreUpdated", handleScoreUpdated);
    };
  }, [gameMode]);

  return (
    <Table className="w-full">
      <TableCaption>{t.scoringBoard.caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">{t.scoringBoard.language}</TableHead>
          {gameMode !== "timeAttack" && gameMode !== "survival" && (
            <TableHead className="font-bold text-center">
              {t.scoringBoard.length}
            </TableHead>
          )}
          <TableHead className="font-bold text-center">Date</TableHead>
          <TableHead className="font-bold text-center">CPM</TableHead>
          <TableHead className="font-bold text-center">
            {t.scoringBoard.realAccuracy}
          </TableHead>
          {gameMode === "survival" && (
            <TableHead className="font-bold text-center">
              {t.scoringBoard.maxMistakes}
            </TableHead>
          )}
          <TableHead className="text-right font-bold">
            {t.scoringBoard.totalTime}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores.map(
          ({ cpm, date, snippet, time, realAccuracy, length, error }) => (
            <TableRow key={date.toString()}>
              <TableCell className="text-left">{snippet}</TableCell>
              {gameMode !== "timeAttack" && gameMode !== "survival" && (
                <TableCell className="text-center">{length}</TableCell>
              )}
              <TableCell className="text-center">{date}</TableCell>
              <TableCell className="text-center">{cpm}</TableCell>
              <TableCell className="text-center">{`${realAccuracy}%`}</TableCell>
              {gameMode === "survival" && (
                <TableCell className="text-center">{error}</TableCell>
              )}
              <TableCell className="text-right">{time}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
