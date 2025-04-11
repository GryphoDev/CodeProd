import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClassicMode } from "./modes/classic";
import { TimeAttackMode } from "./modes/timeAttack";
import { SurvivalMode } from "./modes/survival";

export function Game() {
  const { gameMode, difficulty, langChecked } = useGameSettingsStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!difficulty || !gameMode || !langChecked) {
      navigate("/");
    }
  }, [gameMode, navigate, difficulty, langChecked]);

  if (gameMode === "classic") {
    return <ClassicMode />;
  } else if (gameMode === "timeAttack") {
    return <TimeAttackMode />;
  } else if (gameMode === "survival") {
    return <SurvivalMode />;
  }

  return <div>Loading...</div>;
}
