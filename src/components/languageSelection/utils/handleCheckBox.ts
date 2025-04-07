import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { CheckedState } from "@radix-ui/react-checkbox";

export const useHandleCheckBox = () => {
  const { langChecked, setLangChecked } = useGameSettingsStore();

  const handleCheckBox = (lang: string, checked: CheckedState) => {
    if (checked) {
      if (!langChecked.some((item) => item === lang)) {
        setLangChecked([...langChecked, lang]);
      }
    } else {
      setLangChecked(langChecked.filter((item) => item !== lang));
    }
  };

  return handleCheckBox;
};
