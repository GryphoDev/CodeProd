import { useTranslation } from "@/utils/useTranslation";

export function Title() {
  const { t } = useTranslation();
  function Span({ children }: { children: React.ReactNode }) {
    return (
      <span className="text-chart-1 uppercase text-3xl font-bold font-serif">
        {children}
      </span>
    );
  }

  return (
    <h1 className="text-2xl text-center leading-tight">
      <Span>{t.home.title[0]}</Span>
      {t.home.title[1]}
      <Span>{t.home.title[2]}</Span>
      {t.home.title[3]}
    </h1>
  );
}
