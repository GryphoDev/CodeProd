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
      <TableCaption>Yours best scores</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Language</TableHead>
          {gameMode !== "timeAttack" && (
            <TableHead className="font-bold text-center">Length</TableHead>
          )}
          <TableHead className="font-bold text-center">Date</TableHead>
          <TableHead className="font-bold text-center">CPM</TableHead>
          <TableHead className="font-bold text-center">Real Accuracy</TableHead>
          <TableHead className="text-right font-bold">Total Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores.map(({ cpm, date, snippet, time, realAccuracy, length }) => (
          <TableRow key={date.toString()}>
            <TableCell className="text-left">{snippet}</TableCell>
            {gameMode !== "timeAttack" && (
              <TableCell className="text-center">{length}</TableCell>
            )}
            <TableCell className="text-center">{date}</TableCell>
            <TableCell className="text-center">{cpm}</TableCell>
            <TableCell className="text-center">{`${realAccuracy}%`}</TableCell>
            <TableCell className="text-right">{time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
