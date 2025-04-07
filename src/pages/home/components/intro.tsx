export function Intro() {
  function Paragraph({ children }: { children: React.ReactNode }) {
    return (
      <p className={"text-sm font-light text-center max-w-2xl mx-auto"}>
        {children}
      </p>
    );
  }

  return (
    <>
      <Paragraph>
        Programming isn’t just about writing code — it’s about thinking,
        problem-solving, and bringing ideas to life. The faster you type, the
        less effort you spend on mechanics, freeing your mind to focus entirely
        on problem-solving and creativity.
      </Paragraph>
      <Paragraph>
        When typing becomes second nature, coding feels effortless and fluid.
        Ready to break speed records and dominate your keyboard?
        <span className="font-semibold text-chart-4 text-lg font-serif">
          The challenge is yours to conquer!
        </span>
      </Paragraph>
    </>
  );
}
