import helpers from "@/lib/helper";

interface EvaluationBarProps {
  value: number;
}

export const EvaluationBar = ({ value } : EvaluationBarProps) => {
  const maxValue = 15
  const normalizedValue = ((value + maxValue) / (2 * maxValue)) * 100;
  const clampedValue = helpers.clamp(normalizedValue, 0, 100);
  console.log(clampedValue);

  return (
    <div className="h-5 border-black flex">
      <div className="bg-[#1a1e23] transition-all duration-1000"style={{width: `${100 - clampedValue}%`,}}></div>
      <div className="bg-[#8c8fbc] transition-all duration-1000" style={{width: `${clampedValue}%`,}}></div>
    </div>
  );
};
