import { useTranslation } from "@/utils/useTranslation";

export function Intro() {
  const { t } = useTranslation();
  function Paragraph({ children }: { children: React.ReactNode }) {
    return (
      <p className={"text-sm font-light text-center max-w-2xl mx-auto"}>
        {children}
      </p>
    );
  }

  return (
    <>
      <Paragraph>{t.home.intro[0]}</Paragraph>
      <Paragraph>
        {t.home.intro[1]}
        <span className="font-semibold text-chart-4 text-lg font-serif">
          {t.home.intro[2]}
        </span>
      </Paragraph>
    </>
  );
}
