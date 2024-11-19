import helpers from "@/lib/helper";

interface EvaluationBarProps {
  value: number;
}

export const EvaluationBar= ({ value } : EvaluationBarProps) => {
  const clampedValue = helpers.clamp(value, 0, 100);

  return (
    <div className="h-5 border-black flex">
      <div className="bg-[#1a1e23] transition-all duration-1000"style={{width: `${clampedValue}%`,}}></div>
      <div className="bg-[#8c8fbc] transition-all duration-1000" style={{width: `${100 - clampedValue}%`,}}></div>
    </div>
  );
};
