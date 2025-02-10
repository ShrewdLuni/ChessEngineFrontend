import { RefreshCcw, Settings } from "lucide-react";
import { EvaluationBar } from "./EvaluationBar";
import { cn } from "@/lib/utils";

interface EvaluationProps {
  evaluation: number;
  bestMove: string;
  isSettings: boolean
  flip: () => void;
  setIsSettings: () => void;
}

export const Evaluation = ({ evaluation, bestMove, isSettings, flip, setIsSettings }: EvaluationProps) => {
  return (
    <div className="text-left font-semibold font-mono">
      <div className="flex felx-row justify-between">
        <p>Evaluation: {evaluation}</p>
        <div className="flex flex-row gap-2">
          <RefreshCcw className="cursor-pointer" onClick={flip}/>
          <Settings className={cn("cursor-pointer", isSettings && "text-[#8c8fbc]")} onClick={setIsSettings}/>
        </div>
      </div>
      <p className="text-xs font-normal">{evaluation == 0 ? "Position is equal" : evaluation < 0 ? "Black is winning" : "White is winning"}</p>
      <p className="text-xs font-normal">Best move: {bestMove}</p>
      <EvaluationBar value={evaluation}/>
    </div>
  )
}