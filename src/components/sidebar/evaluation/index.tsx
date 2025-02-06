import { RefreshCcw, Settings2 } from "lucide-react"
import { EvaluationBar } from "./EvaluationBar"

interface EvaluationProps {
  evaluation: any
  bestMove: any
  flip: any
}

export const Evaluation = ({evaluation, bestMove, flip}: EvaluationProps) => {
  return (
    <div className="text-left font-semibold font-mono">
      <div className="flex felx-row justify-between">
        <p>Evaluation: {evaluation}</p>
        <div className="flex flex-row gap-2">
          <RefreshCcw className="cursor-pointer"  onClick={flip}/>
          <Settings2 className="cursor-pointer"/>
        </div>
      </div>
      <p className="text-xs font-normal">{evaluation == 0 ? "Position is equal" : evaluation < 0 ? "Black is winning" : "White is winning"}</p>
      <p className="text-xs font-normal">Best move: {bestMove}</p>  
      <EvaluationBar value={evaluation}/>
    </div>
  )
}