export function Title() {
  function Span({ children }: { children: React.ReactNode }) {
    return (
      <span className="text-chart-1 uppercase text-3xl font-bold font-serif">
        {children}
      </span>
    );
  }

  return (
    <h1 className="text-2xl text-center leading-tight">
      <Span>Boost</Span> your <Span>productivity</Span> by typing faster!
    </h1>
  );
}
