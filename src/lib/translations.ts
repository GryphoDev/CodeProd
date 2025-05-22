export const translations = {
  en: {
    home: {
      toggleLangBtn: "Cocorico 🐔",
      toggleThemeBtn: ["Light", "Dark", "System"],
      title: ["Boost", " your ", "productivity", " by typing faster!"],
      intro: [
        "Programming isn’t just about writing code — it’s about thinking, problem-solving, and bringing ideas to life. The faster you type, the less effort you spend on mechanics, freeing your mind to focus entirely on problem-solving and creativity.",
        "When typing becomes second nature, coding feels effortless and fluid. Ready to break speed records and dominate your keyboard? ",
        "The challenge is yours to conquer!",
      ],
      difficulties: {
        classic: [
          { value: "easy", label: "Easy", description: "Short & simple" },
          { value: "medium", label: "Medium", description: "A bit longer" },
          { value: "hard", label: "Hard", description: "Long and tricky" },
        ],
        survival: [
          { value: "easy", label: "Easy", description: "10 mistakes allowed" },
          { value: "medium", label: "Medium", description: "5 mistakes max" },
          {
            value: "hard",
            label: "Hard",
            description: "1 mistake and it’s over",
          },
        ],
        timeAttack: [
          { value: "easy", label: "Easy", description: "30 seconds" },
          { value: "medium", label: "Medium", description: "60 seconds" },
          { value: "hard", label: "Hard", description: "120 seconds" },
        ],
      },
      gameModes: [
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
      ],
      startButton: "Start Coding",
      alertInvalidSelection:
        " Please select a game mode, a difficulty level, and at least one language.",
    },
    game: {
      alertEnterKey: "Press Enter Key",
      startMessage: "Once you’re ready, start typing to begin the timer.",
      restartBtn: "Restart",
      nextBtn: "Next",
    },
    scoringBoard: {
      caption: "Yours best scores",
      maxMistakes: "Max Mistakes",
      language: "Language",
      length: "Length",
      accuracy: "Accuracy",
      realAccuracy: "Real Accuracy",
      totalTime: "Total Time",
    },
    accuracyMessage: ({
      accuracy,
      realAccuracy,
    }: {
      accuracy: number;
      realAccuracy: number;
    }) =>
      `You typed all the characters correctly, but some mistakes were made, resulting in a ${
        accuracy - realAccuracy
      }% difference`,
    accuracyMessage2: ({
      accuracy,
      realAccuracy,
    }: {
      accuracy: number;
      realAccuracy: number;
    }) =>
      `You missed a few characters, and even after fixing the mistakes,
        there’s still a ${accuracy - realAccuracy}% difference due to the
        errors.`,
    accuracyMessage3: ({ accuracy }: { accuracy: number }) =>
      `You made a few mistakes, but your real accuracy matches your overall accuracy of ${accuracy}%`,
    accuracyMessage4: "Nice job, you nailed it with zero mistakes!",
  },
  fr: {
    home: {
      toggleLangBtn: "Tea Time ☕️",
      toggleThemeBtn: ["Clair", "Sombre", "Système"],
      title: ["Améliorez", " votre ", "productivité", " en tapant plus vite !"],
      intro: [
        "La programmation ne consiste pas seulement à écrire du code — c’est avant tout une question de réflexion, de résolution de problèmes et de concrétisation d’idées. Plus vous tapez rapidement, moins vous consacrez d’énergie aux aspects mécaniques, ce qui vous permet de vous concentrer pleinement sur la résolution de problèmes et la créativité.",
        "Quand taper devient un réflexe, coder devient fluide et naturel. Prêt à battre des records de vitesse et à dominer votre clavier ? ",
        "À vous de relever le défi !",
      ],
      difficulties: {
        classic: [
          { value: "easy", label: "Facile", description: "Court et simple" },
          { value: "medium", label: "Moyen", description: "Un peu plus long" },
          {
            value: "hard",
            label: "Difficile",
            description: "Long et complexe",
          },
        ],
        survival: [
          {
            value: "easy",
            label: "Facile",
            description: "10 erreurs permises",
          },
          { value: "medium", label: "Moyen", description: "5 erreurs maximum" },
          {
            value: "hard",
            label: "Difficile",
            description: "1 erreur et c’est fini",
          },
        ],
        timeAttack: [
          { value: "easy", label: "Facile", description: "30 secondes" },
          { value: "medium", label: "Moyen", description: "60 secondes" },
          { value: "hard", label: "Difficile", description: "120 secondes" },
        ],
      },
      gameModes: [
        {
          value: "classic",
          label: "Classique",
          description: "Tapez à votre rythme.",
        },
        {
          value: "timeAttack",
          label: "Contre-la-montre",
          description: "Faites la course contre la montre.",
        },
        {
          value: "survival",
          label: "Survie",
          description: "Ne faites pas d’erreurs !",
        },
      ],
      startButton: "Commencer à coder",
      alertInvalidSelection:
        "Merci de sélectionner un mode de jeu, un niveau de difficulté et au moins un langage.",
    },
    game: {
      alertEnterKey: "Appuyez sur la touche Entrée",
      startMessage: "Une fois prêt, commencez à taper pour lancer le chrono.",
      restartBtn: "Recommencer",
      nextBtn: "Suivant",
    },
    scoringBoard: {
      caption: "Vos meilleurs scores",
      maxMistakes: "Nombre maximum de fautes",
      language: "Langage",
      length: "Longueur",
      accuracy: "Précision",
      realAccuracy: "Précision réelle",
      totalTime: "Temps total",
    },
    accuracyMessage: ({
      accuracy,
      realAccuracy,
    }: {
      accuracy: number;
      realAccuracy: number;
    }) =>
      `Vous avez tapez tous les caractères correctement, mais certaines erreurs ont été commises, ce qui entraîne une différence de ${
        accuracy - realAccuracy
      } %.`,
    accuracyMessage2: ({
      accuracy,
      realAccuracy,
    }: {
      accuracy: number;
      realAccuracy: number;
    }) =>
      `Quelques caractères ont été oubliés, et même après correction, une différence de ${
        accuracy - realAccuracy
      } % subsiste à cause des erreurs.`,
    accuracyMessage3: ({ accuracy }: { accuracy: number }) =>
      `Vous avez fait quelques erreurs, mais votre précision réelle correspond à votre précision globale de ${accuracy} %.`,
    accuracyMessage4: "Bravo, vous avez réussi sans faire la moindre erreur !",
  },
};
