import { ModeToggle } from "@/components/mode-toggle";
import { useGameStore } from "@/store/gameStore";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const { resetGame } = useGameStore();

  return (
    <header className="py-4 px-2 border-b-[1px] flex justify-between items-center">
      <div className="flex gap-2">
        {location.pathname === "/game" && (
          <Link to="/">
            <ArrowLeft onClick={resetGame} className="cursor-pointer" />
          </Link>
        )}
        <h1 className="font-bold">CODEPROD</h1>
      </div>
      <ModeToggle />
    </header>
  );
}
