import { ModeToggle } from "@/components/mode-toggle";
import { useGameStore } from "@/store/gameStore";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const { resetGame } = useGameStore();

  return (
    <header className="py-4 px-2 border-b-[1px] flex justify-between items-center">
      <div className="flex items-center gap-4">
        {location.pathname === "/game" && (
          <Link to="/">
            <ArrowLeft onClick={resetGame} className="cursor-pointer" />
          </Link>
        )}
        <img
          className="w-8 h-8 rounded-full object-cover shadow-2xl"
          src="jr-korpa-O-p6tKWPPig-unsplash.jpg"
          alt=""
        />
        <h1 className="font-bold">CODEPROD</h1>
      </div>
      <ModeToggle />
    </header>
  );
}
