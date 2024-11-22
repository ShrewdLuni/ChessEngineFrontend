import { cn } from "@/lib/utils"
import { EvaluationBar } from "./EvaluationBar"
import { MoveHistory } from "./MoveHistory"
import { Settings2 } from "lucide-react"

interface SidebarProps {
  evaluation : number,
  bestMove: string,
  moveHistory: any
}

export const Sidebar = ({evaluation, bestMove, moveHistory} : SidebarProps) => {

  evaluation = -(evaluation / 100)

  return (
    <div>
      <div className={cn("boardInfo","flex flex-col justify-start gap-2 text-center bg-[#1a1e23] text-white font-bold text-sm ml-2")}>
        <div className="text-left font-semibold font-mono">
          <div className="flex felx-row justify-between">
            <p>Evaluation: {evaluation}</p>
            <Settings2 className="cursor-pointer"/>
          </div>
          <p className="text-xs font-normal">{evaluation == 0 ? "Position is equal" : evaluation < 0 ? "Black is winning" : "White is winning"}</p>
          <p className="text-xs font-normal">Best move: {bestMove}</p>  
          <EvaluationBar value={evaluation}/>
        </div>
        <MoveHistory moveHistory={moveHistory}/>
      </div>
    </div>
  )
}