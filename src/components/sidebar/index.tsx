import { cn } from "@/lib/utils"
import { EvaluationBar } from "./evaluation/EvaluationBar"
import { MoveHistory } from "./MoveHistory"
import { RefreshCcw, Settings2 } from "lucide-react"
import { PromotionModule } from "./promotionModule";
import { GameSetupModule } from "./gameSetupModule";
import { Evaluation } from "./evaluation";

interface SidebarProps {
  evaluation : number,
  bestMove: string,
  moveHistory: any
  flip: any
  FEN: string
  SetFEN: any
  engineSetPosition: any

  isPromotion: any
  handleMove: any
  promotionOptions: any
  
  isGameOver: any
}

export const Sidebar = ({evaluation, bestMove, moveHistory, flip, FEN, SetFEN, engineSetPosition, isPromotion, handleMove, promotionOptions, isGameOver} : SidebarProps) => {

  return (
    <div>
      <div className={cn("boardInfo","flex flex-col justify-start gap-4 text-center bg-[#1a1e23] text-white font-bold text-sm ml-2 overflow-y-scroll no-scrollbar")}>
        {true && <Evaluation evaluation={evaluation} bestMove={bestMove} flip={flip}/>}
        {true && <div className="py-10">Game Over</div>}
        {true && <MoveHistory moveHistory={moveHistory}/>}
        {isPromotion && <PromotionModule isWhite={FEN.split(" ")[1] == "w"} handleMove={handleMove} promotionOptions={promotionOptions}/>}
        {true && <GameSetupModule FEN={FEN} SetFEN={SetFEN} engineSetPosition={engineSetPosition}/>}
      </div>
    </div>
  )
}