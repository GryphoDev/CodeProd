import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

type Scores = {
  cpm: number;
  date: string;
  snippet: string;
  time: string;
};

export function ScoringBoard() {
  const [scores, setScores] = useState<Scores[]>([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("cpmResults") || "[]");
    setScores(savedScores);

    const handleScoreUpdated = () => {
      const updatedScores = JSON.parse(
        localStorage.getItem("cpmResults") || "[]"
      );
      setScores(updatedScores);
    };

    window.addEventListener("scoreUpdated", handleScoreUpdated);

    return () => {
      window.removeEventListener("scoreUpdated", handleScoreUpdated);
    };
  }, []);

  return (
    <Table className="w-full">
      <TableCaption>Yours best scores</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Language</TableHead>
          <TableHead className="font-bold">Date</TableHead>
          <TableHead className="font-bold">CPM</TableHead>
          <TableHead className="text-right font-bold">Total Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores.map(({ cpm, date, snippet, time }) => (
          <TableRow key={date.toString()}>
            <TableCell className="text-left">{snippet}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{cpm}</TableCell>
            <TableCell className="text-right">{time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
