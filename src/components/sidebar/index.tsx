import { cn } from "@/lib/utils"
import { EvaluationBar } from "./EvaluationBar"
import { MoveHistory } from "./MoveHistory"

interface SidebarProps {
  evaluation : number,
  moveHistory: any
}

export const Sidebar = ({evaluation, moveHistory} : SidebarProps) => {
  return (
    <div>
      <div className={cn("boardInfo","flex flex-col justify-start gap-2 text-center bg-[#1a1e23] text-white font-bold text-sm ml-2")}>
        <div className="text-left font-semibold font-mono">
          <p>Evaluation: {evaluation}</p>
          <p className="text-xs font-normal">{evaluation == 0 ? "Position is equal" : evaluation < 0 ? "Black is winning" : "White is winning"}</p>
          <p className="text-xs font-normal">Best move: e5</p>
          <EvaluationBar value={evaluation}/>
        </div>
        <MoveHistory moveHistory={moveHistory}/>
      </div>
    </div>
  )
}