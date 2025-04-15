const difficulties = {
  classicDifficulties: [
    {
      value: "easy",
      label: "Easy",
      description: "Short & simple",
    },
    {
      value: "medium",
      label: "Medium",
      description: "A bit longer",
    },
    {
      value: "hard",
      label: "Hard",
      description: "Long and tricky",
    },
  ],
  survivalDifficulies: [
    {
      value: "easy",
      label: "Easy",
      description: "10 mistakes allowed",
    },
    {
      value: "medium",
      label: "Medium",
      description: "5 mistakes max",
    },
    {
      value: "hard",
      label: "Hard",
      description: "1 mistake and it’s over",
    },
  ],
  timeAttackDifficulties: [
    {
      value: "easy",
      label: "Easy",
      description: "30 seconds",
    },
    {
      value: "medium",
      label: "Medium",
      description: "60 seconds",
    },
    {
      value: "hard",
      label: "Hard",
      description: "120 seconds",
    },
  ],
};
const gameModes = [
  {
    value: "classic",
    label: "Classic",
    description: "Type at your own pace.",
  },
  {
    value: "timeAttack",
    label: "Time Attack",
    description: "Race against the clock.",
  },
  {
    value: "survival",
    label: "Survival",
    description: "Don’t make mistakes!",
  },
];

export default { difficulties, gameModes };
