import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHandleStartGame = () => {
  const { difficulty, gameMode, langChecked } = useGameSettingsStore();
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleStartGame = () => {
    const isValid = difficulty && gameMode && langChecked.length > 0;
    if (isValid) {
      navigate("/game");
      setError(false);
    } else {
      setError(true);
    }
  };
  return { handleStartGame, error };
};
