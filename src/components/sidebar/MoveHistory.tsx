import { cn } from "@/lib/utils";

interface MoveHistoryProps{
  moveHistory: { white: string; black: string; }[];
}

export const MoveHistory = ({ moveHistory } : MoveHistoryProps) => {
  return (
    <div className="h-16 min-h-16 overflow-y-scroll no-scrollbar">
      {moveHistory.map(({ white, black }, index) => (
        <div key={index} className={cn("flex flex-row font-mono font-semibold", index % 2 === 0 ? "bg-[#1a1e23]" : "bg-[#1a1e23]")}>
          <div className="bg-[#1a1e23] w-8 text-left pl-1">{index + 1}</div>
          <div className="flex-1 flex justify-start hover:bg-[#8c8fbc]">{white}</div>
          <div className="flex-1 flex justify-start hover:bg-[#8c8fbc]">{black}</div>
        </div>
      ))}
    </div>
  );
};
